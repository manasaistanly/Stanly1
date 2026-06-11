import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import Marquee from './Marquee';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all fields.');
      return;
    }
    alert("Thanks! I'll be in touch soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 border-t border-border">
      {/* Top Marquee */}
      <Marquee text="— Let's Build Something — Reach Out " speed={25} size="medium" />

      <div className="px-6 md:px-12 pt-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left - Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full h-full min-h-[400px] relative"
        >
          <img
            src="/profile.jpg"
            alt="Manasai Stanly J"
            className="w-full h-full object-cover absolute inset-0"
            style={{ filter: 'grayscale(20%)' }}
          />
        </motion.div>

        {/* Right - Contact Info & Form */}
        <div className="flex flex-col gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-display font-bold text-sm tracking-widest uppercase text-muted mb-8">
              // Get in touch
            </div>

            <div className="flex flex-col gap-4">
              <a
                href="mailto:manasaistanly@email.com"
                className="font-body font-normal text-lg text-text hover:text-accent transition-colors duration-200"
              >
                manasaistanly@email.com
              </a>
              <a
                href="https://github.com/manasaistanly"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body font-normal text-lg text-text hover:text-accent transition-colors duration-200"
              >
                github.com/manasaistanly
              </a>
            </div>

            <div className="flex gap-6 mt-8">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted text-2xl hover:text-accent transition-colors duration-200"
              >
                <FaLinkedin />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted text-2xl hover:text-accent transition-colors duration-200"
              >
                <FaTwitter />
              </a>
            </div>

            <div className="font-body font-normal text-sm text-muted mt-8">
              Response within 24 hours.
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-8 font-body font-normal text-base">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full bg-transparent border-b border-border text-text pb-3 placeholder-muted focus:border-accent focus:outline-none transition-colors duration-200"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full bg-transparent border-b border-border text-text pb-3 placeholder-muted focus:border-accent focus:outline-none transition-colors duration-200"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows={5}
                  className="w-full bg-transparent border-b border-border text-text pb-3 placeholder-muted focus:border-accent focus:outline-none transition-colors duration-200 resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="mt-4 px-8 py-3 border border-accent text-accent font-display font-bold tracking-wide hover:bg-accent hover:text-bg transition-colors duration-200 w-full md:w-auto"
              >
                SEND
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
