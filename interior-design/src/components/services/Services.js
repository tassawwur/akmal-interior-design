import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../utils/animations';
import Button from '../common/Button';

// Service data
const servicesData = [
  {
    id: 1,
    title: 'Residential Interior Design',
    description: 'Transform your home into a personalized sanctuary that reflects your unique style and enhances your daily living experience.',
    icon: 'fas fa-home',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    includes: [
      'Space planning and layout optimization',
      'Custom furniture selection and design',
      'Material and finish selections',
      'Lighting design and specification',
      'Art and accessory curation',
      'Color scheme development'
    ]
  },
  {
    id: 2,
    title: 'Commercial Interior Design',
    description: 'Create impactful commercial spaces that enhance productivity, reflect your brand values, and impress clients.',
    icon: 'fas fa-building',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
    includes: [
      'Brand-aligned space planning',
      'Ergonomic workspace design',
      'Commercial-grade furniture specification',
      'Acoustic and lighting solutions',
      'Regulatory compliance guidance',
      'Traffic flow optimization'
    ]
  },
  {
    id: 3,
    title: 'Space Planning & Optimization',
    description: 'Maximize the functionality and flow of your space with our expert planning services.',
    icon: 'fas fa-pencil-ruler',
    image: 'https://images.unsplash.com/photo-1572025442646-866d16c84a54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    includes: [
      'Detailed floor plan development',
      'Furniture layout and space zoning',
      'Traffic flow analysis',
      'Spatial problem-solving',
      '3D visualization of proposed layouts',
      'Multi-functional space planning'
    ]
  },
  {
    id: 4,
    title: 'Custom Furniture Design',
    description: 'Create one-of-a-kind pieces that perfectly fit your space and style with our custom furniture design service.',
    icon: 'fas fa-couch',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    includes: [
      'Concept development and sketching',
      'Material and finish selection',
      'Detailed construction drawings',
      'Prototype reviews',
      'Craftsman coordination',
      'Quality control and installation'
    ]
  },
  {
    id: 5,
    title: 'Renovation & Remodeling',
    description: 'Breathe new life into existing spaces with our comprehensive renovation services.',
    icon: 'fas fa-hammer',
    image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80',
    includes: [
      'Existing space assessment',
      'Conceptual design development',
      'Contractor selection and management',
      'Material and fixture specification',
      'Construction oversight',
      'Final styling and accessorizing'
    ]
  },
  {
    id: 6,
    title: 'Project Management',
    description: 'Ensure your design project is executed flawlessly with our dedicated project management service.',
    icon: 'fas fa-tasks',
    image: 'https://images.unsplash.com/photo-1664575198308-3959904fa430?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    includes: [
      'Vendor and contractor coordination',
      'Budget management and tracking',
      'Timeline development and monitoring',
      'Quality control inspections',
      'Problem resolution',
      'Regular client updates and communication'
    ]
  }
];

// Service packages
const servicePackages = [
  {
    id: 1,
    title: 'Essential',
    price: '50,000 Rupees',
    description: 'Perfect for single rooms or small spaces needing a refresh',
    features: [
      'Initial consultation (2 hours)',
      'Conceptual design & mood board',
      'Space planning recommendations',
      'Basic furniture recommendations',
      'Color palette suggestions',
      'Shopping list with budget options'
    ],
    recommended: false,
    duration: '1-3 weeks'
  },
  {
    id: 2,
    title: 'Premium',
    price: '200,000 Rupees',
    description: 'Comprehensive design solution for entire rooms or small apartments',
    features: [
      'Extended consultation (3 hours)',
      'Detailed conceptual design & mood boards',
      'Custom space planning with 2 revision rounds',
      'Curated furniture & decor specification',
      'Material, finish & fabric selections',
      'Lighting plan',
      'Detailed shopping list with direct purchase links',
      '3D visualization of key areas'
    ],
    recommended: true,
    duration: '2-5 weeks'
  },
  {
    id: 3,
    title: 'Bespoke',
    price: 'Custom',
    description: 'Full-service luxury design for complete homes or commercial spaces',
    features: [
      'Unlimited consultations throughout project',
      'Comprehensive design concept development',
      'Detailed space planning with multiple revisions',
      'Custom furniture design & specification',
      'Complete material, finish & fixture selections',
      'Comprehensive lighting design',
      'Art & accessory curation & procurement',
      'Contractor coordination & site visits',
      'Full 3D visualization of all spaces',
      'White-glove installation & styling'
    ],
    recommended: false,
    duration: 'Tailored to project scope'
  }
];

