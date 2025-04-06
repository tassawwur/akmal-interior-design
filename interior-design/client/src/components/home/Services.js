import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeIn, staggerContainer } from '../../utils/animations';

// Service icons - using Font Awesome for now, could be replaced with custom SVGs
const services = [
  {
    icon: 'fas fa-couch',
    title: 'Interior Design',
    description: 'Transform your space with our expertly crafted interior design solutions that blend functionality with aesthetics.',
    link: '/services#interior-design'
  },
  {
    icon: 'fas fa-pencil-ruler',
    title: 'Architecture',
    description: 'Create stunning architectural designs that stand out while perfectly serving their intended purpose.',
    link: '/services#architecture'
  },
  {
    icon: 'fas fa-hard-hat',
    title: 'Construction',
    description: 'From concept to completion, our construction services deliver premium quality with precision.',
    link: '/services#construction'
  },
  {
    icon: 'fas fa-clipboard-list',
    title: 'Project Management',
    description: 'Ensure your project runs smoothly, on time, and within budget with our expert project management.',
    link: '/services#project-management'
  },
  {
    icon: 'fas fa-truck',
    title: 'Material Supply',
    description: 'Access high-quality materials from trusted sources, delivered on time for your project needs.',
    link: '/services#material-supply'
  },
  {
    icon: 'fas fa-cogs',
    title: 'Engineering',
    description: 'Leverage our engineering expertise to solve complex challenges and ensure structural integrity.',
    link: '/services#engineering'
  }
];

const ServicesSection = () => {
  return (
    <ServicesWrapper>
      <div className="container">
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <HeaderSection>
            <SubHeading variants={fadeIn("up", 0.1)}>SIGNATURE SERVICES</SubHeading>
            <Heading variants={fadeIn("up", 0.2)}>
              Unparalleled <span className="text-secondary">Design & Execution</span> Excellence
            </Heading>
            <Description variants={fadeIn("up", 0.3)}>
              AKMAL offers an exclusive suite of design and execution services, meticulously crafted to transform exceptional properties into bespoke masterpieces. Our white-glove approach ensures a seamless journey from concept to completion.
            </Description>
          </HeaderSection>
          
          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                variants={fadeIn("up", 0.2 + index * 0.1)}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <IconBox>
                  <i className={service.icon}></i>
                </IconBox>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
                <ServiceLink to={service.link}>
                  Learn More <i className="fas fa-arrow-right"></i>
                </ServiceLink>
                <ServiceOverlay />
              </ServiceCard>
            ))}
          </ServicesGrid>
          
          <CTASection variants={fadeIn("up", 0.3)}>
            <CTAText>
              Ready to elevate your environment to unprecedented levels of sophistication?
            </CTAText>
            <Button as={Link} to="/services" variant="primary">
              Explore Our Exclusive Services
            </Button>
          </CTASection>
        </motion.div>
      </div>
    </ServicesWrapper>
  );
};

const ServicesWrapper = styled.section`
  padding: 120px 0;
  background-color: #fff;
  
  @media (max-width: 992px) {
    padding: 80px 0;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  
  @media (max-width: 768px) {
    margin-bottom: 3rem;
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
  
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
  
  @media (max-width: 576px) {
    font-size: 1.85rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled(motion.div)`
  background-color: #fff;
  padding: 2.5rem 2rem;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const ServiceOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background-color: var(--secondary);
  z-index: -1;
  transition: height 0.4s ease;
  
  ${ServiceCard}:hover & {
    height: 100%;
    opacity: 0.05;
  }
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 20px;
  background-color: rgba(220, 168, 103, 0.1);
  margin-bottom: 1.5rem;
  
  i {
    font-size: 2rem;
    color: var(--secondary);
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
  
  ${ServiceCard}:hover & {
    color: var(--secondary);
  }
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  min-height: 85px;
`;

const ServiceLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--primary);
  transition: color 0.3s ease;
  
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

const CTASection = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 4rem;
  padding: 3rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
    padding: 2rem;
  }
`;

const CTAText = styled.p`
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--text-primary);
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: var(--primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--secondary);
  }
`;

export default ServicesSection; 