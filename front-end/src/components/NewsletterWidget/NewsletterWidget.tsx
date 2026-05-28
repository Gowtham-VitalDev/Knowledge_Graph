import { useState, type FormEvent } from "react";
import client from "../../api/client";
import "./NewsletterWidget.css";

const NewsletterWidget = () => {
  const [email, setEmail]     = useState("");
  const [status, setStatus]   = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await client.post("/api/newsletter", { email });
      setStatus("success");
      setMessage(res.data.message ?? "You're subscribed.");
      setEmail("");
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      setStatus("error");
      setMessage(detail ?? "Something went wrong. Try again.");
    }
  };

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div className="newsletter__icon-wrap" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2"/>
          <path d="m4 7 8 6 8-6"/>
        </svg>
      </div>
      <h2 id="newsletter-title" className="newsletter__title">The Mainframe Briefing</h2>
      <p className="newsletter__desc">
        Get the most critical synthesis of the week's tech news injected directly into your inbox. No spam, pure signal.
      </p>

      {status === "success" ? (
        <p className="newsletter__feedback newsletter__feedback--success">{message}</p>
      ) : (
        <form className="newsletter__form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="newsletter__input"
            placeholder="Enter your comm-link (email)"
            aria-label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === "loading"}
          />
          <button type="submit" className="newsletter__submit" disabled={status === "loading"}>
            {status === "loading" ? "Linking..." : "Initialize Link"}
          </button>
          {status === "error" && (
            <p className="newsletter__feedback newsletter__feedback--error">{message}</p>
          )}
        </form>
      )}
    </section>
  );
};

export default NewsletterWidget;