// Process steps
const processSteps = [
  {
    step: 1,
    title: 'Discovery',
    description: 'We begin with an in-depth consultation to understand your vision, needs, lifestyle, and budget. This crucial step helps us align our design approach with your expectations.',
    icon: 'fas fa-search'
  },
  {
    step: 2,
    title: 'Concept Development',
    description: 'Our design team creates a comprehensive concept that includes space planning, mood boards, color schemes, and material selections that bring your vision to life.',
    icon: 'fas fa-lightbulb'
  },
  {
    step: 3,
    title: 'Design Refinement',
    description: 'We present our concepts and collaborate with you to refine the design. This iterative process ensures the final design perfectly aligns with your vision and requirements.',
    icon: 'fas fa-pencil-alt'
  },
  {
    step: 4,
    title: 'Documentation',
    description: 'Once the design is approved, we create detailed documentation including technical drawings, specifications, and procurement lists for seamless implementation.',
    icon: 'fas fa-file-alt'
  },
  {
    step: 5,
    title: 'Implementation',
    description: 'We coordinate with contractors, vendors, and craftsmen to bring the design to life, ensuring quality control and adherence to the design vision throughout the process.',
    icon: 'fas fa-tools'
  },
  {
    step: 6,
    title: 'Final Styling',
    description: 'The final touch is the styling stage, where we carefully place and arrange furniture, art, and accessories to create a polished, magazine-worthy space.',
    icon: 'fas fa-magic'
  }
];

