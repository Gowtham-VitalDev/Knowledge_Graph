import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserAuth } from "../../contexts/UserAuthContext";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useUserAuth();
  const location = useLocation();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
