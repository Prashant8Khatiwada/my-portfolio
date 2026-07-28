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
  LogOut,
  Shield,
} from "lucide-react";

export default function Sidebar({ tab, navigate, unreadCount, logout }) {
  const sidebarItems = [
    { key: "analytics", label: "Analytics", icon: BarChart3, subtitle: "Traffic & metrics", route: "analytics", color: "text-violet-400" },
    { key: "hero", label: "Hero Section", icon: Sparkles, subtitle: "Landing intro", route: "hero", color: "text-indigo-400" },
    { key: "about", label: "About", icon: User, subtitle: "Profile & stats", route: "about", color: "text-sky-400" },
    { key: "services", label: "Services", icon: Wrench, subtitle: "Offerings", route: "services", color: "text-amber-400" },
    { key: "projects", label: "Projects", icon: FolderKanban, subtitle: "Case studies", route: "projects", color: "text-emerald-400" },
    { key: "timeline", label: "Timeline", icon: Briefcase, subtitle: "Work history", route: "timeline", color: "text-orange-400" },
    { key: "skills", label: "Skills", icon: Layers, subtitle: "Technologies", route: "skills", color: "text-cyan-400" },
    { key: "testimonials", label: "Testimonials", icon: MessageSquare, subtitle: "Client feedback", route: "testimonials", color: "text-pink-400" },
    { key: "messages", label: "Messages", icon: Inbox, subtitle: `${unreadCount} unread`, route: "messages", color: "text-rose-400", badge: unreadCount },
  ];

  return (
    <aside className="lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto flex flex-col border-r border-border bg-card">
      {/* Logo / Brand */}
      <div className="px-5 py-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25 flex-shrink-0">
            <Shield className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-foreground tracking-tight">Admin Panel</h1>
            <p className="text-[10px] text-muted-foreground/60 tracking-widest uppercase font-medium">CMS v2.0</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="px-3 pb-2 text-[9px] uppercase tracking-[0.15em] font-semibold text-muted-foreground/50">Navigation</p>
        {sidebarItems.map(({ key, label, icon: Icon, subtitle, route, color, badge }) => {
          const isActive = tab === key;
          return (
            <button
              key={key}
              onClick={() => navigate(`/admin/${route}`)}
              className={`w-full group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${
                isActive
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r-full" />
              )}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                isActive ? "bg-primary/10" : "bg-transparent group-hover:bg-muted"
              }`}>
                <Icon className={`w-4 h-4 ${isActive ? "text-primary" : `${color} opacity-85 group-hover:opacity-100`}`} />
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className={`text-sm font-medium leading-tight truncate ${isActive ? "text-foreground" : ""}`}>{label}</p>
                <p className={`text-[10px] leading-tight truncate mt-0.5 ${isActive ? "text-muted-foreground/80" : "text-muted-foreground/60"}`}>{subtitle}</p>
              </div>
              {badge > 0 && (
                <span className="ml-auto flex-shrink-0 min-w-[18px] h-[18px] text-[10px] font-bold bg-rose-500 text-white rounded-full flex items-center justify-center px-1">
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-border space-y-2">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-rose-500 hover:bg-rose-500/8 transition-all duration-200 group"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-transparent group-hover:bg-rose-500/10 transition-colors">
            <LogOut className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
