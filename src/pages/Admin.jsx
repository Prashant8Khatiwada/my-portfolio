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

const LEGACY_DATA = {
  projects: [
    {
      title: "FotosFolio",
      description:
        "Portfolio platform for photographers and visual artists to showcase high-quality images, manage galleries, and share work with clients.",
      tags: ["React", "Next.js", "Cloud Storage"],
      live_url: "https://fotosfolio.com/",
      github_url: null,
      image_url: null,
      featured: true,
      display_order: 0,
    },
    {
      title: "Sawari Expert",
      description:
        "Ride-hailing and transport management platform providing seamless booking, driver tracking, and customer support for urban commuters.",
      tags: ["React", "Node.js", "Google Maps API"],
      live_url: "https://sawariexpert.com/",
      github_url: null,
      image_url: null,
      featured: true,
      display_order: 1,
    },
    {
      title: "Kumari Bank",
      description:
        "Official website for Kumari Bank Limited, featuring secure banking services, account management, and financial tools.",
      tags: ["React", "Banking API", "Security"],
      live_url: "https://www.kumaribank.com/en/personal-banking",
      github_url: null,
      image_url: null,
      featured: true,
      display_order: 2,
    },
    {
      title: "Abroad Institute",
      description:
        "Educational consultancy platform helping students pursue studies abroad with course finder and application tracking.",
      tags: ["React", "Node.js", "MongoDB"],
      live_url: "http://abroadinst.com",
      github_url: null,
      image_url: null,
      featured: true,
      display_order: 3,
    },
    {
      title: "Pacific Regional Bank",
      description:
        "Digital banking platform for Pacific Regional Bank offering online account opening and transaction services.",
      tags: ["React", "FinTech", "Secure Auth"],
      live_url: "https://pacificbank.peacenepal.com",
      github_url: null,
      image_url: null,
      featured: true,
      display_order: 4,
    },
    {
      title: "Wealth Pandit",
      description:
        "Financial advisory and wealth management platform for personalized investment strategies.",
      tags: ["React", "Charts.js", "Finance"],
      live_url: "https://uat.wealthpandit.com",
      github_url: null,
      image_url: null,
      featured: true,
      display_order: 5,
    },
    {
      title: "ADBL KYC Portal",
      description:
        "Know Your Customer portal for Agricultural Development Bank providing secure identity verification and customer onboarding.",
      tags: ["React", "Security", "Blockchain"],
      live_url: "https://adbl.com.np",
      github_url: null,
      image_url: null,
      featured: true,
      display_order: 6,
    },
    {
      title: "Student Management System",
      description:
        "Comprehensive system for educational institutions to manage student records, attendance, and performance tracking.",
      tags: ["React", "Node.js", "PostgreSQL"],
      live_url: null,
      github_url: "https://github.com/example/student-management",
      image_url: null,
      featured: false,
      display_order: 7,
    },
    {
      title: "Task Collaboration App",
      description:
        "Real-time task management and team collaboration tool with notifications and progress tracking.",
      tags: ["React", "Firebase", "Tailwind CSS"],
      live_url: null,
      github_url: "https://github.com/example/task-collab",
      image_url: null,
      featured: false,
      display_order: 8,
    },
  ],
  testimonials: [
    {
      name: "Nirgun Subedi",
      role: "CTO",
      company: "Blueneon Technology",
      avatar_url: null,
      content:
        "Prashant delivered reliable and scalable frontend solutions using React, Next.js, and TypeScript during his time at Blueneon Technology.",
      rating: 5,
      display_order: 0,
      active: true,
    },
    {
      name: "Bibek Timilsina",
      role: "Flutter & Backend Developer",
      company: "International/Foreign Company",
      avatar_url: null,
      content:
        "I've collaborated with Prashant on multiple frontend-backend integrations, and he consistently delivered clean, maintainable code.",
      rating: 5,
      display_order: 1,
      active: true,
    },
    {
      name: "Aayush Shrestha",
      role: "Backend Developer",
      company: "Blueneon Technology",
      avatar_url: null,
      content:
        "Prashant was efficient and precise in implementing UI features that aligned smoothly with our backend systems.",
      rating: 5,
      display_order: 2,
      active: true,
    },
    {
      name: "Suresh Lamichhane",
      role: "Project Manager",
      company: "Peace Nepal",
      avatar_url: null,
      content:
        "Working with Prashant was a pleasure. His attention to detail and problem-solving skills made project delivery smooth and on time.",
      rating: 5,
      display_order: 3,
      active: true,
    },
  ],
  timeline: [
    {
      year: "Jan 2025 - Sept 2025",
      title: "Mid-level Developer",
      company: "Blueneontech",
      description: "Built Fotosfolio platform with Next.js and TypeScript.",
      type: "work",
      display_order: 0,
    },
    {
      year: "Jan 2024 - Dec 2024",
      title: "Junior Developer",
      company: "Peace Nepal",
      description: "Developed KYC forms for ADBL and Pacific Regional Bank.",
      type: "work",
      display_order: 1,
    },
    {
      year: "Sept 2023 - Dec 2023",
      title: "Frontend Developer Intern",
      company: "Blueneon Technology",
      description:
        "Learned React fundamentals and contributed to UI components.",
      type: "work",
      display_order: 2,
    },
    {
      year: "2023",
      title: "Self-taught Development",
      company: "Self Learning",
      description:
        "Built portfolio projects and completed online courses in React and JavaScript.",
      type: "work",
      display_order: 3,
    },
  ],
  skills: [
    {
      name: "Core Technologies",
      category: "Frontend",
      proficiency: 95,
      description: "React.js, Next.js, TypeScript, JavaScript, HTML5, CSS3",
      display_order: 0,
    },
    {
      name: "State Management",
      category: "State Management",
      proficiency: 90,
      description: "Redux, Context API, Zustand, React Query",
      display_order: 1,
    },
    {
      name: "Styling & Animation",
      category: "Frontend",
      proficiency: 90,
      description:
        "Tailwind CSS, Styled Components, Framer Motion, CSS Animations",
      display_order: 2,
    },
    {
      name: "Backend Development",
      category: "Backend",
      proficiency: 75,
      description: "Node.js, Express, PostgreSQL, MongoDB, REST APIs",
      display_order: 3,
    },
    {
      name: "Tools & Deployment",
      category: "DevOps",
      proficiency: 80,
      description: "Git, Docker, Vercel, Netlify, GitHub Actions, Firebase",
      display_order: 4,
    },
  ],
  services: [
    {
      title: "Web Development",
      description:
        "Building fast, scalable, and secure web applications using modern technologies like React, Next.js, and Node.js.",
      icon: "Code",
      display_order: 0,
    },
    {
      title: "UI/UX Design",
      description:
        "Creating intuitive and visually appealing user interfaces that provide seamless user experiences across all devices.",
      icon: "Palette",
      display_order: 1,
    },
    {
      title: "Performance Optimization",
      description:
        "Optimizing web applications for speed and efficiency through code splitting, lazy loading, and advanced caching strategies.",
      icon: "Zap",
      display_order: 2,
    },
    {
      title: "API Integration",
      description:
        "Seamless integration of third-party APIs and services to extend application functionality and enhance user capabilities.",
      icon: "Globe",
      display_order: 3,
    },
    {
      title: "Mobile Responsive Design",
      description:
        "Ensuring flawless functionality and stunning visuals across all devices with responsive and adaptive design principles.",
      icon: "Smartphone",
      display_order: 4,
    },
    {
      title: "SEO Optimization",
      description:
        "Implementing SEO best practices for improved search visibility and organic traffic growth to your web applications.",
      icon: "Search",
      display_order: 5,
    },
  ],
};

