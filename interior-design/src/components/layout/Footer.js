import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <div className="container">
        <FooterContent>
          <FooterBranding>
            <FooterLogo>
              <span>Aangan</span>
              <span className="accent">Lab</span>
            </FooterLogo>
            <p>
              Pakistan's most distinguished interior design atelier, crafting environments of exceptional beauty and functionality for the nation's most discerning clientele. Uncompromising quality, visionary design, and flawless execution since 2008.
            </p>
            <SocialIcons>
              <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f" aria-hidden="true"></i>
              </SocialIcon>
              <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram" aria-hidden="true"></i>
              </SocialIcon>
              <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter" aria-hidden="true"></i>
              </SocialIcon>
              <SocialIcon href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in" aria-hidden="true"></i>
              </SocialIcon>
            </SocialIcons>
          </FooterBranding>

          <FooterNavigation>
            <FooterNavColumn>
              <h4>Navigation</h4>
              <FooterNavList>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/clients">Our Clients</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </FooterNavList>
            </FooterNavColumn>

            <FooterNavColumn>
              <h4>Services</h4>
              <FooterNavList>
                <li><Link to="/services">Interior Design</Link></li>
                <li><Link to="/services">Architecture</Link></li>
                <li><Link to="/services">Construction</Link></li>
                <li><Link to="/services">Project Management</Link></li>
                <li><Link to="/services">Material Supply</Link></li>
                <li><Link to="/services">Engineering</Link></li>
              </FooterNavList>
            </FooterNavColumn>

            <FooterNavColumn>
              <h4>Contact Us</h4>
              <ContactInfo>
                <ContactItem>
                  <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                  <span>Rehman Street#10,Beadon Road Lahore 54000</span>
                </ContactItem>
                <ContactItem>
                  <i className="fas fa-phone-alt" aria-hidden="true"></i>
                  <a href="tel:+923156293975">+92 3156293975</a>
                </ContactItem>
                <ContactItem>
                  <i className="fas fa-envelope" aria-hidden="true"></i>
                  <a href="mailto:tassawwurhussain61@gmail.com">tassawwurhussain61@gmail.com</a>
                </ContactItem>
                <ContactItem>
                  <i className="fas fa-clock" aria-hidden="true"></i>
                  <span>Mon-Fri: 9am - 6pm</span>
                </ContactItem>
              </ContactInfo>
            </FooterNavColumn>
          </FooterNavigation>
        </FooterContent>

        <NewsletterSection>
          <h4>Subscribe to Our Newsletter</h4>
          <p>Stay updated with our latest projects and design insights</p>
          <NewsletterForm>
            <input type="email" placeholder="Enter your email" aria-label="Email for newsletter" />
            <button type="submit" aria-label="Subscribe">Subscribe</button>
          </NewsletterForm>
        </NewsletterSection>

        <FooterBottom>
          <p>&copy; {currentYear} AanganLab. All rights reserved.</p>
          <FooterBottomLinks>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
          </FooterBottomLinks>
        </FooterBottom>
      </div>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  background-color: var(--color-primary);
  color: #fff;
  padding: 3rem 0 1.5rem;
  
  @media (min-width: 768px) {
    padding: 4rem 0 2rem;
  }
  
  @media (min-width: 992px) {
    padding: 5rem 0 2rem;
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 3rem;
  }
  
  @media (min-width: 992px) {
    flex-wrap: nowrap;
    gap: 4rem;
  }
`;

const FooterBranding = styled.div`
  width: 100%;
  
  p {
    margin: 1.25rem 0;
    opacity: 0.8;
    font-size: 0.9rem;
    line-height: 1.6;
  }
  
  @media (min-width: 768px) {
    width: 100%;
    p {
      font-size: 0.925rem;
      line-height: 1.7;
    }
  }
  
  @media (min-width: 992px) {
    width: 35%;
    max-width: 350px;
    p {
      margin: 1.5rem 0;
      font-size: 0.95rem;
      line-height: 1.8;
    }
  }
`;

const FooterLogo = styled.div`
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  
  span {
    display: inline-block;
  }
  
  .accent {
    color: var(--color-secondary);
  }
  
  @media (min-width: 768px) {
    font-size: 1.75rem;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
  
  @media (min-width: 768px) {
    margin-top: 2rem;
  }
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--color-secondary);
    transform: translateY(-3px);
  }
  
  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const FooterNavigation = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  width: 100%;
  
  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
    width: 65%;
  }
`;

const FooterNavColumn = styled.div`
  h4 {
    font-size: 1.1rem;
    margin-bottom: 1.25rem;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 30px;
      height: 2px;
      background-color: var(--color-secondary);
    }
    
    @media (min-width: 768px) {
      font-size: 1.25rem;
      margin-bottom: 1.5rem;
      
      &::after {
        bottom: -10px;
      }
    }
  }
`;

const FooterNavList = styled.ul`
  list-style: none;
  
  li {
    margin-bottom: 0.6rem;
    
    a {
      opacity: 0.8;
      transition: all 0.3s ease;
      font-size: 0.9rem;
      
      &:hover {
        opacity: 1;
        color: var(--color-secondary);
        padding-left: 5px;
      }
      
      @media (min-width: 768px) {
        font-size: 0.95rem;
      }
    }
    
    @media (min-width: 768px) {
      margin-bottom: 0.75rem;
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  
  i {
    color: var(--color-secondary);
    font-size: 0.9rem;
    margin-top: 4px;
  }
  
  span, a {
    opacity: 0.8;
    font-size: 0.9rem;
    transition: all 0.3s ease;
  }
  
  a:hover {
    opacity: 1;
    color: var(--color-secondary);
  }
  
  @media (min-width: 768px) {
    gap: 1rem;
    
    i {
      font-size: 1rem;
      margin-top: 5px;
    }
    
    span, a {
      font-size: 0.95rem;
    }
  }
`;

const NewsletterSection = styled.div`
  margin-top: 2.5rem;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  h4 {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
    
    @media (min-width: 768px) {
      font-size: 1.25rem;
    }
  }
  
  p {
    opacity: 0.8;
    font-size: 0.9rem;
    margin-bottom: 1.25rem;
    
    @media (min-width: 768px) {
      font-size: 0.95rem;
    }
  }
  
  @media (min-width: 768px) {
    margin-top: 3rem;
    padding-top: 3rem;
  }
  
  @media (min-width: 992px) {
    margin-top: 4rem;
    padding-top: 3rem;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  input {
    padding: 0.75rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.05);
    color: white;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    
    &:focus {
      outline: none;
      border-color: var(--color-secondary);
    }
  }
  
  button {
    padding: 0.75rem 1.5rem;
    background-color: var(--color-secondary);
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #c99652;
    }
  }
  
  @media (min-width: 576px) {
    flex-direction: row;
    
    input {
      flex: 1;
    }
    
    button {
      white-space: nowrap;
    }
  }
`;

const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  
  p {
    opacity: 0.7;
    font-size: 0.85rem;
  }
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 3rem;
    padding-top: 2rem;
    text-align: left;
    
    p {
      font-size: 0.9rem;
    }
  }
`;

const FooterBottomLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  
  a {
    opacity: 0.7;
    font-size: 0.85rem;
    transition: all 0.3s ease;
    
    &:hover {
      opacity: 1;
      color: var(--color-secondary);
    }
  }
  
  @media (min-width: 768px) {
    justify-content: flex-end;
    
    a {
      font-size: 0.9rem;
    }
  }
`;

export default Footer; 