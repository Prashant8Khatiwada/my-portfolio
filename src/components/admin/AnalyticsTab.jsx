import React from "react";
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
  Area,
  AreaChart,
} from "recharts";
import { RefreshCw, Eye, Users, Zap, TrendingUp } from "lucide-react";

const StatCard = ({ icon: Icon, label, value, color, glow }) => (
  <div className={`relative overflow-hidden rounded-2xl p-5 border border-white/6 bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-300 group`}>
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none ${glow}`} />
    <div className="relative z-10">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color.bg}`}>
        <Icon className={`w-5 h-5 ${color.text}`} />
      </div>
      <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-3xl font-black tracking-tight ${color.text}`}>{typeof value === "number" ? value.toLocaleString() : value}</p>
    </div>
    <div className={`absolute bottom-0 right-0 w-20 h-20 rounded-tl-full opacity-5 ${color.bg}`} />
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
        <p className="text-white/50 text-xs mb-1">{label}</p>
        <p className="text-white font-bold text-sm">{payload[0].value.toLocaleString()} <span className="text-white/40 font-normal">views</span></p>
      </div>
    );
  }
  return null;
};

export default function AnalyticsTab({
  analyticsRangeDays,
  setAnalyticsRangeDays,
  loadAnalytics,
  analyticsError,
  totalViews,
  uniqueVisitors,
  liveVisitors,
  analyticsLoading,
  dailyViews,
  topPages,
  analyticsLastUpdated,
}) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Site Analytics</h3>
          <p className="text-sm text-white/35 mt-0.5">Traffic overview and page performance</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={analyticsRangeDays}
            onChange={(e) => setAnalyticsRangeDays(Number(e.target.value))}
            className="px-3 py-2 rounded-xl border border-white/8 bg-white/5 text-white text-sm outline-none cursor-pointer focus:border-violet-500/50 transition-colors"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
          <button
            type="button"
            onClick={loadAnalytics}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 hover:bg-violet-500/10 hover:border-violet-500/30 text-white/70 hover:text-white text-sm font-medium transition-all duration-200"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
        </div>
      </div>

      {analyticsError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/8 p-4 text-sm text-red-400">
          {analyticsError}
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={Eye}
          label="Total Page Views"
          value={analyticsLoading ? "—" : totalViews}
          color={{ bg: "bg-violet-500/15", text: "text-violet-400" }}
          glow="bg-violet-500/10"
        />
        <StatCard
          icon={Users}
          label="Unique Visitors"
          value={analyticsLoading ? "—" : uniqueVisitors}
          color={{ bg: "bg-sky-500/15", text: "text-sky-400" }}
          glow="bg-sky-500/10"
        />
        <StatCard
          icon={Zap}
          label="Live Active (5 min)"
          value={analyticsLoading ? "—" : liveVisitors}
          color={{ bg: "bg-emerald-500/15", text: "text-emerald-400" }}
          glow="bg-emerald-500/10"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Trend chart */}
        <div className="rounded-2xl border border-white/6 bg-white/[0.03] p-5">
          <div className="mb-5 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-violet-400" />
            <div>
              <h4 className="text-sm font-bold text-white">Daily Traffic Trend</h4>
              <p className="text-xs text-white/35">Page impressions per day</p>
            </div>
          </div>
          <div className="h-[240px]">
            {analyticsLoading ? (
              <div className="h-full flex items-center justify-center text-white/20 text-sm animate-pulse">Loading chart...</div>
            ) : dailyViews.length === 0 ? (
              <div className="h-full flex items-center justify-center text-white/20 text-sm">No data yet</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyViews} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="label" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis allowDecimals={false} stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#viewsGradient)" dot={false} activeDot={{ r: 5, fill: "#8b5cf6", strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Top pages chart */}
        <div className="rounded-2xl border border-white/6 bg-white/[0.03] p-5">
          <div className="mb-5">
            <h4 className="text-sm font-bold text-white">Most Visited Pages</h4>
            <p className="text-xs text-white/35">Page views by URL path</p>
          </div>
          <div className="h-[240px]">
            {analyticsLoading ? (
              <div className="h-full flex items-center justify-center text-white/20 text-sm animate-pulse">Loading chart...</div>
            ) : topPages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-white/20 text-sm">No page visits recorded</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topPages} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="path" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => v.length > 12 ? `${v.slice(0, 12)}...` : v} />
                  <YAxis allowDecimals={false} stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="views" fill="#38bdf8" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
