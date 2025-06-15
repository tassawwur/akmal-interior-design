import React, { useEffect, useState, Suspense, lazy } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';

// Import Sections - Lazy load to improve initial load time
const HeroSection = lazy(() => import('./HeroSection'));
const AboutSection = lazy(() => import('./AboutSection'));
const ServicesSection = lazy(() => import('./Services'));
const ProjectsShowcase = lazy(() => import('./ProjectsShowcase'));
const Testimonials = lazy(() => import('./Testimonials'));
const ContactSection = lazy(() => import('./ContactSection'));

// Loading component for suspense fallback
const SectionLoader = () => (
  <LoaderWrapper>
    <LoadingSpinner />
  </LoaderWrapper>
);

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Scroll to top on page load and simulate data loading
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <PageLoader>
        <LoadingSpinner />
        <LoadingText>Loading amazing spaces...</LoadingText>
      </PageLoader>
    );
  }

  return (
    <HomeWrapper
      variants={pageTransition}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Suspense fallback={<SectionLoader />}>
        <HeroSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ServicesSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ProjectsShowcase />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ContactSection />
      </Suspense>
    </HomeWrapper>
  );
};

const HomeWrapper = styled(motion.main)`
  overflow: hidden;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;
`;

const PageLoader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: var(--bg-color);
`;

const LoadingText = styled.p`
  margin-top: 20px;
  font-size: 1.2rem;
  color: var(--secondary);
  font-family: var(--font-heading);
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(var(--secondary-rgb), 0.2);
  border-radius: 50%;
  border-top-color: var(--secondary);
  animation: spin 1s ease infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Home; 