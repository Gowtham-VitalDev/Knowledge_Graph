import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import client from "../api/client";

interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  avatarUrl: string;
}

interface AdminAuthContextValue {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount — check if a session cookie already exists
  useEffect(() => {
    client.get("/api/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await client.post(
      "/api/auth/login",
      { email, password },
      { withCredentials: true }
    );
    setUser(res.data.user);
  };

  const logout = async () => {
    await client.post("/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return ctx;
}
