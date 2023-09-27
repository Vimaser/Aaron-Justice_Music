import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../firebase";
import "./css/Music.css";

const Music = () => {
  const [musicList, setMusicList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(app);
      const musicCollection = collection(db, "Music");
      const musicSnapshot = await getDocs(musicCollection);
      const musicList = musicSnapshot.docs.map((doc) => doc.data());
      setMusicList(musicList);
    };

    fetchData();
  }, []);

  return (
    <div className="music-background">
      <div className="music-container">
        <section>
        <h1>Music</h1>
        </section>
        {musicList.map((music, index) => (
          <div key={index} className="music-item">
            <h2>{music.title}</h2>
            <p>
              Release Date:{" "}
              {music.releaseDate
                ? music.releaseDate.toDate().toLocaleDateString()
                : "Not Available"}
            </p>
            {music.url && music.url.startsWith("<iframe") ? (
              <div
                className="iframe-container"
                dangerouslySetInnerHTML={{ __html: music.url }}
                sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              <a href={music.url} target="_blank" rel="noopener noreferrer">
                Listen Here
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Music;
