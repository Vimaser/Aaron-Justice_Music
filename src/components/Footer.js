import React from "react";
import "./css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2023 Aaron Justice Music</p>
      <div className="social-links">
        <a
          className="social-link"
          href="https://www.facebook.com/AaronJusticeMusic"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <a
          className="social-link"
          href="https://www.instagram.com/aaronjusticemusic"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <a
          className="social-link"
          href="https://www.twitter.com/aaronjusticemusic"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        <a
          className="social-link"
          href="https://www.youtube.com/aaronjusticemusic"
          target="_blank"
          rel="noopener noreferrer"
        >
          YouTube
        </a>
      </div>
    </footer>
  );
};

export default Footer;