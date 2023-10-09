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
          Meet Aaron Justice – His desire is to share the love and hope that we
          have in Jesus to the world through his music. The very first song that
          he wrote was called, "All I Need,' which spoke of how God pulled him
          through depression after his parent's divorce and grandfather's death
          at the impressionable age of just 16. That was when Aaron knew the
          calling that God had placed on his life was to show hurting people
          that God is with them in the toughest of times and they are never
          alone through his music. Each song that he writes tells a part of his
          story and testimony, both the highs and the lows throughout his life.
          His prayer is that through his songs he can spread the message that
          everyone is loved, that everyone has a purpose, and that God has a
          plan for their lives. Having served in the Army, he has a special
          place in his heart for the men and women in military and the unique
          challenges they face.
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
