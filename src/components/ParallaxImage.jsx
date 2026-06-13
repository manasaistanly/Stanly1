import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export default function ParallaxImage({ src, alt, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.div 
      ref={ref} 
      className={`overflow-hidden relative ${className}`}
      initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
      animate={{ clipPath: isInView ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div 
        className="w-full h-full"
        initial={{ scale: 1.4 }}
        animate={{ scale: isInView ? 1 : 1.4 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src={src}
          alt={alt}
          style={{ y, scale: 1.15 }}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
}
