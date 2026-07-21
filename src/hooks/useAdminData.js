import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

// Projects Query & Mutation
export function useProjectsQuery() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });
}

export function useSaveProjectMutation(onSuccess, onError) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      if (id) {
        const { error } = await supabase
          .from("projects")
          .update(payload)
          .eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      if (onSuccess) onSuccess();
    },
    onError: (err) => {
      if (onError) onError(err);
    },
  });
}

export function useDeleteProjectMutation(onSuccess, onError) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      if (onSuccess) onSuccess();
    },
    onError: (err) => {
      if (onError) onError(err);
    },
  });
}

// Testimonials Query
export function useTestimonialsQuery() {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });
}

// Timeline Query
export function useTimelineQuery() {
  return useQuery({
    queryKey: ["timeline"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("timeline")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });
}

// Skills Query
export function useSkillsQuery() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });
}

// Services Query
export function useServicesQuery() {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });
}

// Generic Simple Table Mutations
export function useSaveSimpleMutation(table, onSuccess, onError) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      if (id) {
        const { error } = await supabase
          .from(table)
          .update(payload)
          .eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(table).insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [table] });
      if (onSuccess) onSuccess();
    },
    onError: (err) => {
      if (onError) onError(err);
    },
  });
}

export function useDeleteSimpleMutation(table, onSuccess, onError) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [table] });
      if (onSuccess) onSuccess();
    },
    onError: (err) => {
      if (onError) onError(err);
    },
  });
}

// Profile Queries & Mutations
export function useProfileQuery() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .limit(1)
        .single();
      if (error) throw error;
      return data;
    },
  });
}

export function useSaveProfileMutation(onSuccess, onError) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const { error } = await supabase
        .from("profile")
        .update(payload)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      if (onSuccess) onSuccess();
    },
    onError: (err) => {
      if (onError) onError(err);
    },
  });
}

// Messages Query & Mutation
export function useMessagesQuery() {
  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });
}

export function useMarkMessageReadMutation(onSuccess, onError) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from("messages")
        .update({ read: true })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      if (onSuccess) onSuccess();
    },
    onError: (err) => {
      if (onError) onError(err);
    },
  });
}

// Reset Template Data Mutation
export function useResetToDefaultsMutation(onSuccess, onError) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { LEGACY_DATA } = await import("../pages/AdminLegacyData");
      
      // Delete existing records
      await Promise.all([
        supabase.from("projects").delete().not("id", "is", null),
        supabase.from("testimonials").delete().not("id", "is", null),
        supabase.from("timeline").delete().not("id", "is", null),
        supabase.from("skills").delete().not("id", "is", null),
        supabase.from("services").delete().not("id", "is", null),
      ]);

      // Seed records
      await Promise.all([
        supabase.from("projects").insert(LEGACY_DATA.projects),
        supabase.from("testimonials").insert(LEGACY_DATA.testimonials),
        supabase.from("timeline").insert(LEGACY_DATA.timeline),
        supabase.from("skills").insert(LEGACY_DATA.skills),
        supabase.from("services").insert(LEGACY_DATA.services),
      ]);
    },
    onSuccess: () => {
      // Invalidate all query caches
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["timeline"] });
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      queryClient.invalidateQueries({ queryKey: ["services"] });
      if (onSuccess) onSuccess();
    },
    onError: (err) => {
      if (onError) onError(err);
    },
  });
}

// Live Visitors count query
export function useLiveVisitorsQuery() {
  return useQuery({
    queryKey: ["liveVisitors"],
    queryFn: async () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      const { count, error } = await supabase
        .from("visitors")
        .select("*", { count: "exact", head: true })
        .gte("last_seen", fiveMinutesAgo);
      if (error) throw error;
      return count || 0;
    },
    refetchInterval: 10000, // Query live visitors count every 10 seconds
  });
}

// Analytics Queries
export function useAnalyticsQuery(rangeDays) {
  return useQuery({
    queryKey: ["analytics", rangeDays],
    queryFn: async () => {
      const fromIso = new Date(
        Date.now() - rangeDays * 86400 * 1000,
      ).toISOString();

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

      if (firstError) throw firstError;

      // Group pages views
      const groupedPages = (pageRows || []).reduce((acc, row) => {
        const key = row.path || "/";
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});
      const topPagesList = Object.entries(groupedPages)
        .map(([path, views]) => ({ path, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 7);

      // Group daily views
      const groupedDaily = (dailyRows || []).reduce((acc, row) => {
        const day = row.created_at.slice(0, 10);
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {});
      const dailyViewsList = Object.entries(groupedDaily)
        .map(([day, views]) => ({ day, views, label: new Date(day).toLocaleDateString(undefined, { month: "short", day: "numeric" }) }))
        .sort((a, b) => (a.day > b.day ? 1 : -1));

      const uniqueSessions = new Set(
        (sessionRows || []).map((row) => row.session_id).filter(Boolean),
      ).size;

      return {
        totalViews: total || 0,
        uniqueVisitors: visitorsCount || uniqueSessions || 0,
        topPages: topPagesList,
        dailyViews: dailyViewsList,
      };
    },
    refetchInterval: 60000, // Refresh traffic data automatically every 60 seconds
  });
}
