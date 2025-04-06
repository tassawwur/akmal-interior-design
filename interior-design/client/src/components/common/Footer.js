import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <div className="container">
        <FooterGrid>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Rehman street#10, Beadon road,</p>
            <p>Lahore 54000</p>
            <p>Phone: +923156293975</p>
            <p>Email: tassawwurhussain61@gmail.com</p>
          </div>
          <div className="footer-section">
            <h3>About AKMAL.</h3>
            <p>Your trusted partner in creating exceptional interior spaces. We transform your vision into reality with precision and passion.</p>
          </div>
          <div className="footer-section">
            <h3>Areas We Serve</h3>
            <p>We primarily serve Lahore and surrounding areas, but can take on projects throughout Pakistan for larger engagements.</p>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </FooterGrid>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} AKMAL. All rights reserved.</p>
        </div>
      </div>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #222;
  color: #fff;
  padding: 4rem 0 2rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  
  .footer-section {
    h3 {
      margin-bottom: 1.5rem;
      position: relative;
      display: inline-block;
      
      &:after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 50px;
        height: 2px;
        background-color: var(--primary);
      }
    }
    
    p {
      margin-bottom: 0.75rem;
      line-height: 1.6;
    }
    
    .social-links {
      display: flex;
      gap: 1rem;
      
      a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        color: #fff;
        font-size: 1.25rem;
        transition: all 0.3s ease;
        
        &:hover {
          background-color: var(--primary);
          transform: translateY(-3px);
        }
      }
    }
  }
  
  .copyright {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    
    p {
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;

export default Footer; 