import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <div className="top-strip">
        <div className="container">
          <span>Construction services across Cambodia</span>
          <a href="tel:+85516607238">(+855) 16 607 238</a>
        </div>
      </div>
      <div className="container py-3">
        <nav className="site-nav">
          <Link to="/" className="logo" onClick={closeMenu}>
            <strong>LS</strong>
            <span>
              <em>Loeung</em>
              Sakhak Construction
            </span>
          </Link>

          <button
            type="button"
            className="menu-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`site-menu ${isOpen ? "open" : ""}`}>
            <NavLink to="/" className="nav-link" onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/about" className="nav-link" onClick={closeMenu}>
              About Us
            </NavLink>
            <NavLink to="/service" className="nav-link" onClick={closeMenu}>
              Services
            </NavLink>
            <NavLink to="/project" className="nav-link" onClick={closeMenu}>
              Project
            </NavLink>
            <NavLink to="/blogs" className="nav-link" onClick={closeMenu}>
              Blogs
            </NavLink>
            <NavLink to="/contactus" className="nav-link" onClick={closeMenu}>
              Contact Us
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
