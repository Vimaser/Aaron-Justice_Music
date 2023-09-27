import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import "./css/Home.css";
import AJImage1 from "../img/aj.jpg";
import AJImage2 from "../img/homebg.jpg";
import AJImage3 from "../img/musicbg.jpg";

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
      <h1>Welcome to Aaron Justice Music!</h1>
      </section>
      <section>
        <p>
          Aaron Justice is a talented musician known for his soulful tunes and
          engaging performances. Discover his music, view upcoming events,
          browse the gallery, and get in touch!
        </p>
        <CSSTransition
          in={inProp}
          timeout={1000}
          classNames="fade"
          unmountOnExit
        >
          <img src={images[currentImageIndex]} alt="Aaron Justice" />
        </CSSTransition>
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
