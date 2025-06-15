import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeIn, staggerContainer } from '../../utils/animations';
import Button from '../common/Button';

// Team member data
const teamMembers = [
  {
    id: 1,
    name: 'Akmal Shah',
    role: 'Principal Designer & Founder',
    image: '/images/team/Akmal.png',
    bio: 'With over 15 years of experience in interior design, Akmal has established himself as a leader in the industry. He founded "AanganLab" in 2008 with a vision to create innovative and functional design solutions that elevate everyday living environments.',
    expertise: ['Residential Design', 'Space Planning', 'Project Management'],
    education: 'Master of Interior Design, London School of Design',
    featured: true,
  },
  {
    id: 2,
    name: 'Zohaib Ali',
    role: 'Senior Interior Designer',
    image: '/images/team/zohaib.png',
    bio: 'Zohaib brings a wealth of experience in commercial design, having worked on numerous corporate and retail projects. His ability to balance aesthetics with functionality makes him an invaluable member of our design team.',
    expertise: ['Commercial Design', 'Retail Spaces', 'Corporate Interiors'],
    education: 'BFA in Interior Design, National College of Arts',
    featured: true,
  },
  {
    id: 3,
    name: 'Ali Sufi',
    role: 'Design Director',
    image: '/images/team/aLi.png',
    bio: 'Ali leads our creative direction and ensures that each project maintains the highest design standards. His background in both architecture and interior design gives him a unique perspective on creating cohesive spaces.',
    expertise: ['Luxury Residential', 'Hospitality Design', 'Design Strategy'],
    education: 'Master of Architecture, University of Melbourne',
    featured: true,
  },
  {
    id: 4,
    name: 'CH. Hassnain',
    role: 'Technical Designer',
    image: '/images/team/hassnain.png',
    bio: 'Hassnain specializes in the technical aspects of interior design, ensuring that our creative visions are executed with precision. His expertise in construction documentation and materials is essential to our project implementation.',
    expertise: ['Construction Documentation', 'Material Specification', 'Technical Drawing'],
    education: 'BS in Interior Architecture, Indus Valley School of Art and Architecture',
    featured: false,
  },
  {
    id: 5,
    name: 'Tasawwur Hussain',
    role: 'Project Manager',
    image: '/images/team/tassawwur.png',
    bio: 'Tasawwur ensures that our projects are delivered on time and within budget. His organizational skills and attention to detail make him an excellent liaison between our design team, contractors, and clients.',
    expertise: ['Project Coordination', 'Budget Management', 'Client Relations'],
    education: 'MBA, Lahore University of Management Sciences',
    featured: false,
  },
  {
    id: 6,
    name: 'Hassan Raza',
    role: 'Junior Designer',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    bio: 'Hassan brings fresh perspectives and innovative ideas to our team. His skills in 3D visualization and digital rendering help our clients envision their spaces before implementation begins.',
    expertise: ['3D Visualization', 'Digital Rendering', 'Furniture Design'],
    education: 'BFA in Interior Design, Karachi School of Arts',
    featured: false,
  },
  {
    id: 7,
    name: 'Amina Shah',
    role: 'Textile & Materials Specialist',
    image: 'https://randomuser.me/api/portraits/women/42.jpg',
    bio: "Amina's expertise in textiles and material selection adds depth and texture to our designs. She stays current with the latest trends and sustainable options to provide our clients with the best choices.",
    expertise: ['Textile Selection', 'Material Sourcing', 'Sustainable Design'],
    education: 'BS in Textile Design, Pakistan Institute of Fashion and Design',
    featured: false,
  },
  {
    id: 8,
    name: 'Ali Raza',
    role: 'Lighting Designer',
    image: '/images/team/Alli.png',
    bio: 'Ali specializes in lighting design, creating ambiance and highlighting architectural features through thoughtful illumination strategies. His work adds the finishing touch that transforms good spaces into great ones.',
    expertise: ['Lighting Plans', 'Fixture Selection', 'Energy-Efficient Solutions'],
    education: 'MS in Architectural Lighting Design, Parsons School of Design',
    featured: false,
  }
];

