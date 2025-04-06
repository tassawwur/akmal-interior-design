import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../utils/animations';
import Button from '../common/Button';

// Client data
const clientLogos = [
  {
    id: 1,
    name: 'EON Holdings',
    logo: 'data:image/png;base64,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',
    industry: 'Real Estate'
  },
  {
    id: 2,
    name: 'Avari Hotels',
    logo: 'https://placehold.co/200x100/222/fff?text=Avari',
    industry: 'Hospitality'
  },
  {
    id: 3,
    name: 'HBL',
    logo: 'https://cdn.brandfetch.io/idOXcWvamc/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1668518750942',
    industry: 'Leading Bank, Finance'
  },
  {
    id: 4,
    name: 'UBL',
    logo: 'https://cdn.brandfetch.io/idiPQ2YvqF/w/480/h/480/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1736956803657',
    industry: 'Bank, Finance'
  },
  {
    id: 5,
    name: 'Mayo Hospital',
    logo: 'https://seeklogo.com/images/M/mayo-hospital-lahore-logo-A30A2FFB26-seeklogo.com.png',
    industry: 'Hospital'
  },
  {
    id: 6,
    name: 'BUNDU KHAN Restaurants',
    logo: 'https://media.licdn.com/dms/image/v2/C510BAQGOiGsIM9l8FQ/company-logo_200_200/company-logo_200_200/0/1631401771833/bundu_khan_foods_logo?e=2147483647&v=beta&t=YcrKKvG8GkWZfLeaP9DZ8zoU498qSK-UVl0rELirkx0',
    industry: 'Food & Beverage'
  },
  {
    id: 7,
    name: 'Urban Living',
    logo: 'https://scontent.fmux3-1.fna.fbcdn.net/v/t39.30808-1/304193968_502026561934627_4984702570645922771_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=109&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=rovv3Y6w5zMQ7kNvgEY5HU_&_nc_oc=AdkBzroz8V1kywvbSr1N7vWxhsMbPNh0r9QvxZ_D2XNPmEuaMQ6hyeJLh4guZIFF7mM&_nc_zt=24&_nc_ht=scontent.fmux3-1.fna&_nc_gid=OY0H2_zUVSbEJmj6fFAfTw&oh=00_AYGox41XvWNusHonTsjFImAPqE0QTWNb-tV7A6g_v8Xkxg&oe=67ED55CF',
    industry: 'Apartment Complexes'
  },
  {
    id: 8,
    name: 'Oasis Retreats',
    logo: 'https://retreatoasisportugal.com/wp-content/uploads/2022/03/Logo-ReatreaOasisPortugal_v01-2.png',
    industry: 'Resorts & Spas'
  }
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    client: 'Asadullah Tariq',
    position: 'Manager, Eon Holdings',
    image: 'https://eonpodcast.com/wp-content/uploads/elementor/thumbs/Asadullah-qqlspci03zwbv5fl1silmdfvhanetp8ownly3f0w34.jpg',
    testimony: 'Working with this design team transformed our commercial spaces beyond our expectations. Their attention to detail and ability to understand our brand ethos resulted in spaces that perfectly align with our corporate identity.',
    rating: 5
  },
  {
    id: 2,
    client: 'Imran Khan',
    position: 'Director, Avari Hotels',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    testimony: 'The design team created a beautiful and functional hotel lobby that has received countless compliments from our guests. Their ability to balance aesthetics with practicality is truly impressive.',
    rating: 5
  },
  {
    id: 3,
    client: 'Amina Malik',
    position: 'Owner, Serene Spaces',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    testimony: 'Our wellness center needed a design that promotes calm and healing. The team delivered a space that perfectly embodies tranquility while maintaining a modern and sophisticated aesthetic.',
    rating: 4
  },
  {
    id: 4,
    client: 'Hassan Ali',
    position: 'Managing Director, Urban Living',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    testimony: "The team's innovative approach to space optimization in our apartment complexes has significantly increased our property values. Their designs are both beautiful and practical.",
    rating: 5
  }
];

