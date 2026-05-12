import "./AuthorAvatar.css";

interface AuthorAvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
}

const GRADIENTS = [
  "linear-gradient(135deg, #1f54ff 0%, #7c3aed 100%)",
  "linear-gradient(135deg, #059669 0%, #1f54ff 100%)",
  "linear-gradient(135deg, #b45309 0%, #dc2626 100%)",
  "linear-gradient(135deg, #be185d 0%, #7c3aed 100%)",
  "linear-gradient(135deg, #16a34a 0%, #059669 100%)",
  "linear-gradient(135deg, #1f54ff 0%, #be185d 100%)",
  "linear-gradient(135deg, #9c2a55 0%, #b45309 100%)",
];

const getGradient = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const AuthorAvatar = ({ name, size = "md" }: AuthorAvatarProps) => {
  return (
    <span
      className={`author-avatar author-avatar--${size}`}
      style={{ background: getGradient(name) }}
      aria-label={name}
    >
      {getInitials(name)}
    </span>
  );
};

export default AuthorAvatar;
