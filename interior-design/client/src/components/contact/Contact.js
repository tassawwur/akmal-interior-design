import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Interior Design',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const validateForm = () => {
    const errors = {};
    let isValid = true;
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
      isValid = false;
    }
    
    if (!formData.service) {
      errors.service = 'Please select a service';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus({
      submitted: true,
      success: false,
      message: 'Sending your message...'
    });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus({
        submitted: true,
        success: true,
        message: 'Thank you! Your message has been received. We will contact you shortly.'
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Interior Design',
        message: ''
      });
      
      setTimeout(() => {
        setSubmitStatus({
          submitted: false,
          success: false,
          message: ''
        });
      }, 5000);
    } catch (error) {
      setSubmitStatus({
        submitted: true,
        success: false,
        message: 'There was an error sending your message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactWrapper
      variants={pageTransition}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <HeroSection>
        <div className="container">
          <HeroContent>
            <Title>Exclusive Consultations</Title>
            <Subtitle>Begin your exceptional design journey with a personalized consultation</Subtitle>
          </HeroContent>
        </div>
      </HeroSection>
      
      <MainContent className="container">
        <ContentGrid>
          <FormSection>
            <SectionHeading>Initiate Your Design Journey</SectionHeading>
            
            {submitStatus.submitted && (
              <FormStatus success={submitStatus.success}>
                {submitStatus.message}
              </FormStatus>
            )}
            
            <ContactForm onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel htmlFor="name">Full Name <span className="required">*</span></FormLabel>
                <FormInput 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  error={formErrors.name}
                  disabled={isSubmitting}
                  placeholder="Your name"
                />
                {formErrors.name && <ErrorMessage>{formErrors.name}</ErrorMessage>}
              </FormGroup>
              
              <FormRow>
                <FormGroup>
                  <FormLabel htmlFor="email">Email Address <span className="required">*</span></FormLabel>
                  <FormInput 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    error={formErrors.email}
                    disabled={isSubmitting}
                    placeholder="Your email address"
                  />
                  {formErrors.email && <ErrorMessage>{formErrors.email}</ErrorMessage>}
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="phone">Phone Number</FormLabel>
                  <FormInput 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="Your phone number"
                  />
                  {formErrors.phone && <ErrorMessage>{formErrors.phone}</ErrorMessage>}
                </FormGroup>
              </FormRow>
              
              <FormGroup>
                <FormLabel htmlFor="service">Service Interest</FormLabel>
                <FormSelect 
                  id="service" 
                  name="service" 
                  value={formData.service}
                  onChange={handleChange}
                  disabled={isSubmitting}
                >
                  <option value="">Select a service</option>
                  <option value="Interior Design">Interior Design</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Project Management">Project Management</option>
                  <option value="Other">Other</option>
                </FormSelect>
                {formErrors.service && <ErrorMessage>{formErrors.service}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="message">Your Message <span className="required">*</span></FormLabel>
                <FormTextarea 
                  id="message" 
                  name="message" 
                  rows="6" 
                  value={formData.message}
                  onChange={handleChange}
                  error={formErrors.message}
                  disabled={isSubmitting}
                  placeholder="Tell us about your project or inquiry"
                ></FormTextarea>
                {formErrors.message && <ErrorMessage>{formErrors.message}</ErrorMessage>}
              </FormGroup>
              
              <SubmitButton 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="button-text">Sending...</span>
                    <LoadingSpinner className="loading-spinner" />
                  </>
                ) : 'Send Message'}
              </SubmitButton>
            </ContactForm>
          </FormSection>
          
          <InfoSection>
            <SectionHeading>Contact Information</SectionHeading>
            
            <InfoCard>
              <InfoItem>
                <InfoIcon>
                  <i className="fas fa-map-marker-alt"></i>
                </InfoIcon>
                <div>
                  <InfoLabel>Our Address</InfoLabel>
                  <InfoText>#10 Rehman Street, Beadon Road Lahore 54000, Pakistan</InfoText>
                </div>
              </InfoItem>
              
              <InfoItem>
                <InfoIcon>
                  <i className="fas fa-phone-alt"></i>
                </InfoIcon>
                <div>
                  <InfoLabel>Phone Number</InfoLabel>
                  <InfoText>+92 3156293975</InfoText>
                </div>
              </InfoItem>
              
              <InfoItem>
                <InfoIcon>
                  <i className="fas fa-envelope"></i>
                </InfoIcon>
                <div>
                  <InfoLabel>Email Address</InfoLabel>
                  <InfoText>tassawwurhussain61@gmail.com</InfoText>
                </div>
              </InfoItem>
              
              <InfoItem>
                <InfoIcon>
                  <i className="fas fa-clock"></i>
                </InfoIcon>
                <div>
                  <InfoLabel>Business Hours</InfoLabel>
                  <InfoText>Monday - Friday: 9am - 6pm</InfoText>
                  <InfoText>Saturday: 10am - 4pm</InfoText>
                  <InfoText>Sunday: Closed</InfoText>
                </div>
              </InfoItem>
            </InfoCard>
            
            <SocialCard>
              <SocialHeading>Connect With Us</SocialHeading>
              <SocialLinks>
                <SocialLink href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </SocialLink>
                <SocialLink href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </SocialLink>
                <SocialLink href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </SocialLink>
                <SocialLink href="#" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </SocialLink>
              </SocialLinks>
            </SocialCard>
          </InfoSection>
        </ContentGrid>
      </MainContent>
      
      <MapSection>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d318.1298159153049!2d74.32240623571364!3d31.564477607652062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2s!4v1743220695744!5m2!1sen!2s" 
          width="100%" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Our Location"
        ></iframe>
      </MapSection>
      
      <FaqSection>
        <div className="container">
          <SectionHeading className="text-center">Excellence In Every Detail</SectionHeading>
          
          <FaqGrid>
            <FaqItem>
              <h3>What distinguishes AANGANLAB's approach?</h3>
              <p>We combine unrivaled design expertise with bespoke craftsmanship to create environments of exceptional refinement. Our white-glove service ensures a seamless experience from concept to completion.</p>
            </FaqItem>
            
            <FaqItem>
              <h3>What investment should I anticipate?</h3>
              <p>Each AANGANLAB project represents a bespoke creation, with investments tailored to your vision and specifications. Our exclusive clientele typically engages us for comprehensive transformations starting from ₨10M, with our signature residences and commercial environments commanding ₨30M+.</p>
            </FaqItem>
            
            <FaqItem>
              <h3>What is your project timeline philosophy?</h3>
              <p>While our commitment to perfection necessitates appropriate timelines, we orchestrate projects with precision. Boutique transformations typically require 2-3 months, while comprehensive estates and commercial environments are executed within 4-8 months, depending on scope and complexity.</p>
            </FaqItem>
            
            <FaqItem>
              <h3>Do you offer remote design services?</h3>
              <p>For our distinguished clients beyond Lahore, we offer our exclusive Remote Design Program, combining virtual consultations with on-site visits to deliver the AANGANLAB experience throughout Pakistan and internationally.</p>
            </FaqItem>
          </FaqGrid>
        </div>
      </FaqSection>
    </ContactWrapper>
  );
};

