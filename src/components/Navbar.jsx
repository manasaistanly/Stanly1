import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL } from '../data/content';
import MagneticButton from './MagneticButton';
import ScrambleText from './ScrambleText';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] md:w-auto z-50">
        <div className="h-[60px] md:h-[70px] px-6 md:px-8 flex justify-between items-center bg-[#111111]/80 backdrop-blur-xl border border-[#333333] rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
          
          {/* LEFT: Brand */}
          <div className="flex-shrink-0 md:mr-16">
            <Link to="/" className="font-display font-bold text-[16px] md:text-[18px] text-white tracking-widest uppercase hover:text-[#e5553b] transition-colors" onClick={() => setMobileOpen(false)}>
              © {PERSONAL.brandLine}
            </Link>
          </div>

          {/* CENTER: Links */}
          <div className="hidden md:flex items-center justify-center gap-10">
            <Link to="/projects" className="font-body font-medium text-[15px] text-[#aaaaaa] hover:text-white transition-colors tracking-wide">
              <ScrambleText text="Projects" />
            </Link>
            <Link to="/about" className="font-body font-medium text-[15px] text-[#aaaaaa] hover:text-white transition-colors tracking-wide">
              <ScrambleText text="About" />
            </Link>
          </div>

          {/* RIGHT: CTA Button (Hidden on Mobile) */}
          <div className="hidden md:flex ml-16">
            <MagneticButton>
              <Link 
                to="/contact" 
                className="inline-block bg-white text-black px-7 py-2.5 rounded-full font-body font-semibold text-[14px] hover:bg-[#e5553b] hover:text-white transition-all transform shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(229,85,59,0.4)]"
              >
                Let's Talk
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className={`block w-6 h-[2px] bg-white transform transition duration-300 ease-in-out ${mobileOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
            <span className={`block w-6 h-[2px] bg-white transition duration-300 ease-in-out ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[2px] bg-white transform transition duration-300 ease-in-out ${mobileOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
          </button>

        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-[#111111]/95 backdrop-blur-2xl pt-[120px] px-8 flex flex-col"
          >
            <div className="flex flex-col gap-10">
              <Link to="/" className="font-display font-bold text-5xl text-white tracking-tight hover:text-[#e5553b] transition-colors" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/projects" className="font-display font-bold text-5xl text-white tracking-tight hover:text-[#e5553b] transition-colors" onClick={() => setMobileOpen(false)}>Projects</Link>
              <Link to="/about" className="font-display font-bold text-5xl text-white tracking-tight hover:text-[#e5553b] transition-colors" onClick={() => setMobileOpen(false)}>About</Link>
              <Link to="/contact" className="font-display font-bold text-5xl text-white tracking-tight hover:text-[#e5553b] transition-colors" onClick={() => setMobileOpen(false)}>Contact</Link>
            </div>

            <div className="mt-16 flex flex-col gap-4 border-t border-[#333333] pt-10">
              <div className="font-display font-medium text-[14px] text-[#888888] tracking-widest uppercase mb-2">// Connect</div>
              <a href={PERSONAL.linkedin} className="font-body text-white text-[18px]">LinkedIn</a>
              <a href={PERSONAL.github} className="font-body text-white text-[18px]">GitHub</a>
              <a href={`mailto:${PERSONAL.email}`} className="font-body text-white text-[18px]">Email</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
