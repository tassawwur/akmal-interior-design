import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../common/Button';

// Load GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// TODO: Replace with your actual production image URL
const HERO_IMAGE = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    // Parallax effect for hero image - only on desktop
    const element = sectionRef.current;
    const image = imageRef.current;

    if (element && image && windowWidth >= 992) {
      // Parallax animation for image
      gsap.to(image, {
        y: 100,
        scrollTrigger: {
          trigger: element,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      // Clean up ScrollTrigger on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [windowWidth]);

  return (
    <HeroWrapper ref={sectionRef}>
      <HeroContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-text"
        >
          <HeroTagline>
            <span className="tagline-text">AKMAL</span>
            <TaglineSeparator className="tagline-separator">•</TaglineSeparator>
            <span className="tagline-text">Pakistan's Elite Interior Design Atelier</span>
          </HeroTagline>
          
          <HeroTitle>
            Elevating Spaces to
            <TitleBreak /> 
            Extraordinary 
            <TitleBreak /> 
            Masterpieces
          </HeroTitle>
          
          <HeroDescription>
            Where visionary design meets unparalleled craftsmanship. For over 15 years, we've been the trusted choice of Pakistan's most discerning clients, transforming exceptional properties into bespoke sanctuaries of luxury and sophistication.
          </HeroDescription>
          
          <ButtonGroup>
            <Link to="/contact">
              <Button variant="primary" size="large">
                Commission Your Vision
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="outline" size="large">
                Explore Our Legacy
              </Button>
            </Link>
          </ButtonGroup>
          
          <TrustSignals>
            <span className="trust-text">
              <TrustIcon className="fas fa-award" aria-hidden="true" />
              Award-Winning Design
            </span>
            <span className="trust-text">
              <TrustIcon className="fas fa-gem" aria-hidden="true" />
              Luxury Expertise
            </span>
            <span className="trust-text">
              <TrustIcon className="fas fa-certificate" aria-hidden="true" />
              Exclusive Service
            </span>
          </TrustSignals>
        </motion.div>
      </HeroContent>
      
      <OverlayWrapper>
        <Overlay />
      </OverlayWrapper>
      
      <HeroImageWrapper ref={imageRef}>
        <picture>
          {/* Responsive image sources */}
          <source
            media="(max-width: 576px)"
            srcSet="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
          />
          <source
            media="(max-width: 992px)"
            srcSet="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70"
          />
          <HeroImage 
            src={HERO_IMAGE} 
            alt="AKMAL. Interior Design" 
            loading="eager"
            fetchpriority="high"
          />
        </picture>
      </HeroImageWrapper>
      
      <ScrollIndicator>
        <i className="fas fa-chevron-down" aria-hidden="true"></i>
        <span className="sr-only">Scroll Down</span>
        <span className="scroll-text">Scroll Down</span>
      </ScrollIndicator>
    </HeroWrapper>
  );
};

const HeroWrapper = styled.section`
  height: 100vh;
  min-height: 600px;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-top: 80px; /* Increased padding to prevent overlap with fixed header */
  
  @media (min-width: 768px) {
    min-height: 650px;
    padding-top: 100px; /* Ensure proper spacing on larger screens */
  }
  
  @media (min-width: 992px) {
    min-height: 700px;
    padding-top: 120px; /* Maintain proper spacing on desktop */
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 var(--container-padding, 1.5rem);
  max-width: 1200px;
  margin: 0 auto;
  
  .hero-text {
    text-align: left;
    max-width: 600px;
  }
  
  @media (min-width: 768px) {
    padding-left: calc(var(--container-padding, 1.5rem) * 1.25);
    width: 95%;
    margin: 0;
    
    .hero-text {
      max-width: 500px;
    }
  }
  
  @media (min-width: 992px) {
    width: 55%;
    padding-left: calc(var(--container-padding, 1.5rem) * 1.5);
    
    .hero-text {
      max-width: 520px;
    }
  }
  
  @media (min-width: 1200px) {
    width: 50%;
    
    .hero-text {
      max-width: 550px;
    }
  }
  
  @media (min-width: 1400px) {
    width: 45%;
    padding-left: calc(var(--container-padding, 1.5rem) * 2);
  }
`;

const HeroTagline = styled.div`
  font-family: var(--font-primary);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1.25rem;
  letter-spacing: 1px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  color: var(--color-text-dark);
  
  @media (min-width: 768px) {
    font-size: 1rem;
    letter-spacing: 2px;
    margin-bottom: 1.5rem;
  }
  
  @media (min-width: 992px) {
    font-size: 1.25rem;
    margin-bottom: 1.75rem;
  }
`;

const TaglineSeparator = styled.span`
  margin: 0 8px;
  color: var(--color-secondary);
  
  @media (min-width: 768px) {
    margin: 0 12px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--color-text-dark);
  line-height: 1.15;
  
  @media (min-width: 576px) {
    font-size: 2.5rem;
  }
  
  @media (min-width: 768px) {
    font-size: 2.75rem;
  }
  
  @media (min-width: 992px) {
    font-size: 3.25rem;
  }
`;

const TitleBreak = styled.br`
  @media (max-width: 576px) {
    content: ' ';
    display: inline;
    
    &::after {
      content: ' ';
    }
  }
`;

const HeroDescription = styled.p`
  font-size: 0.95rem;
  color: var(--color-text-medium);
  margin-bottom: 1.25rem;
  max-width: 600px;
  line-height: 1.5;
  
  @media (min-width: 768px) {
    font-size: 1rem;
  }
  
  @media (min-width: 992px) {
    font-size: 1.1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    gap: 1rem;
  }
  
  .btn-secondary {
    background-color: transparent;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
    
    &:hover {
      background-color: var(--color-primary-light);
    }
  }
`;

const OverlayWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.8) 30%,
    rgba(255, 255, 255, 0.6) 60%,
    rgba(255, 255, 255, 0.3) 100%
  );
  
  @media (min-width: 768px) {
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.85) 0%,
      rgba(255, 255, 255, 0.7) 40%,
      rgba(255, 255, 255, 0.4) 70%,
      rgba(255, 255, 255, 0.2) 100%
    );
  }
  
  @media (min-width: 992px) {
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(255, 255, 255, 0.6) 50%,
      rgba(255, 255, 255, 0.2) 100%
    );
  }
