import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  return (
    <HeaderWrapper $scrolled={isScrolled}>
      <div className="container">
        <NavContainer>
          <Logo>
            <Link to="/">
              <span>Akmal</span>
              <span className="accent">Shah</span>
            </Link>
          </Logo>

          <DesktopNav>
            <NavList>
              <NavItem $active={location.pathname === '/'}>
                <Link to="/">Home</Link>
              </NavItem>
              <NavItem $active={location.pathname === '/services'}>
                <Link to="/services">Services</Link>
              </NavItem>
              <NavItem $active={location.pathname.includes('/projects')}>
                <Link to="/projects">Projects</Link>
              </NavItem>
              <NavItem $active={location.pathname === '/clients'}>
                <Link to="/clients">Clients</Link>
              </NavItem>
              <NavItem $active={location.pathname === '/team'}>
                <Link to="/team">Team</Link>
              </NavItem>
              <NavItem $active={location.pathname === '/blog'}>
                <Link to="/blog">Blog</Link>
              </NavItem>
              <NavItem $active={location.pathname === '/contact'}>
                <Link to="/contact">Contact</Link>
              </NavItem>
            </NavList>
          </DesktopNav>

          <HamburgerButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className={isMenuOpen ? 'open' : ''}></span>
            <span className={isMenuOpen ? 'open' : ''}></span>
            <span className={isMenuOpen ? 'open' : ''}></span>
          </HamburgerButton>
        </NavContainer>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <MobileNav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <MobileNavList>
              <MobileNavItem $active={location.pathname === '/'}>
                <Link to="/">Home</Link>
              </MobileNavItem>
              <MobileNavItem $active={location.pathname === '/services'}>
                <Link to="/services">Services</Link>
              </MobileNavItem>
              <MobileNavItem $active={location.pathname.includes('/projects')}>
                <Link to="/projects">Projects</Link>
              </MobileNavItem>
              <MobileNavItem $active={location.pathname === '/clients'}>
                <Link to="/clients">Clients</Link>
              </MobileNavItem>
              <MobileNavItem $active={location.pathname === '/team'}>
                <Link to="/team">Team</Link>
              </MobileNavItem>
              <MobileNavItem $active={location.pathname === '/blog'}>
                <Link to="/blog">Blog</Link>
              </MobileNavItem>
              <MobileNavItem $active={location.pathname === '/contact'}>
                <Link to="/contact">Contact</Link>
              </MobileNavItem>
            </MobileNavList>
            <MobileNavFooter>
              <p>Transform Your Space With Us</p>
              <Link to="/contact" className="btn btn-secondary">Get in Touch</Link>
            </MobileNavFooter>
          </MobileNav>
        )}
      </AnimatePresence>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: ${props => props.$scrolled ? '1rem 0' : '1.5rem 0'};
  background-color: ${props => props.$scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
  transition: all 0.3s ease;
  backdrop-filter: ${props => props.$scrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${props => props.$scrolled ? '0 5px 30px rgba(0, 0, 0, 0.1)' : 'none'};
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-family: var(--font-heading);
  font-size: 1.75rem;
  font-weight: 700;
  
  span {
    display: inline-block;
  }
  
  .accent {
    color: var(--secondary);
  }
`;

const DesktopNav = styled.nav`
  @media (max-width: 992px) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: 2.5rem;
  list-style: none;
`;

const NavItem = styled.li`
  position: relative;
  font-weight: 500;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.$active ? '100%' : '0'};
    height: 2px;
    background-color: var(--secondary);
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1001;
  
  @media (max-width: 992px) {
    display: flex;
  }
  
  span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: var(--primary);
    transition: all 0.3s ease;
    
    &.open:nth-child(1) {
      transform: translateY(11px) rotate(45deg);
    }
    
    &.open:nth-child(2) {
      opacity: 0;
    }
    
    &.open:nth-child(3) {
      transform: translateY(-11px) rotate(-45deg);
    }
  }
`;

const MobileNav = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background-color: var(--background);
  padding: 100px 2rem 2rem;
  z-index: 1000;
  box-shadow: -5px 0 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MobileNavList = styled.ul`
  list-style: none;
  margin-bottom: 2rem;
`;

const MobileNavItem = styled.li`
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: 500;
  opacity: ${props => props.$active ? 1 : 0.7};
  color: ${props => props.$active ? 'var(--secondary)' : 'var(--text-primary)'};
  
  &:hover {
    opacity: 1;
  }
`;

const MobileNavFooter = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 2rem;
  
  p {
    margin-bottom: 1rem;
  }
  
  .btn {
    display: inline-block;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    text-align: center;
    transition: all 0.3s ease;
  }
  
  .btn-secondary {
    background-color: var(--secondary);
    color: white;
  }
`;

export default Header; 