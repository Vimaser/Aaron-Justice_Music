import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import "./css/Home.css";
import AJImage1 from "../img/aj.jpg";
import AJImage2 from "../img/homebg.jpg";
import AJImage3 from "../img/musicbg.jpg";
import AJlogo from "../img/arronJustice.png";

const Home = () => {
  const images = [AJImage1, AJImage2, AJImage3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [inProp, setInProp] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setInProp(false);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!inProp) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setInProp(true);
    }
  }, [inProp, images.length]);

  return (
    <div className="home-background">
      <section>
        <h1>Aaron Justice Music</h1>
      </section>
      <img
        src={AJlogo}
        alt="Aaron Justice Logo"
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "50%",
        }}
      />
      {/* Yeah I know I broke the cardinal rule of putting inline styles... Sue me. */}

      <section>
        
        <CSSTransition
          in={inProp}
          timeout={1000}
          classNames="fade"
          unmountOnExit
        >
          <img src={images[currentImageIndex]} alt="Aaron Justice" />
        </CSSTransition>
        <p>
          Meet Aaron Justice – a man whose guitar strings vibrate with love,
          faith, and a deep sense of devotion. In the world of Christian music,
          Aaron has carved a niche with his soulful melodies and heartfelt
          lyrics that resonate with the warmth of family and the joy of life’s
          blessings. Growing up surrounded by the harmony of a close-knit family
          and the rhythm of unwavering faith, Aaron’s music became a reflection
          of his journey. Each song tells a story of hope, celebrates the
          strength found in belief, and spreads a message of positivity and
          love. Aaron isn’t just crafting tunes; he’s sharing pieces of his
          soul, inviting listeners to join him in celebrating the beauty of life
          and faith. But Aaron is more than a musician. He's a family man,
          grounded by the love and support of his loved ones, who are not just
          his biggest fans but also his greatest inspiration. The laughter of
          family gatherings, the harmony of Sunday mornings, and the rhythm of
          everyday life – these are the melodies that inspire Aaron’s music.
          With his guitar in hand and a heart full of passion, Aaron Justice is
          a melody-maker who brings light to the world. His songs are a
          harmonious blend of uplifting lyrics and acoustic warmth, a musical
          journey that inspires reflection, gratitude, and joy. In every chord
          and every word, Aaron is reaching out, touching hearts, and spreading
          a little bit of love and a whole lot of faith. Welcome to the world of
          Aaron Justice Music – where every note is a message of hope, every
          song is a celebration of faith, and every melody is inspired by the
          love of family.
        </p>
      </section>
      <section>
        <div style={{ textAlign: "center" }}>
          <Link to="/music">Latest Music</Link>
        </div>
        <div style={{ textAlign: "center" }}>
          <Link to="/events">New Events</Link>
        </div>
        <div style={{ textAlign: "center" }}>
          <Link to="/gallery">View Gallery</Link>
        </div>
        <div style={{ textAlign: "center" }}>
          <Link to="/contact">Get in Touch</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
