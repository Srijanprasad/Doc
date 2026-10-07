import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  adminEmail,
  getSupabase,
  isSupabaseConfigured,
} from "../lib/supabase";

function AdminRoute({ children }) {
  const [status, setStatus] = useState("checking");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setStatus("ready");
      return undefined;
    }

    let active = true;
    const supabase = getSupabase();

    supabase.auth
      .getSession()
      .then(({ data, error: sessionError }) => {
        if (!active) return;
        if (sessionError) {
          setError(sessionError.message);
          setStatus("error");
          return;
        }
        const user = data.session?.user;
        setStatus(
          user && user.email?.toLowerCase() !== adminEmail
            ? "unauthorized"
            : "ready",
        );
      })
      .catch((sessionError) => {
        if (!active) return;
        setError(sessionError.message);
        setStatus("error");
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      setStatus(
        user && user.email?.toLowerCase() !== adminEmail
          ? "unauthorized"
          : "ready",
      );
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  if (status === "checking") {
    return (
      <p role="status" className="px-4 py-16 text-center text-gray-400">
        Checking admin access…
      </p>
    );
  }

  if (status === "unauthorized") return <Navigate to="/" replace />;

  if (status === "error") {
    return (
      <p role="alert" className="px-4 py-16 text-center text-red-300">
        Could not verify admin access: {error}
      </p>
    );
  }

  return children;
}

export default AdminRoute;
