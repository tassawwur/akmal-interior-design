import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fadeIn, staggerContainer, imageReveal } from '../../utils/animations';

// Placeholder image URLs
const ABOUT_IMAGE_1 = "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";
const ABOUT_IMAGE_2 = "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const inView = useInView(statsRef, { once: true });

  useEffect(() => {
    const element = sectionRef.current;
    
    if (element) {
      // Animate images
      gsap.from('.about-image-1', {
        x: -100,
        opacity: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'center center',
          scrub: 1,
        },
      });
      
      gsap.from('.about-image-2', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: element,
          start: 'top 70%',
          end: 'center center',
          scrub: 1,
        },
      });
    }
  }, []);

  return (
    <AboutWrapper ref={sectionRef}>
      <div className="container">
        <AboutContent>
          <AboutImagesWrapper>
            <Image1Wrapper className="about-image-1">
              <motion.img 
                src={ABOUT_IMAGE_1} 
                alt="Modern Interior Design" 
                variants={imageReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              />
            </Image1Wrapper>
            <Image2Wrapper className="about-image-2">
              <motion.img 
                src={ABOUT_IMAGE_2} 
                alt="Elegant Space Design" 
                variants={imageReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              />
            </Image2Wrapper>
            <ExperienceBadge>
              <span className="number">15</span>
              <span className="text">Years of<br />Excellence</span>
            </ExperienceBadge>
          </AboutImagesWrapper>
          
          <AboutTextContent>
            <motion.div
              variants={staggerContainer(0.1, 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <SubHeading variants={fadeIn("up", 0.1)}>THE AANGANLAB LEGACY</SubHeading>
              <Heading variants={fadeIn("up", 0.2)}>
                Crafting <span className="text-secondary">Extraordinary Environments</span> Since 2008
              </Heading>
              
              <Description variants={fadeIn("up", 0.3)}>
                AANGANLAB stands as Pakistan's premier design authority, transcending conventional interior design to create immersive environments that reflect perfection and purpose. Our unrivaled mastery in design, bespoke craftsmanship, and meticulous project execution has established us as the definitive choice for the nation's elite residences, luxury hospitality venues, and prestigious corporate environments.
              </Description>
              
              <Features variants={fadeIn("up", 0.4)}>
                <FeatureItem>
                  <i className="fas fa-check"></i>
                  <span>Bespoke Design Solutions</span>
                </FeatureItem>
                <FeatureItem>
                  <i className="fas fa-check"></i>
                  <span>Master Craftmanship</span>
                </FeatureItem>
                <FeatureItem>
                  <i className="fas fa-check"></i>
                  <span>Exemplary Project Execution</span>
                </FeatureItem>
                <FeatureItem>
                  <i className="fas fa-check"></i>
                  <span>White-Glove Client Experience</span>
                </FeatureItem>
              </Features>
              
              <StatsGrid ref={statsRef} variants={fadeIn("up", 0.5)}>
                <StatItem>
                  <StatNumber>
                    {inView && <Counter from={0} to={250} duration={2} />}
                    <span>+</span>
                  </StatNumber>
                  <StatLabel>Exclusive Projects</StatLabel>
                </StatItem>
                <StatItem>
                  <StatNumber>
                    {inView && <Counter from={0} to={120} duration={2} />}
                    <span>+</span>
                  </StatNumber>
                  <StatLabel>Distinguished Clients</StatLabel>
                </StatItem>
                <StatItem>
                  <StatNumber>
                    {inView && <Counter from={0} to={15} duration={2} />}
                    <span>+</span>
                  </StatNumber>
                  <StatLabel>Years of Mastery</StatLabel>
                </StatItem>
                <StatItem>
                  <StatNumber>
                    {inView && <Counter from={0} to={35} duration={2} />}
                    <span>+</span>
                  </StatNumber>
                  <StatLabel>Design Specialists</StatLabel>
                </StatItem>
              </StatsGrid>
            </motion.div>
          </AboutTextContent>
        </AboutContent>
      </div>
    </AboutWrapper>
  );
};

// Counter component for statistics animation
const Counter = ({ from, to, duration }) => {
  const nodeRef = useRef(null);
  
  useEffect(() => {
    const node = nodeRef.current;
    
    const updateCount = () => {
      const start = from;
      const end = to;
      const startTimestamp = performance.now();
      const step = (timestamp) => {
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        const currentCount = Math.floor(progress * (end - start) + start);
        if (node) node.textContent = currentCount;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };
    
    updateCount();
  }, [from, to, duration]);
  
  return <span ref={nodeRef}>{from}</span>;
};

const AboutWrapper = styled.section`
  padding: 120px 0;
  background-color: #f9f9f9;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 992px) {
    padding: 80px 0;
  }
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const AboutImagesWrapper = styled.div`
  position: relative;
  height: 600px;
  
  @media (max-width: 992px) {
    height: 500px;
  }
  
  @media (max-width: 768px) {
    height: 400px;
  }
`;

const Image1Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 60%;
  height: 60%;
  z-index: 5;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const Image2Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60%;
  height: 60%;
  z-index: 2;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const ExperienceBadge = styled.div`
  position: absolute;
  top: 60%;
  left: 45%;
  transform: translate(-50%, -50%);
  background-color: var(--secondary);
  color: white;
  padding: 1.5rem;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  box-shadow: 0 10px 30px rgba(220, 168, 103, 0.3);
  
  .number {
    font-family: var(--font-heading);
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1;
  }
  
  .text {
    font-size: 0.75rem;
    text-align: center;
    font-weight: 500;
  }
  
  @media (max-width: 576px) {
    width: 100px;
    height: 100px;
    padding: 1rem;
    
    .number {
      font-size: 2rem;
    }
    
    .text {
      font-size: 0.7rem;
    }
  }
`;

const AboutTextContent = styled.div`
  @media (max-width: 992px) {
    order: -1;
  }
`;

const SubHeading = styled(motion.div)`
  font-size: 1rem;
  font-weight: 600;
  color: var(--secondary);
  margin-bottom: 1rem;
  letter-spacing: 2px;
`;

const Heading = styled(motion.h2)`
  font-size: 2.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  @media (max-width: 576px) {
    font-size: 2rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 2rem;
`;

const Features = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2.5rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  i {
    color: var(--secondary);
    font-size: 1rem;
  }
  
  span {
    font-weight: 500;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
  
  span {
    color: var(--secondary);
  }
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
`;

export default AboutSection; 