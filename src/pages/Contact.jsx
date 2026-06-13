import { motion } from 'framer-motion';
import { FiLinkedin, FiGithub } from 'react-icons/fi';
import { PERSONAL } from '../data/content';
import PageTransition from '../components/PageTransition';
import MagneticButton from '../components/MagneticButton';

export default function Contact({ shouldAnimate }) {
  const handleSubmit = () => {
    alert("Thanks! I'll get back to you within 24 hours.");
  };

  return (
    <PageTransition>
      <div className="pt-28 md:pt-40 pb-20 px-6 md:px-12 bg-[#111111] min-h-screen flex flex-col">
      <div className="max-w-[1400px] mx-auto w-full flex-grow flex flex-col">
        {/* SECTION 1 */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldAnimate ? 0.55 : 0, ease: 'easeOut' }}
        >
          <div className="font-display font-medium text-[16px] tracking-widest text-[#e5553b] mb-6">
            // Contact
          </div>
          <h1 className="font-display font-bold text-[48px] md:text-[100px] text-white leading-[1] tracking-tight">
            Let's build <br className="hidden md:block" /> <span className="text-[#555555]">something.</span>
          </h1>
        </motion.div>

        {/* SECTION 2 */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldAnimate ? 0.55 : 0, delay: 0.1, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 mt-16 md:mt-24 flex-grow border-t border-[#222222] pt-16"
        >
          {/* LEFT: Info */}
          <div className="md:col-span-5 flex flex-col gap-12">
            <div>
              <div className="font-body text-xs uppercase tracking-widest text-[#888888] mb-3">Location</div>
              <div className="font-body font-medium text-[20px] text-white">{PERSONAL.location}</div>
            </div>
            <div>
              <div className="font-body text-xs uppercase tracking-widest text-[#888888] mb-3">Email</div>
              <a href={`mailto:${PERSONAL.email}`} className="font-body font-medium text-[20px] text-white hover:text-[#e5553b] transition-colors inline-block">
                {PERSONAL.email}
              </a>
            </div>
            <div>
              <div className="font-body text-xs uppercase tracking-widest text-[#888888] mb-3">GitHub</div>
              <a href={PERSONAL.github} target="_blank" rel="noreferrer" className="font-body font-medium text-[20px] text-white hover:text-[#e5553b] transition-colors inline-block break-all">
                {PERSONAL.github.replace('https://', '')}
              </a>
            </div>
            <div>
              <div className="font-body text-xs uppercase tracking-widest text-[#888888] mb-3">Response Time</div>
              <div className="font-body text-[16px] text-[#aaaaaa]">Within 24 hours</div>
            </div>
            
            <div className="flex gap-6 mt-4 text-2xl text-white">
              <a href={PERSONAL.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#e5553b] transition-colors"><FiLinkedin /></a>

              <a href={PERSONAL.github} target="_blank" rel="noreferrer" className="hover:text-[#e5553b] transition-colors"><FiGithub /></a>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="md:col-span-7">
            <div className="flex flex-col gap-10 bg-[#161616] p-8 md:p-12 rounded-[32px] border border-[#222222] shadow-2xl">
              <input 
                type="text" 
                placeholder="Name" 
                className="bg-transparent border-b border-[#333333] text-white pb-4 w-full font-body text-[18px] placeholder:text-[#666666] focus:border-[#e5553b] outline-none transition-colors"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-transparent border-b border-[#333333] text-white pb-4 w-full font-body text-[18px] placeholder:text-[#666666] focus:border-[#e5553b] outline-none transition-colors"
              />
              <textarea 
                placeholder="Message" 
                rows="5"
                className="bg-transparent border-b border-[#333333] text-white pb-4 w-full font-body text-[18px] placeholder:text-[#666666] focus:border-[#e5553b] outline-none transition-colors resize-none"
              ></textarea>
              
              <div className="pt-6">
                <MagneticButton>
                  <button 
                    onClick={handleSubmit}
                    className="w-full md:w-auto bg-[#e5553b] text-white px-10 py-4 rounded-full font-body font-medium text-[16px] hover:bg-white hover:text-black transition-all transform shadow-[0_10px_30px_rgba(229,85,59,0.3)]"
                  >
                    Send Message
                  </button>
                </MagneticButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </PageTransition>
  );
}
