import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import app from "../firebase";
import "./css/Admin.css";

const Admin = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [events, setEvents] = useState([]);
  const [image, setImage] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [musicTitle, setMusicTitle] = useState("");
  const [musicArtist, setMusicArtist] = useState("");
  const [gallery, setGallery] = useState([]);
  const [musicList, setMusicList] = useState([]);
  const [musicURL, setMusicURL] = useState("");
  const [musicReleaseDate, setMusicReleaseDate] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(app);
      const messagesCollection = collection(db, "Messages");
      const messagesSnapshot = await getDocs(messagesCollection);
      const messagesList = messagesSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(messagesList);
    };

    fetchData();
  }, []);

  const handleDeleteMessage = async (messageId) => {
    const db = getFirestore();
    const messageRef = doc(db, 'Messages', messageId); 
    try {
      await deleteDoc(messageRef);
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleMusicUpload = async () => {
    try {
      const db = getFirestore(app);
      const musicCollection = collection(db, "Music");
      await addDoc(musicCollection, {
        title: musicTitle,
        artist: musicArtist,
        url: musicURL,
        releaseDate: new Date(musicReleaseDate),
      });

      setMusicTitle("");
      setMusicArtist("");
      setMusicURL("");
      setMusicReleaseDate("");
    } catch (error) {
      console.error("Error uploading music:", error);
    }
  };

  const handleDeleteMusic = async (id) => {
    try {
      const db = getFirestore(app);
      await deleteDoc(doc(db, "Music", id));
      setMusicList((musicList) => musicList.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting music:", error);
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

    const fetchGalleryAndMusic = async () => {
      const db = getFirestore(app);
      // Gallery
      const galleryCollection = collection(db, "Gallery");
      const gallerySnapshot = await getDocs(galleryCollection);
      setGallery(
        gallerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      // Music
      const musicCollection = collection(db, "Music");
      const musicSnapshot = await getDocs(musicCollection);
      setMusicList(
        musicSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    fetchGalleryAndMusic();
  }, []);

  const handleAddEvent = async () => {
    try {
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

      fetchEvents();
    } catch (error) {
      console.error("Error adding event: ", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const db = getFirestore(app);
      await deleteDoc(doc(db, "Events", id));

      fetchEvents();
    } catch (error) {
      console.error("Error deleting event: ", error);
    }
  };

  const fetchEvents = async () => {
    const db = getFirestore(app);
    const eventsCollection = collection(db, "Events");
    const eventsSnapshot = await getDocs(eventsCollection);
    const eventsList = eventsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setEvents(eventsList);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleImageUpload = async () => {
    try {
      const storageRef = ref(getStorage(app), "gallery/" + image.name);
      await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);

      const db = getFirestore(app);
      const galleryCollection = collection(db, "Gallery");
      const docRef = await addDoc(galleryCollection, {
        title: imageTitle,
        url: downloadURL,
      });

      setImage(null);
      setImageTitle("");

      setGallery((prevGallery) => [
        ...prevGallery,
        {
          id: docRef.id,
          title: imageTitle,
          url: downloadURL,
        },
      ]);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDeleteImage = async (image) => {
    try {
      console.log("Deleting image:", image);

      let fileName = image.fileName;
      if (!fileName) {
        console.warn(
          "Warning: image.fileName is undefined, extracting fileName from URL"
        );
        const urlParts = image.url.split("/");
        fileName = decodeURIComponent(
          urlParts[urlParts.length - 1].split("?")[0]
        );
      }

      const pathPrefix = "gallery/";
      if (!fileName.startsWith(pathPrefix)) {
        fileName = pathPrefix + fileName;
      }

      const storageRef = ref(getStorage(app), fileName);
      console.log("Full Path:", storageRef.fullPath);

      try {
        await deleteObject(storageRef);
      } catch (error) {
        console.error("Error deleting from Firebase Storage:", error);
      }

      const db = getFirestore(app);
      await deleteDoc(doc(db, "Gallery", image.id));

      setGallery(gallery.filter((item) => item.id !== image.id));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      <br/>

      {/* Event Form */}
      <h2>Event Management:</h2>
      <section className="section">
        
        <br/>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddEvent();
          }}
        >
          <div>
            <label>
              Event Name:
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Event Date:
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Location:
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
          </div>
          <button type="submit">Add Event</button>
        </form></section>
        <section>
        {events.map((event) => (
          <div key={event.id}>
            <h3>{event.eventName}</h3>
            <p>{event.eventDate.toDate().toLocaleDateString()}</p>
            <p>{event.location}</p>
            <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
          </div>
        ))}</section>
      

      
      <section/>
      {/* Gallery Form */}
      <section className="section">
       <h2>Gallery Management:</h2>
        <p className="warning-text">
          Please try to keep a limit on the number of images. Total storage is 1
          GiB, please do not exceed 200 photos otherwise I will be charged for
          the backend server fee. Thank you!
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleImageUpload();
          }}
        >
          <div>
            <label>
              Image:
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          </div>
          <button type="submit">Upload Image</button>
        </form>
        <div>
          {gallery.map((image) => (
            <div key={image.id}>
              <h3>{image.title}</h3>
              <img src={image.url} alt={image.title} />
              <button onClick={() => handleDeleteImage(image)}>Delete</button>
            </div>
          ))}
        </div>
      </section>

      {/* Message Form */}
      <section className="section">
        <div>
          <section>
            <h2>Messages</h2>
            {messages.map((message) => (
              <div key={message.id}>
                <p>Name: {message.name}</p>
                <p>Email: {message.email}</p>
                <p>Message: {message.message}</p>
                <p>Date: {message.timestamp?.toDate().toLocaleString()}</p>
                <button onClick={() => handleDeleteMessage(message.id)}>
                  Delete Message
                </button>
              </div>
            ))}
          </section>
        </div>
      </section>

      {/* Music Form */}
      <section className="section">
        <h2>Music Management</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleMusicUpload();
          }}
        >
          <div>
            <label>
              Music Title:
              <input
                type="text"
                value={musicTitle}
                onChange={(e) => setMusicTitle(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Release Date:
              <input
                type="date"
                value={musicReleaseDate}
                onChange={(e) => setMusicReleaseDate(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Music URL:
              <p>Use an embedded URL to display an iframe.</p>
              <input
                type="text"
                value={musicURL}
                onChange={(e) => setMusicURL(e.target.value)}
              />
            </label>
          </div>
          <button type="submit">Add Music</button>
        </form>
        <div>
          {musicList.map((music) => (
            <div key={music.id}>
              <h3>{music.title}</h3>
              <p>{music.artist}</p>
              <button onClick={() => handleDeleteMusic(music.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Admin;
