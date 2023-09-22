import React from 'react';

const Contact = () => {
  return (
    <div>
      <h1>Contact Aaron</h1>
      <section>
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required></textarea>
          
          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default Contact;