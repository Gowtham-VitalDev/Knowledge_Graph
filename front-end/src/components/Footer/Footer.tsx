import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__left">
          <span className="footer__brand">
            <span className="footer__brand-icon">K</span>
            KnowledgeGraph
          </span>
          <nav className="footer__links" aria-label="Footer">
            <a href="#" className="footer__link">
              About
            </a>
            <a href="#" className="footer__link">
              Privacy
            </a>
            <a href="#" className="footer__link">
              Terms
            </a>
            <a href="#" className="footer__link">
              Contact
            </a>
          </nav>
        </div>
        <span className="footer__copy">
          © 2026 KnowledgeGraph. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
