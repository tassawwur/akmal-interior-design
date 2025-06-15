import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y);
      const isPointerElement = 
        hoveredElement && 
        (hoveredElement.tagName === 'BUTTON' || 
         hoveredElement.tagName === 'A' || 
         hoveredElement.closest('a') || 
         hoveredElement.closest('button') ||
         window.getComputedStyle(hoveredElement).cursor === 'pointer');
      
      setIsPointer(isPointerElement);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateCursorType);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateCursorType);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [position]);

  // Only show custom cursor on non-touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <CursorRing 
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px` 
        }}
        animate={{
          scale: isPointer ? 1.2 : isClicking ? 0.8 : 1,
          opacity: isHidden ? 0 : 1
        }}
        transition={{ type: "tween", duration: 0.15 }}
      />
      <CursorDot 
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px` 
        }}
        animate={{
          scale: isClicking ? 0.5 : 1,
          opacity: isHidden || isPointer ? 0 : 1
        }}
        transition={{ type: "tween", duration: 0.15 }}
      />
    </>
  );
};

const CursorRing = styled(motion.div)`
  position: fixed;
  width: 35px;
  height: 35px;
  border: 2px solid var(--secondary);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
`;

const CursorDot = styled(motion.div)`
  position: fixed;
  width: 8px;
  height: 8px;
  background-color: var(--secondary);
  border-radius: 50%;
  pointer-events: none;
  z-index: 10000;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
`;

export default CustomCursor; 