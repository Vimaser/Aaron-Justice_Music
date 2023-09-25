import React, { useEffect, useState } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import app from '../firebase';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const storage = getStorage(app);
        const galleryRef = ref(storage, 'gallery');
        const imageRefs = await listAll(galleryRef);
        const imageURLs = await Promise.all(imageRefs.items.map(itemRef => getDownloadURL(itemRef)));
        setImages(imageURLs);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h1>Gallery</h1>
      <section>
        {images.map((url, index) => (
          <figure key={index}>
            <img src={url} alt={`Gallery Image ${index + 1}`} />
            <figcaption>{`Gallery Image ${index + 1}`}</figcaption>
          </figure>
        ))}
      </section>
    </div>
  );
};

export default Gallery;