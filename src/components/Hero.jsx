import { motion } from 'framer-motion';
import Marquee from './Marquee';

export default function Hero() {
  return (
    <section className="h-screen w-full relative overflow-hidden flex flex-col justify-between pt-[100px]">
      
      {/* Background Photo Block - Absolute Full Screen */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          src="/profile.jpg"
          alt="Manasai Stanly J Portrait"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 20%', filter: 'grayscale(15%)' }}
        />
        
        {/* Gradient Overlay to ensure text readability */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.2) 50%, rgba(10,10,10,0.9) 100%)' 
          }}
        />
      </div>

      {/* Top Text Area - Z-Index Layering */}
      <div className="relative z-10 w-full">
        <div className="mb-12 drop-shadow-xl">
          <Marquee text="— Manasai Stanly J " size="large" speed={35} />
        </div>

        {/* Two-Column Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 px-6 md:px-12 border-t border-border/50 py-6 bg-gradient-to-r from-bg/40 via-transparent to-bg/40 backdrop-blur-[2px]">
          <div className="font-display font-bold text-[clamp(28px,4vw,52px)] text-text leading-tight drop-shadow-lg">
            // Full-Stack Developer
          </div>
          <div className="font-display font-bold text-[clamp(28px,4vw,52px)] text-text/80 leading-tight md:text-right mt-4 md:mt-0 drop-shadow-lg">
            AI Enthusiast & Mobile Dev
          </div>
        </div>
      </div>

      {/* Bottom Row Text - Z-Index Layering */}
      <div className="relative z-10 w-full px-6 md:px-12 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-auto">
        <div className="font-body font-normal text-sm text-text bg-bg/80 px-3 py-1.5 rounded backdrop-blur-md border border-border/50">
          Building intelligent digital solutions.
        </div>
        <a
          href="#contact"
          className="font-body font-medium text-sm text-accent underline cursor-pointer hover:text-white transition-colors duration-200 bg-bg/80 px-3 py-1.5 rounded backdrop-blur-md border border-border/50"
        >
          // Available for opportunities →
        </a>
      </div>

    </section>
  );
}
