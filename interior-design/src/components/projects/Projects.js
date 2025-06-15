import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fadeIn, staggerContainer } from '../../utils/animations';
import Button from '../common/Button';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Project data (in production, this would come from an API)
const projects = [
  {
    id: 1,
    title: 'Modern Minimalist Home',
    category: 'Residential',
    location: 'Karachi, Pakistan',
    year: '2023',
    description: 'A sophisticated minimalist interior characterized by clean lines, neutral tones, and thoughtful spatial organization.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    slug: 'modern-minimalist-home',
    featured: true,
  },
  {
    id: 2,
    title: 'Corporate Headquarters',
    category: 'Commercial',
    location: 'Lahore, Pakistan',
    year: '2022',
    description: 'A state-of-the-art commercial space designed to balance professionalism with employee wellness and productivity.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
    slug: 'corporate-headquarters',
    featured: true,
  },
  {
    id: 3,
    title: 'Luxury Restaurant',
    category: 'Hospitality',
    location: 'Islamabad, Pakistan',
    year: '2023',
    description: 'An upscale dining environment combining elegant aesthetics with practical operations requirements for a seamless guest experience.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    slug: 'luxury-restaurant',
    featured: true,
  },
  {
    id: 4,
    title: 'Contemporary Apartment',
    category: 'Residential',
    location: 'Karachi, Pakistan',
    year: '2022',
    description: 'A modern urban living space characterized by smart home features, versatile layouts, and bold material choices.',
    image: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    slug: 'contemporary-apartment',
    featured: false,
  },
  {
    id: 5,
    title: 'Modern Retail Space',
    category: 'Commercial',
    location: 'Multan, Pakistan',
    year: '2021',
    description: 'A customer-centric retail environment designed to enhance product presentation while encouraging exploration and longer visits.',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    slug: 'modern-retail-space',
    featured: false,
  },
  {
    id: 6,
    title: 'Boutique Hotel',
    category: 'Hospitality',
    location: 'Faisalabad, Pakistan',
    year: '2022',
    description: 'A unique hospitality destination where every corner tells a story, combining local cultural elements with international luxury standards.',
    image: 'https://images.unsplash.com/photo-1574691250077-03a929faece5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
    slug: 'boutique-hotel',
    featured: false,
  },
  {
    id: 7,
    title: 'Executive Office Suite',
    category: 'Commercial',
    location: 'Karachi, Pakistan',
    year: '2021',
    description: 'A prestigious executive space designed to impress visitors while providing functionality and comfort for daily operations.',
    image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    slug: 'executive-office-suite',
    featured: false,
  },
  {
    id: 8,
    title: 'Modern Villa',
    category: 'Residential',
    location: 'Islamabad, Pakistan',
    year: '2023',
    description: 'A luxurious residential design integrating indoor-outdoor living with high-end finishes and technological innovations.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1175&q=80',
    slug: 'modern-villa',
    featured: true,
  },
  {
    id: 9,
    title: 'Luxury Spa & Wellness Center',
    category: 'Hospitality',
    location: 'Lahore, Pakistan',
    year: '2022',
    description: 'A tranquil escape designed to promote relaxation and wellbeing through thoughtful sensory design and flow.',
    image: 'https://images.unsplash.com/photo-1519834022362-cf872776bc7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1264&q=80',
    slug: 'luxury-spa-wellness-center',
    featured: false,
  },
];

