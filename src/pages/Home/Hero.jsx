import React from 'react';
import homeBg from '../../assets/images/home_background.png';
import { motion } from 'framer-motion';
import { useSmoothScroll } from '../../context/SmoothScrollContext';

const ROTATING_WORDS = [
  'Solutions.',
  'AI Systems.',
  'Cloud Infra.',
  'Modern Web.',
  'Software.',
];

/** Typewriter Animated Headline Word Component */
const TypewriterHeadlineWord = () => {
  const [wordIndex, setWordIndex] = React.useState(0);
  const [subIndex, setSubIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const currentWord = ROTATING_WORDS[wordIndex];

    if (!isDeleting && subIndex === currentWord.length) {
      const timeout = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
      return;
    }

    const speed = isDeleting ? 40 : 90;
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, wordIndex]);

  return (
    <span className="inline-flex items-baseline">
      <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
        {ROTATING_WORDS[wordIndex].substring(0, subIndex)}
      </span>
      <span className="inline-block w-[3px] h-[0.82em] ml-1 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_#06B6D4]" />
    </span>
  );
};

/** Count Up Animated Stat Component */
const AnimatedStat = ({ target, suffix = '', label }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTimestamp = null;
    const duration = 2000;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [target]);

  return (
    <div className="flex flex-col items-start">
      <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
        {count}
        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]">
          {suffix}
        </span>
      </div>
      <div className="text-xs font-medium text-slate-400 mt-1">
        {label}
      </div>
    </div>
  );
};

const Hero = () => {
  const { scrollTo } = useSmoothScroll();

  const handleScrollToNext = (e) => {
    e.preventDefault();
    const target = document.getElementById('brands') || document.getElementById('services');
    if (target) {
      scrollTo(target, { offset: -80, duration: 1.2 });
    }
  };

  const handleScrollToServices = (e) => {
    e.preventDefault();
    const target = document.getElementById('services');
    if (target) {
      scrollTo(target, { offset: -80, duration: 1.2 });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#070C1E]"
    >
      {/* ── Full background image ── */}
      <img
        src={homeBg}
        alt="Tech Background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-70 mix-blend-screen pointer-events-none select-none gpu-layer"
      />

      {/* ── Dark gradient to ensure readability ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06091A]/70 via-transparent to-[#070C1E] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#06091A]/80 via-transparent to-transparent pointer-events-none" />

      {/* ── Glowing grid mesh plane at bottom (planet effect) ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[55%] pointer-events-none">
        {/* Grid lines */}
        <div
          className="absolute inset-0 hero-grid-bg"
          style={{
            maskImage: 'radial-gradient(ellipse 100% 80% at 50% 100%, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 100% 80% at 50% 100%, black 30%, transparent 80%)',
          }}
        />
        {/* Cyan glow orb */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-48 bg-gradient-to-t from-cyan-500/20 via-blue-600/15 to-transparent blur-2xl rounded-full" />
      </div>

      {/* ── Main Hero Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex items-center pt-28 pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">

          {/* Left Column — Headline + bullet dots indicator + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >

            {/* Bullet-style decorations & main text block */}
            <div className="flex gap-5 sm:gap-7 items-start">
              {/* Left vertical 3-dot & gradient line bullet indicator */}
              <div className="flex flex-col items-center select-none pointer-events-none shrink-0 pt-2.5 z-10">
                {/* Dot 1: Glowing Cyan Dot */}
                <div className="relative flex items-center justify-center">
                  <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-cyan-400 shadow-[0_0_14px_#06B6D4] ring-2 ring-cyan-400/40" />
                  <div className="absolute w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-cyan-400/25 animate-ping" />
                </div>

                {/* Dot 2: Crisp White Middle Dot */}
                <div className="mt-5 sm:mt-7 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />

                {/* Dot 3: Crisp White Bottom Dot */}
                <div className="mt-5 sm:mt-7 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />

                {/* Vertical Line Indicator */}
                <div className="mt-3 sm:mt-3.5 w-[2px] h-8 sm:h-12 rounded-full bg-gradient-to-b from-white/90 via-white/40 to-transparent shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
              </div>

              {/* Main text block */}
              <div className="space-y-5">
                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] tracking-tight">
                  Transforming Ideas <br />
                  Into Intelligent <br />
                  <TypewriterHeadlineWord />
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-slate-300 max-w-md leading-relaxed">
                  We deliver innovative IT services that accelerate growth, drive efficiency and create impact.
                </p>

                {/* Explore Solutions CTA */}
                <div className="pt-2">
                  <a
                    href="#services"
                    onClick={handleScrollToServices}
                    className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_28px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95 transform-gpu"
                  >
                    Explore Solutions
                  </a>
                </div>

                {/* Animated Stats Row (Count-up increase number animation) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 border-t border-slate-800/80 pt-6 mt-6">
                  <AnimatedStat target={250} suffix="+" label="Projects Delivered" />
                  <AnimatedStat target={98} suffix="%" label="Client Satisfaction" />
                  <AnimatedStat target={12} suffix="+" label="Industries Served" />
                  <AnimatedStat target={50} suffix="+" label="Global Experts" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column — Reserved space for background 3D sculpture */}
          <div className="hidden lg:block h-96 pointer-events-none" />

        </div>
      </div>

      {/* ── Scroll To Explore (Interactive & Animated) ── */}
      <motion.a
        href="#brands"
        onClick={handleScrollToNext}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors group cursor-pointer"
        aria-label="Scroll to explore next section"
      >
        {/* Animated Mouse Icon Container with Bouncing Scroll Wheel Dot */}
        <div className="w-5 h-9 rounded-full border-2 border-slate-700/80 group-hover:border-cyan-400/80 bg-slate-900/60 flex items-start justify-center p-1 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: [1, 0.4, 1],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"
          />
        </div>

        <span className="text-[9px] tracking-[0.3em] uppercase font-bold text-slate-400 group-hover:text-cyan-300 transition-colors mt-0.5">
          SCROLL TO EXPLORE
        </span>

        {/* Animated Pulsing Downward Indicator Line */}
        <div className="relative w-px h-6 bg-slate-800/80 overflow-hidden mt-0.5">
          <motion.div
            animate={{
              y: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-full h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
          />
        </div>
      </motion.a>
    </section>
  );
};

export default Hero;
