import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { skills } from '../data/content';

export default function Skills() {
  const [openIndex, setOpenIndex] = useState(0); // Open first item by default

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="skills" className="py-24 px-6 md:px-12 border-t border-border">
      <div className="font-display font-bold text-sm tracking-widest uppercase text-muted mb-12">
        // Skills
      </div>

      <div className="border-b border-border">
        {skills.map((group, index) => {
          const isOpen = openIndex === index;
          const number = String(index + 1).padStart(2, '0');

          return (
            <div key={index} className="border-t border-border">
              <div
                className="py-5 flex justify-between items-center cursor-pointer group"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-center">
                  <span className="text-muted font-body font-normal mr-8 group-hover:text-text transition-colors duration-200">
                    {number}
                  </span>
                  <span className="font-display font-bold text-xl text-text group-hover:text-accent transition-colors duration-200">
                    {group.title}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-text group-hover:text-accent transition-colors duration-200"
                >
                  <FiChevronDown size={24} />
                </motion.div>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2 pb-6 pl-14">
                      {group.items.map((skill, i) => (
                        <div
                          key={i}
                          className="border border-accent text-accent px-4 py-1.5 text-sm font-body font-medium rounded-pill"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
