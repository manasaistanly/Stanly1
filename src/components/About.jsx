import { motion } from 'framer-motion';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section id="about" className="py-24 px-6 md:px-12 border-t border-border">
      <div className="font-display font-bold text-sm tracking-widest uppercase text-muted mb-12">
        // About
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-16">
        {/* Left Column */}
        <motion.div
          className="md:col-span-3"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          <p className="font-body font-normal text-[20px] text-text leading-relaxed max-w-xl">
            I build intuitive, high-performance applications across web and mobile platforms. Driven by full-stack engineering, emerging AI technologies, and a relentless focus on meaningful digital solutions.
          </p>
          <p className="font-body font-normal text-base text-muted mt-4 max-w-xl">
            Currently pursuing B.E. Computer Science at Adhiyamaan College of Engineering, Hosur. Open to internships, collaborations, and full-time opportunities.
          </p>

          {/* Stats Row */}
          <motion.div
            className="mt-16 flex flex-wrap gap-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {['3+ Years Coding', '6 Projects', '5 Tech Stacks', 'AI & Cloud'].map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="border border-accent text-accent px-4 py-1.5 text-sm font-body font-medium rounded-pill"
              >
                {stat}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          <img
            src="/profile.jpg"
            alt="Manasai Workspace"
            className="w-full aspect-[3/4] object-cover rounded-none"
            style={{ filter: 'grayscale(15%)' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
