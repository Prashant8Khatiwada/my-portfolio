import React from "react";
import {
  BarChart3,
  Briefcase,
  Inbox,
  FolderKanban,
  MessageSquare,
  Sparkles,
  Wrench,
  Layers,
  User,
} from "lucide-react";

export default function Sidebar({ tab, navigate, unreadCount, logout }) {
  const sidebarItems = [
    {
      key: "analytics",
      label: "Analytics",
      icon: BarChart3,
      subtitle: "Traffic & metrics",
      route: "analytics",
    },
    {
      key: "hero",
      label: "Hero Section",
      icon: Sparkles,
      subtitle: "Dynamic landing intro",
      route: "hero",
    },
    {
      key: "about",
      label: "About Us",
      icon: User,
      subtitle: "Profile biography & stats",
      route: "about",
    },
    {
      key: "services",
      label: "Services",
      icon: Wrench,
      subtitle: "Service offerings",
      route: "services",
    },
    {
      key: "projects",
      label: "Projects",
      icon: FolderKanban,
      subtitle: "Case studies & work",
      route: "projects",
    },
    {
      key: "timeline",
      label: "Timeline",
      icon: Briefcase,
      subtitle: "Professional history",
      route: "timeline",
    },
    {
      key: "skills",
      label: "Skills",
      icon: Layers,
      subtitle: "Core technologies",
      route: "skills",
    },
    {
      key: "testimonials",
      label: "Testimonials",
      icon: MessageSquare,
      subtitle: "Client feedback",
      route: "testimonials",
    },
    {
      key: "messages",
      label: `Messages (${unreadCount})`,
      icon: Inbox,
      subtitle: "Inquiries inbox",
      route: "messages",
    },
  ];

  return (
    <aside className="lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto border-r border-border/40 bg-card/40 backdrop-blur-md p-6 flex flex-col justify-between">
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Admin Center</h1>
            <p className="text-xs text-muted-foreground">Portfolio CMS v2.0</p>
          </div>
        </div>

        <nav className="space-y-1.5">
          {sidebarItems.map(({ key, label, icon: Icon, subtitle, route }) => (
            <button
              key={key}
              onClick={() => navigate(`/admin/${route}`)}
              className={`w-full group flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 ${
                tab === key
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10"
                  : "hover:bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 ${
                  tab === key ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                }`}
              />
              <div className="text-left">
                <p className="text-sm font-semibold tracking-tight">{label}</p>
                <p
                  className={`text-[10px] ${
                    tab === key ? "text-primary-foreground/75" : "text-muted-foreground/60"
                  }`}
                >
                  {subtitle}
                </p>
              </div>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-8 pt-6 border-t border-border/30 space-y-4">
        <div className="bg-card/60 border border-border/40 rounded-xl p-3.5 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
              Unread Messages
            </p>
            <p className="text-2xl font-black mt-0.5">{unreadCount}</p>
          </div>
          <Inbox className="w-7 h-7 text-primary/45" />
        </div>
        <button
          onClick={logout}
          className="w-full py-2.5 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/5 font-semibold text-sm transition-all duration-200"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
