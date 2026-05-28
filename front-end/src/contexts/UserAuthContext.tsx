import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import client from "../api/client";

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: string;
  avatarUrl: string;
}

interface UserAuthContextValue {
  user: UserProfile | null;
  loading: boolean;
  bookmarks: string[];          // array of article IDs
  loginWithGoogle: (credential: string) => Promise<void>;
  logout: () => Promise<void>;
  addBookmark: (articleId: string) => Promise<void>;
  removeBookmark: (articleId: string) => Promise<void>;
  isBookmarked: (articleId: string) => boolean;
}

const UserAuthContext = createContext<UserAuthContextValue | null>(null);

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]           = useState<UserProfile | null>(null);
  const [loading, setLoading]     = useState(true);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // Restore session on mount
  useEffect(() => {
    client.get("/api/auth/me", { withCredentials: true })
      .then((res) => {
        const u = res.data.user;
        setUser({
          id:        u._id ?? u.id,
          fullName:  u.fullName,
          email:     u.email,
          role:      u.role,
          avatarUrl: u.avatarUrl ?? "",
        });
        return client.get("/api/user/bookmarks", { withCredentials: true });
      })
      .then((res) => {
        const ids = (res.data.bookmarks as any[]).map((a: any) => a._id ?? a.id);
        setBookmarks(ids);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const loginWithGoogle = async (credential: string) => {
    const res = await client.post(
      "/api/auth/google",
      { credential },
      { withCredentials: true }
    );
    const u = res.data.user;
    setUser({
      id:        u.id,
      fullName:  u.fullName,
      email:     u.email,
      role:      u.role,
      avatarUrl: u.avatarUrl ?? "",
    });
    // Fetch bookmarks for the newly logged-in user
    const bRes = await client.get("/api/user/bookmarks", { withCredentials: true });
    const ids = (bRes.data.bookmarks as any[]).map((a: any) => a._id ?? a.id);
    setBookmarks(ids);
  };

  const logout = async () => {
    await client.post("/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
    setBookmarks([]);
  };

  const addBookmark = async (articleId: string) => {
    await client.post(`/api/user/bookmarks/${articleId}`, {}, { withCredentials: true });
    setBookmarks((prev) => [...new Set([...prev, articleId])]);
  };

  const removeBookmark = async (articleId: string) => {
    await client.delete(`/api/user/bookmarks/${articleId}`, { withCredentials: true });
    setBookmarks((prev) => prev.filter((id) => id !== articleId));
  };

  const isBookmarked = (articleId: string) => bookmarks.includes(articleId);

  return (
    <UserAuthContext.Provider
      value={{ user, loading, bookmarks, loginWithGoogle, logout, addBookmark, removeBookmark, isBookmarked }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const ctx = useContext(UserAuthContext);
  if (!ctx) throw new Error("useUserAuth must be used inside UserAuthProvider");
  return ctx;
}
