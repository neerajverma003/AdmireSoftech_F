import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/Home/HomePage';
import ServicesPage from './pages/Services/ServicesPage';
import CareerPage from './pages/Career/CareerPage';
import FreelancePage from './pages/Freelance/FreelancePage';
import ContactPage from './pages/Contact/ContactPage';
import TeamPage from './pages/Team/TeamPage';
import SolutionsPage from './pages/Solutions/SolutionsPage';
import TechnologiesPage from './pages/Technologies/TechnologiesPage';
import IndustriesPage from './pages/Industries/IndustriesPage';
import FaqPage from './pages/Faq/FaqPage';
import AboutPage from './pages/About/AboutPage';
import AuthPage from './pages/Auth/AuthPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#070C1E] text-slate-100 selection:bg-cyan-500 selection:text-white">
          {/* Fixed Sticky Header Navbar */}
          <Navbar />

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage initialMode="login" />} />
          <Route path="/signin" element={<AuthPage initialMode="login" />} />
          <Route path="/signup" element={<AuthPage initialMode="signup" />} />
          <Route path="/register" element={<AuthPage initialMode="signup" />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solution" element={<SolutionsPage />} />
          <Route path="/technologies" element={<TechnologiesPage />} />
          <Route path="/tech-stack" element={<TechnologiesPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/industry" element={<IndustriesPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/careers" element={<CareerPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/freelance" element={<FreelancePage />} />
          <Route path="/freelance-projects" element={<FreelancePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/team-members" element={<TeamPage />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