export default function Admin() {
  const [tab, setTab] = useState("projects");
  const [statusMessage, setStatusMessage] = useState("");

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

  const [testimonials, setTestimonials] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [skills, setSkills] = useState([]);
  const [services, setServices] = useState([]);

  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
    display_order: 0,
    active: true,
  });
  const [editingTestimonialId, setEditingTestimonialId] = useState(null);

  const [timelineForm, setTimelineForm] = useState({
    year: "",
    title: "",
    company: "",
    description: "",
    type: "work",
    display_order: 0,
  });
  const [editingTimelineId, setEditingTimelineId] = useState(null);

  const [skillForm, setSkillForm] = useState({
    name: "",
    category: "",
    proficiency: 80,
    description: "",
    display_order: 0,
  });
  const [editingSkillId, setEditingSkillId] = useState(null);

  const [serviceForm, setServiceForm] = useState({
    title: "",
    description: "",
    icon: "Code",
    display_order: 0,
  });
  const [editingServiceId, setEditingServiceId] = useState(null);

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

  const uploadImage = async (file) => {
    const path = `projects/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("portfolio")
      .upload(path, file);
    if (error) throw error;

    const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
    return data.publicUrl;
  };

  const loadProjects = useCallback(async () => {
    setProjectLoading(true);
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true });
    setProjects(data || []);
    setProjectLoading(false);
  }, []);

  const loadTestimonials = useCallback(async () => {
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("display_order", { ascending: true });
    setTestimonials(data || []);
  }, []);

  const loadTimeline = useCallback(async () => {
    const { data } = await supabase
      .from("timeline")
      .select("*")
      .order("display_order", { ascending: true });
    setTimeline(data || []);
  }, []);

  const loadSkills = useCallback(async () => {
    const { data } = await supabase
      .from("skills")
      .select("*")
      .order("display_order", { ascending: true });
    setSkills(data || []);
  }, []);

  const loadServices = useCallback(async () => {
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("display_order", { ascending: true });
    setServices(data || []);
  }, []);

  const loadMessages = useCallback(async () => {
    setMessageLoading(true);
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    setMessages(data || []);
    setMessageLoading(false);
  }, []);

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
    setTopPages(
      Object.entries(groupedPages)
        .map(([path, views]) => ({ path, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 7),
    );

    const groupedDaily = (dailyRows || []).reduce((acc, row) => {
      const day = row.created_at.slice(0, 10);
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});

    setDailyViews(
      Object.entries(groupedDaily)
        .map(([day, views]) => ({ day, views, label: formatDateLabel(day) }))
        .sort((a, b) => (a.day > b.day ? 1 : -1)),
    );

    await refetchVisitorCount();
    setAnalyticsLoading(false);
  }, [refetchVisitorCount]);

  const refreshAllCms = useCallback(async () => {
    await Promise.all([
      loadProjects(),
      loadTestimonials(),
      loadTimeline(),
      loadSkills(),
      loadServices(),
    ]);
  }, [loadProjects, loadTestimonials, loadTimeline, loadSkills, loadServices]);

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
    try {
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
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert(payload);
        if (error) throw error;
      }

      resetProjectForm();
      await loadProjects();
      setStatusMessage("Project saved successfully.");
    } catch (error) {
      setStatusMessage(error.message || "Failed to save project.");
    }
  };

  const deleteProject = async (id) => {
    const ok = window.confirm("Delete this project?");
    if (!ok) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) return setStatusMessage(error.message);
    await loadProjects();
  };

  const saveSimple = async (table, id, payload, reset, reload) => {
    const query = id
      ? supabase.from(table).update(payload).eq("id", id)
      : supabase.from(table).insert(payload);
    const { error } = await query;
    if (error) throw error;
    reset();
    await reload();
  };

  const deleteSimple = async (table, id, reload) => {
    const ok = window.confirm("Delete this item?");
    if (!ok) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) throw error;
    await reload();
  };

  const importLegacyContent = async () => {
    const ok = window.confirm(
      "This will clear current CMS content and import legacy data. Continue?",
    );
    if (!ok) return;

    try {
      await Promise.all([
        supabase.from("projects").delete().not("id", "is", null),
        supabase.from("testimonials").delete().not("id", "is", null),
        supabase.from("timeline").delete().not("id", "is", null),
        supabase.from("skills").delete().not("id", "is", null),
        supabase.from("services").delete().not("id", "is", null),
      ]);

      await Promise.all([
        supabase.from("projects").insert(LEGACY_DATA.projects),
        supabase.from("testimonials").insert(LEGACY_DATA.testimonials),
        supabase.from("timeline").insert(LEGACY_DATA.timeline),
        supabase.from("skills").insert(LEGACY_DATA.skills),
        supabase.from("services").insert(LEGACY_DATA.services),
      ]);

      await refreshAllCms();
      setStatusMessage(
        "Legacy content imported. You can now edit it from all tabs.",
      );
    } catch (error) {
      setStatusMessage(error.message || "Legacy import failed.");
    }
  };

  const markMessageRead = async (id) => {
    const { error } = await supabase
      .from("messages")
      .update({ read: true })
      .eq("id", id);
    if (error) return setStatusMessage(error.message);
    await loadMessages();
  };

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  useEffect(() => {
    refreshAllCms();
    loadAnalytics();
    loadMessages();

    const channel = supabase
      .channel("visitors")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "visitors" },
        refetchVisitorCount,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refreshAllCms, loadAnalytics, loadMessages, refetchVisitorCount]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card/20 to-background text-foreground p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="rounded-2xl border border-border bg-card/80 backdrop-blur p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Portfolio Control Center</h1>
            <p className="text-muted-foreground">
              Manage all CMS sections, analytics, and contact messages.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={importLegacyContent}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Import Legacy Content
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg border border-border hover:bg-card"
            >
              Logout
            </button>
          </div>
        </header>

        {statusMessage && (
          <div className="rounded-lg border border-border bg-card p-3 text-sm">
            {statusMessage}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {[
            ["projects", `Projects (${projects.length})`],
            ["testimonials", `Testimonials (${testimonials.length})`],
            ["timeline", `Timeline (${timeline.length})`],
            ["skills", `Skills (${skills.length})`],
            ["services", `Services (${services.length})`],
            ["analytics", "Analytics"],
            ["messages", `Messages (${unreadMessages.length} unread)`],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-4 py-2 rounded-lg border ${
                tab === key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border bg-card/70 hover:bg-card"
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
                  setProjectForm((p) => ({ ...p, title: e.target.value }))
                }
                required
              />
              <input
                className="px-3 py-2 rounded border border-border bg-background"
                placeholder="Display order"
                type="number"
                value={projectForm.display_order}
                onChange={(e) =>
                  setProjectForm((p) => ({
                    ...p,
                    display_order: e.target.value,
                  }))
                }
              />
              <input
                className="md:col-span-2 px-3 py-2 rounded border border-border bg-background"
                placeholder="Live URL"
                value={projectForm.live_url}
                onChange={(e) =>
                  setProjectForm((p) => ({ ...p, live_url: e.target.value }))
                }
              />
              <input
                className="md:col-span-2 px-3 py-2 rounded border border-border bg-background"
                placeholder="GitHub URL"
                value={projectForm.github_url}
                onChange={(e) =>
                  setProjectForm((p) => ({ ...p, github_url: e.target.value }))
                }
              />
              <input
                className="md:col-span-2 px-3 py-2 rounded border border-border bg-background"
                placeholder="Tags (comma separated)"
                value={projectForm.tags}
                onChange={(e) =>
                  setProjectForm((p) => ({ ...p, tags: e.target.value }))
                }
              />
              <textarea
                className="md:col-span-2 px-3 py-2 rounded border border-border bg-background"
                placeholder="Description"
                rows={4}
                value={projectForm.description}
                onChange={(e) =>
                  setProjectForm((p) => ({ ...p, description: e.target.value }))
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
                    setProjectForm((p) => ({
                      ...p,
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
                    <th className="p-3">Featured</th>
                    <th className="p-3">Order</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projectLoading ? (
                    <tr>
                      <td className="p-3" colSpan={4}>
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
                          {project.featured ? "Yes" : "No"}
                        </td>
                        <td className="p-3">{project.display_order}</td>
                        <td className="p-3 space-x-2">
                          <button
                            className="px-2 py-1 rounded border border-border"
                            onClick={() => {
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
                            }}
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

        {tab === "testimonials" && (
          <section className="space-y-4 bg-card border border-border rounded-xl p-4">
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await saveSimple(
                    "testimonials",
                    editingTestimonialId,
                    {
                      name: testimonialForm.name,
                      role: testimonialForm.role,
                      company: testimonialForm.company,
                      content: testimonialForm.content,
                      rating: Number(testimonialForm.rating) || 5,
                      display_order: Number(testimonialForm.display_order) || 0,
                      active: Boolean(testimonialForm.active),
                    },
                    () => {
                      setEditingTestimonialId(null);
                      setTestimonialForm({
                        name: "",
                        role: "",
                        company: "",
                        content: "",
                        rating: 5,
                        display_order: 0,
                        active: true,
                      });
                    },
                    loadTestimonials,
                  );
                } catch (error) {
                  setStatusMessage(
                    error.message || "Failed to save testimonial.",
                  );
                }
              }}
            >
              <input
                className="px-3 py-2 rounded border border-border bg-background"
                placeholder="Name"
                value={testimonialForm.name}
                onChange={(e) =>
                  setTestimonialForm((p) => ({ ...p, name: e.target.value }))
                }
                required
              />
              <input
                className="px-3 py-2 rounded border border-border bg-background"
                placeholder="Role"
                value={testimonialForm.role}
                onChange={(e) =>
                  setTestimonialForm((p) => ({ ...p, role: e.target.value }))
                }
              />
              <input
                className="px-3 py-2 rounded border border-border bg-background"
                placeholder="Company"
                value={testimonialForm.company}
                onChange={(e) =>
                  setTestimonialForm((p) => ({ ...p, company: e.target.value }))
                }
              />
              <input
                className="px-3 py-2 rounded border border-border bg-background"
                type="number"
                placeholder="Rating"
                value={testimonialForm.rating}
                onChange={(e) =>
                  setTestimonialForm((p) => ({ ...p, rating: e.target.value }))
                }
              />
              <textarea
                className="md:col-span-2 px-3 py-2 rounded border border-border bg-background"
                placeholder="Content"
                rows={3}
                value={testimonialForm.content}
                onChange={(e) =>
                  setTestimonialForm((p) => ({ ...p, content: e.target.value }))
                }
                required
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={testimonialForm.active}
                  onChange={(e) =>
                    setTestimonialForm((p) => ({
                      ...p,
                      active: e.target.checked,
                    }))
                  }
                />{" "}
                Active
              </div>
              <button
                className="px-4 py-2 rounded bg-primary text-primary-foreground"
                type="submit"
              >
                {editingTestimonialId ? "Update" : "Add"}
              </button>
            </form>
            <div className="space-y-2">
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="border border-border rounded-lg p-3 flex justify-between gap-3"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.role} {item.company ? `- ${item.company}` : ""}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <button
                      className="px-2 py-1 border rounded"
                      onClick={() => {
                        setEditingTestimonialId(item.id);
                        setTestimonialForm({
                          name: item.name || "",
                          role: item.role || "",
                          company: item.company || "",
                          content: item.content || "",
                          rating: item.rating || 5,
                          display_order: item.display_order || 0,
                          active: item.active !== false,
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 border border-red-400 text-red-500 rounded"
                      onClick={async () => {
                        try {
                          await deleteSimple(
                            "testimonials",
                            item.id,
                            loadTestimonials,
                          );
                        } catch (error) {
                          setStatusMessage(error.message);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "timeline" && (
          <section className="space-y-4 bg-card border border-border rounded-xl p-4">
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await saveSimple(
                    "timeline",
                    editingTimelineId,
                    {
                      year: timelineForm.year,
                      title: timelineForm.title,
                      company: timelineForm.company,
                      description: timelineForm.description,
                      type: timelineForm.type,
                      display_order: Number(timelineForm.display_order) || 0,
                    },
                    () => {
                      setEditingTimelineId(null);
                      setTimelineForm({
                        year: "",
                        title: "",
                        company: "",
                        description: "",
                        type: "work",
                        display_order: 0,
                      });
                    },
                    loadTimeline,
                  );
                } catch (error) {
                  setStatusMessage(
                    error.message || "Failed to save timeline item.",
                  );
                }
              }}
            >
              <input
                className="px-3 py-2 rounded border border-border bg-background"
                placeholder="Year"
                value={timelineForm.year}
                onChange={(e) =>
                  setTimelineForm((p) => ({ ...p, year: e.target.value }))
                }
              />
              <input
                className="px-3 py-2 rounded border border-border bg-background"
                placeholder="Title"
                value={timelineForm.title}
                onChange={(e) =>
                  setTimelineForm((p) => ({ ...p, title: e.target.value }))
                }
                required
              />
              <input
                className="px-3 py-2 rounded border border-border bg-background"
                placeholder="Company"
                value={timelineForm.company}
                onChange={(e) =>
                  setTimelineForm((p) => ({ ...p, company: e.target.value }))
                }
              />
              <select
                className="px-3 py-2 rounded border border-border bg-background"
                value={timelineForm.type}
                onChange={(e) =>
                  setTimelineForm((p) => ({ ...p, type: e.target.value }))
                }
              >
                <option value="work">work</option>
                <option value="education">education</option>
              </select>
              <textarea
                className="md:col-span-2 px-3 py-2 rounded border border-border bg-background"
                placeholder="Description"
                rows={3}
                value={timelineForm.description}
                onChange={(e) =>
                  setTimelineForm((p) => ({
                    ...p,
                    description: e.target.value,
                  }))
                }
              />
              <button
                className="px-4 py-2 rounded bg-primary text-primary-foreground"
                type="submit"
              >
                {editingTimelineId ? "Update" : "Add"}
              </button>
            </form>
            {timeline.map((item) => (
              <div
                key={item.id}
                className="border border-border rounded-lg p-3 flex justify-between gap-3"
              >
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.year} - {item.type}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() => {
                      setEditingTimelineId(item.id);
                      setTimelineForm({
                        year: item.year || "",
                        title: item.title || "",
                        company: item.company || "",
                        description: item.description || "",
                        type: item.type || "work",
                        display_order: item.display_order || 0,
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 border border-red-400 text-red-500 rounded"
                    onClick={async () => {
                      try {
                        await deleteSimple("timeline", item.id, loadTimeline);
                      } catch (error) {
                        setStatusMessage(error.message);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        {tab === "skills" && (
          <section className="space-y-4 bg-card border border-border rounded-xl p-4">
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await saveSimple(
                    "skills",
                    editingSkillId,
                    {
                      name: skillForm.name,
                      category: skillForm.category,
                      proficiency: Number(skillForm.proficiency) || 80,
                      description: skillForm.description,
                      display_order: Number(skillForm.display_order) || 0,
                    },
                    () => {
                      setEditingSkillId(null);
                      setSkillForm({
                        name: "",
                        category: "",
                        proficiency: 80,
                        description: "",
                        display_order: 0,
                      });
                    },
                    loadSkills,
                  );
                } catch (error) {
                  setStatusMessage(error.message || "Failed to save skill.");
                }
              }}
            >
              <input
                className="px-3 py-2 rounded border border-border bg-background"
                placeholder="Name"
                value={skillForm.name}
                onChange={(e) =>
                  setSkillForm((p) => ({ ...p, name: e.target.value }))
                }
                required
              />
              <input
                className="px-3 py-2 rounded border border-border bg-background"
                placeholder="Category"
                value={skillForm.category}
                onChange={(e) =>
                  setSkillForm((p) => ({ ...p, category: e.target.value }))
                }
              />
              <input
                className="px-3 py-2 rounded border border-border bg-background"
                type="number"
                placeholder="Proficiency"
                value={skillForm.proficiency}
                onChange={(e) =>
                  setSkillForm((p) => ({ ...p, proficiency: e.target.value }))
                }
              />
              <input
                className="px-3 py-2 rounded border border-border bg-background"
                type="number"
                placeholder="Display order"
                value={skillForm.display_order}
                onChange={(e) =>
                  setSkillForm((p) => ({ ...p, display_order: e.target.value }))
                }
              />
              <textarea
                className="md:col-span-2 px-3 py-2 rounded border border-border bg-background"
                placeholder="Description"
                rows={3}
                value={skillForm.description}
                onChange={(e) =>
                  setSkillForm((p) => ({ ...p, description: e.target.value }))
                }
              />
              <button
                className="px-4 py-2 rounded bg-primary text-primary-foreground"
                type="submit"
              >
                {editingSkillId ? "Update" : "Add"}
              </button>
            </form>
            {skills.map((item) => (
              <div
                key={item.id}
                className="border border-border rounded-lg p-3 flex justify-between gap-3"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.category} - {item.proficiency}%
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() => {
                      setEditingSkillId(item.id);
                      setSkillForm({
                        name: item.name || "",
                        category: item.category || "",
                        proficiency: item.proficiency || 80,
                        description: item.description || "",
                        display_order: item.display_order || 0,
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 border border-red-400 text-red-500 rounded"
                    onClick={async () => {
                      try {
                        await deleteSimple("skills", item.id, loadSkills);
                      } catch (error) {
                        setStatusMessage(error.message);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        {tab === "services" && (
          <section className="space-y-4 bg-card border border-border rounded-xl p-4">
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await saveSimple(
                    "services",
                    editingServiceId,
                    {
                      title: serviceForm.title,
                      description: serviceForm.description,
                      icon: serviceForm.icon,
                      display_order: Number(serviceForm.display_order) || 0,
                    },
                    () => {
                      setEditingServiceId(null);
                      setServiceForm({
                        title: "",
                        description: "",
                        icon: "Code",
                        display_order: 0,
                      });
                    },
                    loadServices,
                  );
                } catch (error) {
                  setStatusMessage(error.message || "Failed to save service.");
                }
              }}
            >
              <input
                className="px-3 py-2 rounded border border-border bg-background"
                placeholder="Title"
                value={serviceForm.title}
                onChange={(e) =>
                  setServiceForm((p) => ({ ...p, title: e.target.value }))
                }
                required
              />
              <input
                className="px-3 py-2 rounded border border-border bg-background"
                placeholder="Icon (Code, Palette, Zap...)"
                value={serviceForm.icon}
                onChange={(e) =>
                  setServiceForm((p) => ({ ...p, icon: e.target.value }))
                }
              />
              <textarea
                className="md:col-span-2 px-3 py-2 rounded border border-border bg-background"
                placeholder="Description"
                rows={3}
                value={serviceForm.description}
                onChange={(e) =>
                  setServiceForm((p) => ({ ...p, description: e.target.value }))
                }
              />
              <button
                className="px-4 py-2 rounded bg-primary text-primary-foreground"
                type="submit"
              >
                {editingServiceId ? "Update" : "Add"}
              </button>
            </form>
            {services.map((item) => (
              <div
                key={item.id}
                className="border border-border rounded-lg p-3 flex justify-between gap-3"
              >
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.icon}</p>
                </div>
                <div className="space-x-2">
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() => {
                      setEditingServiceId(item.id);
                      setServiceForm({
                        title: item.title || "",
                        description: item.description || "",
                        icon: item.icon || "Code",
                        display_order: item.display_order || 0,
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 border border-red-400 text-red-500 rounded"
                    onClick={async () => {
                      try {
                        await deleteSimple("services", item.id, loadServices);
                      } catch (error) {
                        setStatusMessage(error.message);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
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
