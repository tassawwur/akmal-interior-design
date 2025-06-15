import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { fadeIn, staggerContainer } from '../../utils/animations';
import Button from '../common/Button';
import { projects } from '../projects/projectsData';

// Use featured projects from the projectsData
const featuredProjects = projects.filter(project => project.featured);

// Filter categories (with All category)
const categories = ['All', ...new Set(featuredProjects.map(project => project.category))];

const ProjectsShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(featuredProjects);
  const projectsRef = useRef(null);

  // Filter projects when category changes
  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProjects(featuredProjects);
    } else {
      setFilteredProjects(
        featuredProjects.filter(project => project.category === activeCategory)
      );
    }
  }, [activeCategory]);

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
    <ProjectsSection
      as={motion.section}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <SectionContent>
        <SectionHeader
          as={motion.div}
          variants={fadeIn("up", 0.2)}
        >
          <h2>Our Latest Projects</h2>
          <p>Discover our recent transformations that exemplify our commitment to exceptional interior design.</p>
        </SectionHeader>
        
        <FilterContainer as={motion.div} variants={fadeIn("up", 0.3)}>
          {categories.map((category) => (
            <FilterButton
              key={category}
              className={activeCategory === category ? 'active' : ''}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </FilterButton>
          ))}
        </FilterContainer>
        
        <ProjectsGrid ref={projectsRef} as={motion.div} variants={fadeIn("up", 0.4)}>
          {filteredProjects.map((project) => (
            <ProjectItem 
              key={project.id}
              className="project-item"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              isHovered={hoveredProject === project.id}
            >
              <Link to={`/projects/${project.slug}`}>
                <div className="image-container">
                  <img src={project.image} alt={project.title} />
                  <div className="overlay"></div>
                </div>
                <div className="content">
                  <div className="tags">
                    <span className="category">{project.category}</span>
                    <span className="year">{project.year}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <span className="view-details">
                    View Details
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </Link>
            </ProjectItem>
          ))}
        </ProjectsGrid>
        
        <ViewAllButton 
          as={motion.div}
          variants={fadeIn("up", 0.5)}
        >
          <Button as={Link} to="/projects">
            View All Projects
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        </ViewAllButton>
      </SectionContent>
    </ProjectsSection>
  );
};

const ProjectsSection = styled.section`
  padding: 120px 0;
  background-color: var(--color-bg-light);
`;

const SectionContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 20px;
    color: var(--color-text-dark);
  }
  
  p {
    font-size: 1.2rem;
    color: var(--color-text);
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    h2 {
      font-size: 2rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 50px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: transparent;
  border: 1px solid var(--color-text-light);
  border-radius: 30px;
  padding: 8px 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover, &.active {
    background-color: var(--color-gold);
    border-color: var(--color-gold);
    color: white;
  }
  
  &.active {
    font-weight: 600;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectItem = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  transform: ${props => props.isHovered ? 'translateY(-10px)' : 'translateY(0)'};
  
  &:hover {
    box-shadow: 0 15px 30px rgba(0,0,0,0.15);
    
    .image-container {
      .overlay {
        opacity: 0.7;
      }
      
      img {
        transform: scale(1.05);
      }
    }
    
    .content {
      .view-details {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
  
  a {
    text-decoration: none;
    color: inherit;
    display: block;
  }
  
  .image-container {
    position: relative;
    height: 280px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.7s ease;
    }
    
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6));
      opacity: 0.5;
      transition: opacity 0.3s ease;
    }
  }
  
  .content {
    padding: 25px;
    background: white;
    position: relative;
    
    .tags {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      
      .category {
        color: var(--color-gold);
        font-size: 0.9rem;
        font-weight: 600;
      }
      
      .year {
        font-size: 0.9rem;
        color: var(--color-text-light);
      }
    }
    
    h3 {
      font-size: 1.4rem;
      margin-bottom: 10px;
      color: var(--color-text-dark);
      transition: color 0.3s ease;
    }
    
    p {
      font-size: 0.95rem;
      line-height: 1.6;
      color: var(--color-text);
      margin-bottom: 20px;
    }
    
    .view-details {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--color-gold);
      opacity: 0.7;
      transform: translateX(-5px);
      transition: opacity 0.3s ease, transform 0.3s ease;
      
      svg {
        transition: transform 0.3s ease;
      }
      
      &:hover svg {
        transform: translateX(3px);
      }
    }
  }
`;

const ViewAllButton = styled.div`
  text-align: center;
  margin-top: 60px;
  
  button {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    
    svg {
      transition: transform 0.3s ease;
    }
    
    &:hover svg {
      transform: translateX(5px);
    }
  }
`;

export default ProjectsShowcase; 