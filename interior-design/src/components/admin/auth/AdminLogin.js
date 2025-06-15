import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLock, FaEnvelope, FaExclamationTriangle } from 'react-icons/fa';

// Import API service
import { loginAdmin, getCurrentAdmin } from '../../../services/api';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if already logged in
    const checkAuth = async () => {
      try {
        const response = await getCurrentAdmin();
        if (response.success && response.data) {
          navigate('/admin');
        }
      } catch (error) {
        // Not logged in, stay on login page
      }
    };
    
    checkAuth();
  }, [navigate]);
  
  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear general login error on any change
    if (loginError) {
      setLoginError('');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const response = await loginAdmin(formData);
        
        if (response.success) {
          navigate('/admin');
        } else {
          setLoginError(response.message || 'Invalid email or password');
        }
      } catch (error) {
        setLoginError('Login failed. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <LoginContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LoginCard
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <LoginHeader>
          <Logo>AKMAL</Logo>
          <LoginTitle>Admin Login</LoginTitle>
          <LoginSubtitle>Enter your credentials to access the admin panel</LoginSubtitle>
        </LoginHeader>
        
        {loginError && (
          <ErrorMessage>
            <FaExclamationTriangle />
            <span>{loginError}</span>
          </ErrorMessage>
        )}
        
        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel htmlFor="email">Email</FormLabel>
            <InputWrapper>
              <InputIcon>
                <FaEnvelope />
              </InputIcon>
              <FormInput
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
              />
            </InputWrapper>
            {errors.email && <FieldError>{errors.email}</FieldError>}
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputWrapper>
              <InputIcon>
                <FaLock />
              </InputIcon>
              <FormInput
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
              />
            </InputWrapper>
            {errors.password && <FieldError>{errors.password}</FieldError>}
          </FormGroup>
          
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </SubmitButton>
        </LoginForm>
        
        <BackToSite href="/">← Back to Website</BackToSite>
      </LoginCard>
      
      <LoginFooter>
        <FooterText>© {new Date().getFullYear()} Akmal Interior Design. All rights reserved.</FooterText>
      </LoginFooter>
    </LoginContainer>
  );
};

// Styled Components
const LoginContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fb;
  padding: 20px;
`;

const LoginCard = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 40px;
  
  @media (max-width: 576px) {
    padding: 30px 20px;
  }
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const Logo = styled.h1`
  font-family: var(--font-heading);
  font-size: 32px;
  color: var(--secondary);
  margin: 0 0 10px;
`;

const LoginTitle = styled.h2`
  font-size: 24px;
  margin: 0 0 10px;
  color: var(--text-primary);
`;

const LoginSubtitle = styled.p`  font-size: 14px;
  color: var(--text-tertiary);
  margin: 0;
`;

const LoginForm = styled.form`
  margin-top: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-tertiary);
  font-size: 16px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 12px 12px 45px;
  border: 1px solid ${props => props.error ? '#e74c3c' : '#e1e1e1'};
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.error ? '#e74c3c' : 'var(--secondary)'};
    box-shadow: 0 0 0 2px ${props => props.error ? 'rgba(231, 76, 60, 0.2)' : 'rgba(220, 168, 103, 0.2)'};
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

const FieldError = styled.div`
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
  padding: 15px;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 14px;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 30px;
  
  &:hover {
    background-color: #000;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const BackToSite = styled.a`
  display: block;
  text-align: center;
  margin-top: 20px;
  color: var(--text-secondary);
  font-size: 14px;
  text-decoration: none;
  
  &:hover {
    color: var(--secondary);
  }
`;

const LoginFooter = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const FooterText = styled.p`
  color: var(--text-tertiary);
  font-size: 12px;
`;

export default AdminLogin; 
