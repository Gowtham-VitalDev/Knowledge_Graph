import type { FormEvent } from "react";
import "./NewsletterWidget.css";

const NewsletterWidget = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <form className="newsletter__form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="newsletter__input"
          placeholder="Enter your comm-link (email)"
          aria-label="Email address"
        />
        <button type="submit" className="newsletter__submit">
          Initialize Link
        </button>
      </form>
    </section>
  );
};

export default NewsletterWidget;
