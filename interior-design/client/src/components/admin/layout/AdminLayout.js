import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHome, FaBlog, FaUsers, FaProjectDiagram, FaServicestack, FaComments, FaChartBar, FaBuilding, FaCog, FaSignOutAlt, FaTachometerAlt, FaImage } from 'react-icons/fa';

// Admin API service for auth verification
import { getCurrentAdmin, logoutAdmin } from '../../../services/api';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [adminUser, setAdminUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Check if admin is logged in
    const verifyAdmin = async () => {
      try {
        setIsLoading(true);
        const response = await getCurrentAdmin();
        if (response.success) {
          setAdminUser(response.data);
        } else {
          // Redirect to login if not authenticated
          navigate('/admin/login', { replace: true });
        }
      } catch (error) {
        console.error('Authentication error:', error);
        navigate('/admin/login', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };
    
    verifyAdmin();
    
    // Handle window resize
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate]);
  
  const handleLogout = async () => {
    try {
      await logoutAdmin();
      navigate('/admin/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  // Menu items
  const menuItems = [
    { path: '/admin/dashboard', name: 'Dashboard', icon: <FaTachometerAlt /> },
    { path: '/admin/blogs', name: 'Blogs', icon: <FaBlog /> },
    { path: '/admin/projects', name: 'Projects', icon: <FaProjectDiagram /> },
    { path: '/admin/services', name: 'Services', icon: <FaServicestack /> },
    { path: '/admin/construction-services', name: 'Construction Services', icon: <FaBuilding /> },
    { path: '/admin/team', name: 'Team', icon: <FaUsers /> },
    { path: '/admin/testimonials', name: 'Testimonials', icon: <FaComments /> },
    { path: '/admin/stats', name: 'Stats', icon: <FaChartBar /> },
    { path: '/admin/media', name: 'Media Gallery', icon: <FaImage /> },
    { path: '/admin/seo', name: 'SEO Manager', icon: <FaCog /> },
    { path: '/', name: 'View Website', icon: <FaHome /> }
  ];
  
  if (isLoading) {
    return (
      <LoadingWrapper>
        <Spinner />
        <LoadingText>Verifying admin access...</LoadingText>
      </LoadingWrapper>
    );
  }
  
  return (
    <AdminContainer>
      {/* Mobile Header */}
      <MobileHeader>
        <MenuToggle onClick={toggleSidebar}>
          <div className={isSidebarOpen ? 'open' : ''}></div>
        </MenuToggle>
        <MobileLogo>Akmal Admin</MobileLogo>
      </MobileHeader>
      
      {/* Sidebar */}
      <Sidebar className={isSidebarOpen ? 'open' : ''}>
        <SidebarHeader>
          <Logo>AKMAL</Logo>
          <AdminSubtitle>Admin Panel</AdminSubtitle>
        </SidebarHeader>
        <AdminInfo>
          {adminUser && (
            <>
              <AdminAvatar src={adminUser.avatar || '/images/avatar-placeholder.jpg'} alt={adminUser.name} />
              <AdminName>{adminUser.name}</AdminName>
              <AdminRole>{adminUser.role}</AdminRole>
            </>
          )}
        </AdminInfo>
        <Nav>
          {menuItems.map((item) => (
            <NavItem key={item.path} active={location.pathname === item.path}>
              <NavLink to={item.path} onClick={isMobile ? toggleSidebar : undefined}>
                <NavIcon>{item.icon}</NavIcon>
                <NavText>{item.name}</NavText>
              </NavLink>
            </NavItem>
          ))}
          <LogoutButton onClick={handleLogout}>
            <NavIcon><FaSignOutAlt /></NavIcon>
            <NavText>Logout</NavText>
          </LogoutButton>
        </Nav>
      </Sidebar>
      
      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && <Overlay onClick={toggleSidebar} />}
      
      {/* Main Content */}
      <MainContent isSidebarOpen={isSidebarOpen} isMobile={isMobile}>
        {children}
      </MainContent>
    </AdminContainer>
  );
};

// Styled Components
const AdminContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fb;
  position: relative;
`;

const Sidebar = styled.div`
  width: 260px;
  background-color: #1a1a1a;
  color: #ffffff;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  transition: transform 0.3s ease;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    transform: translateX(-100%);
    
    &.open {
      transform: translateX(0);
    }
  }
`;

const SidebarHeader = styled.div`
  padding: 25px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
`;

const Logo = styled.h1`
  font-family: var(--font-heading);
  font-size: 28px;
  margin: 0;
  color: var(--secondary);
`;

const AdminSubtitle = styled.div`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 5px;
  color: rgba(255, 255, 255, 0.7);
`;

const AdminInfo = styled.div`
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const AdminAvatar = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--secondary);
`;

const AdminName = styled.h3`
  margin: 10px 0 5px;
  font-size: 16px;
`;

const AdminRole = styled.div`
  font-size: 12px;
  color: var(--secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Nav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 0;
  background-color: ${props => props.active ? 'rgba(220, 168, 103, 0.15)' : 'transparent'};
  border-left: ${props => props.active ? '4px solid var(--secondary)' : '4px solid transparent'};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: #fff;
  text-decoration: none;
  transition: all 0.2s ease;
`;

const NavIcon = styled.span`
  margin-right: 10px;
  display: flex;
  align-items: center;
  font-size: 18px;
`;

const NavText = styled.span`
  font-size: 14px;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  color: #fff;
  margin-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background-color: rgba(255, 0, 0, 0.1);
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  margin-left: ${props => props.isMobile ? '0' : (props.isSidebarOpen ? '260px' : '0')};
  transition: margin-left 0.3s ease;
  width: ${props => props.isMobile ? '100%' : (props.isSidebarOpen ? 'calc(100% - 260px)' : '100%')};
`;

const MobileHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #1a1a1a;
  display: flex;
  align-items: center;
  padding: 0 20px;
  z-index: 999;
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const MenuToggle = styled.button`
  background: none;
  border: none;
  width: 30px;
  height: 30px;
  position: relative;
  cursor: pointer;
  
  &:before, &:after, div {
    background-color: white;
    content: '';
    display: block;
    height: 2px;
    margin: 6px 0;
    transition: all 0.2s ease-in-out;
  }
  
  div.open {
    transform: scale(0);
  }
  
  &:hover:before, &:hover:after, &:hover div {
    background-color: var(--secondary);
  }
`;

const MobileLogo = styled.div`
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-left: 15px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fb;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: var(--secondary);
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  margin-top: 20px;
  font-size: 18px;
  color: #333;
`;

export default AdminLayout; 