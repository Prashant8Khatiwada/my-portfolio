import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase
            .from("projects")
            .select("*")
            .order("display_order", { ascending: true })
            .then(({ data }) => {
                const visibleProjects = (data || []).filter(p => p.active !== false);
                setProjects(visibleProjects);
                setLoading(false);
            });
    }, []);

    return { projects, loading };
}
