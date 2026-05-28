import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useUserAuth } from "../../contexts/UserAuthContext";
import { usePageMeta } from "../../hooks/usePageMeta";
import "./LoginView.css";

const LoginView = () => {
  usePageMeta("Sign in", "Sign in to NeonScroll to bookmark articles and personalise your feed.");
  const { user, loginWithGoogle } = useUserAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  // Where to send the user after login — defaults to feed
  const from = (location.state as { from?: string })?.from ?? "/";

  // If already signed in, skip straight to destination
  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, navigate, from]);

  const handleSuccess = async (cred: { credential?: string }) => {
    if (!cred.credential) return;
    await loginWithGoogle(cred.credential);
    navigate(from, { replace: true });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Logo */}
        <div className="login-card__logo">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          NeonScroll
        </div>

        <h1 className="login-card__title">Welcome back</h1>
        <p className="login-card__sub">
          Sign in to bookmark articles, track your reading, and personalise your feed.
        </p>

        <div className="login-card__btn-wrap">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.error("Google Sign-In failed")}
            size="large"
            shape="pill"
            width="280"
            text="signin_with"
          />
        </div>

        <p className="login-card__note">
          No password needed — we use Google Sign-In.
        </p>
      </div>
    </div>
  );
};

export default LoginView;