// FAQ items
const faqItems = [
  {
    question: "How long does the interior design process typically take?",
    answer: "The timeline varies depending on the scope of the project. Small room designs can take 2-4 weeks, while full home designs may take 3-6 months. Commercial projects often range from 4-12 months. During your consultation, we'll provide a customized timeline for your specific project."
  },
  {
    question: "Do you work with clients' existing furniture and decor?",
    answer: "Absolutely! We believe in creating spaces that reflect your personality, which often includes incorporating beloved existing pieces. During our discovery phase, we'll assess which items can be repurposed, reupholstered, or repositioned to enhance your new design."
  },
  {
    question: "How do you charge for your services?",
    answer: "We offer several pricing structures depending on your needs. For residential projects, we have package options outlined above. For commercial projects, we typically charge a flat fee based on square footage and project complexity. Custom services are priced on a project-by-project basis."
  },
  {
    question: "Do you offer virtual design services?",
    answer: "Yes, we provide virtual design services for clients outside our local area or those who prefer a remote process. Using video consultations, digital mood boards, and 3D visualizations, we can create beautiful spaces without in-person meetings."
  },
  {
    question: "What is your design style?",
    answer: "While our portfolio showcases our versatility, we specialize in creating timeless, elegant spaces with thoughtful details. However, our primary goal is to bring YOUR vision to life, not impose our style. We pride ourselves on our ability to adapt to various aesthetic preferences while ensuring functionality and quality."
  }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState(1);
  const [activeFaq, setActiveFaq] = useState(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ServicesWrapper
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: 20 }}
    >
      {/* Hero Section */}
      <HeroSection variants={fadeIn}>
        <div className="overlay"></div>
        <div className="content">
          <h1>Our Services</h1>
          <p>Comprehensive interior design solutions tailored to your needs</p>
        </div>
      </HeroSection>

      {/* Services Overview */}
      <SectionContainer variants={fadeIn}>
        <SectionHeader>
          <h2>What We Offer</h2>
          <p>We provide a comprehensive range of interior design services to transform any space into something extraordinary.</p>
        </SectionHeader>
        
        <ServicesList>
          {servicesData.map(service => (
            <ServiceCard 
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={selectedService === service.id ? 'active' : ''}
            >
              <div className="icon">
                <i className={service.icon}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="view-more">
                {selectedService === service.id ? 'View Less' : 'View More'}
              </div>
            </ServiceCard>
          ))}
        </ServicesList>
        
        {selectedService && (
          <ServiceDetail variants={fadeIn}>
            <ServiceDetailContent>
              <div className="detail-text">
                <h3>{servicesData[selectedService - 1].title}</h3>
                <p>{servicesData[selectedService - 1].description}</p>
                <h4>This service includes:</h4>
                <ul>
                  {servicesData[selectedService - 1].includes.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <Button as={Link} to="/contact">
                  Inquire About This Service
                </Button>
              </div>
              <div className="detail-image">
                <img src={servicesData[selectedService - 1].image} alt={servicesData[selectedService - 1].title} />
              </div>
            </ServiceDetailContent>
          </ServiceDetail>
        )}
      </SectionContainer>

      {/* Design Process */}
      <ProcessSection variants={fadeIn}>
        <div className="overlay"></div>
        <div className="content">
          <SectionHeader light>
            <h2>Our Design Process</h2>
            <p>We follow a proven methodology to ensure every project is executed with precision and care, delivering exceptional results every time.</p>
          </SectionHeader>
          
          <ProcessSteps>
            {processSteps.map(step => (
              <ProcessStep key={step.step}>
                <div className="step-number">{step.step}</div>
                <div className="step-icon">
                  <i className={step.icon}></i>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </ProcessStep>
            ))}
          </ProcessSteps>
        </div>
      </ProcessSection>
      
      {/* Pricing Packages */}
      <SectionContainer variants={fadeIn}>
        <SectionHeader>
          <h2>Service Packages</h2>
          <p>Choose the package that best fits your needs and budget. Not sure which is right for you? Contact us for a personalized recommendation.</p>
        </SectionHeader>
        
        <PackagesGrid>
          {servicePackages.map(pkg => (
            <PackageCard key={pkg.id} className={pkg.recommended ? 'recommended' : ''}>
              {pkg.recommended && <RecommendedBadge>Most Popular</RecommendedBadge>}
              <h3>{pkg.title}</h3>
              <div className="price">{pkg.price}</div>
              <p className="description">{pkg.description}</p>
              <div className="duration">
                <i className="fas fa-clock"></i> Typical duration: {pkg.duration}
              </div>
              <ul>
                {pkg.features.map((feature, index) => (
                  <li key={index}><i className="fas fa-check"></i> {feature}</li>
                ))}
              </ul>
              <Button as={Link} to="/contact">Select Package</Button>
            </PackageCard>
          ))}
        </PackagesGrid>
        
        <CustomPackageNote>
          <div className="icon">
            <i className="fas fa-star"></i>
          </div>
          <div>
            <h3>Looking for something more tailored?</h3>
            <p>We offer custom packages designed specifically for your unique needs and project requirements.</p>
            <Link to="/contact">Contact us for a custom quote</Link>
          </div>
        </CustomPackageNote>
      </SectionContainer>
      
      {/* FAQ Section */}
      <SectionContainer variants={fadeIn}>
        <SectionHeader>
          <h2>Frequently Asked Questions</h2>
          <p>Here are some common questions our clients ask. If you don't see your question here, feel free to contact us.</p>
        </SectionHeader>
        
        <FaqList>
          {faqItems.map((item, index) => (
            <FaqItem key={index}>
              <FaqQuestion 
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className={activeFaq === index ? 'active' : ''}
              >
                {item.question}
                <span className="icon">
                  <i className="fas fa-chevron-down"></i>
                </span>
              </FaqQuestion>
              <FaqAnswer className={activeFaq === index ? 'active' : ''}>
                {item.answer}
              </FaqAnswer>
            </FaqItem>
          ))}
        </FaqList>
      </SectionContainer>

      {/* CTA Section */}
      <CtaSection variants={fadeIn}>
        <div className="overlay"></div>
        <div className="content">
          <h2>Ready to transform your space?</h2>
          <p>Contact us today for a consultation and take the first step toward creating the space of your dreams.</p>
          <Button as={Link} to="/contact">Schedule a Consultation</Button>
        </div>
      </CtaSection>
    </ServicesWrapper>
  );
};