// Company values
const companyValues = [
  {
    id: 1,
    title: 'Client-Centered Approach',
    icon: 'fas fa-users',
    description: "We prioritize our clients' needs and preferences, ensuring that each design reflects their unique personality and requirements."
  },
  {
    id: 2,
    title: 'Design Excellence',
    icon: 'fas fa-star',
    description: 'We strive for excellence in every aspect of our work, from concept development to the finest details of implementation.'
  },
  {
    id: 3,
    title: 'Innovation',
    icon: 'fas fa-lightbulb',
    description: 'We embrace innovative approaches and stay at the forefront of design trends and technologies to deliver cutting-edge solutions.'
  },
  {
    id: 4,
    title: 'Sustainability',
    icon: 'fas fa-leaf',
    description: 'We are committed to environmentally responsible design practices that minimize ecological impact while maximizing beauty and functionality.'
  },
  {
    id: 5,
    title: 'Collaboration',
    icon: 'fas fa-hands-helping',
    description: 'We believe in the power of teamwork and collaborative processes, both within our team and with clients and contractors.'
  },
  {
    id: 6,
    title: 'Integrity',
    icon: 'fas fa-shield-alt',
    description: 'We conduct our business with honesty, transparency, and ethical considerations at every step of the design process.'
  }
];

const Team = () => {
  const [activeTeamMember, setActiveTeamMember] = useState(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TeamWrapper
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: 20 }}
    >
      {/* Hero Section */}
      <HeroSection variants={fadeIn}>
        <div className="overlay"></div>
        <div className="content">
          <h1>Design Virtuosos</h1>
          <p>The elite team behind Pakistan's most prestigious interior transformations</p>
        </div>
      </HeroSection>
      
      {/* Team Introduction */}
      <SectionContainer variants={fadeIn}>
        <SectionHeader>
          <h2>The Visionary Talent Collective</h2>
          <p>An unparalleled assembly of Pakistan's most accomplished designers, architects, and artisans united in pursuit of aesthetic perfection</p>
        </SectionHeader>
        
        <TeamIntroduction>
          <IntroText>
            <p>At AANGANLAB, we've assembled an exclusive cadre of Pakistan's most distinguished design talents—professionals whose creative vision and technical mastery have redefined the standards of interior excellence. Our team represents the pinnacle of expertise across residential, commercial, and hospitality design, with credentials from the world's most prestigious institutions and portfolios featuring landmark projects across the nation.</p>
            <p>Each member of our elite collective brings specialized expertise and uncompromising standards, allowing us to execute projects of exceptional complexity and refinement. From ultra-luxury residences to bespoke commercial environments, our team delivers an unrivaled blend of innovative design thinking, technical precision, and white-glove project management.</p>
          </IntroText>
          <IntroStats>
            <StatItem>
              <div className="number">15+</div>
              <div className="label">Years of Experience</div>
            </StatItem>
            <StatItem>
              <div className="number">200+</div>
              <div className="label">Projects Completed</div>
            </StatItem>
            <StatItem>
              <div className="number">8</div>
              <div className="label">Design Specialists</div>
            </StatItem>
            <StatItem>
              <div className="number">12</div>
              <div className="label">Design Awards</div>
            </StatItem>
          </IntroStats>
        </TeamIntroduction>
      </SectionContainer>
      
      {/* Featured Team Members */}
      <FeaturedTeamSection variants={fadeIn}>
        <div className="container">
          <SectionHeader light>
            <h2>Leadership Team</h2>
            <p>Meet the visionaries who guide our design philosophy and business approach</p>
          </SectionHeader>
          
          <FeaturedTeamGrid>
            {teamMembers
              .filter(member => member.featured)
              .map(member => (
                <FeaturedTeamCard key={member.id}>
                  <div className="member-image">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className="member-info">
                    <h3>{member.name}</h3>
                    <div className="role">{member.role}</div>
                    <p className="bio">{member.bio}</p>
                    <div className="expertise">
                      <h4>Areas of Expertise:</h4>
                      <div className="tags">
                        {member.expertise.map((skill, index) => (
                          <span key={index} className="expertise-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <div className="education">
                      <i className="fas fa-graduation-cap"></i> {member.education}
                    </div>
                  </div>
                </FeaturedTeamCard>
              ))}
          </FeaturedTeamGrid>
        </div>
      </FeaturedTeamSection>
      
      {/* Team Members Grid */}
      <SectionContainer variants={fadeIn}>
        <SectionHeader>
          <h2>Our Specialists</h2>
          <p>Each team member contributes unique skills that enrich our collective design capability</p>
        </SectionHeader>
        
        <TeamGrid>
          {teamMembers
            .filter(member => !member.featured)
            .map(member => (
              <TeamCard 
                key={member.id}
                onClick={() => setActiveTeamMember(activeTeamMember === member.id ? null : member.id)}
                expanded={activeTeamMember === member.id}
              >
                <div className="card-header">
                  <div className="member-image">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className="header-info">
                    <h3>{member.name}</h3>
                    <div className="role">{member.role}</div>
                  </div>
                </div>
                
                <div className={`card-details ${activeTeamMember === member.id ? 'active' : ''}`}>
                  <p className="bio">{member.bio}</p>
                  <div className="expertise">
                    <h4>Areas of Expertise:</h4>
                    <div className="tags">
                      {member.expertise.map((skill, index) => (
                        <span key={index} className="expertise-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="education">
                    <i className="fas fa-graduation-cap"></i> {member.education}
                  </div>
                </div>
                
                <button className="toggle-details">
                  {activeTeamMember === member.id ? 'Show Less' : 'Show More'}
                  <i className={`fas fa-chevron-${activeTeamMember === member.id ? 'up' : 'down'}`}></i>
                </button>
              </TeamCard>
            ))}
        </TeamGrid>
      </SectionContainer>
      
      {/* Company Values */}
      <ValuesSection variants={fadeIn}>
        <div className="container">
          <SectionHeader light>
            <h2>Our Core Values</h2>
            <p>The principles that guide our design approach and company culture</p>
          </SectionHeader>
          
          <ValuesGrid>
            {companyValues.map(value => (
              <ValueCard key={value.id}>
                <div className="icon">
                  <i className={value.icon}></i>
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </ValueCard>
            ))}
          </ValuesGrid>
        </div>
      </ValuesSection>
      
      {/* Join Our Team */}
      <SectionContainer variants={fadeIn}>
        <JoinTeamBanner>
          <div className="content">
            <h2>Join Our Team</h2>
            <p>We're always looking for talented designers and professionals to join our growing team</p>
            <Button as={Link} to="/contact">
              View Open Positions
            </Button>
          </div>
          <div className="image">
            <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80" alt="Join our team" />
          </div>
        </JoinTeamBanner>
      </SectionContainer>
      
      {/* CTA Section */}
      <CtaSection variants={fadeIn}>
        <div className="overlay"></div>
        <div className="content">
          <h2>Ready to work with our talented team?</h2>
          <p>Contact us today to schedule a consultation and start your design journey</p>
          <Button as={Link} to="/contact">Schedule a Consultation</Button>
        </div>
      </CtaSection>
    </TeamWrapper>
  );
};

const TeamWrapper = styled(motion.div)`
  max-width: 100%;
  overflow-x: hidden;
`;

const HeroSection = styled(motion.div)`
  position: relative;
  height: 60vh;
  width: 100%;
  background-image: url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');
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

const TeamIntroduction = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 50px;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const IntroText = styled.div`
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--color-text);
    margin-bottom: 20px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const IntroStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: var(--shadow-sm);
  text-align: center;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
  }
  
  .number {
    font-size: 3rem;
    font-weight: 700;
    color: var(--color-gold);
    margin-bottom: 10px;
  }
  
  .label {
    font-size: 1.1rem;
    color: var(--color-text-dark);
  }
`;

const FeaturedTeamSection = styled(motion.section)`
  position: relative;
  background-color: var(--color-text-dark);
  padding: 100px 20px;
  
  .container {
    max-width: 1400px;
    margin: 0 auto;
  }
`;

const FeaturedTeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedTeamCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: var(--transition);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }
  
  .member-image {
    height: 300px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    &:hover img {
      transform: scale(1.05);
    }
  }
  
  .member-info {
    padding: 30px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    
    h3 {
      font-size: 1.8rem;
      color: var(--color-gold);
      margin-bottom: 5px;
    }
    
    .role {
      font-size: 1.1rem;
      color: white;
      opacity: 0.9;
      margin-bottom: 20px;
    }
    
    .bio {
      margin-bottom: 20px;
      line-height: 1.7;
      color: rgba(255, 255, 255, 0.8);
    }
    
    .expertise {
      margin-bottom: 20px;
      
      h4 {
        font-size: 1.1rem;
        color: white;
        margin-bottom: 10px;
      }
      
      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      
      .expertise-tag {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        padding: 5px 15px;
        border-radius: 30px;
        font-size: 0.8rem;
      }
    }
    
    .education {
      margin-top: auto;
      color: rgba(255, 255, 255, 0.8);
      font-style: italic;
      font-size: 0.9rem;
      
      i {
        color: var(--color-gold);
        margin-right: 5px;
      }
    }
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;

const TeamCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
  
  &:hover {
    box-shadow: var(--shadow-md);
  }
  
  .card-header {
    display: flex;
    align-items: center;
    padding: 20px;
    
    .member-image {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 15px;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .header-info {
      h3 {
        font-size: 1.3rem;
        color: var(--color-text-dark);
        margin-bottom: 5px;
      }
      
      .role {
        font-size: 0.9rem;
        color: var(--color-text);
      }
    }
  }
  
  .card-details {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease, padding 0.3s ease;
    padding: 0 20px;
    
    &.active {
      max-height: 500px;
      padding: 0 20px 20px;
    }
    
    .bio {
      margin-bottom: 15px;
      line-height: 1.6;
      color: var(--color-text);
    }
    
    .expertise {
      margin-bottom: 15px;
      
      h4 {
        font-size: 1rem;
        color: var(--color-text-dark);
        margin-bottom: 10px;
      }
      
      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      
      .expertise-tag {
        background: var(--color-bg-light);
        color: var(--color-text);
        padding: 4px 12px;
        border-radius: 30px;
        font-size: 0.8rem;
      }
    }
    
    .education {
      color: var(--color-text);
      font-style: italic;
      font-size: 0.9rem;
      
      i {
        color: var(--color-gold);
        margin-right: 5px;
      }
    }
  }
  
  .toggle-details {
    width: 100%;
    padding: 15px;
    background: var(--color-bg-light);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-family: inherit;
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--color-text-dark);
    transition: var(--transition);
    
    i {
      margin-left: 8px;
      transition: transform 0.3s ease;
    }
    
    &:hover {
      background: #e8e8e8;
    }
  }
`;

const ValuesSection = styled(motion.section)`
  background-color: var(--color-gold);
  padding: 100px 20px;
  
  .container {
    max-width: 1400px;
    margin: 0 auto;
  }
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 40px 30px;
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    
    .icon {
      background: var(--color-gold);
      color: white;
      transform: rotateY(180deg);
    }
  }
  
  .icon {
    width: 80px;
    height: 80px;
    background: var(--color-bg-light);
    color: var(--color-gold);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    margin: 0 auto 25px;
    transition: all 0.5s ease;
  }
  
  h3 {
    font-size: 1.4rem;
    color: var(--color-text-dark);
    margin-bottom: 15px;
  }
  
  p {
    color: var(--color-text);
    line-height: 1.6;
  }
`;

const JoinTeamBanner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  
  .content {
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    h2 {
      font-size: 2rem;
      color: var(--color-text-dark);
      margin-bottom: 20px;
    }
    
    p {
      color: var(--color-text);
      margin-bottom: 30px;
      line-height: 1.6;
    }
  }
  
  .image {
    height: 100%;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    
    .content {
      padding: 40px;
      order: 2;
    }
    
    .image {
      height: 300px;
      order: 1;
    }
  }
`;

const CtaSection = styled(motion.div)`
  position: relative;
  background-image: url('https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80');
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

export default Team; 