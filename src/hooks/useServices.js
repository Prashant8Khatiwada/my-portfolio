import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase
            .from("services")
            .select("*")
            .order("display_order", { ascending: true })
            .then(({ data }) => {
                setServices(data || []);
                setLoading(false);
            });
    }, []);

    return { services, loading };
}
