import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import GlobalStyle from './styles/GlobalStyle';
import ScrollToTop from './utils/ScrollToTop';
import CustomCursor from './components/common/CustomCursor';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Page Components
import Home from './components/home/Home';
import Services from './components/services/Services';
import Projects from './components/projects/Projects';
import ProjectDetail from './components/projects/ProjectDetail';
import Clients from './components/clients/Clients';
import Blog from './components/blog/Blog';
import Contact from './components/contact/Contact';
import BlogDetail from './components/blog/BlogDetail';
import Team from './components/team/Team';
import Admin from './components/admin/Admin';

// Global Styles
import './styles/globals.css';
import './styles/responsive.css';

// AnimatePresence requires the use of useLocation
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Main website routes with Header */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/team" element={<Team />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Admin routes without Header/Footer */}
        <Route path="/admin/*" element={<Admin />} />
        
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  // Smooth scroll implementation
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <Router>
      <GlobalStyle />
      <CustomCursor />
      <ScrollToTop />
      <MainLayout />
    </Router>
  );
}

// Layout component to handle conditional rendering of Header/Footer
const MainLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  return (
    <>
      {!isAdminRoute && <Header />}
      <AnimatedRoutes />
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
