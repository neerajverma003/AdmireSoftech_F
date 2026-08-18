import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/Home/HomePage';
import ServicesPage from './pages/Services/ServicesPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#070C1E] text-slate-100 selection:bg-cyan-500 selection:text-white">
        {/* Fixed Sticky Header Navbar */}
        <Navbar />

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
