import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiLinkedin, FiGithub, FiPlus, FiMinus, FiPlayCircle } from 'react-icons/fi';
import MarqueeText from '../components/MarqueeText';
import TextReveal from '../components/TextReveal';
import ParallaxImage from '../components/ParallaxImage';
import PageTransition from '../components/PageTransition';
import MagneticButton from '../components/MagneticButton';
import TiltCard from '../components/TiltCard';
import { PERSONAL, SERVICES, PROJECTS, TESTIMONIALS } from '../data/content';

export default function Home({ shouldAnimate }) {
  const [openService, setOpenService] = useState(null);
  const [activeService, setActiveService] = useState(0);

  const toggleService = (id) => {
    setOpenService(openService === id ? null : id);
  };

  const nextTestimonial = () => setTestimIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prevTestimonial = () => setTestimIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <PageTransition>
      {/* SECTION 1: HERO */}
      <section className="h-screen w-full relative overflow-hidden bg-bg">
        {/* Layer z-1: Background Photo */}
        <div className="absolute inset-0 z-[1] grayscale">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            src={PERSONAL.photoUrl} 
            alt="Portrait" 
            className="w-full h-full object-cover object-top" 
          />
        </div>

        {/* Layer z-2: Marquee */}
        <div 
          className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-[2]"
          style={{ mixBlendMode: 'exclusion', opacity: 0.9 }}
        >
          <MarqueeText 
            text="Manasai Stanly J &nbsp;&nbsp;&nbsp;&nbsp; Manasai Stanly J &nbsp;&nbsp;&nbsp;&nbsp;" 
            speed="75s" 
            fontSize="clamp(140px, 18vw, 300px)" 
            color="#ffffff" 
          />
        </div>

        {/* Layer z-3: UI Overlay */}
        <div className="absolute inset-0 z-[3] pointer-events-none p-6 md:p-12 flex flex-col justify-end pb-8">
          <div className="flex justify-between items-end w-full">
            {/* Bottom Left Socials */}
            <div className="flex flex-col gap-3 pointer-events-auto">
              <a href={PERSONAL.linkedin} className="group flex items-center gap-3 text-[16px] font-body font-medium text-white transition-all duration-300 hover:-translate-y-[2px] hover:text-[#cccccc]">
                <FiLinkedin className="text-xl transition-transform duration-300 group-hover:scale-110" /> Linkedin
              </a>

              <a href={PERSONAL.github} className="group flex items-center gap-3 text-[16px] font-body font-medium text-white transition-all duration-300 hover:-translate-y-[2px] hover:text-[#cccccc]" target="_blank" rel="noreferrer">
                <FiGithub className="text-xl transition-transform duration-300 group-hover:scale-110" /> GitHub
              </a>

              <Link to="/play" className="group flex items-center gap-3 text-[16px] font-body font-medium text-[#e5553b] transition-all duration-300 hover:-translate-y-[2px] hover:text-white mt-2">
                <FiPlayCircle className="text-xl transition-transform duration-300 group-hover:scale-110" /> Play Game
              </Link>
            </div>

            <div className="text-right pointer-events-auto flex flex-col items-end">
              <div className="font-display font-medium text-[clamp(20px,4vw,65px)] text-white leading-none tracking-tight drop-shadow-md">
                {PERSONAL.roleLine1}
              </div>
              <div className="font-display font-black text-[clamp(40px,10vw,120px)] text-white leading-none tracking-tighter mt-1 drop-shadow-lg">
                {PERSONAL.roleLine2}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTRO */}
      <section className="relative z-[2] py-32 px-6 md:px-12 bg-[#111111] shadow-[0_-30px_60px_rgba(0,0,0,0.5)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Intro Label */}
          <div className="md:col-span-2">
            <div className="font-display font-medium text-[16px] text-[#e5553b] mt-3 tracking-wide">
              // Intro
            </div>
          </div>
          
          {/* Right Column: Massive Text & Subtext */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px' }}
            variants={{
              visible: { transition: { staggerChildren: 0.3 } }
            }}
            className="md:col-span-10 flex flex-col"
          >
            <div className="font-display font-medium text-[clamp(28px,6vw,85px)] leading-[1.05] tracking-tight text-[#f2f2f2] mb-32 flex flex-col">
              <TextReveal text="I'm a passionate" />
              <TextReveal text="Full-Stack Developer & AI Engineer" className="text-[#e5553b]" delay={0.2} />
              <TextReveal text="who builds scalable web apps." className="text-[#e5553b]" delay={0.4} />
              <TextReveal text="I focus on elegant interfaces," delay={0.6} />
              <TextReveal text="cutting-edge AI, and fast execution." delay={0.8} />
            </div>

            {/* Bottom Row: Right-aligned paragraph & button */}
            <div className="flex justify-end">
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 1, 0.5, 1] } } }}
                className="md:w-[55%] flex flex-col items-start gap-12"
              >
                <p className="font-body text-[#888888] text-[18px] leading-relaxed">
                  Bringing your vision to life quickly and efficiently—whether it's complex system architectures, AI models, or modern websites—I've got it covered, delivering smooth and effective solutions from start to finish.
                </p>
                <MagneticButton>
                  <Link 
                    to="/about"
                    className="inline-block rounded-full border border-[#333333] px-10 py-4 font-body font-medium text-[16px] text-[#f2f2f2] hover:bg-[#222222] transition-colors"
                  >
                    More About Me
                  </Link>
                </MagneticButton>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTION 3: SERVICES */}
      <section className="py-32 px-6 md:px-12 bg-[#131313] relative z-10 border-t border-[#222222]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 relative items-start">
            
            {/* Left: Sticky Container */}
            <div className="md:col-span-5 hidden md:flex flex-col justify-start items-start h-screen sticky top-0 pt-[20vh]">
              <div className="font-display font-medium text-[16px] text-[#e5553b] mb-12 tracking-wide">
                // Services
              </div>
              <div className="relative h-[300px] w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute inset-0 font-display font-black text-[200px] lg:text-[300px] leading-[0.8] text-transparent [-webkit-text-stroke:5px_#444444] select-none"
                  >
                    {SERVICES[activeService]?.index}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right: Scrolling Content */}
            <div className="md:col-span-7 flex flex-col pt-12 md:pt-[20vh] pb-12 md:pb-[20vh]">
              <div className="font-display font-medium text-[16px] text-[#e5553b] mb-16 tracking-wide md:hidden">
                // Services
              </div>

              <div className="flex flex-col gap-40">
                {SERVICES.map((srv, index) => (
                  <motion.div 
                    key={srv.id} 
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: '-30% 0px -30% 0px' }}
                    onViewportEnter={() => setActiveService(index)}
                    transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                    className="flex flex-col"
                  >
                    <h2 className="font-display font-bold text-[36px] md:text-[64px] text-white tracking-tight leading-[1.05] mb-6">
                      {srv.title}
                    </h2>
                    <p className="font-body text-[#888888] text-[18px] md:text-[20px] leading-[1.8] max-w-xl mb-16">
                      {srv.description}
                    </p>

                    <div className="flex flex-col border-t border-[#222222]">
                      {srv.items.map((item, idx) => (
                        <div 
                          key={idx} 
                          className="group flex justify-between items-center py-6 md:py-8 border-b border-[#222222] hover:border-b-[#e5553b] transition-colors cursor-pointer"
                        >
                          <div className="font-display font-medium text-[20px] md:text-[24px] text-white group-hover:text-[#e5553b] transition-all group-hover:translate-x-4 duration-300">
                            {item}
                          </div>
                          <div className="font-mono text-[14px] md:text-[15px] text-[#555555] group-hover:text-[#e5553b] transition-colors">
                            0{idx + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: PROJECTS PREVIEW */}
      <section className="py-32 px-6 md:px-12 bg-[#111111]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: shouldAnimate ? 0.55 : 0, ease: 'easeOut' }}
        >
          <div className="font-display font-medium text-[16px] text-[#e5553b] mb-16 tracking-wide">
            // Projects
          </div>

          <div className="flex flex-col gap-24 md:gap-40 pb-32">
            {PROJECTS.slice(0, 4).map((proj, index) => (
              <Link 
                to="/projects"
                key={proj.id} 
                className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] lg:grid-cols-[1.5fr_1fr] gap-6 group sticky origin-top"
                style={{ top: `calc(15vh + ${index * 40}px)` }}
              >
                
                {/* Left: Image Container */}
                <TiltCard className="md:col-span-[1.3] lg:col-span-[1.5]">
                  <div className="relative overflow-hidden rounded-[24px] bg-[#222222] h-[350px] md:h-[500px] lg:h-[600px] cursor-pointer shadow-[0_-10px_40px_rgba(0,0,0,0.5)] w-full">
                    <ParallaxImage 
                      src={proj.image} 
                      alt={proj.title} 
                      className="absolute inset-0 w-full h-full transition-transform duration-[800ms] ease-[0.25,1,0.5,1] group-hover:scale-105" 
                    />
                    
                    {/* Dark overlay for when cards stack behind */}
                    <div className="absolute inset-0 bg-black/20 pointer-events-none group-hover:bg-transparent transition-colors duration-500"></div>

                    {/* Hover Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-28 h-28 bg-[#e5553b] rounded-full flex items-center justify-center text-white font-medium text-lg scale-50 group-hover:scale-100 transition-transform duration-[600ms] ease-out shadow-[0_10px_40px_rgba(229,85,59,0.5)]">
                        View
                      </div>
                    </div>
                  </div>
                </TiltCard>

                {/* Right: Info Card */}
                <TiltCard className="md:col-span-1">
                  <div className="bg-[#161616] rounded-[24px] border border-[#222222] p-6 md:p-12 flex flex-col justify-between transition-colors duration-500 group-hover:border-[#333333] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] h-full">
                    <div>
                      <div className="font-mono text-[#888888] text-sm tracking-wider mb-8">( {proj.year} )</div>
                      <h3 className="font-display font-semibold text-[32px] md:text-[56px] leading-[1.05] tracking-tight text-white mb-6">
                        {proj.title}
                      </h3>
                      <p className="font-body text-[#888888] text-[18px] leading-relaxed max-w-lg">
                        {proj.description}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-end mt-12">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[#888888] font-body text-[15px]">{proj.tags[0]}</span>
                      </div>
                      
                      <div className="bg-white text-black rounded-full px-6 py-2.5 font-medium text-[14px] flex items-center gap-2 hover:bg-[#e6e6e6] transition-colors shadow-sm">
                        Made in Code
                      </div>
                    </div>
                  </div>
                </TiltCard>

              </Link>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <MagneticButton>
              <Link 
                to="/projects"
                className="inline-block border border-[#333333] rounded-full px-10 py-4 font-body font-medium text-[16px] text-[#f2f2f2] hover:bg-[#222222] transition-colors"
              >
                View All Projects
              </Link>
            </MagneticButton>
          </div>
        </motion.div>
      </section>

    </PageTransition>
  );
}