// Case studies
const caseStudies = [
  {
    id: 1,
    client: 'EON Holdings',
    title: 'Modern Office Transformation',
    image: 'https://images.pexels.com/photos/221537/pexels-photo-221537.jpeg?auto=compress&cs=tinysrgb&w=600',
    summary: 'A complete redesign of a 10,000 sq ft corporate headquarters with focus on employee wellness and productivity.',
    projectId: 'modern-office-transformation'
  },
  {
    id: 2,
    client: 'Azure Hotels',
    title: 'Luxury Hotel Redesign',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    summary: 'An elegant renovation of a 5-star hotel lobby and guest rooms combining local cultural elements with modern luxury.',
    projectId: 'luxury-hotel-redesign'
  },
  {
    id: 3,
    client: 'Serene Spaces',
    title: 'Wellness Center Design',
    image: 'https://images.unsplash.com/photo-1593526613712-7b4b9a707330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    summary: 'A holistic design approach for a wellness center focused on creating a healing and calming environment for clients.',
    projectId: 'wellness-center-design'
  },
  {
    id: 4,
    client: 'Crystal Restaurants',
    title: 'Contemporary Restaurant Design',
    image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
    summary: 'A vibrant and welcoming restaurant design that enhances the dining experience while maximizing seating capacity.',
    projectId: 'contemporary-restaurant-design'
  }
];

// Satisfaction metrics
const satisfactionMetrics = [
  { id: 1, metric: 'Client Satisfaction', value: '98%', icon: 'fas fa-smile' },
  { id: 2, metric: 'Projects Completed', value: '150+', icon: 'fas fa-check-circle' },
  { id: 3, metric: 'Repeat Clients', value: '85%', icon: 'fas fa-redo' },
  { id: 4, metric: 'On-time Delivery', value: '97%', icon: 'fas fa-clock' }
];

