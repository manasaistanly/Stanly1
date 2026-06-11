import MarqueeText from './MarqueeText';
import { PERSONAL } from '../data/content';
import { FiLinkedin, FiTwitter, FiGithub } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full relative h-[800px] md:h-screen overflow-hidden bg-[#0a0a0a]">
      
      {/* Background Photo */}
      <div className="absolute inset-0 z-[1]">
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          src={PERSONAL.photoUrl}
          alt="Contact Background"
          className="w-full h-full object-cover object-center"
          style={{ filter: 'grayscale(100%) brightness(0.6)' }}
        />
      </div>

      {/* Marquee */}
      <div 
        className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-[2]"
        style={{ mixBlendMode: 'exclusion', opacity: 0.9 }}
      >
        <MarqueeText 
          text="Reach Out &nbsp;&nbsp;&nbsp;&nbsp; Reach Out &nbsp;&nbsp;&nbsp;&nbsp;" 
          speed="60s" 
          fontSize="clamp(60px, 18vw, 300px)" 
          color="#ffffff" 
        />
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 z-[3] pointer-events-none p-6 md:p-12 flex flex-col justify-between">
        
        {/* Top Section */}
        <div className="w-full flex justify-end pointer-events-auto pt-4 md:pt-0">
          <button 
            onClick={scrollToTop}
            className="w-12 h-12 md:w-16 md:h-16 bg-[#e5553b] text-white rounded-full flex items-center justify-center text-xl hover:scale-110 hover:bg-white hover:text-black transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            ↑
          </button>
        </div>

        {/* Bottom Section */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-12 pointer-events-auto pb-4 md:pb-8">
          
          {/* Left Side Info */}
          <div className="flex flex-col gap-8 md:gap-10">
            <div className="flex flex-col gap-3">
              <div className="font-body text-white text-[16px] md:text-[20px] tracking-tight">
                <span className="font-bold text-[#e5553b] mr-2">Office:</span> {PERSONAL.location}
              </div>
              <div className="font-body text-white text-[16px] md:text-[20px] tracking-tight">
                <span className="font-bold text-[#e5553b] mr-2">Mail:</span> <a href={`mailto:${PERSONAL.email}`} className="hover:underline">{PERSONAL.email}</a>
              </div>
              <div className="font-body text-white text-[16px] md:text-[20px] tracking-tight">
                <span className="font-bold text-[#e5553b] mr-2">Phone:</span> {PERSONAL.phone}
              </div>
            </div>

            <div className="flex gap-6 md:gap-8 text-white font-medium text-[15px] md:text-[18px]">
              <a href={PERSONAL.linkedin} className="flex items-center gap-2 hover:text-[#e5553b] transition-colors">
                <FiLinkedin className="text-xl md:text-2xl"/> Linkedin
              </a>
              <a href={PERSONAL.twitter} className="flex items-center gap-2 hover:text-[#e5553b] transition-colors">
                <FiTwitter className="text-xl md:text-2xl"/> Twitter
              </a>
              <a href={PERSONAL.github} className="flex items-center gap-2 hover:text-[#e5553b] transition-colors" target="_blank" rel="noreferrer">
                <FiGithub className="text-xl md:text-2xl"/> GitHub
              </a>
            </div>
          </div>

          {/* Right Side Brand */}
          <div className="text-left md:text-right flex flex-col md:items-end opacity-70">
            <div className="font-body text-white text-sm max-w-[200px] leading-relaxed">
              {PERSONAL.brandLine}
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
}