`;

const HeroImageWrapper = styled.div`
  position: absolute;
  top: 0; /* Default for mobile */
  right: 0;
  width: 100%; /* Cover full background on mobile */
  height: 100%;
  z-index: 1; /* Behind overlay and content */

  picture {
    display: block;
    width: 100%;
    height: 100%;
  }
  
  @media (min-width: 992px) {
    width: 60%; /* Reduced from 65% to create more space */
    top: 80px; /* Start lower, adjust based on final navbar height */
    height: calc(100% - 80px); /* Adjust height to fit */
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center; /* Adjust as needed, e.g., 'top center' */
`;

const TrustSignals = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  
  @media (min-width: 768px) {
    margin-top: 0.75rem;
  }
  
  .trust-text {
    font-size: 0.75rem;
    color: var(--color-text-light);
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }
  
  .divider {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: var(--color-text-light);
    opacity: 0.5;
  }
`;

const TrustIcon = styled.i`
  color: var(--color-secondary);
  font-size: 1.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (min-width: 992px) {
    font-size: 1.25rem;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary);
  font-size: 0.75rem;
  z-index: 10;
  animation: bounce 2s infinite;
  
  i {
    font-size: 1rem;
  }
  
  .scroll-text {
    display: none;
  }
  
  @media (min-width: 768px) {
    bottom: 2rem;
    font-size: 0.875rem;
    
    i {
      font-size: 1.25rem;
    }
    
    .scroll-text {
      display: block;
    }
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0) translateX(-50%);
    }
    40% {
      transform: translateY(-10px) translateX(-50%);
    }
    60% {
      transform: translateY(-5px) translateX(-50%);
    }
  }
`;

export default HeroSection; 