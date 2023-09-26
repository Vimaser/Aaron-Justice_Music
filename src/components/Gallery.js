import React, { useEffect, useState } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../firebase';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const storage = getStorage(app);
      const storageRef = ref(storage, 'gallery/');
      const result = await listAll(storageRef);

      const db = getFirestore(app);
      const galleryCollection = collection(db, 'Gallery');
      const gallerySnapshot = await getDocs(galleryCollection);

      const imageData = await Promise.all(
        result.items.map(async (imageRef) => {
          const url = await getDownloadURL(imageRef);
          const imageDoc = gallerySnapshot.docs.find(doc => doc.data().url === url);
          const title = imageDoc ? imageDoc.data().title : '';
          return { url, title };
        })
      );

      setImages(imageData);
    };

    fetchImages().catch((error) => console.error("Error fetching images:", error));
  }, []);

  return (
    <div>
      <h1>Gallery</h1>
      <section>
        {images.map((image, index) => (
          <figure key={index}>
            <img src={image.url} alt={`Gallery item ${index}`} />
            <h3>{image.title}</h3>
          </figure>
        ))}
      </section>
    </div>
  );
};

export default Gallery;