const Clients = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <ClientsWrapper
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: 20 }}
    >
      {/* Hero Section */}
      <HeroSection variants={fadeIn}>
        <div className="overlay"></div>
        <div className="content">
          <h1>Our Clients</h1>
          <p>Trusted by leading organizations across various industries</p>
        </div>
      </HeroSection>
      
      {/* Client Logos Section */}
      <SectionContainer variants={fadeIn}>
        <SectionHeader>
          <h2>Trusted By Industry Leaders</h2>
          <p>We've had the privilege of working with prestigious organizations across various sectors</p>
        </SectionHeader>
        
        <LogoGrid>
          {clientLogos.map(client => (
            <LogoItem key={client.id}>
              <div className="logo">
                <img src={client.logo} alt={client.name} />
              </div>
              <div className="client-info">
                <h3>{client.name}</h3>
                <p>{client.industry}</p>
              </div>
            </LogoItem>
          ))}
        </LogoGrid>
      </SectionContainer>
      
      {/* Testimonials Section */}
      <TestimonialsSection variants={fadeIn}>
        <div className="overlay"></div>
        <div className="content">
          <SectionHeader light>
            <h2>What Our Clients Say</h2>
            <p>Don't just take our word for it - hear directly from those who have experienced our design approach</p>
          </SectionHeader>
          
          <TestimonialSlider>
            <TestimonialContainer>
              {testimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={testimonial.id} 
                  className={activeTestimonial === index ? 'active' : ''}
                >
                  <div className="quote-icon">
                    <i className="fas fa-quote-left"></i>
                  </div>
                  <p className="testimony">{testimonial.testimony}</p>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i} 
                        className={`fas fa-star ${i < testimonial.rating ? 'filled' : ''}`}
                      ></i>
                    ))}
                  </div>
                  <div className="client-info">
                    <div className="client-image">
                      <img src={testimonial.image} alt={testimonial.client} />
                    </div>
                    <div className="client-details">
                      <h4>{testimonial.client}</h4>
                      <p>{testimonial.position}</p>
                    </div>
                  </div>
                </TestimonialCard>
              ))}
            </TestimonialContainer>
            
            <TestimonialNav>
              {testimonials.map((_, index) => (
                <TestimonialDot 
                  key={index} 
                  className={activeTestimonial === index ? 'active' : ''}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </TestimonialNav>
          </TestimonialSlider>
        </div>
      </TestimonialsSection>
      
      {/* Case Studies Section */}
      <SectionContainer variants={fadeIn}>
        <SectionHeader>
          <h2>Case Studies</h2>
          <p>Explore some of our most impactful projects and the process behind their successful execution</p>
        </SectionHeader>
        
        <CaseStudyGrid>
          {caseStudies.map(study => (
            <CaseStudyCard key={study.id}>
              <div className="image">
                <img src={study.image} alt={study.title} />
                <div className="client">{study.client}</div>
              </div>
              <div className="content">
                <h3>{study.title}</h3>
                <p>{study.summary}</p>
                <Link to={`/projects/${study.projectId}`} className="view-case">
                  View Case Study <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </CaseStudyCard>
          ))}
        </CaseStudyGrid>
      </SectionContainer>
      
      {/* Client Satisfaction */}
      <SatisfactionSection variants={fadeIn}>
        <SectionHeader>
          <h2>Client Satisfaction</h2>
          <p>We measure our success by the satisfaction of our clients and the impact of our designs</p>
        </SectionHeader>
        
        <MetricsGrid>
          {satisfactionMetrics.map(metric => (
            <MetricCard key={metric.id}>
              <div className="icon">
                <i className={metric.icon}></i>
              </div>
              <div className="value">{metric.value}</div>
              <div className="metric">{metric.metric}</div>
            </MetricCard>
          ))}
        </MetricsGrid>
      </SatisfactionSection>
      
      {/* CTA Section */}
      <CtaSection variants={fadeIn}>
        <div className="overlay"></div>
        <div className="content">
          <h2>Ready to join our list of satisfied clients?</h2>
          <p>Let's discuss how we can create beautiful, functional spaces tailored to your needs</p>
          <Button as={Link} to="/contact">Schedule a Consultation</Button>
        </div>
      </CtaSection>
    </ClientsWrapper>
  );
};

const ClientsWrapper = styled(motion.div)`
  max-width: 100%;
  overflow-x: hidden;
`;

const HeroSection = styled(motion.div)`
  position: relative;
  height: 60vh;
  width: 100%;
  background-image: url('https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
  }
  
  .content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 0 20px;
    
    h1 {
      font-size: 4rem;
      color: white;
      margin-bottom: 15px;
      font-weight: 700;
    }
    
    p {
      font-size: 1.4rem;
      color: var(--color-gold);
      font-weight: 500;
    }
  }
  
  @media (max-width: 768px) {
    height: 40vh;
    
    .content {
      h1 {
        font-size: 2.5rem;
      }
      
      p {
        font-size: 1.2rem;
      }
    }
  }
`;

const SectionContainer = styled(motion.section)`
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 20px;
  
  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: ${props => props.light ? 'white' : 'var(--color-text-dark)'};
    ${props => props.light && 'text-shadow: 0 2px 4px rgba(0,0,0,0.6);'}
  }
  
  p {
    font-size: 1.2rem;
    color: ${props => props.light ? 'rgba(255, 255, 255, 0.9)' : 'var(--color-text)'};
    max-width: 700px;
    margin: 0 auto;
    ${props => props.light && 'text-shadow: 0 1px 3px rgba(0,0,0,0.5);'}
  }
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
    
    h2 {
      font-size: 2rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
`;

const LogoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const LogoItem = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: var(--shadow-sm);
  padding: 30px;
  text-align: center;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
  }
  
  .logo {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  
  .client-info {
    h3 {
      font-size: 1.2rem;
      margin-bottom: 5px;
      color: var(--color-text-dark);
    }
    
    p {
      font-size: 0.9rem;
      color: var(--color-text);
      opacity: 0.8;
    }
  }
`;

const TestimonialsSection = styled(motion.section)`
  position: relative;
  background-image: url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');
  background-size: cover;
  background-position: center;
  padding: 100px 20px;
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.75);
  }
  
  .content {
    position: relative;
    z-index: 2;
    max-width: 1400px;
    margin: 0 auto;
  }
