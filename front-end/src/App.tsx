import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FeedView from "./views/Feed/FeedView";
import BlogView from "./views/Blog/BlogView";
import BookmarksView from "./views/Bookmarks/BookmarksView";
import ProfileView from "./views/Profile/ProfileView";
import TopicsView from "./views/Topics/TopicsView";
import LoginView from "./views/Login/LoginView";
import LoginPage from "./views/Admin/LoginPage";
import Dashboard from "./views/Admin/Dashboard";
import ArticleEditor from "./views/Admin/ArticleEditor";
import AdminRoute from "./views/Admin/AdminRoute";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";

const App = () => {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<FeedView />} />
          <Route path="/article/:slug" element={<BlogView />} />
          <Route path="/topics" element={<TopicsView />} />
          <Route path="/login" element={<LoginView />} />

          {/* Protected user routes */}
          <Route path="/bookmarks" element={<RequireAuth><BookmarksView /></RequireAuth>} />
          <Route path="/profile"   element={<RequireAuth><ProfileView /></RequireAuth>} />

          {/* Admin auth */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* Protected admin routes */}
          <Route path="/admin"                    element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="/admin/articles/new"       element={<AdminRoute><ArticleEditor /></AdminRoute>} />
          <Route path="/admin/articles/:id/edit"  element={<AdminRoute><ArticleEditor /></AdminRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AdminAuthProvider>
    </BrowserRouter>
  );
};

export default App;
