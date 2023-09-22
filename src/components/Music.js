import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../firebase';

const Music = () => {
  const [musicList, setMusicList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(app);
      const musicCollection = collection(db, 'Music');
      const musicSnapshot = await getDocs(musicCollection);
      const musicList = musicSnapshot.docs.map(doc => doc.data());
      setMusicList(musicList);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Music</h1>
      {musicList.map((music, index) => (
        <div key={index}>
          <h2>{music.title}</h2>
          <p>Release Date: {music.releaseDate.toDate().toLocaleDateString()}</p>
          <a href={music.url} target="_blank" rel="noopener noreferrer">Listen Here</a>
        </div>
      ))}
    </div>
  );
};

export default Music;