import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useSkills() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase
            .from("skills")
            .select("*")
            .order("display_order", { ascending: true })
            .then(({ data }) => {
                setSkills(data || []);
                setLoading(false);
            });
    }, []);

    return { skills, loading };
}
