import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { supabase } from "../lib/supabase";

function parseTags(value) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function formatDateLabel(isoDate) {
  return new Date(isoDate).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export default function Admin() {
  const [tab, setTab] = useState("projects");

  const [projects, setProjects] = useState([]);
  const [projectLoading, setProjectLoading] = useState(true);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    tags: "",
    live_url: "",
    github_url: "",
    featured: false,
    display_order: 0,
  });
  const [projectImageFile, setProjectImageFile] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);

  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [totalViews, setTotalViews] = useState(0);
  const [uniqueVisitors, setUniqueVisitors] = useState(0);
  const [liveVisitors, setLiveVisitors] = useState(0);
  const [topPages, setTopPages] = useState([]);
  const [dailyViews, setDailyViews] = useState([]);

  const [messages, setMessages] = useState([]);
  const [messageLoading, setMessageLoading] = useState(true);

  const unreadMessages = useMemo(
    () => messages.filter((message) => !message.read),
    [messages],
  );

  const loadProjects = useCallback(async () => {
    setProjectLoading(true);
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true });
    setProjects(data || []);
    setProjectLoading(false);
  }, []);

  const uploadImage = async (file) => {
    const path = `projects/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("portfolio")
      .upload(path, file);
    if (error) throw error;

    const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
    return data.publicUrl;
  };

  const resetProjectForm = () => {
    setProjectForm({
      title: "",
      description: "",
      tags: "",
      live_url: "",
      github_url: "",
      featured: false,
      display_order: 0,
    });
    setProjectImageFile(null);
    setEditingProjectId(null);
  };

  const saveProject = async (e) => {
    e.preventDefault();

    const payload = {
      title: projectForm.title,
      description: projectForm.description,
      tags: parseTags(projectForm.tags),
      live_url: projectForm.live_url || null,
      github_url: projectForm.github_url || null,
      featured: Boolean(projectForm.featured),
      display_order: Number(projectForm.display_order) || 0,
    };

    if (projectImageFile) {
      payload.image_url = await uploadImage(projectImageFile);
    }

    if (editingProjectId) {
      const { error } = await supabase
        .from("projects")
        .update(payload)
        .eq("id", editingProjectId);
      if (error) {
        alert(error.message);
        return;
      }
    } else {
      const { error } = await supabase.from("projects").insert(payload);
      if (error) {
        alert(error.message);
        return;
      }
    }

    resetProjectForm();
    await loadProjects();
  };

  const editProject = (project) => {
    setEditingProjectId(project.id);
    setProjectForm({
      title: project.title || "",
      description: project.description || "",
      tags: (project.tags || []).join(", "),
      live_url: project.live_url || "",
      github_url: project.github_url || "",
      featured: Boolean(project.featured),
      display_order: project.display_order || 0,
    });
  };

  const deleteProject = async (id) => {
    const ok = window.confirm("Delete this project?");
    if (!ok) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }

    await loadProjects();
  };

  const refetchVisitorCount = useCallback(async () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { count } = await supabase
      .from("visitors")
      .select("*", { count: "exact", head: true })
      .gte("last_seen", fiveMinutesAgo);

    setLiveVisitors(count || 0);
  }, []);

  const loadAnalytics = useCallback(async () => {
    setAnalyticsLoading(true);

    const [
      { count: total },
      { count: visitorsCount },
      { data: pageRows },
      { data: dailyRows },
    ] = await Promise.all([
      supabase.from("page_views").select("*", { count: "exact", head: true }),
      supabase.from("visitors").select("*", { count: "exact", head: true }),
      supabase.from("page_views").select("path").limit(500),
      supabase
        .from("page_views")
        .select("created_at")
        .gte(
          "created_at",
          new Date(Date.now() - 30 * 86400 * 1000).toISOString(),
        ),
    ]);

    setTotalViews(total || 0);
    setUniqueVisitors(visitorsCount || 0);

    const groupedPages = (pageRows || []).reduce((acc, row) => {
      const key = row.path || "/";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const sortedPages = Object.entries(groupedPages)
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 7);

    setTopPages(sortedPages);

    const groupedDaily = (dailyRows || []).reduce((acc, row) => {
      const day = row.created_at.slice(0, 10);
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});

    const sortedDays = Object.entries(groupedDaily)
      .map(([day, views]) => ({ day, views, label: formatDateLabel(day) }))
      .sort((a, b) => (a.day > b.day ? 1 : -1));

    setDailyViews(sortedDays);
    await refetchVisitorCount();
    setAnalyticsLoading(false);
  }, [refetchVisitorCount]);

  const loadMessages = useCallback(async () => {
    setMessageLoading(true);
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    setMessages(data || []);
    setMessageLoading(false);
  }, []);

  const markMessageRead = async (id) => {
    const { error } = await supabase
      .from("messages")
      .update({ read: true })
      .eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }

    await loadMessages();
  };

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  useEffect(() => {
    loadProjects();
    loadAnalytics();
    loadMessages();

    const channel = supabase
      .channel("visitors")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "visitors" },
        () => {
          refetchVisitorCount();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadProjects, loadAnalytics, loadMessages, refetchVisitorCount]);

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage content and monitor analytics.
            </p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg border border-border hover:bg-card"
          >
            Logout
          </button>
        </header>

        <div className="flex flex-wrap gap-2">
          {[
            ["projects", "Projects"],
            ["analytics", "Analytics"],
            ["messages", `Messages (${unreadMessages.length})`],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-4 py-2 rounded-lg border ${
                tab === key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:bg-card"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "projects" && (
          <section className="space-y-6">
            <form
              onSubmit={saveProject}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-card border border-border rounded-xl p-4"
            >
              <input
                className="px-3 py-2 rounded border border-border bg-background"
                placeholder="Project title"
                value={projectForm.title}
                onChange={(e) =>
                  setProjectForm((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
              <input
                className="px-3 py-2 rounded border border-border bg-background"
                placeholder="Display order"
                type="number"
                value={projectForm.display_order}
                onChange={(e) =>
                  setProjectForm((prev) => ({
                    ...prev,
                    display_order: e.target.value,
                  }))
                }
              />
              <input
                className="md:col-span-2 px-3 py-2 rounded border border-border bg-background"
                placeholder="Live URL"
                value={projectForm.live_url}
                onChange={(e) =>
                  setProjectForm((prev) => ({
                    ...prev,
                    live_url: e.target.value,
                  }))
                }
              />
              <input
                className="md:col-span-2 px-3 py-2 rounded border border-border bg-background"
                placeholder="GitHub URL"
                value={projectForm.github_url}
                onChange={(e) =>
                  setProjectForm((prev) => ({
                    ...prev,
                    github_url: e.target.value,
                  }))
                }
              />
              <input
                className="md:col-span-2 px-3 py-2 rounded border border-border bg-background"
                placeholder="Tags (comma separated)"
                value={projectForm.tags}
                onChange={(e) =>
                  setProjectForm((prev) => ({ ...prev, tags: e.target.value }))
                }
              />
              <textarea
                className="md:col-span-2 px-3 py-2 rounded border border-border bg-background"
                placeholder="Description"
                rows={4}
                value={projectForm.description}
                onChange={(e) =>
                  setProjectForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
              <input
                className="md:col-span-2"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setProjectImageFile(e.target.files?.[0] || null)
                }
              />
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={projectForm.featured}
                  onChange={(e) =>
                    setProjectForm((prev) => ({
                      ...prev,
                      featured: e.target.checked,
                    }))
                  }
                />
                Featured
              </label>

              <div className="md:col-span-2 flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground"
                >
                  {editingProjectId ? "Update Project" : "Add Project"}
                </button>
                {editingProjectId && (
                  <button
                    type="button"
                    onClick={resetProjectForm}
                    className="px-4 py-2 rounded-lg border border-border"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>

            <div className="overflow-x-auto bg-card border border-border rounded-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-border">
                    <th className="p-3">Title</th>
                    <th className="p-3">Tags</th>
                    <th className="p-3">Featured</th>
                    <th className="p-3">Order</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projectLoading ? (
                    <tr>
                      <td className="p-3" colSpan={5}>
                        Loading projects...
                      </td>
                    </tr>
                  ) : (
                    projects.map((project) => (
                      <tr
                        key={project.id}
                        className="border-b border-border/50"
                      >
                        <td className="p-3">{project.title}</td>
                        <td className="p-3">
                          {(project.tags || []).join(", ")}
                        </td>
                        <td className="p-3">
                          {project.featured ? "Yes" : "No"}
                        </td>
                        <td className="p-3">{project.display_order}</td>
                        <td className="p-3 space-x-2">
                          <button
                            className="px-2 py-1 rounded border border-border"
                            onClick={() => editProject(project)}
                          >
                            Edit
                          </button>
                          <button
                            className="px-2 py-1 rounded border border-red-400 text-red-500"
                            onClick={() => deleteProject(project.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {tab === "analytics" && (
          <section className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-muted-foreground text-sm">Total Views</p>
                <p className="text-3xl font-bold">{totalViews}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-muted-foreground text-sm">Unique Visitors</p>
                <p className="text-3xl font-bold">{uniqueVisitors}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-muted-foreground text-sm">
                  Live Visitors (5m)
                </p>
                <p className="text-3xl font-bold">{liveVisitors}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-xl p-4 h-80">
                <h3 className="font-semibold mb-3">Views Last 30 Days</h3>
                {analyticsLoading ? (
                  <p className="text-muted-foreground">Loading chart...</p>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dailyViews}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="label" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="views"
                        stroke="currentColor"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>

              <div className="bg-card border border-border rounded-xl p-4 h-80">
                <h3 className="font-semibold mb-3">Top Pages</h3>
                {analyticsLoading ? (
                  <p className="text-muted-foreground">Loading chart...</p>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topPages}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="path" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="views" fill="currentColor" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </section>
        )}

        {tab === "messages" && (
          <section className="bg-card border border-border rounded-xl p-4">
            {messageLoading ? (
              <p className="text-muted-foreground">Loading messages...</p>
            ) : messages.length === 0 ? (
              <p className="text-muted-foreground">No messages yet.</p>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <article
                    key={message.id}
                    className={`border rounded-lg p-4 ${
                      message.read ? "border-border" : "border-primary/40"
                    }`}
                  >
                    <div className="flex justify-between gap-3">
                      <div>
                        <h4 className="font-semibold">
                          {message.name || "Unknown"}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {message.email}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          {new Date(message.created_at).toLocaleString()}
                        </p>
                        {!message.read && (
                          <button
                            onClick={() => markMessageRead(message.id)}
                            className="mt-2 text-sm px-2 py-1 rounded border border-border"
                          >
                            Mark read
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="mt-3 whitespace-pre-wrap">
                      {message.message}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
