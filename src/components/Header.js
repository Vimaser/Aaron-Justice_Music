import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="menu-icon" onClick={handleMenuToggle}>
        {isMenuOpen ? "X" : "☰"}
      </div>
      <nav className={isMenuOpen ? "nav-open" : "nav-closed"}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/music" onClick={() => setIsMenuOpen(false)}>Music</Link>
        <Link to="/events" onClick={() => setIsMenuOpen(false)}>Events</Link>
        <Link to="/gallery" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
      </nav>
    </header>
  );
};

export default Header;
