import { motion } from 'framer-motion';

export default function PageTransition({ children }) {
  const columns = 5; // Number of sweeping columns
  
  const columnVariants = {
    initial: { top: 0, height: "100vh" },
    animate: { 
      top: "100vh", 
      height: "0vh",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
    },
    exit: { 
      top: 0, 
      height: "100vh",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
    }
  };

  return (
    <>
      {/* The actual page content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>

      {/* The sweep overlay columns */}
      <div className="fixed inset-0 z-[9990] pointer-events-none flex">
        {[...Array(columns)].map((_, i) => (
          <motion.div
            key={i}
            variants={columnVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={i}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
              delay: i * 0.05 // Stagger effect
            }}
            className="flex-1 bg-[#e5553b] relative"
          />
        ))}
      </div>
    </>
  );
}
