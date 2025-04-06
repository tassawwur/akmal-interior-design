import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    // Show cursor when mouse enters document
    const handleMouseEnter = () => setIsVisible(true);
    
    // Hide cursor when mouse leaves document
    const handleMouseLeave = () => setIsVisible(false);
    
    // Track mouse position
    const handleMouseMove = (e) => {
      const posX = e.clientX;
      const posY = e.clientY;
      
      // Move the cursor elements to follow the mouse
      cursor.style.left = `${posX}px`;
      cursor.style.top = `${posY}px`;
      
      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;
    };
    
    // Track mouse down/up for click animation
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    // Track hoverable elements
    const handleHoverableEnter = () => setIsHovering(true);
    const handleHoverableLeave = () => setIsHovering(false);

    // Add event listeners
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Add hover effect to clickable elements
    const hoverableElements = document.querySelectorAll('a, button, input, .hoverable');
    hoverableElements.forEach(element => {
      element.addEventListener('mouseenter', handleHoverableEnter);
      element.addEventListener('mouseleave', handleHoverableLeave);
    });

    // Clean up
    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      hoverableElements.forEach(element => {
        element.removeEventListener('mouseenter', handleHoverableEnter);
        element.removeEventListener('mouseleave', handleHoverableLeave);
      });
    };
  }, []);

  // Only render on client-side, not during SSR
  if (typeof window === 'undefined') return null;
  
  // Hide on mobile devices
  if (window.innerWidth <= 768) return null;

  return (
    <>
      <CursorRing 
        ref={cursorRef} 
        className={`${isVisible ? 'visible' : ''} ${isClicking ? 'clicking' : ''} ${isHovering ? 'hovering' : ''}`}
      />
      <CursorDot 
        ref={cursorDotRef} 
        className={`${isVisible ? 'visible' : ''} ${isClicking ? 'clicking' : ''} ${isHovering ? 'hovering' : ''}`}
      />
    </>
  );
};

const CursorRing = styled.div`
  position: fixed;
  width: 30px;
  height: 30px;
  border: 1px solid var(--color-gold);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 9999;
  transition: width 0.3s, height 0.3s, opacity 0.3s, transform 0.3s;
  opacity: 0;
  mix-blend-mode: difference;
  
  &.visible {
    opacity: 0.5;
  }
  
  &.clicking {
    transform: translate(-50%, -50%) scale(0.8);
  }
  
  &.hovering {
    width: 50px;
    height: 50px;
    opacity: 0.8;
    background-color: rgba(220, 168, 103, 0.1);
  }
`;

const CursorDot = styled.div`
  position: fixed;
  width: 8px;
  height: 8px;
  background-color: var(--color-gold);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 10000;
  transition: transform 0.1s, opacity 0.3s, background-color 0.3s;
  opacity: 0;
  
  &.visible {
    opacity: 1;
  }
  
  &.clicking {
    transform: translate(-50%, -50%) scale(0.5);
  }
  
  &.hovering {
    background-color: white;
  }
`;

export default CustomCursor; 