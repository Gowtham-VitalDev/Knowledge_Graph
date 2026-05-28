import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminAuthContext";

// Wraps any route that requires admin login.
// Shows nothing while the session check loads, then redirects to login if no user.
export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAdminAuth();

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "var(--color-bg)", color: "var(--color-muted)", fontFamily: "var(--font-ui)" }}>
      Checking session...
    </div>
  );

  if (!user) return <Navigate to="/admin/login" replace />;

  return <>{children}</>;
}
