import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "../firebase";

const Admin = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [events, setEvents] = useState([]);
  const [image, setImage] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [musicFile, setMusicFile] = useState(null);
  const [musicTitle, setMusicTitle] = useState("");
  const [musicArtist, setMusicArtist] = useState("");

  const handleMusicUpload = async () => {
    try {
      const storageRef = ref(getStorage(app), "music/" + musicFile.name);
      await uploadBytes(storageRef, musicFile);
      const downloadURL = await getDownloadURL(storageRef);

      const db = getFirestore(app);
      const musicCollection = collection(db, "Music");
      await addDoc(musicCollection, {
        title: musicTitle,
        artist: musicArtist,
        url: downloadURL,
      });

      setMusicFile(null);
      setMusicTitle("");
      setMusicArtist("");
    } catch (error) {
      console.error("Error uploading music:", error);
    }
  };

  const handleImageUpload = async () => {
    try {
      const storageRef = ref(getStorage(app), "gallery/" + image.name);
      await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);

      const db = getFirestore(app);
      const galleryCollection = collection(db, "Gallery");
      await addDoc(galleryCollection, {
        title: imageTitle,
        url: downloadURL,
      });

      setImage(null);
      setImageTitle("");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const db = getFirestore(app);
      const eventsCollection = collection(db, "Events");
      const eventSnapshot = await getDocs(eventsCollection);
      const eventsList = eventSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEvents(eventsList);
    };

    fetchEvents();
  }, []);

  const handleAddEvent = async () => {
    const db = getFirestore(app);
    const eventsCollection = collection(db, "Events");
    await addDoc(eventsCollection, {
      eventName,
      eventDate: new Date(eventDate),
      location,
    });

    setEventName("");
    setEventDate("");
    setLocation("");
  };

  const handleDeleteEvent = async (id) => {
    const db = getFirestore(app);
    await deleteDoc(doc(db, "Events", id));
    setEvents((events) => events.filter((event) => event.id !== id));
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddEvent();
        }}
      >
        <label>
          Event Name:
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </label>
        <label>
          Event Date:
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <button type="submit">Add Event</button>
      </form>
      <h2>Current Events</h2>
      {events.map((event) => (
        <div key={event.id}>
          <h3>{event.eventName}</h3>
          <p>{event.eventDate.toDate().toLocaleDateString()}</p>
          <p>{event.location}</p>
          <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
        </div>
      ))}
      <h2>Gallery Management</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleImageUpload();
        }}
      >
        <label>
          Image Title:
          <input
            type="text"
            value={imageTitle}
            onChange={(e) => setImageTitle(e.target.value)}
          />
        </label>
        <label>
          Image:
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </label>
        <button type="submit">Upload Image</button>
      </form>
      <h2>Music Management</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleMusicUpload();
        }}
      >
        <label>
          Music Title:
          <input
            type="text"
            value={musicTitle}
            onChange={(e) => setMusicTitle(e.target.value)}
          />
        </label>
        <label>
          Artist:
          <input
            type="text"
            value={musicArtist}
            onChange={(e) => setMusicArtist(e.target.value)}
          />
        </label>
        <label>
          Music File:
          <input
            type="file"
            onChange={(e) => setMusicFile(e.target.files[0])}
          />
        </label>
        <button type="submit">Upload Music</button>
      </form>
    </div>
  );
};

export default Admin;
