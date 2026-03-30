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
import {
  BarChart3,
  Briefcase,
  Inbox,
  Layers,
  FolderKanban,
  MessageSquare,
  RefreshCw,
  Sparkles,
  Wrench,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
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
      description:
        "Built Fotosfolio platform with Next.js and TypeScript. Implemented galleries with lazy loading and Cloudinary integration, achieving 45% faster load times. Developed vehicle service booking system with real-time calendar and dashboard.",
      type: "work",
      display_order: 0,
    },
    {
      year: "Jan 2024 - Dec 2024",
      title: "Junior Developer",
      company: "Peace Nepal",
      description:
        "Developed KYC forms for ADBL and Pacific Regional Bank using React, Formik, and Context API. Led CIVI app development with location mapping (Leaflet) and Firebase storage. Implemented secure API integrations with Yup and Zod validation.",
      type: "work",
      display_order: 1,
    },
    {
      year: "Mar 2023 - Nov 2023",
      title: "Junior Developer",
      company: "Lancemeup",
      description:
        "Worked on WealthPandit and multiple client projects. Built advanced calendar component with CSS Grid, date-fns, and Google Calendar sync. Optimized frontend performance with incremental updates.",
      type: "work",
      display_order: 2,
    },
    {
      year: "Dec 2022 - Mar 2023",
      title: "Frontend Intern",
      company: "Lancemeup",
      description:
        "Built responsive WealthPandit website using React Query for optimized data fetching. Contributed to TickTicketing platform with performance fixes and feature enhancements.",
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
    projects: "projects",
    testimonials: "testimonials",
    timeline: "timeline",
    skills: "skills",
    services: "services",
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
      const deletes = await Promise.all([
        supabase.from("projects").delete().not("id", "is", null),
        supabase.from("testimonials").delete().not("id", "is", null),
        supabase.from("timeline").delete().not("id", "is", null),
        supabase.from("skills").delete().not("id", "is", null),
        supabase.from("services").delete().not("id", "is", null),
      ]);

      const deleteErrors = deletes
        .map((result, index) => ({
          table: ["projects", "testimonials", "timeline", "skills", "services"][
            index
          ],
          error: result.error,
        }))
        .filter((item) => item.error);

      if (deleteErrors.length > 0) {
        throw new Error(
          `Delete failed for ${deleteErrors[0].table}: ${deleteErrors[0].error.message}`,
        );
      }

      const inserts = await Promise.all([
        supabase.from("projects").insert(LEGACY_DATA.projects),
        supabase.from("testimonials").insert(LEGACY_DATA.testimonials),
        supabase.from("timeline").insert(LEGACY_DATA.timeline),
        supabase.from("skills").insert(LEGACY_DATA.skills),
        supabase.from("services").insert(LEGACY_DATA.services),
      ]);

      const insertErrors = inserts
        .map((result, index) => ({
          table: ["projects", "testimonials", "timeline", "skills", "services"][
            index
          ],
          error: result.error,
        }))
        .filter((item) => item.error);

      if (insertErrors.length > 0) {
        throw new Error(
          `Insert failed for ${insertErrors[0].table}: ${insertErrors[0].error.message}`,
        );
      }

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

  useEffect(() => {
    if (tab !== "analytics") return;
    const interval = setInterval(() => {
      loadAnalytics();
    }, 60000);
    return () => clearInterval(interval);
  }, [tab, loadAnalytics]);

  useEffect(() => {
    if (location.pathname === "/admin" || location.pathname === "/admin/") {
      navigate("/admin/analytics", { replace: true });
    }
  }, [location.pathname, navigate]);

  const tabItems = [
    {
      key: "analytics",
      label: "Analytics",
      icon: BarChart3,
      subtitle: "Traffic and usage",
    },
    {
      key: "projects",
      label: `Projects (${projects.length})`,
      icon: FolderKanban,
      subtitle: "Portfolio case studies",
    },
    {
      key: "testimonials",
      label: `Testimonials (${testimonials.length})`,
      icon: MessageSquare,
      subtitle: "Client feedback",
    },
    {
      key: "timeline",
      label: `Timeline (${timeline.length})`,
      icon: Briefcase,
      subtitle: "Experience entries",
    },
    {
      key: "skills",
      label: `Skills (${skills.length})`,
      icon: Sparkles,
      subtitle: "Technical skills",
    },
    {
      key: "services",
      label: `Services (${services.length})`,
      icon: Wrench,
      subtitle: "Offerings",
    },
    {
      key: "messages",
      label: `Messages (${unreadMessages.length} unread)`,
      icon: Inbox,
      subtitle: "Contact inbox",
    },
  ];

  const activeTabMeta = tabItems.find((item) => item.key === tab);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_40%),radial-gradient(circle_at_85%_20%,_rgba(139,92,246,0.12),_transparent_35%)] bg-background text-foreground">
      <div className="w-full grid grid-cols-1 lg:grid-cols-[300px,minmax(0,1fr)] lg:min-h-screen lg:gap-0">
        <aside className="lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:rounded-none rounded-2xl border border-border/70 lg:border-l-0 lg:border-t-0 lg:border-b-0 lg:border-r bg-card/80 backdrop-blur-xl p-4 space-y-4 m-4 lg:m-0">
          <div className="rounded-xl border border-border/60 bg-background/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Admin Workspace
            </p>
            <h1 className="text-2xl font-bold mt-2">Control Center</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Clean, modular management for your complete portfolio.
            </p>
          </div>

          <nav className="space-y-2">
            {tabItems.map(({ key, label, icon: Icon, subtitle }) => (
              <button
                key={key}
                onClick={() => navigate(`/admin/${tabRouteMap[key]}`)}
                className={`w-full text-left rounded-xl border px-3 py-2.5 transition-all ${
                  tab === key
                    ? "border-primary/40 bg-primary/15 shadow-[0_0_0_1px_rgba(139,92,246,0.15)]"
                    : "border-border/60 bg-background/40 hover:bg-card"
                }`}
              >
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  <Icon className="w-4 h-4" />
                  {label}
                </span>
                <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
              </button>
            ))}
          </nav>

          <div className="rounded-xl border border-border/60 bg-background/50 p-3">
            <p className="text-xs text-muted-foreground">Unread Inbox</p>
            <p className="text-2xl font-bold">{unreadMessages.length}</p>
          </div>
        </aside>

        <main className="space-y-6 p-4 md:p-6 lg:p-8">
          <header className="rounded-2xl border border-border/70 bg-card/85 backdrop-blur-xl p-5 md:p-6 flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Active Module
              </p>
              <h2 className="text-2xl md:text-3xl font-bold truncate mt-1">
                {activeTabMeta?.label || "Dashboard"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {activeTabMeta?.subtitle ||
                  "Manage content, monitor analytics, and track inquiries."}
              </p>
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

          <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Projects", value: projects.length },
              { label: "Skills", value: skills.length },
              { label: "Timeline", value: timeline.length },
              { label: "Unread", value: unreadMessages.length },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border/60 bg-card/60 p-3"
              >
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-2xl font-bold mt-1">{item.value}</p>
              </div>
            ))}
          </section>

          {statusMessage && (
            <div className="rounded-xl border border-border/70 bg-card/70 px-4 py-3 text-sm">
              {statusMessage}
            </div>
          )}

          <section className="rounded-2xl border border-border/70 bg-card/85 backdrop-blur-xl p-4 md:p-5">
            {tab === "projects" && (
              <section className="space-y-6">
                <form
                  onSubmit={saveProject}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-background/40 border border-border/60 rounded-2xl p-5"
                >
                  <input
                    className={uiInput}
                    placeholder="Project title"
                    value={projectForm.title}
                    onChange={(e) =>
                      setProjectForm((p) => ({ ...p, title: e.target.value }))
                    }
                    required
                  />
                  <input
                    className={uiInput}
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
                    className={`md:col-span-2 ${uiInput}`}
                    placeholder="Live URL"
                    value={projectForm.live_url}
                    onChange={(e) =>
                      setProjectForm((p) => ({
                        ...p,
                        live_url: e.target.value,
                      }))
                    }
                  />
                  <input
                    className={`md:col-span-2 ${uiInput}`}
                    placeholder="GitHub URL"
                    value={projectForm.github_url}
                    onChange={(e) =>
                      setProjectForm((p) => ({
                        ...p,
                        github_url: e.target.value,
                      }))
                    }
                  />
                  <input
                    className={`md:col-span-2 ${uiInput}`}
                    placeholder="Tags (comma separated)"
                    value={projectForm.tags}
                    onChange={(e) =>
                      setProjectForm((p) => ({ ...p, tags: e.target.value }))
                    }
                  />
                  <textarea
                    className={`md:col-span-2 ${uiInput}`}
                    placeholder="Description"
                    rows={4}
                    value={projectForm.description}
                    onChange={(e) =>
                      setProjectForm((p) => ({
                        ...p,
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
                        setProjectForm((p) => ({
                          ...p,
                          featured: e.target.checked,
                        }))
                      }
                    />
                    Featured
                  </label>
                  <div className="md:col-span-2 flex gap-2">
                    <button type="submit" className={uiPrimaryBtn}>
                      {editingProjectId ? "Update Project" : "Add Project"}
                    </button>
                    {editingProjectId && (
                      <button
                        type="button"
                        onClick={resetProjectForm}
                        className={uiSecondaryBtn}
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>

                <div className="overflow-x-auto bg-background/40 border border-border/60 rounded-2xl">
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
                                className={uiSmallBtn}
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
                                className={uiSmallDangerBtn}
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
              <section className="space-y-4 bg-background/40 border border-border/60 rounded-2xl p-5">
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
                          display_order:
                            Number(testimonialForm.display_order) || 0,
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
                    className={uiInput}
                    placeholder="Name"
                    value={testimonialForm.name}
                    onChange={(e) =>
                      setTestimonialForm((p) => ({
                        ...p,
                        name: e.target.value,
                      }))
                    }
                    required
                  />
                  <input
                    className={uiInput}
                    placeholder="Role"
                    value={testimonialForm.role}
                    onChange={(e) =>
                      setTestimonialForm((p) => ({
                        ...p,
                        role: e.target.value,
                      }))
                    }
                  />
                  <input
                    className={uiInput}
                    placeholder="Company"
                    value={testimonialForm.company}
                    onChange={(e) =>
                      setTestimonialForm((p) => ({
                        ...p,
                        company: e.target.value,
                      }))
                    }
                  />
                  <input
                    className={uiInput}
                    type="number"
                    placeholder="Rating"
                    value={testimonialForm.rating}
                    onChange={(e) =>
                      setTestimonialForm((p) => ({
                        ...p,
                        rating: e.target.value,
                      }))
                    }
                  />
                  <textarea
                    className={`md:col-span-2 ${uiInput}`}
                    placeholder="Content"
                    rows={3}
                    value={testimonialForm.content}
                    onChange={(e) =>
                      setTestimonialForm((p) => ({
                        ...p,
                        content: e.target.value,
                      }))
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
                  <button className={uiPrimaryBtn} type="submit">
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
                          className={uiSmallBtn}
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
                          className={uiSmallDangerBtn}
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
              <section className="space-y-4 bg-background/40 border border-border/60 rounded-2xl p-5">
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
                          display_order:
                            Number(timelineForm.display_order) || 0,
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
                    className={uiInput}
                    placeholder="Year"
                    value={timelineForm.year}
                    onChange={(e) =>
                      setTimelineForm((p) => ({ ...p, year: e.target.value }))
                    }
                  />
                  <input
                    className={uiInput}
                    placeholder="Title"
                    value={timelineForm.title}
                    onChange={(e) =>
                      setTimelineForm((p) => ({ ...p, title: e.target.value }))
                    }
                    required
                  />
                  <input
                    className={uiInput}
                    placeholder="Company"
                    value={timelineForm.company}
                    onChange={(e) =>
                      setTimelineForm((p) => ({
                        ...p,
                        company: e.target.value,
                      }))
                    }
                  />
                  <select
                    className={uiInput}
                    value={timelineForm.type}
                    onChange={(e) =>
                      setTimelineForm((p) => ({ ...p, type: e.target.value }))
                    }
                  >
                    <option value="work">work</option>
                    <option value="education">education</option>
                  </select>
                  <textarea
                    className={`md:col-span-2 ${uiInput}`}
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
                  <button className={uiPrimaryBtn} type="submit">
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
                        className={uiSmallBtn}
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
                        className={uiSmallDangerBtn}
                        onClick={async () => {
                          try {
                            await deleteSimple(
                              "timeline",
                              item.id,
                              loadTimeline,
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
              </section>
            )}

            {tab === "skills" && (
              <section className="space-y-4 bg-background/40 border border-border/60 rounded-2xl p-5">
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
                      setStatusMessage(
                        error.message || "Failed to save skill.",
                      );
                    }
                  }}
                >
                  <input
                    className={uiInput}
                    placeholder="Name"
                    value={skillForm.name}
                    onChange={(e) =>
                      setSkillForm((p) => ({ ...p, name: e.target.value }))
                    }
                    required
                  />
                  <input
                    className={uiInput}
                    placeholder="Category"
                    value={skillForm.category}
                    onChange={(e) =>
                      setSkillForm((p) => ({ ...p, category: e.target.value }))
                    }
                  />
                  <input
                    className={uiInput}
                    type="number"
                    placeholder="Proficiency"
                    value={skillForm.proficiency}
                    onChange={(e) =>
                      setSkillForm((p) => ({
                        ...p,
                        proficiency: e.target.value,
                      }))
                    }
                  />
                  <input
                    className={uiInput}
                    type="number"
                    placeholder="Display order"
                    value={skillForm.display_order}
                    onChange={(e) =>
                      setSkillForm((p) => ({
                        ...p,
                        display_order: e.target.value,
                      }))
                    }
                  />
                  <textarea
                    className={`md:col-span-2 ${uiInput}`}
                    placeholder="Description"
                    rows={3}
                    value={skillForm.description}
                    onChange={(e) =>
                      setSkillForm((p) => ({
                        ...p,
                        description: e.target.value,
                      }))
                    }
                  />
                  <button className={uiPrimaryBtn} type="submit">
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
                        className={uiSmallBtn}
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
                        className={uiSmallDangerBtn}
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
              <section className="space-y-4 bg-background/40 border border-border/60 rounded-2xl p-5">
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
                      setStatusMessage(
                        error.message || "Failed to save service.",
                      );
                    }
                  }}
                >
                  <input
                    className={uiInput}
                    placeholder="Title"
                    value={serviceForm.title}
                    onChange={(e) =>
                      setServiceForm((p) => ({ ...p, title: e.target.value }))
                    }
                    required
                  />
                  <input
                    className={uiInput}
                    placeholder="Icon (Code, Palette, Zap...)"
                    value={serviceForm.icon}
                    onChange={(e) =>
                      setServiceForm((p) => ({ ...p, icon: e.target.value }))
                    }
                  />
                  <textarea
                    className={`md:col-span-2 ${uiInput}`}
                    placeholder="Description"
                    rows={3}
                    value={serviceForm.description}
                    onChange={(e) =>
                      setServiceForm((p) => ({
                        ...p,
                        description: e.target.value,
                      }))
                    }
                  />
                  <button className={uiPrimaryBtn} type="submit">
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
                      <p className="text-sm text-muted-foreground">
                        {item.icon}
                      </p>
                    </div>
                    <div className="space-x-2">
                      <button
                        className={uiSmallBtn}
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
                        className={uiSmallDangerBtn}
                        onClick={async () => {
                          try {
                            await deleteSimple(
                              "services",
                              item.id,
                              loadServices,
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
              </section>
            )}

            {tab === "analytics" && (
              <section className="space-y-6">
                <div className="bg-background/40 border border-border/60 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Analytics Overview
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Traffic data from page views and visitor sessions.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={analyticsRangeDays}
                      onChange={(e) =>
                        setAnalyticsRangeDays(Number(e.target.value))
                      }
                      className={uiSelect}
                    >
                      <option value={7}>Last 7 days</option>
                      <option value={30}>Last 30 days</option>
                      <option value={90}>Last 90 days</option>
                    </select>
                    <button
                      type="button"
                      onClick={loadAnalytics}
                      className="px-3 py-2 rounded-lg border border-border bg-background hover:bg-card inline-flex items-center gap-2 text-sm"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Refresh
                    </button>
                  </div>
                </div>

                {analyticsError && (
                  <div className="rounded-lg border border-red-400/60 bg-red-500/10 p-3 text-sm text-red-200">
                    {analyticsError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-background/40 border border-border/60 rounded-2xl p-4">
                    <p className="text-muted-foreground text-sm">Total Views</p>
                    <p className="text-3xl font-bold">{totalViews}</p>
                  </div>
                  <div className="bg-background/40 border border-border/60 rounded-2xl p-4">
                    <p className="text-muted-foreground text-sm">
                      Unique Visitors
                    </p>
                    <p className="text-3xl font-bold">{uniqueVisitors}</p>
                  </div>
                  <div className="bg-background/40 border border-border/60 rounded-2xl p-4">
                    <p className="text-muted-foreground text-sm">
                      Live Visitors (5m)
                    </p>
                    <p className="text-3xl font-bold">{liveVisitors}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {analyticsLastUpdated
                    ? `Last updated: ${new Date(analyticsLastUpdated).toLocaleString()}`
                    : "Last updated: -"}
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-background/40 border border-border/60 rounded-2xl p-4 h-80">
                    <h3 className="font-semibold mb-3">Views Trend</h3>
                    {analyticsLoading ? (
                      <p className="text-muted-foreground">Loading chart...</p>
                    ) : dailyViews.length === 0 ? (
                      <p className="text-muted-foreground">
                        No page view data in selected range.
                      </p>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dailyViews}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(148,163,184,0.2)"
                          />
                          <XAxis dataKey="label" />
                          <YAxis allowDecimals={false} />
                          <Tooltip
                            contentStyle={{
                              background: "#0f172a",
                              border: "1px solid rgba(148,163,184,0.3)",
                              borderRadius: "8px",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="views"
                            stroke="#8b7bff"
                            strokeWidth={3}
                            dot={{ r: 3, fill: "#8b7bff" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                  <div className="bg-background/40 border border-border/60 rounded-2xl p-4 h-80">
                    <h3 className="font-semibold mb-3">Top Pages</h3>
                    {analyticsLoading ? (
                      <p className="text-muted-foreground">Loading chart...</p>
                    ) : topPages.length === 0 ? (
                      <p className="text-muted-foreground">
                        No top pages data in selected range.
                      </p>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={topPages}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(148,163,184,0.2)"
                          />
                          <XAxis
                            dataKey="path"
                            tickFormatter={(value) =>
                              value.length > 18
                                ? `${value.slice(0, 18)}...`
                                : value
                            }
                          />
                          <YAxis allowDecimals={false} />
                          <Tooltip
                            contentStyle={{
                              background: "#0f172a",
                              border: "1px solid rgba(148,163,184,0.3)",
                              borderRadius: "8px",
                            }}
                          />
                          <Bar
                            dataKey="views"
                            fill="#38bdf8"
                            radius={[6, 6, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>
              </section>
            )}

            {tab === "messages" && (
              <section className="bg-background/40 border border-border/60 rounded-2xl p-4">
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
                                className={uiSmallBtn}
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
          </section>
        </main>
      </div>
    </div>
  );
}
