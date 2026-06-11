import { motion } from 'framer-motion';
import { projects } from '../data/content';

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 border-t border-border">
      <div className="font-display font-bold text-sm tracking-widest uppercase text-muted mb-12">
        // Projects
      </div>

      {/* Header Row */}
      <div className="flex justify-between font-body text-xs text-muted pb-3 border-b border-border">
        <span>Project</span>
        <span>Year / Stack</span>
      </div>

      {/* Project Rows */}
      <div className="flex flex-col">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="border-b border-border py-6 flex flex-col md:flex-row justify-between items-start gap-8 group"
            whileHover={{ x: -6, borderLeft: '3px solid #6ee7b7', paddingLeft: '24px' }}
            transition={{ duration: 0.2 }}
            style={{ borderLeft: '3px solid transparent', paddingLeft: '0px' }} // Initial state for smooth animation
          >
            {/* Left Side */}
            <div className="flex-1">
              <h3 className="font-display font-bold text-2xl md:text-3xl text-text group-hover:text-accent transition-colors duration-200">
                {project.name}
              </h3>
              <p className="font-body font-normal text-sm text-muted mt-1 max-w-2xl">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech, i) => (
                  <span
                    key={i}
                    className="border border-accent text-accent px-3 py-1 text-xs font-body font-medium rounded-pill"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Side */}
            <div className="flex-shrink-0 flex flex-col items-end gap-2">
              <span className="font-body text-xs text-muted">
                {project.year}
              </span>
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-bold text-2xl text-accent hover:scale-125 transition-transform duration-200 inline-block mt-2"
                >
                  ↗
                </a>
              ) : (
                <span className="font-display font-bold text-2xl text-muted cursor-default mt-2">
                  ↗
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