// Extract unique categories and years for filters
const categories = ['All', ...new Set(projects.map(project => project.category))];
const years = ['All', ...new Set(projects.map(project => project.year))].sort((a, b) => b - a);

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeYear, setActiveYear] = useState('All');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const projectsRef = useRef(null);
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Filter projects when category or year changes
  useEffect(() => {
    let result = [...projects];
    
    if (activeCategory !== 'All') {
      result = result.filter(project => project.category === activeCategory);
    }
    
    if (activeYear !== 'All') {
      result = result.filter(project => project.year === activeYear);
    }
    
    setFilteredProjects(result);
  }, [activeCategory, activeYear]);
  
  // Animate grid items when they change
  useEffect(() => {
    if (projectsRef.current) {
      const gridItems = projectsRef.current.querySelectorAll('.project-item');
      
      gsap.fromTo(
        gridItems, 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 0.8,
          ease: 'power3.out'
        }
      );
    }
  }, [filteredProjects]);

  return (
    <ProjectsWrapper
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: 20 }}
    >
      <PageBanner>
        <BannerOverlay />
        <div className="container">
          <BannerContent>
            <motion.h1 variants={fadeIn("up", 0.2)}>
              Our <span className="text-secondary">Projects</span>
            </motion.h1>
            <motion.p variants={fadeIn("up", 0.3)}>
              Explore our portfolio of exceptional designs that transform spaces into extraordinary experiences
            </motion.p>
          </BannerContent>
        </div>
      </PageBanner>
      
      <ProjectsContent className="container">
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <FilterSection>
            <FilterGroup>
              <FilterLabel>Filter by Category:</FilterLabel>
              <FilterButtons>
                {categories.map((category, index) => (
                  <FilterButton
                    key={index}
                    active={activeCategory === category}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                    {activeCategory === category && <FilterUnderline layoutId="categoryUnderline" />}
                  </FilterButton>
                ))}
              </FilterButtons>
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel>Filter by Year:</FilterLabel>
              <FilterButtons>
                {years.map((year, index) => (
                  <FilterButton
                    key={index}
                    active={activeYear === year}
                    onClick={() => setActiveYear(year)}
                  >
                    {year}
                    {activeYear === year && <FilterUnderline layoutId="yearUnderline" />}
                  </FilterButton>
                ))}
              </FilterButtons>
            </FilterGroup>
          </FilterSection>
          
          <ResultStats>
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </ResultStats>
          
          <ProjectsGrid ref={projectsRef}>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectItem 
                  key={project.id}
                  className="project-item"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  isHovered={hoveredProject === project.id}
                >
                  <ProjectImageWrapper>
                    <ProjectImage src={project.image} alt={project.title} />
                    <ProjectOverlay 
                      style={{ 
                        opacity: hoveredProject === project.id ? 1 : 0 
                      }}
                    >
                      <OverlayContent>
                        <ProjectMeta>
                          <span>{project.category}</span>
                          <span>•</span>
                          <span>{project.year}</span>
                        </ProjectMeta>
                        <ProjectTitle>{project.title}</ProjectTitle>
                        <ProjectLocation>
                          <i className="fas fa-map-marker-alt"></i> {project.location}
                        </ProjectLocation>
                        <ProjectDescription>
                          {project.description}
                        </ProjectDescription>
                        <ViewProjectButton to={`/projects/${project.slug}`}>
                          View Details <i className="fas fa-arrow-right"></i>
                        </ViewProjectButton>
                      </OverlayContent>
                    </ProjectOverlay>
                    {project.featured && (
                      <FeaturedBadge>
                        <i className="fas fa-star"></i> Featured
                      </FeaturedBadge>
                    )}
                  </ProjectImageWrapper>
                  <ProjectInfo>
                    <ProjectInfoTitle>{project.title}</ProjectInfoTitle>
                    <ProjectInfoCategory>{project.category}</ProjectInfoCategory>
                  </ProjectInfo>
                </ProjectItem>
              ))
            ) : (
              <NoResults>
                <i className="fas fa-search"></i>
                <h3>No projects found</h3>
                <p>Try adjusting your filters to find what you're looking for.</p>
                <ResetButton onClick={() => {
                  setActiveCategory('All');
                  setActiveYear('All');
                }}>
                  Reset Filters
                </ResetButton>
              </NoResults>
            )}
          </ProjectsGrid>
        </motion.div>
      </ProjectsContent>
      
      <ContactCTA>
        <div className="container">
          <CTAContent>
            <motion.h2 variants={fadeIn("up", 0.1)}>
              Ready to Start Your Project?
            </motion.h2>
            <motion.p variants={fadeIn("up", 0.2)}>
              Let's transform your space into something extraordinary. Our team of experts is ready to bring your vision to life.
            </motion.p>
            <motion.div variants={fadeIn("up", 0.3)}>
              <Button as={Link} to="/contact" className="btn btn-primary">
                Get in Touch <i className="fas fa-long-arrow-alt-right"></i>
              </Button>
            </motion.div>
          </CTAContent>
        </div>
      </ContactCTA>
    </ProjectsWrapper>
  );
};

