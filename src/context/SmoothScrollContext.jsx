import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';

const SmoothScrollContext = createContext({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export const SmoothScrollProvider = ({ children }) => {
  const [lenis, setLenis] = useState(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    // Respect user accessibility preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    // Initialize Lenis smooth scroll engine
    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = instance;
    setLenis(instance);
    window.lenis = instance;

    let animationFrameId;

    const raf = (time) => {
      instance.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
      delete window.lenis;
    };
  }, []);

  const scrollTo = useCallback((target, options = {}) => {
    const currentLenis = lenisRef.current;
    const defaultOptions = {
      offset: -80,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...options,
    };

    if (currentLenis) {
      currentLenis.scrollTo(target, defaultOptions);
    } else {
      // Fallback for when Lenis is disabled (e.g. reduced motion)
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: options.immediate ? 'auto' : 'smooth' });
      } else if (typeof target === 'string') {
        const el = document.querySelector(target) || document.getElementById(target.replace('#', ''));
        if (el) {
          const y = el.getBoundingClientRect().top + window.pageYOffset + (options.offset ?? -80);
          window.scrollTo({ top: y, behavior: options.immediate ? 'auto' : 'smooth' });
        }
      } else if (target instanceof HTMLElement) {
        const y = target.getBoundingClientRect().top + window.pageYOffset + (options.offset ?? -80);
        window.scrollTo({ top: y, behavior: options.immediate ? 'auto' : 'smooth' });
      }
    }
  }, []);

  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis, scrollTo, stop, start }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export default SmoothScrollProvider;
