import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function PageTransition({ children }) {
  const [dimensions, setDimensions] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 1400, 
    height: typeof window !== 'undefined' ? window.innerHeight : 1000 
  });

  useEffect(() => {
    function resize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const initialPath = `M0 0 L${dimensions.width} 0 L${dimensions.width} ${dimensions.height} Q${dimensions.width / 2} ${dimensions.height + 300} 0 ${dimensions.height} L0 0`;
  const targetPath = `M0 0 L${dimensions.width} 0 L${dimensions.width} 0 Q${dimensions.width / 2} 0 0 0 L0 0`;

  const curve = {
    initial: { d: initialPath },
    enter: { 
      d: targetPath, 
      transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 } 
    },
    exit: { 
      d: initialPath, 
      transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } 
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {children}
      </motion.div>

      <svg 
        className="fixed top-0 left-0 z-[9990] pointer-events-none w-screen h-screen" 
        style={{ overflow: 'visible' }}
      >
        <motion.path 
          variants={curve}
          initial="initial"
          animate="enter"
          exit="exit"
          fill="#e5553b"
        />
      </svg>
    </>
  );
}
