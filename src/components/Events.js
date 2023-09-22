import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../firebase';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const db = getFirestore(app);
      const eventsCollection = collection(db, 'Events');
      const eventSnapshot = await getDocs(eventsCollection);
      const eventsList = eventSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEvents(eventsList);
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Upcoming Events</h1>
      <section>
        {events.length ? (
          events.map(event => (
            <article key={event.id}>
              <h2>{event.eventName}</h2>
              <p>{event.eventDate.toDate().toLocaleDateString()}</p>
              <p>{event.location}</p>
              {/* temp may add more if needed */}
            </article>
          ))
        ) : (
          <p>No upcoming events.</p>
        )}
      </section>
    </div>
  );
};

export default Events;