import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useTimeline() {
    const [timeline, setTimeline] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase
            .from("timeline")
            .select("*")
            .order("display_order", { ascending: true })
            .then(({ data }) => {
                setTimeline(data || []);
                setLoading(false);
            });
    }, []);

    return { timeline, loading };
}
