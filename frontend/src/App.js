import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            {/* Future pages like /helmet or /jacket will go here */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;