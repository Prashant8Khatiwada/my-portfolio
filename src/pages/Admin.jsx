import { useState, useMemo, useEffect } from "react";
import { RotateCcw } from "lucide-react";
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
import CVTab from "../components/admin/CVTab";

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

const TAB_LABELS = {
  analytics: "Analytics",
  hero: "Hero Section",
  about: "About",
  services: "Services",
  projects: "Projects",
  timeline: "Timeline",
  skills: "Skills",
  testimonials: "Testimonials",
  messages: "Messages",
  cv: "CV Generator",
};

export default function Admin() {
  const location = useLocation();
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("info");

  const [analyticsRangeDays, setAnalyticsRangeDays] = useState(30);

  const [projectForm, setProjectForm] = useState({ title: "", description: "", tags: "", live_url: "", github_url: "", featured: false, display_order: 0, active: true });
  const [projectImageFile, setProjectImageFile] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);

  const [testimonialForm, setTestimonialForm] = useState({ name: "", role: "", company: "", content: "", rating: 5, display_order: 0, active: true });
  const [editingTestimonialId, setEditingTestimonialId] = useState(null);

  const [timelineForm, setTimelineForm] = useState({ year: "", title: "", company: "", description: "", type: "work", display_order: 0 });
  const [editingTimelineId, setEditingTimelineId] = useState(null);

  const [skillForm, setSkillForm] = useState({ name: "", category: "", proficiency: 80, description: "", display_order: 0 });
  const [editingSkillId, setEditingSkillId] = useState(null);

  const [serviceForm, setServiceForm] = useState({ title: "", description: "", icon: "Code", display_order: 0 });
  const [editingServiceId, setEditingServiceId] = useState(null);

  const showToast = (message, type = "success") => {
    setStatusMessage(message);
    setStatusType(type);
    setTimeout(() => setStatusMessage(""), 4000);
  };

  // Route → tab resolution
  const pathToTabMap = Object.fromEntries(Object.keys(TAB_LABELS).map((k) => [k, k]));
  const pathSegment = location.pathname.split("/")[2] || "";
  const tab = pathToTabMap[pathSegment] || "analytics";

  // React Query hooks
  const { data: projects = [], isLoading: projectLoading } = useProjectsQuery();
  const { data: testimonials = [] } = useTestimonialsQuery();
  const { data: timeline = [] } = useTimelineQuery();
  const { data: skills = [] } = useSkillsQuery();
  const { data: services = [] } = useServicesQuery();
  const { data: profile } = useProfileQuery();
  const { data: messages = [], isLoading: messageLoading } = useMessagesQuery();
  const { data: liveVisitors = 0 } = useLiveVisitorsQuery();
  const { data: analytics = {}, isLoading: analyticsLoading, error: analyticsError } = useAnalyticsQuery(analyticsRangeDays);

  const unreadMessages = useMemo(() => messages.filter((m) => !m.read), [messages]);

  // Mutations
  const saveProjectMutation = useSaveProjectMutation(
    () => showToast(editingProjectId ? "Project updated!" : "Project created!"),
    (err) => showToast(err.message || "Failed to save project.", "error")
  );
  const deleteProjectMutation = useDeleteProjectMutation(
    () => showToast("Project deleted."),
    (err) => showToast(err.message, "error")
  );
  const saveSimpleMutation = useSaveSimpleMutation(
    tab,
    () => showToast(`${TAB_LABELS[tab] || tab} saved.`),
    (err) => showToast(err.message || "Failed to save.", "error")
  );
  const deleteSimpleMutation = useDeleteSimpleMutation(
    tab,
    () => showToast("Item deleted."),
    (err) => showToast(err.message, "error")
  );
  const saveProfileMutation = useSaveProfileMutation(
    () => showToast("Profile saved!"),
    (err) => showToast(err.message || "Failed to save profile.", "error")
  );
  const markMessageReadMutation = useMarkMessageReadMutation(
    () => showToast("Marked as read."),
    (err) => showToast(err.message, "error")
  );
  const resetToDefaultsMutation = useResetToDefaultsMutation(
    () => showToast("Reset to defaults successful.", "success"),
    (err) => showToast(err.message || "Reset failed.", "error")
  );

  const uploadImage = async (file) => {
    const path = `projects/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("portfolio").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
    return data.publicUrl;
  };

  const resetProjectForm = () => {
    setProjectForm({ title: "", description: "", tags: "", live_url: "", github_url: "", featured: false, display_order: 0, active: true });
    setProjectImageFile(null);
    setEditingProjectId(null);
  };

  const handleSaveProject = async (e, directPayload = null) => {
    e?.preventDefault();
    try {
      let payload;
      if (directPayload) {
        payload = directPayload;
      } else {
        const tagsArray = typeof projectForm.tags === "string"
          ? projectForm.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : projectForm.tags;
        payload = { title: projectForm.title, description: projectForm.description, tags: tagsArray, live_url: projectForm.live_url || null, github_url: projectForm.github_url || null, featured: Boolean(projectForm.featured), display_order: Number(projectForm.display_order) || 0, active: projectForm.active !== undefined ? Boolean(projectForm.active) : true };
      }
      if (projectImageFile) payload.image_url = await uploadImage(projectImageFile);
      await saveProjectMutation.mutateAsync({ id: editingProjectId, payload });
      resetProjectForm();
    } catch (err) { showToast(err.message, "error"); }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    deleteProjectMutation.mutate(id);
  };

  const handleSaveSimple = async (table, id, payload, reset) => {
    await saveSimpleMutation.mutateAsync({ id, payload });
    reset();
  };

  const handleDeleteSimple = async (table, id) => {
    if (!window.confirm(`Delete this item?`)) return;
    deleteSimpleMutation.mutate(id);
  };

  const handleImportLegacyContent = async () => {
    if (!window.confirm("Reset all CMS content to defaults?")) return;
    resetToDefaultsMutation.mutate();
  };

  const handleMarkMessageRead = (id) => markMessageReadMutation.mutate(id);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  useEffect(() => {
    if (location.pathname === "/admin" || location.pathname === "/admin/") {
      navigate("/admin/analytics", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">

      {/* Toast */}
      {statusMessage && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl animate-fade-in text-sm font-medium ${
          statusType === "success"
            ? "border-emerald-500/25 bg-emerald-950/90 text-emerald-300"
            : statusType === "error"
            ? "border-red-500/25 bg-red-950/90 text-red-300"
            : "border-blue-500/25 bg-blue-950/90 text-blue-300"
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusType === "success" ? "bg-emerald-400" : statusType === "error" ? "bg-red-400" : "bg-blue-400"}`} />
          {statusMessage}
        </div>
      )}

      <div className="w-full grid grid-cols-1 lg:grid-cols-[240px,1fr] min-h-screen">
        {/* Sidebar */}
        <Sidebar tab={tab} navigate={navigate} unreadCount={unreadMessages.length} logout={logout} />

        {/* Main */}
        <main className="min-w-0 bg-background/50 flex flex-col">
          {/* Top bar */}
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 border-b border-border bg-card/85 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-muted-foreground/60">Module</p>
                <h2 className="text-sm font-bold text-foreground capitalize leading-tight">{TAB_LABELS[tab] || tab}</h2>
              </div>
            </div>
            <button
              onClick={handleImportLegacyContent}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground border border-border bg-muted/60 hover:bg-muted transition-all duration-200"
            >
              <RotateCcw className="w-3 h-3" />
              Reset to Defaults
            </button>
          </div>

          {/* Tab content */}
          <div className="flex-1 p-6 md:p-8">
            {tab === "analytics" && (
              <AnalyticsTab
                analyticsRangeDays={analyticsRangeDays}
                setAnalyticsRangeDays={setAnalyticsRangeDays}
                loadAnalytics={() => {}}
                analyticsError={analyticsError ? analyticsError.message : ""}
                totalViews={analytics.totalViews || 0}
                uniqueVisitors={analytics.uniqueVisitors || 0}
                liveVisitors={liveVisitors}
                analyticsLoading={analyticsLoading}
                dailyViews={analytics.dailyViews || []}
                topPages={analytics.topPages || []}
                analyticsLastUpdated={null}
              />
            )}

            {tab === "hero" && (
              <HeroTab
                profile={profile}
                saveProfile={(payload) => saveProfileMutation.mutate({ id: profile?.id, payload })}
                showToast={showToast}
              />
            )}

            {tab === "about" && (
              <AboutTab
                profile={profile}
                saveProfile={(payload) => saveProfileMutation.mutate({ id: profile?.id, payload })}
                showToast={showToast}
                projectsCount={projects.length}
              />
            )}

            {tab === "services" && (
              <ServicesTab
                services={services}
                serviceForm={serviceForm}
                setServiceForm={setServiceForm}
                editingServiceId={editingServiceId}
                setEditingServiceId={setEditingServiceId}
                saveSimple={handleSaveSimple}
                deleteSimple={handleDeleteSimple}
                loadServices={() => {}}
                showToast={showToast}
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
              />
            )}

            {tab === "timeline" && (
              <TimelineTab
                timeline={timeline}
                timelineForm={timelineForm}
                setTimelineForm={setTimelineForm}
                editingTimelineId={editingTimelineId}
                setEditingTimelineId={setEditingTimelineId}
                saveSimple={handleSaveSimple}
                deleteSimple={handleDeleteSimple}
                loadTimeline={() => {}}
                showToast={showToast}
              />
            )}

            {tab === "skills" && (
              <SkillsTab
                skills={skills}
                skillForm={skillForm}
                setSkillForm={setSkillForm}
                editingSkillId={editingSkillId}
                setEditingSkillId={setEditingSkillId}
                saveSimple={handleSaveSimple}
                deleteSimple={handleDeleteSimple}
                loadSkills={() => {}}
                showToast={showToast}
              />
            )}

            {tab === "testimonials" && (
              <TestimonialsTab
                testimonials={testimonials}
                testimonialForm={testimonialForm}
                setTestimonialForm={setTestimonialForm}
                editingTestimonialId={editingTestimonialId}
                setEditingTestimonialId={setEditingTestimonialId}
                saveSimple={handleSaveSimple}
                deleteSimple={handleDeleteSimple}
                loadTestimonials={() => {}}
                showToast={showToast}
              />
            )}

            {tab === "messages" && (
              <MessagesTab
                messages={messages}
                messageLoading={messageLoading}
                markMessageRead={handleMarkMessageRead}
              />
            )}

            {tab === "cv" && (
              <CVTab
                profile={profile}
                skills={skills}
                timeline={timeline}
                projects={projects}
                services={services}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