const ProjectsWrapper = styled(motion.div)`
  background-color: white;
`;

const PageBanner = styled.div`
  position: relative;
  height: 400px;
  background-image: url('https://images.unsplash.com/photo-1618219944342-824e40a13285?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const BannerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const BannerContent = styled.div`
  position: relative;
  z-index: 1;
  color: white;
  text-align: center;
  
  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      font-size: 2.75rem;
    }
    
    @media (max-width: 576px) {
      font-size: 2.25rem;
    }
  }
  
  p {
    font-size: 1.25rem;
    max-width: 600px;
    margin: 0 auto;
    
    @media (max-width: 576px) {
      font-size: 1.1rem;
    }
  }
`;

const ProjectsContent = styled.div`
  padding: 80px 0;
`;

const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FilterLabel = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-tertiary);
`;

const FilterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FilterButton = styled(motion.button)`
  background: transparent;
  border: none;
  font-size: 1rem;
  font-weight: ${props => props.active ? '600' : '500'};
  color: ${props => props.active ? 'var(--secondary)' : 'var(--text-primary)'};
  cursor: pointer;
  padding: 0.5rem 1rem;
  position: relative;
  transition: all 0.3s ease;
  border-radius: 4px;
  
  &:hover {
    color: var(--secondary);
    background-color: rgba(220, 168, 103, 0.05);
  }
`;

const FilterUnderline = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--secondary);
`;

const ResultStats = styled.div`
  margin-bottom: 2rem;
  font-size: 0.95rem;
  color: var(--text-tertiary);
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectItem = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  transform: ${props => props.isHovered ? 'translateY(-10px)' : 'translateY(0)'};
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const ProjectImageWrapper = styled.div`
  position: relative;
  height: 280px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${ProjectItem}:hover & {
    transform: scale(1.1);
  }
`;

const ProjectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(26, 26, 26, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  padding: 2rem;
`;

const OverlayContent = styled.div`
  color: white;
`;

const ProjectMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  
  span {
    &:first-child {
      color: var(--secondary);
      font-weight: 500;
    }
    
    &:nth-child(2) {
      opacity: 0.7;
    }
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const ProjectLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.8);
  
  i {
    color: var(--secondary);
  }
`;

const ProjectDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
`;

const ViewProjectButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-weight: 500;
  padding-bottom: 3px;
  border-bottom: 1px solid var(--secondary);
  transition: all 0.3s ease;
  
  i {
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: var(--secondary);
    
    i {
      transform: translateX(5px);
    }
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--secondary);
  color: var(--primary);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  
  i {
    font-size: 0.7rem;
  }
`;

const ProjectInfo = styled.div`
  padding: 1.5rem;
  background: white;
`;

const ProjectInfoTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ProjectInfoCategory = styled.div`
  font-size: 0.9rem;
  color: var(--text-tertiary);
`;

const NoResults = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 0;
  color: var(--text-secondary);
  
  i {
    font-size: 3rem;
    color: #e0e0e0;
    margin-bottom: 1.5rem;
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 2rem;
  }
`;

const ResetButton = styled.button`
  background-color: var(--secondary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #c99758;
  }
`;

const ContactCTA = styled.section`
  background-color: #f9f9f9;
  padding: 80px 0;
`;

const CTAContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.1rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
  }
  
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    
    i {
      transition: transform 0.3s ease;
    }
    
    &:hover i {
      transform: translateX(5px);
    }
  }
`;

export default Projects; 