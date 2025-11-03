import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Home from './pages/Home';
import Stats from './pages/Stats';
import './App.css';

function App() {
  return (
    <BookProvider>
      <Router>
        <div className="App">
          <nav>
            <Link to="/">🏠 Beranda</Link>
            <Link to="/stats">📊 Statistik</Link>
          </nav>

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </main>
        </div>
      </Router>
    </BookProvider>
  );
}

export default App;