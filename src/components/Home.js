import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Aaron Justice Music!</h1>
      <section>
        <p>Aaron Justice is a talented musician known for his soulful tunes and engaging performances. Discover his music, view upcoming events, browse the gallery, and get in touch!</p>
        <img src="path-to-aaron-image.jpg" alt="Aaron Justice" />
      </section>
      <section>
        <h2>Latest Music</h2>
        <Link to="/music">Explore Music</Link>
      </section>
      <section>
        <h2>Upcoming Events</h2>
        <Link to="/events">View Events</Link>
      </section>
    </div>
  );
};

export default Home;