import type { FormEvent } from "react";
import "./NewsletterWidget.css";

const NewsletterWidget = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div className="newsletter__header">
        <span className="newsletter__icon" aria-hidden>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="m4 7 8 6 8-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2 id="newsletter-title" className="newsletter__title">
          The Weekly Graph
        </h2>
      </div>

      <p className="newsletter__desc">
        Get the best technical articles, architectural breakdowns, and
        engineering insights delivered to your inbox every Friday.
      </p>

      <form className="newsletter__form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="newsletter__input"
          placeholder="Email address"
          aria-label="Email address"
        />
        <button type="submit" className="newsletter__submit">
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default NewsletterWidget;
