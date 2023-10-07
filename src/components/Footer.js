import React from "react";
import { Link } from "react-router-dom";
import "./css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2023 Aaron Justice Music</p>
      <div className="social-links-container">
        <div className="social-links-1">
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
            href="https://open.spotify.com/artist/6umNxjlFms7UDoZOlZBpOv?fbclid=IwAR2Yqjl-3ILpwEmVwMQV8CokedkNRP0OHLvhm0-EMYExdHUgudauOZ1Po5w"
            target="_blank"
            rel="noopener noreferrer"
          >
            Spotify
          </a>
        </div>
        <div className="social-links-2">
          <a
            className="social-link"
            href="https://www.youtube.com/@aaronjusticemusic"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </a>
          <a
            className="social-link"
            href="https://www.tiktok.com/@theaaronjustice?_t=8gGlSMm2vyF&_r=1&fbclid=IwAR1HVTO_FuCRbKqnZqWcQSpvjf7zpMvcXpf_sNUTmrfMXkkpTeCxj7735Ww"
            target="_blank"
            rel="noopener noreferrer"
          >
            TikTok
          </a>
          <Link to="/admin" className="social-link">
            AdminPortal
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
