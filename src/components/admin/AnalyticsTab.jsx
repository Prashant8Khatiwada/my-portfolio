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
} from "recharts";
import { RefreshCw } from "lucide-react";

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
    <div className="space-y-8 animate-fade-in">
      {/* Control Panel Card */}
      <div className="bg-card/45 border border-border/40 rounded-2xl p-5 md:p-6 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-black/5">
        <div>
          <h3 className="text-lg font-bold">Analytics Filters & Range</h3>
          <p className="text-xs text-muted-foreground">Toggle date duration and fetch latest sessions</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={analyticsRangeDays}
            onChange={(e) => setAnalyticsRangeDays(Number(e.target.value))}
            className="px-3.5 py-2.5 rounded-xl border border-border/60 bg-background/50 text-sm outline-none transition focus:border-primary/60"
          >
            <option value={7}>Last 7 Days</option>
            <option value={30}>Last 30 Days</option>
            <option value={90}>Last 90 Days</option>
          </select>

          <button
            type="button"
            onClick={loadAnalytics}
            className="px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-primary/5 hover:border-primary/40 font-semibold text-sm transition-all duration-200 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4 text-primary" />
            Refresh
          </button>
        </div>
      </div>

      {analyticsError && (
        <div className="rounded-xl border border-red-500/20 bg-red-950/40 p-4 text-sm text-red-300">
          {analyticsError}
        </div>
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-card/30 border border-border/30 rounded-2xl p-6 relative overflow-hidden group hover:border-primary/20 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none group-hover:bg-primary/10 transition-colors" />
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Page Views</p>
          <p className="text-3xl font-black mt-2 tracking-tight">{totalViews.toLocaleString()}</p>
        </div>
        <div className="bg-card/30 border border-border/30 rounded-2xl p-6 relative overflow-hidden group hover:border-primary/20 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none group-hover:bg-primary/10 transition-colors" />
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Unique Visitors</p>
          <p className="text-3xl font-black mt-2 tracking-tight">{uniqueVisitors.toLocaleString()}</p>
        </div>
        <div className="bg-card/30 border border-border/30 rounded-2xl p-6 relative overflow-hidden group hover:border-primary/20 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-500">Live Active Visitors (5m)</p>
          <p className="text-3xl font-black mt-2 tracking-tight text-emerald-400">{liveVisitors.toLocaleString()}</p>
        </div>
      </div>

      {/* Recharts Trend Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Trend */}
        <div className="bg-card/35 border border-border/40 rounded-2xl p-5 md:p-6 h-[340px] flex flex-col justify-between">
          <div className="mb-4">
            <h4 className="font-bold text-lg">Traffic Views Trend</h4>
            <p className="text-xs text-muted-foreground">Page impressions per day over selected period</p>
          </div>

          <div className="flex-1 min-h-0 w-full">
            {analyticsLoading ? (
              <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground animate-pulse">
                Loading trend chart...
              </div>
            ) : dailyViews.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                No data recorded.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyViews} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.06)" />
                  <XAxis dataKey="label" stroke="#6b7280" fontSize={10} tickLine={false} />
                  <YAxis allowDecimals={false} stroke="#6b7280" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "#0a0a0a",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#a78bfa"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#a78bfa" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-card/35 border border-border/40 rounded-2xl p-5 md:p-6 h-[340px] flex flex-col justify-between">
          <div className="mb-4">
            <h4 className="font-bold text-lg">Most Visited Pages</h4>
            <p className="text-xs text-muted-foreground">Page ranking and impressions by URL path</p>
          </div>

          <div className="flex-1 min-h-0 w-full">
            {analyticsLoading ? (
              <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground animate-pulse">
                Loading top pages...
              </div>
            ) : topPages.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                No page visits recorded.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topPages} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.06)" />
                  <XAxis
                    dataKey="path"
                    stroke="#6b7280"
                    fontSize={10}
                    tickLine={false}
                    tickFormatter={(val) => (val.length > 15 ? `${val.slice(0, 15)}...` : val)}
                  />
                  <YAxis allowDecimals={false} stroke="#6b7280" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "#0a0a0a",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="views" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border/30 text-xs text-muted-foreground">
        <p>Updates automatically every 60 seconds</p>
        <p>
          {analyticsLastUpdated ? `Last updated: ${new Date(analyticsLastUpdated).toLocaleTimeString()}` : ""}
        </p>
      </div>
    </div>
  );
}
