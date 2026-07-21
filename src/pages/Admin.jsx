import { useCallback, useEffect, useMemo, useState } from "react";
import { Sparkles, Layers } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

// Subcomponents
import Sidebar from "../components/admin/Sidebar";
import AnalyticsTab from "../components/admin/AnalyticsTab";
import ProjectsTab from "../components/admin/ProjectsTab";
import TestimonialsTab from "../components/admin/TestimonialsTab";
import TimelineTab from "../components/admin/TimelineTab";
import SkillsTab from "../components/admin/SkillsTab";
import ServicesTab from "../components/admin/ServicesTab";
import MessagesTab from "../components/admin/MessagesTab";
import HeroTab from "../components/admin/HeroTab";
import AboutTab from "../components/admin/AboutTab";
import { LEGACY_DATA } from "./AdminLegacyData";

function formatDateLabel(isoDate) {
  return new Date(isoDate).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export default function Admin() {
  const location = useLocation();
  const navigate = useNavigate();
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
  
  const [profile, setProfile] = useState(null);

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
  const [analyticsError, setAnalyticsError] = useState("");
  const [analyticsRangeDays, setAnalyticsRangeDays] = useState(30);
  const [analyticsLastUpdated, setAnalyticsLastUpdated] = useState(null);
  const [totalViews, setTotalViews] = useState(0);
  const [uniqueVisitors, setUniqueVisitors] = useState(0);
  const [liveVisitors, setLiveVisitors] = useState(0);
  const [topPages, setTopPages] = useState([]);
  const [dailyViews, setDailyViews] = useState([]);

  const [messages, setMessages] = useState([]);
  const [messageLoading, setMessageLoading] = useState(true);

  // Styled button/input tokens for children
  const uiInput =
    "px-3.5 py-2.5 rounded-xl border border-border/60 bg-background/70 shadow-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20";
  const uiTextarea =
    "px-3.5 py-2.5 rounded-xl border border-border/60 bg-background/70 shadow-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20";
  const uiSelect =
    "px-3.5 py-2.5 rounded-xl border border-border/60 bg-background/70 shadow-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20";
  const uiPrimaryBtn =
    "px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md transition-all";
  const uiSecondaryBtn =
    "px-4 py-2.5 rounded-xl border border-border/70 bg-background/50 hover:bg-card transition-all";
  const uiSmallBtn =
    "px-2.5 py-1.5 rounded-lg border border-border/70 bg-background/60 hover:bg-card text-xs font-medium transition-all";
  const uiSmallDangerBtn =
    "px-2.5 py-1.5 rounded-lg border border-red-400/70 text-red-500 hover:bg-red-500/10 text-xs font-medium transition-all";
  const uiDangerBtn =
    "px-3 py-1.5 rounded-lg border border-red-400/70 text-red-500 hover:bg-red-500/10 transition-all";

  const unreadMessages = useMemo(
    () => messages.filter((message) => !message.read),
    [messages],
  );

  const tabRouteMap = {
    analytics: "analytics",
    hero: "hero",
    about: "about",
    services: "services",
    projects: "projects",
    timeline: "timeline",
    skills: "skills",
    testimonials: "testimonials",
    messages: "messages",
  };
  const pathToTabMap = Object.fromEntries(
    Object.entries(tabRouteMap).map(([tabKey, path]) => [path, tabKey]),
  );
  const pathSegment = location.pathname.split("/")[2] || "";
  const tab = pathToTabMap[pathSegment] || "analytics";

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

  const loadProfile = useCallback(async () => {
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .limit(1)
      .single();
    if (!error && data) {
      setProfile(data);
    }
  }, []);

  const saveProfile = async (formPayload) => {
    try {
      const { error } = await supabase
        .from("profile")
        .update(formPayload)
        .eq("id", profile.id);
      if (error) throw error;
      showToast("Profile settings saved successfully!", "success");
      await loadProfile();
    } catch (e) {
      showToast(e.message || "Failed to save profile settings.", "error");
    }
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
    setAnalyticsError("");

    const fromIso = new Date(
      Date.now() - analyticsRangeDays * 86400 * 1000,
    ).toISOString();

    try {
      const [
        { count: total, error: totalError },
        { count: visitorsCount, error: visitorsError },
        { data: pageRows, error: pageRowsError },
        { data: dailyRows, error: dailyRowsError },
        { data: sessionRows, error: sessionRowsError },
      ] = await Promise.all([
        supabase.from("page_views").select("*", { count: "exact", head: true }),
        supabase.from("visitors").select("*", { count: "exact", head: true }),
        supabase
          .from("page_views")
          .select("path")
          .gte("created_at", fromIso)
          .limit(5000),
        supabase
          .from("page_views")
          .select("created_at")
          .gte("created_at", fromIso),
        supabase
          .from("page_views")
          .select("session_id")
          .not("session_id", "is", null)
          .gte("created_at", fromIso)
          .limit(5000),
      ]);

      const firstError =
        totalError ||
        visitorsError ||
        pageRowsError ||
        dailyRowsError ||
        sessionRowsError;

      if (firstError) {
        throw firstError;
      }

      setTotalViews(total || 0);

      const uniqueSessions = new Set(
        (sessionRows || []).map((row) => row.session_id).filter(Boolean),
      ).size;
      setUniqueVisitors(visitorsCount || uniqueSessions || 0);

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
      setAnalyticsLastUpdated(new Date().toISOString());
    } catch (error) {
      setAnalyticsError(error.message || "Failed to load analytics data.");
    } finally {
      setAnalyticsLoading(false);
    }
  }, [analyticsRangeDays, refetchVisitorCount]);

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
      const tagsArray =
        typeof projectForm.tags === "string"
          ? projectForm.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
          : projectForm.tags;

      const payload = {
        title: projectForm.title,
        description: projectForm.description,
        tags: tagsArray,
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
      "This will clear current CMS content and reset to default data. Continue?",
    );
    if (!ok) return;

    try {
      const { LEGACY_DATA: localData } = await import("./Admin");

      await Promise.all([
        supabase.from("projects").delete().not("id", "is", null),
        supabase.from("testimonials").delete().not("id", "is", null),
        supabase.from("timeline").delete().not("id", "is", null),
        supabase.from("skills").delete().not("id", "is", null),
        supabase.from("services").delete().not("id", "is", null),
      ]);

      await Promise.all([
        supabase.from("projects").insert(localData.projects),
        supabase.from("testimonials").insert(localData.testimonials),
        supabase.from("timeline").insert(localData.timeline),
        supabase.from("skills").insert(localData.skills),
        supabase.from("services").insert(localData.services),
      ]);

      if (tab === "projects") await loadProjects();
      if (tab === "testimonials") await loadTestimonials();
      if (tab === "timeline") await loadTimeline();
      if (tab === "skills") await loadSkills();
      if (tab === "services") await loadServices();

      showToast("Default template data imported successfully.", "success");
    } catch (error) {
      showToast(error.message || "Template import failed.", "error");
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

  // Lazy-load data ONLY for the active tab to optimize API queries
  useEffect(() => {
    if (tab === "projects") loadProjects();
  }, [tab, loadProjects]);

  useEffect(() => {
    if (tab === "testimonials") loadTestimonials();
  }, [tab, loadTestimonials]);

  useEffect(() => {
    if (tab === "timeline") loadTimeline();
  }, [tab, loadTimeline]);

  useEffect(() => {
    if (tab === "skills") loadSkills();
  }, [tab, loadSkills]);

  useEffect(() => {
    if (tab === "services") loadServices();
  }, [tab, loadServices]);

  useEffect(() => {
    if (tab === "messages") loadMessages();
  }, [tab, loadMessages]);

  useEffect(() => {
    if (tab === "hero" || tab === "about") loadProfile();
  }, [tab, loadProfile]);

  useEffect(() => {
    if (tab === "analytics") {
      loadAnalytics();
      const interval = setInterval(() => {
        loadAnalytics();
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [tab, loadAnalytics]);

  // Keep unread messages count up-to-date in sidebar
  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  useEffect(() => {
    if (location.pathname === "/admin" || location.pathname === "/admin/") {
      navigate("/admin/analytics", { replace: true });
    }
  }, [location.pathname, navigate]);

  // Custom Toggle Switch
  const ToggleSwitch = ({ checked, onChange, label }) => (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${checked ? "bg-primary" : "bg-neutral-700"}`} />
        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${checked ? "translate-x-5" : ""}`} />
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </label>
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.08),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.06),_transparent_40%)] bg-background text-foreground font-sans">
      
      {/* Toast Notification */}
      {statusMessage && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl animate-fade-in transition-all duration-300 ${
          statusType === "success" 
            ? "border-emerald-500/20 bg-emerald-950/80 text-emerald-300"
            : statusType === "error"
            ? "border-red-500/20 bg-red-950/80 text-red-300"
            : "border-blue-500/20 bg-blue-950/80 text-blue-300"
        }`}>
          <Sparkles className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">{statusMessage}</span>
        </div>
      )}

      <div className="w-full grid grid-cols-1 lg:grid-cols-[280px,1fr] lg:min-h-screen">
        
        {/* Sidebar */}
        <Sidebar
          tab={tab}
          navigate={navigate}
          unreadCount={unreadMessages.length}
          logout={logout}
        />

        {/* Main Content Area */}
        <main className="min-w-0 p-6 md:p-8 lg:p-10 space-y-8">
          
          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-border/30">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Active Module</p>
              <h2 className="text-3xl font-black tracking-tight mt-1 capitalize">{tab}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">Manage details and dynamically control data</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={importLegacyContent}
                className={`${uiPrimaryBtn} inline-flex items-center gap-2`}
              >
                <Layers className="w-4 h-4" />
                Import Legacy
              </button>
              <button onClick={logout} className={uiSecondaryBtn}>
                Logout
              </button>
            </div>
          </header>

          {/* Dynamic Tab Views */}
          <div className="space-y-8">
            
            {tab === "analytics" && (
              <AnalyticsTab
                analyticsRangeDays={analyticsRangeDays}
                setAnalyticsRangeDays={setAnalyticsRangeDays}
                loadAnalytics={loadAnalytics}
                analyticsError={analyticsError}
                totalViews={totalViews}
                uniqueVisitors={uniqueVisitors}
                liveVisitors={liveVisitors}
                analyticsLoading={analyticsLoading}
                dailyViews={dailyViews}
                topPages={topPages}
                analyticsLastUpdated={analyticsLastUpdated}
              />
            )}

            {tab === "hero" && (
              <HeroTab
                profile={profile}
                saveProfile={saveProfile}
                showToast={showToast}
                uiInput={uiInput}
                uiTextarea={uiTextarea}
                uiPrimaryBtn={uiPrimaryBtn}
              />
            )}

            {tab === "about" && (
              <AboutTab
                profile={profile}
                saveProfile={saveProfile}
                showToast={showToast}
                uiInput={uiInput}
                uiTextarea={uiTextarea}
                uiPrimaryBtn={uiPrimaryBtn}
              />
            )}

            {tab === "services" && (
              <ServicesTab
                services={services}
                serviceForm={serviceForm}
                setServiceForm={setServiceForm}
                editingServiceId={editingServiceId}
                setEditingServiceId={setEditingServiceId}
                saveSimple={saveSimple}
                deleteSimple={deleteSimple}
                loadServices={loadServices}
                showToast={showToast}
                uiInput={uiInput}
                uiTextarea={uiTextarea}
                uiPrimaryBtn={uiPrimaryBtn}
                uiSecondaryBtn={uiSecondaryBtn}
              />
            )}

            {tab === "projects" && (
              <ProjectsTab
                projects={projects}
                projectLoading={projectLoading}
                projectForm={projectForm}
                setProjectForm={setProjectForm}
                projectImageFile={projectImageFile}
                setProjectImageFile={setProjectImageFile}
                editingProjectId={editingProjectId}
                setEditingProjectId={setEditingProjectId}
                resetProjectForm={resetProjectForm}
                saveProject={saveProject}
                deleteProject={deleteProject}
                showToast={showToast}
                uiInput={uiInput}
                uiTextarea={uiTextarea}
                uiPrimaryBtn={uiPrimaryBtn}
                uiSecondaryBtn={uiSecondaryBtn}
                ToggleSwitch={ToggleSwitch}
              />
            )}

            {tab === "timeline" && (
              <TimelineTab
                timeline={timeline}
                timelineForm={timelineForm}
                setTimelineForm={setTimelineForm}
                editingTimelineId={editingTimelineId}
                setEditingTimelineId={setEditingTimelineId}
                saveSimple={saveSimple}
                deleteSimple={deleteSimple}
                loadTimeline={loadTimeline}
                showToast={showToast}
                uiInput={uiInput}
                uiTextarea={uiTextarea}
                uiSelect={uiSelect}
                uiPrimaryBtn={uiPrimaryBtn}
                uiSecondaryBtn={uiSecondaryBtn}
              />
            )}

            {tab === "skills" && (
              <SkillsTab
                skills={skills}
                skillForm={skillForm}
                setSkillForm={setSkillForm}
                editingSkillId={editingSkillId}
                setEditingSkillId={setEditingSkillId}
                saveSimple={saveSimple}
                deleteSimple={deleteSimple}
                loadSkills={loadSkills}
                showToast={showToast}
                uiInput={uiInput}
                uiTextarea={uiTextarea}
                uiPrimaryBtn={uiPrimaryBtn}
                uiSecondaryBtn={uiSecondaryBtn}
              />
            )}

            {tab === "testimonials" && (
              <TestimonialsTab
                testimonials={testimonials}
                testimonialForm={testimonialForm}
                setTestimonialForm={setTestimonialForm}
                editingTestimonialId={editingTestimonialId}
                setEditingTestimonialId={setEditingTestimonialId}
                saveSimple={saveSimple}
                deleteSimple={deleteSimple}
                loadTestimonials={loadTestimonials}
                showToast={showToast}
                uiInput={uiInput}
                uiTextarea={uiTextarea}
                uiPrimaryBtn={uiPrimaryBtn}
                uiSecondaryBtn={uiSecondaryBtn}
                ToggleSwitch={ToggleSwitch}
              />
            )}

            {tab === "messages" && (
              <MessagesTab
                messages={messages}
                messageLoading={messageLoading}
                markMessageRead={markMessageRead}
              />
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

// Re-export LEGACY_DATA for importLegacyContent use
export { LEGACY_DATA };
