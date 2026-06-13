import { motion } from 'framer-motion';
import { PROJECTS } from '../data/content';
import TextReveal from '../components/TextReveal';
import ParallaxImage from '../components/ParallaxImage';
import TiltCard from '../components/TiltCard';
import PageTransition from '../components/PageTransition';

export default function Projects({ shouldAnimate }) {
  return (
    <PageTransition>
      <div className="pt-28 md:pt-40 pb-32 px-6 md:px-12 bg-[#111111] min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldAnimate ? 0.55 : 0, ease: 'easeOut' }}
        className="max-w-[1400px] mx-auto"
      >
        <div className="font-display font-medium text-[16px] tracking-widest text-[#e5553b] mb-6">
          // Projects Archive
        </div>
        <h1 className="font-display font-bold text-[48px] md:text-[120px] lg:text-[160px] text-white mb-32 leading-[0.9] tracking-tighter flex flex-col">
          <TextReveal text="Selected" />
          <TextReveal text="Work." className="text-[#444444]" delay={0.2} />
        </h1>

        <div className="flex flex-col gap-32 md:gap-48 border-t border-[#222222] pt-16">
          {PROJECTS.map((proj, idx) => (
            <motion.div 
              key={proj.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="flex flex-col group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12 items-stretch">
                {/* Left: Image Container */}
                <TiltCard>
                  <div className="relative overflow-hidden rounded-[24px] bg-[#222222] h-[400px] md:h-[600px] lg:h-[700px] cursor-pointer shadow-[0_-10px_40px_rgba(0,0,0,0.5)] w-full">
                    <ParallaxImage 
                      src={proj.image} 
                      alt={proj.title} 
                      className="absolute inset-0 w-full h-full transition-transform duration-[800ms] ease-[0.25,1,0.5,1] group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/20 pointer-events-none group-hover:bg-transparent transition-colors duration-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-28 h-28 bg-[#e5553b] rounded-full flex items-center justify-center text-white font-medium text-lg scale-50 group-hover:scale-100 transition-transform duration-[600ms] ease-out shadow-[0_10px_40px_rgba(229,85,59,0.5)]">
                        View
                      </div>
                    </div>
                  </div>
                </TiltCard>

                {/* Right: Info Card */}
                <TiltCard>
                  <div className="bg-[#161616] rounded-[24px] border border-[#222222] p-8 md:p-12 flex flex-col justify-between transition-colors duration-500 group-hover:border-[#333333] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] h-full">
                    <div>
                      <div className="font-mono text-[#888888] text-sm tracking-wider mb-8">( {proj.year} )</div>
                      <h3 className="font-display font-semibold text-[40px] md:text-[64px] leading-[1.05] tracking-tight text-white mb-6">
                        {proj.title}
                      </h3>
                      <p className="font-body text-[#888888] text-[20px] leading-relaxed max-w-lg mb-12">
                        {proj.longDescription}
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-8">
                      <div className="flex flex-wrap gap-3">
                        {proj.tags.map((tag, i) => (
                          <span key={i} className="text-[#888888] font-body text-[15px] border border-[#333333] rounded-full px-4 py-2">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {proj.link && (
                        <a 
                          href={proj.link} 
                          target="_blank" 
                          rel="noreferrer"
                          className="group/btn inline-flex items-center justify-center gap-3 border border-[#333333] hover:border-[#e5553b] bg-transparent text-white rounded-full px-8 py-4 font-medium text-[16px] transition-all mt-4 w-max hover:shadow-[0_0_20px_rgba(229,85,59,0.2)]"
                        >
                          View Live Project <span className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform">↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
    </PageTransition>
  );
}