const ServicesWrapper = styled(motion.div)`
  max-width: 100%;
  overflow-x: hidden;
`;

const HeroSection = styled(motion.div)`
  position: relative;
  height: 60vh;
  width: 100%;
  background-image: url('https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80');
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
    background: rgba(0,0,0,0.5);
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

const ServicesList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  background: white;
  padding: 40px 30px;
  border-radius: 10px;
  box-shadow: var(--shadow-md);
  transition: var(--transition);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &:hover, &.active {
    box-shadow: var(--shadow-lg);
    transform: translateY(-5px);
  }
  
  &.active {
    border-bottom: 3px solid var(--color-gold);
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: var(--color-gold);
    transition: width 0.5s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
  
  .icon {
    width: 70px;
    height: 70px;
    background: var(--color-bg-light);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;
    color: var(--color-gold);
    font-size: 1.5rem;
    transition: transform 0.3s ease;
  }
  
  &:hover .icon {
    transform: scale(1.1);
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    transition: color 0.3s ease;
  }
  
  &:hover h3 {
    color: var(--color-gold);
  }
  
  p {
    color: var(--color-text);
    margin-bottom: 20px;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .view-more {
    color: var(--color-gold);
    font-weight: 600;
    font-size: 0.9rem;
    display: inline-flex;
    align-items: center;
    
    &:after {
      content: '→';
      margin-left: 5px;
      transition: var(--transition);
    }
    
    &:hover:after {
      margin-left: 10px;
    }
  }
`;

const ServiceDetail = styled(motion.div)`
  margin-top: 50px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  padding: 30px;
`;

const ServiceDetailContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  
  .detail-text {
    h3 {
      font-size: 2rem;
      margin-bottom: 20px;
      color: var(--color-text-dark);
    }
    
    p {
      margin-bottom: 20px;
      color: var(--color-text);
      line-height: 1.7;
    }
    
    h4 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: var(--color-text-dark);
    }
    
    ul {
      list-style: none;
      margin-bottom: 30px;
      
      li {
        position: relative;
        padding-left: 30px;
        margin-bottom: 10px;
        color: var(--color-text);
        
        &:before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-gold);
        }
      }
    }
  }
  
  .detail-image {
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
      
      &:hover {
        transform: scale(1.05);
      }
    }
  }
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    
    .detail-image {
      height: 400px;
      order: -1;
    }
  }
`;

const ProcessSection = styled(motion.section)`
  position: relative;
  background-image: url('https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');
  background-size: cover;
  background-position: center;
  padding: 100px 20px;
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.85);
  }
  
  .content {
    position: relative;
    z-index: 2;
    max-width: 1400px;
    margin: 0 auto;
  }
`;

const ProcessSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-top: 60px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ProcessStep = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 40px 30px;
  color: white;
  transition: var(--transition);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
    
    .step-icon {
      transform: scale(1.1) rotate(5deg);
    }
  }
  
  .step-number {
    position: absolute;
    top: -15px;
    left: -15px;
    width: 50px;
    height: 50px;
    background: var(--color-gold);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    font-weight: 700;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  }
  
  .step-icon {
    font-size: 2rem;
    color: var(--color-gold);
    margin-bottom: 20px;
    transition: transform 0.3s ease;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    color: var(--color-gold);
    letter-spacing: 0.5px;
    font-weight: 600;
  }
  
  p {
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
    text-shadow: 0 1px 3px rgba(0,0,0,0.5);
  }
`;

const PackagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 50px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    max-width: 600px;
    margin: 0 auto 50px;
  }
`;

const PackageCard = styled.div`
  position: relative;
  background: white;
  border-radius: 10px;
  padding: 40px 30px;
  box-shadow: var(--shadow-md);
  transition: var(--transition);
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }
  
  &:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-5px);
    
    &:before {
      transform: translateX(0);
    }
    
    h3 {
      color: var(--color-gold);
    }
  }
  
  &.recommended {
    border: 2px solid var(--color-gold);
    z-index: 1;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    
    @media (min-width: 993px) {
      margin-top: -20px;
      margin-bottom: -20px;
      padding-top: 60px;
      padding-bottom: 60px;
    }
  }
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 15px;
    text-align: center;
    transition: color 0.3s ease;
  }
  
  .price {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-text-dark);
    text-align: center;
    margin-bottom: 15px;
  }
  
  .description {
    text-align: center;
    color: var(--color-text);
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
  
  .duration {
    font-size: 0.9rem;
    color: var(--color-text);
    margin-bottom: 25px;
    text-align: center;
    font-style: italic;
    
    i {
      margin-right: 5px;
      color: var(--color-gold);
    }
  }
  
  ul {
    list-style: none;
    margin-bottom: 30px;
    flex-grow: 1;
    
    li {
      position: relative;
      padding: 10px 0 10px 30px;
      color: var(--color-text);
      border-bottom: 1px solid #f5f5f5;
      transition: background-color 0.2s ease;
      
      &:hover {
        background-color: #f9f9f9;
      }
      
      i {
        position: absolute;
        left: 0;
        top: 12px;
        color: var(--color-gold);
      }
    }
  }
  
  button {
    margin-top: auto;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const RecommendedBadge = styled.div`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-gold);
  color: white;
  padding: 8px 20px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
`;

const CustomPackageNote = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  background: var(--color-bg-light);
  padding: 40px;
  border-radius: 10px;
  
  .icon {
    font-size: 2.5rem;
    color: var(--color-gold);
    flex-shrink: 0;
  }
  
  h3 {
    font-size: 1.4rem;
    margin-bottom: 10px;
    color: var(--color-text-dark);
  }
  
  p {
    color: var(--color-text);
    margin-bottom: 10px;
  }
  
  a {
    color: var(--color-gold);
    font-weight: 600;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    
    .icon {
      margin-bottom: 20px;
    }
  }
`;

const FaqList = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const FaqItem = styled.div`
  margin-bottom: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  
  &:hover {
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    transform: translateY(-2px);
  }
`;

const FaqQuestion = styled.div`
  padding: 20px;
  background: white;
  color: var(--color-text-dark);
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: var(--transition);
  
  &:hover {
    background: #f9f9f9;
    color: var(--color-gold);
  }
  
  &.active {
    color: var(--color-gold);
    background-color: #f9f9f9;
    border-bottom: 1px solid #eee;
  }
  
  .icon {
    color: var(--color-gold);
    transition: transform 0.3s ease;
    
    i {
      display: inline-block;
    }
  }
  
  &.active .icon i {
    transform: rotate(180deg);
  }
`;

const FaqAnswer = styled.div`
  padding: 0 20px;
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  background: #f9f9f9;
  opacity: 0;
  
  &.active {
    max-height: 500px;
    padding: 20px;
    opacity: 1;
    line-height: 1.6;
  }
`;

const CtaSection = styled(motion.div)`
  position: relative;
  background-image: url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');
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

export default Services; 