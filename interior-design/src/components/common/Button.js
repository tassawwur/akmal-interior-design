import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false,
  ...props 
}) => {
  return (
    <StyledButton 
      $variant={variant} 
      $size={size}
      $fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-primary);
  font-weight: 600;
  border-radius: 4px;
  transition: all 0.3s ease;
  cursor: pointer;
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};
  
  /* Size variations */
  font-size: ${({ $size }) => {
    switch ($size) {
      case 'small': return '0.875rem';
      case 'large': return '1.125rem';
      default: return '1rem';
    }
  }};
  
  padding: ${({ $size }) => {
    switch ($size) {
      case 'small': return '0.5rem 1rem';
      case 'large': return '1rem 2rem';
      default: return '0.75rem 1.5rem';
    }
  }};
  
  /* Variant styling */
  background-color: ${({ $variant }) => {
    switch ($variant) {
      case 'primary': return 'var(--color-primary)';
      case 'secondary': return 'var(--color-secondary)';
      case 'outline': 
      case 'text': return 'transparent';
      default: return 'var(--color-primary)';
    }
  }};
  
  color: ${({ $variant }) => {
    switch ($variant) {
      case 'primary': return 'white';
      case 'secondary': return 'var(--color-text-primary)';
      case 'outline': return 'var(--color-primary)';
      case 'text': return 'var(--color-primary)';
      default: return 'white';
    }
  }};
  
  border: ${({ $variant }) => {
    switch ($variant) {
      case 'outline': return '2px solid var(--color-primary)';
      case 'text': return 'none';
      default: return 'none';
    }
  }};
  
  &:hover {
    background-color: ${({ $variant }) => {
      switch ($variant) {
        case 'primary': return 'var(--color-primary-dark)';
        case 'secondary': return 'var(--color-secondary-dark)';
        case 'outline': return 'rgba(26, 26, 26, 0.05)';
        case 'text': return 'rgba(26, 26, 26, 0.05)';
        default: return 'var(--color-primary-dark)';
      }
    }};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.2);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'text']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool
};

export default Button; 