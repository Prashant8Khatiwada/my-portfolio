import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useTestimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase
            .from("testimonials")
            .select("*")
            .order("display_order", { ascending: true })
            .then(({ data }) => {
                setTestimonials(data || []);
                setLoading(false);
            });
    }, []);

    return { testimonials, loading };
}
