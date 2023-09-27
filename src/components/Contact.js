import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../firebase";
import "./css/Contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const db = getFirestore(app);
    const messagesCollection = collection(db, "Messages");
    await addDoc(messagesCollection, {
      name,
      email,
      message,
      timestamp: new Date(),
    });

    // Reset form fields
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-background">
      <section>
        <h1>Contact Info</h1>
      </section>
      <section>
        <h2>Aaron's Email:</h2>
        <p>aaronjusticemusic@gmail.com</p>
      </section>
      <section>
        <h1>Contact Aaron Directly</h1>
      </section>
      <section>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
