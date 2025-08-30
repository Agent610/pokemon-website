import React from "react";
import ".footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <nav className="footer__nav">
          <Link to="/" className="footer__nav-link">
            Home
          </Link>
          <Link to="/about" className="footer__nav-link">
            About
          </Link>
        </nav>

        <p className="footer__copyright">2025 Created by Parth Sonanitwala</p>
      </div>
    </footer>
  );
}

export default Footer;
