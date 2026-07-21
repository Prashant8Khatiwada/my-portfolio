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
                setProjects(data || []);
                setLoading(false);
            });
    }, []);

    return { projects, loading };
}
