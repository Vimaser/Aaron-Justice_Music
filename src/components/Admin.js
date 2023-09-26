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
  const [gallery, setGallery] = useState([]);
  const [musicList, setMusicList] = useState([]);

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

  const handleDeleteMusic = async (music) => {
    try {
      const storageRef = ref(getStorage(app), "music/" + music.title);
      await deleteObject(storageRef);

      const db = getFirestore(app);
      await deleteDoc(doc(db, "Music", music.id));

      setMusicList(musicList.filter((item) => item.id !== music.id));
    } catch (error) {
      console.error("Error deleting music:", error);
    }
  };

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
    <div>
      <h1>Admin Panel</h1>
      {/* Event Form */}
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

      {/* Gallery Form */}
      <h2>Gallery Management</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleImageUpload();
        }}
      >
        <div>
          <label>
            Image:
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
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

      {/* Music Form */}
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
            Artist:
            <input
              type="text"
              value={musicArtist}
              onChange={(e) => setMusicArtist(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Music File:
            <input
              type="file"
              onChange={(e) => setMusicFile(e.target.files[0])}
            />
          </label>
        </div>
        <button type="submit">Upload Music</button>
      </form>
      <div>
        {musicList.map((music) => (
          <div key={music.id}>
            <h3>{music.title}</h3>
            <p>{music.artist}</p>
            <button onClick={() => handleDeleteMusic(music.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