`;

const TestimonialSlider = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const TestimonialContainer = styled.div`
  position: relative;
  height: 350px;
  
  @media (max-width: 768px) {
    height: 400px;
  }
  
  @media (max-width: 576px) {
    height: 450px;
  }
`;

const TestimonialCard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 40px;
  opacity: 0;
  transform: translateX(50px);
  transition: all 0.5s ease;
  visibility: hidden;
  
  &.active {
    opacity: 1;
    transform: translateX(0);
    visibility: visible;
  }
  
  .quote-icon {
    font-size: 2rem;
    color: var(--color-gold);
    margin-bottom: 20px;
  }
  
  .testimony {
    font-size: 1.1rem;
    line-height: 1.7;
    color: white;
    margin-bottom: 25px;
    font-style: italic;
  }
  
  .rating {
    margin-bottom: 25px;
    
    i {
      color: #666;
      margin-right: 5px;
      
      &.filled {
        color: var(--color-gold);
      }
    }
  }
  
  .client-info {
    display: flex;
    align-items: center;
    
    .client-image {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 15px;
      border: 2px solid var(--color-gold);
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .client-details {
      h4 {
        font-size: 1.1rem;
        color: white;
        margin-bottom: 5px;
      }
      
      p {
        font-size: 0.9rem;
        color: var(--color-gold);
      }
    }
  }
  
  @media (max-width: 768px) {
    padding: 30px;
    
    .testimony {
      font-size: 1rem;
    }
  }
`;

const TestimonialNav = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const TestimonialDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  margin: 0 5px;
  cursor: pointer;
  transition: var(--transition);
  
  &.active {
    background: var(--color-gold);
    transform: scale(1.2);
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

const CaseStudyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const CaseStudyCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
    
    .image img {
      transform: scale(1.05);
    }
    
    .view-case {
      color: var(--color-gold);
      
      i {
        transform: translateX(5px);
      }
    }
  }
  
  .image {
    position: relative;
    height: 250px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    .client {
      position: absolute;
      top: 15px;
      right: 15px;
      background: var(--color-gold);
      color: white;
      padding: 5px 15px;
      border-radius: 30px;
      font-size: 0.8rem;
      font-weight: 600;
    }
  }
  
  .content {
    padding: 30px;
    
    h3 {
      font-size: 1.5rem;
      margin-bottom: 15px;
      color: var(--color-text-dark);
    }
    
    p {
      color: var(--color-text);
      margin-bottom: 20px;
      line-height: 1.6;
    }
    
    .view-case {
      color: var(--color-text-dark);
      font-weight: 600;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      transition: var(--transition);
      
      i {
        margin-left: 8px;
        transition: transform 0.3s ease;
      }
    }
  }
`;

const SatisfactionSection = styled(motion.section)`
  background-color: var(--color-bg-light);
  padding: 80px 20px;
  
  .container {
    max-width: 1400px;
    margin: 0 auto;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const MetricCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 40px 20px;
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
    
    .icon {
      transform: scale(1.1);
      background: var(--color-gold);
      color: white;
    }
  }
  
  .icon {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: var(--color-bg-light);
    color: var(--color-gold);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    margin: 0 auto 20px;
    transition: all 0.3s ease;
  }
  
  .value {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-text-dark);
    margin-bottom: 10px;
  }
  
  .metric {
    font-size: 1.1rem;
    color: var(--color-text);
  }
`;

const CtaSection = styled(motion.div)`
  position: relative;
  background-image: url('https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');
  background-size: cover;
  background-position: center;
  padding: 100px 20px;
  text-align: center;
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
  }
  
  .content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    margin: 0 auto;
    
    h2 {
      font-size: 2.5rem;
      color: white;
      margin-bottom: 20px;
    }
    
    p {
      font-size: 1.2rem;
      color: rgba(255,255,255,0.8);
      margin-bottom: 30px;
    }
  }
  
  @media (max-width: 768px) {
    padding: 80px 20px;
    
    .content {
      h2 {
        font-size: 2rem;
      }
      
      p {
        font-size: 1rem;
      }
    }
  }
`;

export default Clients; 