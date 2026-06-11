import { motion } from 'framer-motion';
import { resumeItems, skills } from '../data/content';

export default function Resume() {
  // Flatten all skills for the cloud
  const allSkills = skills.flatMap((group) => group.items);

  return (
    <section id="resume" className="py-24 px-6 md:px-12 border-t border-border">
      <div className="font-display font-bold text-sm tracking-widest uppercase text-muted mb-12">
        // Resume
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left - Timeline */}
        <div>
          <div className="border-l border-border pl-8 space-y-10 relative">
            {resumeItems.map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Dot */}
                <div className="absolute -left-[37px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent" />
                
                <div className="font-body text-xs text-muted uppercase tracking-widest mb-2">
                  {item.category}
                </div>
                <h4 className="font-display font-bold text-xl text-text leading-tight">
                  {item.title}
                </h4>
                <p className="font-body font-normal text-sm text-muted mt-1">
                  {item.subtitle}
                </p>
                <div className="font-body font-normal text-xs text-muted mt-1">
                  {item.date}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right - Skills Cloud & Download */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="font-display font-bold text-sm tracking-widest uppercase text-muted mb-8">
              // Tech Stack
            </div>
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {allSkills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="border border-accent text-accent px-4 py-1.5 text-sm font-body font-medium rounded-pill"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <motion.a
            href="#" // TODO: Add actual PDF path here (e.g., /resume.pdf)
            className="mt-16 block w-full py-5 border border-accent text-accent font-display font-bold text-xl tracking-wide text-center hover:bg-accent hover:text-bg transition-colors duration-200"
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Resume  ↓
          </motion.a>
        </div>
      </div>
    </section>
  );
}