const ContactWrapper = styled(motion.main)`
  overflow: hidden;
`;

const HeroSection = styled.section`
  background-color: var(--primary);
  color: white;
  padding: 150px 0 80px;
`;

const HeroContent = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
  opacity: 0.8;
`;

const MainContent = styled.div`
  padding: 100px 0;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 50px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div``;

const InfoSection = styled.div``;

const SectionHeading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: var(--primary);
  
  &.text-center {
    text-align: center;
    margin-bottom: 50px;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ContactForm = styled.form`
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--primary);
  
  .required {
    color: #e74c3c;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid ${props => props.error ? '#e74c3c' : '#ddd'};
  border-radius: 5px;
  background-color: ${props => props.error ? 'rgba(231, 76, 60, 0.05)' : 'white'};
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--secondary);
    box-shadow: 0 0 0 3px rgba(var(--secondary-rgb), 0.1);
  }
  
  &::placeholder {
    color: #aaa;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid ${props => props.error ? '#e74c3c' : '#ddd'};
  border-radius: 5px;
  background-color: ${props => props.error ? 'rgba(231, 76, 60, 0.05)' : 'white'};
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  min-height: 150px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--secondary);
    box-shadow: 0 0 0 3px rgba(var(--secondary-rgb), 0.1);
  }
  
  &::placeholder {
    color: #aaa;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: white;
  font-family: inherit;
  font-size: 1rem;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 16px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--secondary);
    box-shadow: 0 0 0 3px rgba(var(--secondary-rgb), 0.1);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: var(--secondary);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 14px 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background-color: var(--primary);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
  
  .button-text {
    opacity: 0;
  }
  
  .loading-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const InfoCard = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(var(--secondary-rgb), 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  color: var(--secondary);
  font-size: 1.25rem;
  flex-shrink: 0;
`;

const InfoLabel = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 5px;
  color: var(--primary);
`;

const InfoText = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 5px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SocialCard = styled.div`
  background: var(--primary);
  padding: 30px;
  border-radius: 10px;
  text-align: center;
`;

const SocialHeading = styled.h4`
  font-size: 1.3rem;
  color: white;
  margin-bottom: 20px;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--secondary);
    transform: translateY(-3px);
  }
`;

const MapSection = styled.section`
  height: 450px;
  
  iframe {
    display: block;
  }
`;

const FaqSection = styled.section`
  background-color: #f9f9f9;
  padding: 100px 0;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const FaqGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const FaqItem = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: var(--primary);
  }
  
  p {
    color: var(--text-secondary);
    line-height: 1.7;
  }
`;

const FormStatus = styled.div`
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  text-align: center;
  background-color: ${props => props.success ? 'rgba(0, 128, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)'};
  color: ${props => props.success ? 'green' : 'red'};
  border: 1px solid ${props => props.success ? 'green' : 'red'};
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 5px;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Contact;