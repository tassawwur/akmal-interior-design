import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../utils/animations';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;
    
    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!formData.service) {
      tempErrors.service = 'Please select a service';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required';
      isValid = false;
    }
    
    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Show loading state
    setFormStatus({
      submitted: true,
      success: false,
      message: 'Sending your message...'
    });
    
    // Simulate API call with timeout
    setTimeout(() => {
      // In production, this would be a real API call
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Thank you! Your message has been sent successfully. We will contact you shortly.'
      });
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: ''
        });
      }, 5000);
    }, 1500);
  };

  return (
    <ContactWrapper>
      <div className="container">
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <ContactContent>
            <ContactInfo>
              <SubHeading variants={fadeIn("up", 0.1)}>PRIVATE CONSULTATION</SubHeading>
              <Heading variants={fadeIn("up", 0.2)}>
                Begin Your <span className="text-secondary">Bespoke Design</span> Journey
              </Heading>
              <Description variants={fadeIn("up", 0.3)}>
                Take the first step toward creating your extraordinary environment with a confidential consultation. Our design directors personally review each inquiry to ensure an exceptional journey from conception to completion.
              </Description>
              
              <InfoItems variants={fadeIn("up", 0.4)}>
                <InfoItem>
                  <IconBox>
                    <i className="fas fa-map-marker-alt"></i>
                  </IconBox>
                  <InfoContent>
                    <InfoTitle>Visit Us</InfoTitle>
                    <InfoText>Rehman Street#10,Beadon Road Lahore 54000 </InfoText>
                  </InfoContent>
                </InfoItem>
                
                <InfoItem>
                  <IconBox>
                    <i className="fas fa-phone-alt"></i>
                  </IconBox>
                  <InfoContent>
                    <InfoTitle>Call Us</InfoTitle>
                    <InfoText>+92 3156293975</InfoText>
                  </InfoContent>
                </InfoItem>
                
                <InfoItem>
                  <IconBox>
                    <i className="fas fa-envelope"></i>
                  </IconBox>
                  <InfoContent>
                    <InfoTitle>Email Us</InfoTitle>
                    <InfoText>tassawwurhussain61@gmail.com</InfoText>
                  </InfoContent>
                </InfoItem>
              </InfoItems>
              
              <SocialLinks variants={fadeIn("up", 0.5)}>
                <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </SocialLink>
                <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </SocialLink>
                <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </SocialLink>
                <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </SocialLink>
              </SocialLinks>
            </ContactInfo>
            
            <ContactFormWrapper variants={fadeIn("left", 0.2)}>
              <FormTitle>Send Us a Message</FormTitle>
              
              {formStatus.submitted && (
                <FormMessage success={formStatus.success}>
                  {formStatus.message}
                </FormMessage>
              )}
              
              <ContactForm onSubmit={handleSubmit}>
                <FormGroup>
                  <FormLabel htmlFor="name">Full Name *</FormLabel>
                  <FormInput
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                  {errors.name && <ErrorText>{errors.name}</ErrorText>}
                </FormGroup>
                
                <FormRow>
                  <FormGroup>
                    <FormLabel htmlFor="email">Email *</FormLabel>
                    <FormInput
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                    />
                    {errors.email && <ErrorText>{errors.email}</ErrorText>}
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel htmlFor="phone">Phone Number</FormLabel>
                    <FormInput
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </FormRow>
                
                <FormGroup>
                  <FormLabel htmlFor="service">Service Interested In *</FormLabel>
                  <FormSelect
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    error={errors.service}
                  >
                    <option value="">Select a service</option>
                    <option value="Interior Design">Interior Design</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Construction">Construction</option>
                    <option value="Project Management">Project Management</option>
                    <option value="Material Supply">Material Supply</option>
                    <option value="Engineering">Engineering</option>
                  </FormSelect>
                  {errors.service && <ErrorText>{errors.service}</ErrorText>}
                </FormGroup>
                
                <FormGroup>
                  <FormLabel htmlFor="message">Your Message *</FormLabel>
                  <FormTextarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    error={errors.message}
                  ></FormTextarea>
                  {errors.message && <ErrorText>{errors.message}</ErrorText>}
                </FormGroup>
                
                <SubmitButton 
                  type="submit" 
                  disabled={formStatus.submitted && !formStatus.success}
                >
                  {formStatus.submitted && !formStatus.success ? (
                    <span>Sending <i className="fas fa-spinner fa-spin"></i></span>
                  ) : (
                    <span>Send Message</span>
                  )}
                </SubmitButton>
              </ContactForm>
            </ContactFormWrapper>
          </ContactContent>
        </motion.div>
      </div>
    </ContactWrapper>
  );
};

const ContactWrapper = styled.section`
  padding: 120px 0;
  background-color: white;
  
  @media (max-width: 992px) {
    padding: 80px 0;
  }
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 4rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled.div`
  @media (max-width: 992px) {
    text-align: center;
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
  margin-bottom: 2.5rem;
`;

const InfoItems = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const IconBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(220, 168, 103, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  
  i {
    font-size: 1.25rem;
    color: var(--secondary);
  }
`;

const InfoContent = styled.div``;

const InfoTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const InfoText = styled.p`
  color: var(--text-secondary);
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--secondary);
    color: white;
    transform: translateY(-3px);
  }
`;

const ContactFormWrapper = styled(motion.div)`
  background-color: #f9f9f9;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 576px) {
    padding: 2rem;
  }
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
`;

const FormMessage = styled.div`
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  background-color: ${props => props.success ? 'rgba(75, 181, 67, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  color: ${props => props.success ? '#4bb543' : '#ef4444'};
  text-align: center;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FormLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
`;

const FormInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.error ? '#ef4444' : '#e0e0e0'};
  border-radius: 4px;
  font-family: var(--font-body);
  transition: all 0.3s ease;
  
  &:focus {
    border-color: var(--secondary);
    outline: none;
    box-shadow: 0 0 0 2px rgba(220, 168, 103, 0.2);
  }
`;

const FormSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.error ? '#ef4444' : '#e0e0e0'};
  border-radius: 4px;
  font-family: var(--font-body);
  background-color: white;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: var(--secondary);
    outline: none;
    box-shadow: 0 0 0 2px rgba(220, 168, 103, 0.2);
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.error ? '#ef4444' : '#e0e0e0'};
  border-radius: 4px;
  font-family: var(--font-body);
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: var(--secondary);
    outline: none;
    box-shadow: 0 0 0 2px rgba(220, 168, 103, 0.2);
  }
`;

const ErrorText = styled.span`
  color: #ef4444;
  font-size: 0.75rem;
`;

const SubmitButton = styled.button`
  background-color: var(--secondary);
  color: var(--primary);
  font-weight: 600;
  padding: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #c99758;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export default ContactSection; 