import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import "./Admin.css";

export default function LoginPage() {
  const { login }           = useAdminAuth();
  const navigate            = useNavigate();
  const [email, setEmail]   = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <span className="admin-login-logo__kg">KG</span>
          <span className="admin-login-logo__label">Admin</span>
        </div>

        <h1 className="admin-login-title">Sign in</h1>
        <p className="admin-login-sub">KnowledgeGraph content dashboard</p>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="admin-field">
            <label className="admin-field__label">Email</label>
            <input
              className="admin-field__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@knowledgegraph.io"
              required
              autoFocus
            />
          </div>

          <div className="admin-field">
            <label className="admin-field__label">Password</label>
            <input
              className="admin-field__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="admin-login-error">{error}</p>}

          <button
            type="submit"
            className="admin-btn admin-btn--primary admin-btn--full"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
