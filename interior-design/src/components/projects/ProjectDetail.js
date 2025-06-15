import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, pageTransition } from '../../utils/animations';
import Button from '../common/Button';

// Mock project data (in production, this would come from an API)
import { projects } from './projectsData';

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  // Fetch project data
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate API fetch
    const timer = setTimeout(() => {
      const foundProject = projects.find(p => p.slug === slug);
      if (foundProject) {
        setProject(foundProject);
      }
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [slug]);

  // Handle case when project is not found
  useEffect(() => {
    if (!loading && !project) {
      navigate('/projects', { replace: true });
    }
  }, [loading, project, navigate]);

  // Next & Previous projects navigation
  const getAdjacentProjects = () => {
    if (!project) return { prev: null, next: null };
    
    const currentIndex = projects.findIndex(p => p.id === project.id);
    const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
    const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
    
    return { prev: prevProject, next: nextProject };
  };

  const { prev, next } = getAdjacentProjects();

  // Render loading state
  if (loading) {
    return (
      <LoadingWrapper>
        <Spinner />
        <p>Loading project...</p>
      </LoadingWrapper>
    );
  }

  // Render 404 state (should redirect via useEffect)
  if (!project) {
    return (
      <NotFoundWrapper>
        <h2>Project Not Found</h2>
        <p>Redirecting to projects page...</p>
      </NotFoundWrapper>
    );
  }

  return (
    <ProjectDetailWrapper
      variants={pageTransition}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <HeroSection style={{ backgroundImage: `url(${project.heroImage || project.image})` }}>
        <HeroOverlay />
        <div className="container">
          <BreadcrumbsNav>
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/projects">Projects</Link>
            <span>/</span>
            <span>{project.title}</span>
          </BreadcrumbsNav>
          
          <HeroContent>
            <motion.div variants={fadeIn("up", 0.1)}>
              <ProjectCategory>{project.category}</ProjectCategory>
            </motion.div>
            <motion.h1 variants={fadeIn("up", 0.2)}>{project.title}</motion.h1>
            <motion.div 
              className="project-meta"
              variants={fadeIn("up", 0.3)}
            >
              <MetaItem>
                <MetaLabel>Location</MetaLabel>
                <MetaValue>{project.location}</MetaValue>
              </MetaItem>
              <MetaDivider />
              <MetaItem>
                <MetaLabel>Year</MetaLabel>
                <MetaValue>{project.year}</MetaValue>
              </MetaItem>
              <MetaDivider />
              <MetaItem>
                <MetaLabel>Size</MetaLabel>
                <MetaValue>{project.size || '2,500 sq ft'}</MetaValue>
              </MetaItem>
              <MetaDivider />
              <MetaItem>
                <MetaLabel>Duration</MetaLabel>
                <MetaValue>{project.duration || '3 months'}</MetaValue>
              </MetaItem>
            </motion.div>
          </HeroContent>
        </div>
      </HeroSection>
      
      <ContentSection className="container">
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <TwoColumnGrid>
            <ProjectDescription>
              <motion.h2 variants={fadeIn("up", 0.1)}>Project Overview</motion.h2>
              <motion.p variants={fadeIn("up", 0.2)}>
                {project.fullDescription || `${project.description} This project exemplifies our commitment to creating spaces that are not only beautiful but functional and tailored to our client's specific needs. We worked closely with the client to understand their vision and requirements, resulting in a space that exceeds expectations.`}
              </motion.p>
              <motion.p variants={fadeIn("up", 0.3)}>
                Our team of experienced designers and engineers collaborated to deliver a solution that balances aesthetics with practicality, ensuring that every element serves a purpose while contributing to the overall design language.
              </motion.p>
              
              <ProjectHighlights variants={fadeIn("up", 0.4)}>
                <h3>Project Highlights</h3>
                <HighlightsList>
                  {(project.highlights || [
                    'Custom-designed furniture pieces',
                    'Premium material selection',
                    'Integrated smart home technology',
                    'Energy-efficient lighting solutions',
                    'Optimal space utilization'
                  ]).map((highlight, index) => (
                    <HighlightItem key={index}>
                      <i className="fas fa-check-circle"></i>
                      <span>{highlight}</span>
                    </HighlightItem>
                  ))}
                </HighlightsList>
              </ProjectHighlights>
              
              <ProjectServices variants={fadeIn("up", 0.5)}>
                <h3>Services Provided</h3>
                <ServiceTags>
                  {(project.services || [
                    'Interior Design', 
                    'Space Planning', 
                    'Material Selection', 
                    'Project Management', 
                    'Furniture Design'
                  ]).map((service, index) => (
                    <ServiceTag key={index}>{service}</ServiceTag>
                  ))}
                </ServiceTags>
              </ProjectServices>
            </ProjectDescription>
            
            <ProjectGallery variants={fadeIn("left", 0.2)}>
              <FeaturedImage>
                <img 
                  src={project.galleryImages?.[activeImage] || project.image} 
                  alt={`${project.title} - Featured view`} 
                />
              </FeaturedImage>
              
              <ThumbnailsGrid>
                {(project.galleryImages || [
                  project.image,
                  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
                  "https://images.unsplash.com/photo-1616137466211-f939a420be84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
                  "https://images.unsplash.com/photo-1615875596137-826461a2a6f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80"
                ]).map((image, index) => (
                  <ThumbnailItem 
                    key={index}
                    active={activeImage === index}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={image} alt={`${project.title} - Thumbnail ${index + 1}`} />
                  </ThumbnailItem>
                ))}
              </ThumbnailsGrid>
            </ProjectGallery>
          </TwoColumnGrid>
        </motion.div>
      </ContentSection>
      
      <TestimonialSection style={{ 
        backgroundImage: `url(${project.testimonialBg || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"})` 
      }}>
        <TestimonialOverlay />
        <div className="container">
          <TestimonialContent>
            <motion.div 
              className="quote-icon"
              variants={fadeIn("up", 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <i className="fas fa-quote-left"></i>
            </motion.div>
            <motion.blockquote
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {project.testimonial || "The team at ElegantSpace delivered beyond our expectations. Their attention to detail and ability to understand our vision resulted in a space that perfectly captures our brand identity while providing exceptional functionality."}
            </motion.blockquote>
            <motion.div 
              className="client-info"
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <strong>{project.testimonialAuthor || "Ahmed Khan"}</strong>
              <span>{project.testimonialRole || "Client"}</span>
            </motion.div>
          </TestimonialContent>
        </div>
      </TestimonialSection>
      
      <RelatedProjects className="container">
        <SectionHeader>
          <motion.h2
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Related Projects
          </motion.h2>
          <motion.p
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Explore more of our exceptional work in {project.category}
          </motion.p>
        </SectionHeader>
        
        <NavigationButtons>
          {prev && (
            <NavButton to={`/projects/${prev.slug}`}>
              <i className="fas fa-arrow-left"></i>
              <div>
                <span>Previous Project</span>
                <strong>{prev.title}</strong>
              </div>
            </NavButton>
          )}
          
          <AllProjectsButton to="/projects">
            <i className="fas fa-th-large"></i>
            <span>All Projects</span>
          </AllProjectsButton>
          
          {next && (
            <NavButton to={`/projects/${next.slug}`} className="next">
              <div>
                <span>Next Project</span>
                <strong>{next.title}</strong>
              </div>
              <i className="fas fa-arrow-right"></i>
            </NavButton>
          )}
        </NavigationButtons>
      </RelatedProjects>
      
      <CTASection>
        <div className="container">
          <CTAContent>
            <motion.h2
              variants={fadeIn("up", 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              Ready to Transform Your Space?
            </motion.h2>
            <motion.p
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              Let's create a space that reflects your vision and exceeds your expectations.
            </motion.p>
            <motion.div
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <Button as={Link} to="/contact" className="btn btn-primary">
                Start Your Project <i className="fas fa-long-arrow-alt-right"></i>
              </Button>
            </motion.div>
          </CTAContent>
        </div>
      </CTASection>
    </ProjectDetailWrapper>
  );
};

const ProjectDetailWrapper = styled(motion.div)`
  background-color: white;
`;

const LoadingWrapper = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  
  p {
    margin-top: 1rem;
  }
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(220, 168, 103, 0.3);
  border-radius: 50%;
  border-top-color: var(--secondary);
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const NotFoundWrapper = styled.div`
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  h2 {
    margin-bottom: 1rem;
  }
`;

const HeroSection = styled.section`
  position: relative;
  height: 600px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  
  @media (max-width: 768px) {
    height: 500px;
  }
  
  @media (max-width: 576px) {
    height: 400px;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
`;

const BreadcrumbsNav = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 0.9rem;
  
  a {
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--secondary);
    }
  }
  
  span {
    opacity: 0.7;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  color: white;
  padding-bottom: 4rem;
  
  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    
    @media (max-width: 768px) {
      font-size: 2.75rem;
    }
    
    @media (max-width: 576px) {
      font-size: 2.25rem;
    }
  }
  
  .project-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 2rem;
    
    @media (max-width: 576px) {
      flex-direction: column;
      gap: 0.75rem;
    }
  }
`;

const ProjectCategory = styled.div`
  display: inline-block;
  background-color: var(--secondary);
  color: var(--primary);
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.35rem 1rem;
  border-radius: 20px;
  margin-bottom: 1rem;
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const MetaLabel = styled.span`
  font-size: 0.85rem;
  opacity: 0.7;
`;

const MetaValue = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

const MetaDivider = styled.div`
  width: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  
  @media (max-width: 576px) {
    display: none;
  }
`;

const ContentSection = styled.section`
  padding: 80px 0;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ProjectDescription = styled.div`
  h2 {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    
    @media (max-width: 768px) {
      font-size: 1.9rem;
    }
  }
  
  p {
    font-size: 1.05rem;
    line-height: 1.8;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.25rem;
  }
`;

const ProjectHighlights = styled(motion.div)`
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const HighlightsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  padding: 0;
`;

const HighlightItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  
  i {
    color: var(--secondary);
    margin-top: 0.25rem;
  }
  
  span {
    flex: 1;
    line-height: 1.6;
  }
`;

const ProjectServices = styled(motion.div)`
  margin-top: 3rem;
`;

const ServiceTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const ServiceTag = styled.span`
  background-color: #f5f5f5;
  color: var(--text-primary);
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(220, 168, 103, 0.1);
    color: var(--secondary);
  }
`;

const ProjectGallery = styled(motion.div)``;

const FeaturedImage = styled.div`
  width: 100%;
  height: 360px;
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const ThumbnailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  
  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ThumbnailItem = styled.div`
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${props => props.active ? 1 : 0.6};
  border: ${props => props.active ? '2px solid var(--secondary)' : 'none'};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &:hover {
    opacity: 1;
  }
  
  @media (max-width: 576px) {
    height: 100px;
  }
`;

const TestimonialSection = styled.section`
  position: relative;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 100px 0;
  
  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

const TestimonialOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
`;

const TestimonialContent = styled.div`
  position: relative;
  z-index: 1;
  color: white;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  
  .quote-icon {
    font-size: 3rem;
    color: var(--secondary);
    opacity: 0.8;
    margin-bottom: 2rem;
  }
  
  blockquote {
    font-size: 1.5rem;
    line-height: 1.7;
    font-family: var(--font-heading);
    font-style: italic;
    margin-bottom: 2rem;
    
    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
    
    @media (max-width: 576px) {
      font-size: 1.1rem;
    }
  }
  
  .client-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    
    strong {
      font-size: 1.1rem;
    }
    
    span {
      opacity: 0.7;
    }
  }
