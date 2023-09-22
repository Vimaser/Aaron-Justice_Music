import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>© 2023 Aaron Justice Music</p>
      <div style={socialLinks}>
        <a href="https://www.facebook.com/aaronjusticemusic" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://www.instagram.com/aaronjusticemusic" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://www.twitter.com/aaronjusticemusic" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://www.youtube.com/aaronjusticemusic" target="_blank" rel="noopener noreferrer">YouTube</a>
      </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#2E2E2E',
  color: '#FFF',
  textAlign: 'center',
  padding: '10px',
  position: 'fixed',
  left: '0',
  bottom: '0',
  width: '100%',
}

const socialLinks = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
}

export default Footer;