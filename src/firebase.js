import { initializeApp } from "firebase/app";
/* import { getStorage } from "firebase/storage"; */

const firebaseConfig = {
  apiKey: "AIzaSyCj_H9MVxC195Hzf1ydZSUrnN0XQ7Z2b70",
  authDomain: "arron-justice-music.firebaseapp.com",
  projectId: "arron-justice-music",
  storageBucket: "arron-justice-music.appspot.com",
  messagingSenderId: "627914210338",
  appId: "1:627914210338:web:18906a8821667036a09e7b",
};

const app = initializeApp(firebaseConfig);
/* const storage = getStorage(app); */

export default app;
