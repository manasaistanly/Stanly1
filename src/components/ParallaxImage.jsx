import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxImage({ src, alt, className = '' }) {
  const ref = useRef(null);
  
  // Track scroll progress specifically for this element's viewport intersection
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress (0 to 1) into a Y-axis translation
  // Moves the image from -10% to 10% creating a subtle parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.15 }} // Scaled up slightly to hide edges during parallax translation
        className="w-full h-full object-cover"
      />
    </div>
  );
}
