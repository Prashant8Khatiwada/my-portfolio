import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export function AdminRoute({ children }) {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (isMounted) setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, s) => setSession(s));

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (session === undefined) return <div className="p-6">Loading...</div>;
  if (!session) return <Navigate to="/admin/login" replace />;

  return children;
}
