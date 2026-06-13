import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Play from './pages/Play';
import CustomCursor from './components/CustomCursor';
import FilmGrain from './components/FilmGrain';
import SmoothScroll from './components/SmoothScroll';

export default function App() {
  const location = useLocation();
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldAnimate(!mediaQuery.matches);
    const handler = (e) => setShouldAnimate(!e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen">
        <CustomCursor />
        <FilmGrain />
        <Navbar shouldAnimate={shouldAnimate} />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home shouldAnimate={shouldAnimate} />} />
              <Route path="/about" element={<About shouldAnimate={shouldAnimate} />} />
              <Route path="/projects" element={<Projects shouldAnimate={shouldAnimate} />} />
              <Route path="/contact" element={<Contact shouldAnimate={shouldAnimate} />} />
              <Route path="/play" element={<Play />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
