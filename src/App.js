import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { Header, Footer, Home, Music, Events, Gallery, Contact, Login, Admin } from './components';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(user != null);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/music" element={<Music />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={isAuthenticated ? <Admin /> : <Navigate to="/login" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;