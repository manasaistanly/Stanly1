import { useState, useEffect } from 'react';

export function useScrollDirection() {
  const [scrollDir, setScrollDir] = useState('up');
  
  useEffect(() => {
    let lastY = window.scrollY;
    
    const handler = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 10) return;
      
      if (y > lastY) {
        setScrollDir('down');
      } else {
        setScrollDir('up');
      }
      lastY = y;
    };
    
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  
  return scrollDir;
}