`;

const RelatedProjects = styled.section`
  padding: 80px 0;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
  
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.1rem;
    color: var(--text-secondary);
  }
`;

const NavigationButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1.5rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const NavButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: var(--text-primary);
  padding: 1.25rem;
  border-radius: 8px;
  background-color: #f5f5f5;
  transition: all 0.3s ease;
  
  &.next {
    text-align: right;
    justify-content: flex-end;
  }
  
  div {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
  }
  
  span {
    font-size: 0.85rem;
    color: var(--text-tertiary);
  }
  
  strong {
    font-weight: 600;
  }
  
  i {
    font-size: 1.25rem;
    color: var(--secondary);
  }
  
  &:hover {
    background-color: var(--secondary);
    color: white;
    transform: translateY(-5px);
    
    span {
      color: rgba(255, 255, 255, 0.7);
    }
    
    i {
      color: white;
    }
  }
`;

const AllProjectsButton = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 500;
  
  i {
    font-size: 1.5rem;
    color: var(--secondary);
  }
  
  &:hover {
    color: var(--secondary);
  }
  
  @media (max-width: 768px) {
    margin: 2rem 0;
    flex-direction: row;
  }
`;

const CTASection = styled.section`
  background-color: #f9f9f9;
  padding: 80px 0;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
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

export default ProjectDetail; 