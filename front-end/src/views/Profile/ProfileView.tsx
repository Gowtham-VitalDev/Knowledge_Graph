import { Link, useNavigate } from "react-router-dom";
import { usePageMeta } from "../../hooks/usePageMeta";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useUserAuth } from "../../contexts/UserAuthContext";
import "./ProfileView.css";

const ProfileView = () => {
  usePageMeta("Profile");
  const { user, loading, bookmarks, logout } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="profile-view">
        <Navbar />
        <main className="profile-view__main">
          <p className="profile-view__empty">Loading…</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-view">
        <Navbar />
        <main className="profile-view__main">
          <p className="profile-view__empty">Sign in to view your profile.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="profile-view">
      <Navbar />
      <main className="profile-view__main">
        <div className="profile-card">
          {/* Avatar */}
          <div className="profile-card__avatar-wrap">
            {user.avatarUrl ? (
              <img
                className="profile-card__avatar"
                src={user.avatarUrl}
                alt={user.fullName}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="profile-card__avatar profile-card__avatar--initials">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Info */}
          <h1 className="profile-card__name">{user.fullName}</h1>
          <p className="profile-card__email">{user.email}</p>

          <div className="profile-card__badge">
            <span className="profile-card__role">{user.role}</span>
          </div>

          {/* Stats */}
          <div className="profile-card__stats">
            <div className="profile-card__stat">
              <span className="profile-card__stat-value">{bookmarks.length}</span>
              <span className="profile-card__stat-label">Bookmarks</span>
            </div>
          </div>

          {/* Actions */}
          <div className="profile-card__actions">
            <Link to="/bookmarks" className="profile-card__btn profile-card__btn--secondary">
              View Bookmarks
            </Link>
            <button
              type="button"
              className="profile-card__btn profile-card__btn--danger"
              onClick={handleLogout}
            >
              Sign Out
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileView;
