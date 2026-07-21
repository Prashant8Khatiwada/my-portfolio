import { useState, useMemo, useEffect } from "react";
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

// React Query Custom Hooks
import {
  useProjectsQuery,
  useSaveProjectMutation,
  useDeleteProjectMutation,
  useTestimonialsQuery,
  useTimelineQuery,
  useSkillsQuery,
  useServicesQuery,
  useSaveSimpleMutation,
  useDeleteSimpleMutation,
  useProfileQuery,
  useSaveProfileMutation,
  useMessagesQuery,
  useMarkMessageReadMutation,
  useResetToDefaultsMutation,
  useLiveVisitorsQuery,
  useAnalyticsQuery,
} from "../hooks/useAdminData";

export default function Admin() {
  const location = useLocation();
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("info"); // 'info' | 'success' | 'error'

  const [analyticsRangeDays, setAnalyticsRangeDays] = useState(30);

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

  // Styled button/input tokens for children
  const uiInput =
    "w-full px-3.5 py-2.5 rounded-xl border border-border/60 bg-background/70 text-sm shadow-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20";
  const uiTextarea =
    "w-full px-3.5 py-2.5 rounded-xl border border-border/60 bg-background/70 text-sm shadow-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20";
  const uiSelect =
    "w-full px-3.5 py-2.5 rounded-xl border border-border/60 bg-background/70 text-sm shadow-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20";
  const uiPrimaryBtn =
    "px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md transition-all";
  const uiSecondaryBtn =
    "px-5 py-2.5 rounded-xl border border-border/70 bg-background/50 hover:bg-card text-foreground font-medium transition-all duration-200 active:scale-95";

  const showToast = (message, type = "success") => {
    setStatusMessage(message);
    setStatusType(type);
    setTimeout(() => {
      setStatusMessage("");
    }, 4000);
  };

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

  // TanStack React Query Hooks
  const { data: projects = [], isLoading: projectLoading } = useProjectsQuery();
  const { data: testimonials = [] } = useTestimonialsQuery();
  const { data: timeline = [] } = useTimelineQuery();
  const { data: skills = [] } = useSkillsQuery();
  const { data: services = [] } = useServicesQuery();
  const { data: profile } = useProfileQuery();
  const { data: messages = [], isLoading: messageLoading } = useMessagesQuery();
  const { data: liveVisitors = 0 } = useLiveVisitorsQuery();
  const { data: analytics = {}, isLoading: analyticsLoading, error: analyticsError } = useAnalyticsQuery(analyticsRangeDays);

  const unreadMessages = useMemo(
    () => messages.filter((message) => !message.read),
    [messages],
  );

  const saveProjectMutation = useSaveProjectMutation(
    () => showToast(editingProjectId ? "Project updated successfully!" : "Project created successfully!"),
    (err) => showToast(err.message || "Failed to save project.", "error")
  );

  const deleteProjectMutation = useDeleteProjectMutation(
    () => showToast("Project deleted successfully."),
    (err) => showToast(err.message, "error")
  );

  const saveSimpleMutation = useSaveSimpleMutation(
    tab,
    () => showToast(`${tab.charAt(0).toUpperCase() + tab.slice(1)} saved.`),
    (err) => showToast(err.message || `Failed to save ${tab}.`, "error")
  );

  const deleteSimpleMutation = useDeleteSimpleMutation(
    tab,
    () => showToast("Item deleted successfully."),
    (err) => showToast(err.message, "error")
  );

  const saveProfileMutation = useSaveProfileMutation(
    () => showToast("Profile settings saved successfully!"),
    (err) => showToast(err.message || "Failed to save profile settings.", "error")
  );

  const markMessageReadMutation = useMarkMessageReadMutation(
    () => showToast("Message marked as read."),
    (err) => showToast(err.message, "error")
  );

  const resetToDefaultsMutation = useResetToDefaultsMutation(
    () => showToast("Default template data imported successfully.", "success"),
    (err) => showToast(err.message || "Template import failed.", "error")
  );

  const uploadImage = async (file) => {
    const path = `projects/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("portfolio").upload(path, file);
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

  const handleSaveProject = async (e) => {
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

      await saveProjectMutation.mutateAsync({ id: editingProjectId, payload });
      resetProjectForm();
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const handleDeleteProject = async (id) => {
    const ok = window.confirm("Delete this project?");
    if (!ok) return;
    deleteProjectMutation.mutate(id);
  };

  const handleSaveSimple = async (table, id, payload, reset) => {
    await saveSimpleMutation.mutateAsync({ id, payload });
    reset();
  };

  const handleDeleteSimple = async (table, id) => {
    const ok = window.confirm(`Delete this item from ${table}?`);
    if (!ok) return;
    deleteSimpleMutation.mutate(id);
  };

  const handleImportLegacyContent = async () => {
    const ok = window.confirm(
      "This will clear current CMS content and reset to default data. Continue?",
    );
    if (!ok) return;
    resetToDefaultsMutation.mutate();
  };

  const handleMarkMessageRead = async (id) => {
    markMessageReadMutation.mutate(id);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

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
            <button
              onClick={handleImportLegacyContent}
              className="px-5 py-2.5 rounded-xl bg-card border border-border/60 hover:border-primary/40 hover:bg-primary/5 text-sm font-semibold transition-all duration-200 flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-primary" />
              Reset to Defaults
            </button>
          </header>

          {/* Dynamic Tab Views */}
          <div className="space-y-8">
            
            {tab === "analytics" && (
              <AnalyticsTab
                analyticsRangeDays={analyticsRangeDays}
                setAnalyticsRangeDays={setAnalyticsRangeDays}
                loadAnalytics={() => {}} // Controlled by react-query
                analyticsError={analyticsError ? analyticsError.message : ""}
                totalViews={analytics.totalViews || 0}
                uniqueVisitors={analytics.uniqueVisitors || 0}
                liveVisitors={liveVisitors}
                analyticsLoading={analyticsLoading}
                dailyViews={analytics.dailyViews || []}
                topPages={analytics.topPages || []}
                analyticsLastUpdated={null} // Managed by react-query internally
              />
            )}

            {tab === "hero" && (
              <HeroTab
                profile={profile}
                saveProfile={(formPayload) => saveProfileMutation.mutate({ id: profile.id, payload: formPayload })}
                showToast={showToast}
                uiInput={uiInput}
                uiTextarea={uiTextarea}
                uiPrimaryBtn={uiPrimaryBtn}
              />
            )}

            {tab === "about" && (
              <AboutTab
                profile={profile}
                saveProfile={(formPayload) => saveProfileMutation.mutate({ id: profile.id, payload: formPayload })}
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
                saveSimple={(table, id, payload, reset) => handleSaveSimple(table, id, payload, reset)}
                deleteSimple={handleDeleteSimple}
                loadServices={() => {}}
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
                saveProject={handleSaveProject}
                deleteProject={handleDeleteProject}
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
                saveSimple={(table, id, payload, reset) => handleSaveSimple(table, id, payload, reset)}
                deleteSimple={handleDeleteSimple}
                loadTimeline={() => {}}
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
                saveSimple={(table, id, payload, reset) => handleSaveSimple(table, id, payload, reset)}
                deleteSimple={handleDeleteSimple}
                loadSkills={() => {}}
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
                saveSimple={(table, id, payload, reset) => handleSaveSimple(table, id, payload, reset)}
                deleteSimple={handleDeleteSimple}
                loadTestimonials={() => {}}
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
                markMessageRead={handleMarkMessageRead}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
