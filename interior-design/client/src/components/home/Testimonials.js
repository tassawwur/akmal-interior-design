import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/animations';

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Ahmed Khan',
    position: 'CEO, Luxury Properties',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    quote: 'ElegantSpace transformed our office beyond our expectations. Their attention to detail and understanding of our brand was exceptional. The result is a workspace that impresses clients and inspires our team daily.',
  },
  {
    id: 2,
    name: 'Fatima Rizvi',
    position: 'Interior Design Enthusiast',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    quote: 'We couldn\'t be happier with our home renovation. ElegantSpace team listened carefully to our needs and delivered a space that feels both luxurious and comfortable. They managed the entire project seamlessly.',
  },
  {
    id: 3,
    name: 'Omar Shahid',
    position: 'Restaurant Owner',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    quote: 'The design of our restaurant by ElegantSpace has been crucial to our success. They created an ambiance that customers love and keep coming back for. The space is not just beautiful but extremely functional.',
  },
  {
    id: 4,
    name: 'Zara Malik',
    position: 'Architect & Developer',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80',
    quote: 'As an architect myself, I have high standards. ElegantSpace not only met these standards but exceeded them. Their engineering solutions were innovative and their design aesthetic is unmatched in the industry.',
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  // Handle slide navigation
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 150) {
      nextSlide();
    }

    if (touchStart - touchEnd < -150) {
      prevSlide();
    }
  };

  return (
    <TestimonialsSection>
      <div className="container">
        <SectionHeader>
          <motion.h2 
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            What Our <span className="text-secondary">Clients Say</span>
          </motion.h2>
          <motion.p 
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Discover the experiences of clients who have transformed their spaces with our expertise
          </motion.p>
        </SectionHeader>
        
        <TestimonialsContainer
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <TestimonialsTrack 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <TestimonialSlide key={testimonial.id}>
                <QuoteIcon>
                  <i className="fas fa-quote-left"></i>
                </QuoteIcon>
                <TestimonialQuote>{testimonial.quote}</TestimonialQuote>
                <ProfileContainer>
                  <ProfileImage src={testimonial.image} alt={testimonial.name} />
                  <ProfileInfo>
                    <ProfileName>{testimonial.name}</ProfileName>
                    <ProfilePosition>{testimonial.position}</ProfilePosition>
                  </ProfileInfo>
                </ProfileContainer>
              </TestimonialSlide>
            ))}
          </TestimonialsTrack>
        </TestimonialsContainer>
        
        <SlideControls>
          <SlideButton onClick={prevSlide}>
            <i className="fas fa-chevron-left"></i>
          </SlideButton>
          
          <SlideIndicators>
            {testimonials.map((_, index) => (
              <SlideIndicator 
                key={index} 
                active={index === currentIndex}
                onClick={() => goToSlide(index)}
              />
            ))}
          </SlideIndicators>
          
          <SlideButton onClick={nextSlide}>
            <i className="fas fa-chevron-right"></i>
          </SlideButton>
        </SlideControls>
      </div>
    </TestimonialsSection>
  );
};

const TestimonialsSection = styled.section`
  padding: 120px 0;
  background-color: white;
  
  @media (max-width: 992px) {
    padding: 80px 0;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  
  h2 {
    font-size: 2.75rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    
    @media (max-width: 768px) {
      font-size: 2.25rem;
    }
    
    @media (max-width: 576px) {
      font-size: 1.85rem;
    }
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--text-secondary);
  }
`;

const TestimonialsContainer = styled.div`
  overflow: hidden;
  position: relative;
  max-width: 900px;
  margin: 0 auto;
`;

const TestimonialsTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease;
`;

const TestimonialSlide = styled.div`
  flex: 0 0 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const QuoteIcon = styled.div`
  font-size: 3rem;
  color: var(--secondary);
  opacity: 0.5;
  margin-bottom: 1.5rem;
`;

const TestimonialQuote = styled.p`
  font-size: 1.25rem;
  line-height: 1.8;
  color: var(--text-primary);
  font-family: var(--font-heading);
  font-style: italic;
  margin-bottom: 2rem;
  
  @media (max-width: 576px) {
    font-size: 1.1rem;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--secondary);
`;

const ProfileInfo = styled.div`
  text-align: left;
`;

const ProfileName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const ProfilePosition = styled.p`
  font-size: 0.9rem;
  color: var(--text-tertiary);
`;

const SlideControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  gap: 2rem;
`;

const SlideButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: var(--secondary);
    color: white;
  }
`;

const SlideIndicators = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SlideIndicator = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.active ? 'var(--secondary)' : '#dedede'};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--secondary);
    transform: scale(1.2);
  }
`;

export default Testimonials; 