import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PERSONAL, ACHIEVEMENTS, STATS } from '../data/content';
import TextReveal from '../components/TextReveal';
import PageTransition from '../components/PageTransition';

export default function About({ shouldAnimate }) {
  return (
    <PageTransition>
      <div className="bg-[#111111] min-h-screen pt-28 md:pt-40 pb-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldAnimate ? 0.55 : 0, ease: 'easeOut' }}
            className="mb-12 md:mb-24"
          >
          <div className="font-display font-medium text-[16px] text-muted mb-6 tracking-wide">
            // About
          </div>
          <h1 className="font-display font-bold text-[44px] md:text-[100px] text-white leading-[1] tracking-tight max-w-5xl flex flex-col">
            <TextReveal text="Engineer by trade." />
            <TextReveal text="Problem solver by nature." delay={0.3} />
          </h1>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          
          {/* Main Bio Card (Span 8) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-[#111111] rounded-[32px] p-8 md:p-16 flex flex-col justify-between group overflow-hidden relative shadow-lg border border-[#222222]"
          >
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-[42px] text-white font-semibold mb-10 leading-[1.1] tracking-tight">
                I build intuitive, high-performance applications across web and mobile.
              </h2>
              <p className="font-body text-[#999999] text-[18px] md:text-[20px] leading-[1.8] max-w-3xl">
                {PERSONAL.bioLong}
              </p>
            </div>
            
            <div className="mt-16 relative z-10 flex flex-wrap gap-4 items-center">
              <Link 
                to="/contact"
                className="bg-[#e5553b] text-white rounded-full px-8 py-4 font-medium text-[16px] hover:scale-105 transition-transform shadow-[0_5px_20px_rgba(229,85,59,0.3)]"
              >
                Let's Work Together
              </Link>
              <a href={PERSONAL.github} target="_blank" rel="noreferrer" className="border border-[#333333] text-white rounded-full px-8 py-4 font-medium text-[16px] hover:bg-[#222222] transition-colors">
                GitHub Profile
              </a>
            </div>
            
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e5553b] opacity-[0.03] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          </motion.div>

          {/* Portrait Card (Span 4) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 rounded-[32px] overflow-hidden relative h-[500px] lg:h-auto shadow-lg"
          >
            <img 
              src={PERSONAL.photoUrl} 
              alt="Portrait" 
              className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-[1s] hover:scale-105"
            />
          </motion.div>

          {/* Stats Cards (Span 12 -> Grid 3) */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-2">
            {STATS.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-bg border border-border rounded-[32px] p-10 flex flex-col justify-between hover:border-text transition-colors group cursor-default"
              >
                <div className="font-display font-extrabold text-[60px] md:text-[100px] text-white leading-none tracking-tighter mb-8 group-hover:scale-[1.02] transition-transform origin-left">
                  {stat.number}
                </div>
                <div>
                  <div className="font-display font-bold text-xl md:text-2xl text-white mb-3 tracking-tight">
                    {stat.label}
                  </div>
                  <div className="font-body text-muted text-[16px] leading-relaxed max-w-sm">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Achievements Full Width */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-12 bg-[#161616] rounded-[32px] p-10 md:p-16 mt-2 border border-[#222222] shadow-xl"
          >
            <div className="font-display font-medium text-[15px] tracking-widest text-[#e5553b] mb-12">
              // Credentials & Achievements
            </div>
            
            <div className="flex flex-col gap-2">
              {ACHIEVEMENTS.map((ach) => (
                <div 
                  key={ach.index} 
                  className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-b border-[#333333] gap-4 hover:pl-6 transition-all duration-300 group cursor-default"
                >
                  <div className="font-display font-bold text-[20px] md:text-[36px] text-white group-hover:text-[#e5553b] transition-colors tracking-tight">
                    {ach.title}
                  </div>
                  <div className="flex w-full md:w-auto justify-between md:justify-end gap-12 items-center">
                    <div className="font-body text-sm md:text-[15px] text-[#cccccc] bg-[#222222] px-5 py-2.5 rounded-full border border-[#333333] group-hover:border-[#555555] transition-colors">
                      {ach.platform}
                    </div>
                    <div className="font-mono text-sm text-[#555555] group-hover:text-[#888888] transition-colors">{ach.index}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
      </div>
    </PageTransition>
  );
}
