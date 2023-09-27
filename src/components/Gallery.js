import React, { useEffect, useState } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../firebase";
import "./css/Gallery.css";

import Background1 from "../img/Background/1.jpg";
import Background2 from "../img/Background/2.jpg";
import Background3 from "../img/Background/3.jpg";
import Background4 from "../img/Background/4.jpg";
import Background5 from "../img/Background/5.jpg";
import Background6 from "../img/Background/6.jpg";
import Background7 from "../img/Background/7.jpg";
import Background8 from "../img/Background/8.jpg";

const backgroundImages = [
  Background1,
  Background2,
  Background3,
  Background4,
  Background5,
  Background6,
  Background7,
  Background8,
];

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [backgroundIndex, setBackgroundIndex] = useState(1);
  const totalBackgroundImages = 8;

  useEffect(() => {
    const fetchImages = async () => {
      const storage = getStorage(app);
      const storageRef = ref(storage, "gallery/");
      const result = await listAll(storageRef);

      const db = getFirestore(app);
      const galleryCollection = collection(db, "Gallery");
      const gallerySnapshot = await getDocs(galleryCollection);

      const imageData = await Promise.all(
        result.items.map(async (imageRef) => {
          const url = await getDownloadURL(imageRef);
          const imageDoc = gallerySnapshot.docs.find(
            (doc) => doc.data().url === url
          );
          const title = imageDoc ? imageDoc.data().title : "";
          return { url, title };
        })
      );

      setImages(imageData);
    };

    fetchImages().catch((error) =>
      console.error("Error fetching images:", error)
    );

    const intervalId = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex % totalBackgroundImages) + 1);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImages[backgroundIndex]})`,
      }}
    >
      <h1>Gallery</h1>
      <section>
        {images.map((image, index) => (
          <figure key={index}>
            <img src={image.url} alt={`Gallery item ${index}`} />
            <figcaption>{image.title}</figcaption>
          </figure>
        ))}
      </section>
    </div>
  );
};

export default Gallery;