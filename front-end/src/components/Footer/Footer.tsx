import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__brand">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          NeonScroll
        </span>
        <nav className="footer__links" aria-label="Footer">
          <a href="#" className="footer__link">About</a>
          <a href="#" className="footer__link">Privacy</a>
          <a href="#" className="footer__link">Terms</a>
          <a href="#" className="footer__link">Contact</a>
        </nav>
        <span className="footer__copy">© 2026 NeonScroll. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
