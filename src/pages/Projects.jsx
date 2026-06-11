import { motion } from 'framer-motion';
import { PROJECTS } from '../data/content';
import TextReveal from '../components/TextReveal';
import ParallaxImage from '../components/ParallaxImage';
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
              {/* Image Banner */}
              <div className="w-full h-[300px] md:h-[750px] overflow-hidden rounded-[32px] bg-[#1a1a1a] relative border border-[#222222] group-hover:border-[#e5553b] transition-colors duration-500 shadow-2xl">
                <ParallaxImage 
                  src={proj.image} 
                  alt={proj.title} 
                  className="absolute inset-0 w-full h-full transition-transform duration-[2s] group-hover:scale-[1.03] opacity-80 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-50 pointer-events-none"></div>
              </div>

              {/* Content Split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mt-12 md:mt-16">
                
                {/* Meta Side (Col 1-4) */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                  <div>
                    <h2 className="font-display font-bold text-[32px] md:text-[50px] lg:text-[60px] text-white leading-none tracking-tight mb-4 group-hover:text-[#e5553b] transition-colors">
                      {proj.title}
                    </h2>
                    <div className="font-mono text-[#e5553b] text-sm tracking-widest uppercase">
                      [{proj.year}]
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {proj.tags.map(tag => (
                      <span key={tag} className="border border-[#333333] bg-[#1a1a1a] rounded-full px-5 py-2 font-body font-medium text-[13px] text-[#cccccc]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description Side (Col 5-12) */}
                <div className="lg:col-span-8 flex flex-col gap-8 lg:pl-12">
                  <h3 className="font-display text-[26px] md:text-[36px] font-medium text-white leading-[1.2] tracking-tight">
                    {proj.description}
                  </h3>
                  <p className="font-body text-[#888888] text-[18px] md:text-[22px] leading-[1.8] max-w-4xl">
                    {proj.longDescription}
                  </p>

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
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
    </PageTransition>
  );
}
