import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';

const ZIGZAG_DURATION = 2;       // zigzag draws over 2s
const PAUSE_AT_MID = 0.6;        // hold at midpoint for 600ms
const CALM_START = ZIGZAG_DURATION + PAUSE_AT_MID; // calm line starts after pause
const CALM_DURATION = 1.5;       // calm line draws over 1.5s
const BALL_START = CALM_START + 0.3; // ball starts shortly after calm line begins

// Checkmarks appear sequentially as the calm line draws across them
const CHECK1_DELAY = CALM_START + CALM_DURATION * 0.3;  // ~33% across
const CHECK2_DELAY = CALM_START + CALM_DURATION * 0.55;  // ~55% across
const CHECK3_DELAY = CALM_START + CALM_DURATION * 0.8;   // ~80% across

const EngineeringLifelineGraph = ({ className = '' }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });

  const chaoticPath =
    'M 0 100 L 20 70 L 35 130 L 50 100 L 80 50 L 100 150 L 120 100 L 160 100 L 180 30 L 200 170 L 220 100 L 260 70 L 275 125 L 290 100 L 330 40 L 350 150 L 370 100 L 405 15 L 425 175 L 440 100 L 470 70 L 485 120 L 500 100';

  const calmPath =
    'M 500 100 C 580 94 660 106 740 100 C 820 95 900 104 1000 100';

  const chaoticFillPath = `${chaoticPath} L 500 200 L 0 200 Z`;
  const calmFillPath = `${calmPath} L 1000 200 L 500 200 Z`;

  return (
    <div
      ref={containerRef}
      className={`relative z-10 w-full max-w-4xl mx-auto select-none py-2 sm:py-4 ${className}`}
    >
      <div className="relative w-full aspect-[16/6] sm:aspect-[16/4.5] flex items-center justify-center">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 1000 240"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="wd-pulse-chaos-fill" x1="0" y1="20" x2="0" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.18" />
              <stop offset="55%" stopColor="#f97316" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="wd-pulse-calm-fill" x1="0" y1="85" x2="0" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
              <stop offset="55%" stopColor="#34d399" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="chaosStroke" x1="0" y1="0" x2="500" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="40%" stopColor="#fb923c" />
              <stop offset="90%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>

            <linearGradient id="calmStroke" x1="500" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>

            <filter id="crispGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Area Fills */}
          <path d={chaoticFillPath} fill="url(#wd-pulse-chaos-fill)" />
          <path d={calmFillPath} fill="url(#wd-pulse-calm-fill)" />

          {/* Dotted Grid Baseline */}
          <line x1="0" y1="100" x2="1000" y2="100" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 5" />

          {/* Center Vertical Milestone Marker */}
          <line x1="500" y1="25" x2="500" y2="210" stroke="#334155" strokeWidth="1" strokeDasharray="2 3" />

          {/* Ghost/shadow paths (faint static visibility) */}
          <path
            d={chaoticPath}
            stroke="url(#chaosStroke)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.15"
          />
          <path
            d={calmPath}
            stroke="url(#calmStroke)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.15"
          />

          {/* ── ANIMATED Zigzag Path (draws smoothly first) ── */}
          <motion.path
            d={chaoticPath}
            stroke="url(#chaosStroke)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#crispGlow)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: ZIGZAG_DURATION, ease: 'easeInOut' }}
          />

          {/* ── ANIMATED Calm Line (pauses at midpoint, then draws smoothly) ── */}
          <motion.path
            d={calmPath}
            stroke="url(#calmStroke)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            filter="url(#crispGlow)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: CALM_DURATION, delay: CALM_START, ease: 'easeOut' }}
          />

          {/* ── Small Ball running along calm line ── */}
          <motion.circle
            r="3"
            fill="#34d399"
            filter="url(#crispGlow)"
            initial={{ opacity: 0 }}
            animate={
              isInView
                ? {
                  offsetDistance: ['0%', '100%'],
                  opacity: [0, 1, 1, 1, 0],
                }
                : { opacity: 0 }
            }
            style={{
              offsetPath: `path("${calmPath}")`,
            }}
            transition={{
              duration: 2.5,
              delay: BALL_START,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: 'linear',
            }}
          />

          {/* Center Target Milestone Dot */}
          <circle cx="500" cy="100" r="6" stroke="#06b6d4" strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
          <circle cx="500" cy="100" r="3" fill="#06b6d4" />

          {/* Vertical Stem Line to badge */}
          <line x1="500" y1="106" x2="500" y2="175" stroke="#06b6d4" strokeWidth="1.2" strokeOpacity="0.6" />
        </svg>

        {/* ──── OVERLAY BADGES ──── */}

        {/* 1. 'the 3am pages' */}
        <div className="absolute left-[19%] sm:left-[21%] top-[3%] sm:top-[6%] -translate-x-1/2">
          <div className="rounded-full border border-red-500/40 bg-[#070c1e]/95 px-2.5 py-0.5 text-[9px] sm:text-[11px] font-mono text-red-300 shadow-md backdrop-blur-md flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span>your Workflows</span>
          </div>
        </div>

        {/* 2. 'your engineer joins' — clearly below midpoint */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[6%] sm:bottom-[10%]">
          <div className="rounded-full border border-cyan-400/50 bg-[#070c1e]/95 px-3 py-1 text-[10px] sm:text-[11px] font-mono font-semibold text-cyan-200 shadow-lg backdrop-blur-md flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Join With Us</span>
          </div>
        </div>

        {/* 3. Right Checkmarks — appear sequentially as calm line passes each position */}
        <motion.div
          className="absolute left-[62%] top-[30%] sm:top-[32%]"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.3, delay: CHECK1_DELAY, ease: 'backOut' }}
        >
          <Check className="w-3 h-3 text-emerald-400 stroke-[2.5]" />
        </motion.div>
        <motion.div
          className="absolute left-[74%] top-[30%] sm:top-[32%]"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.3, delay: CHECK2_DELAY, ease: 'backOut' }}
        >
          <Check className="w-3 h-3 text-emerald-400 stroke-[2.5]" />
        </motion.div>
        <motion.div
          className="absolute left-[86%] top-[30%] sm:top-[32%]"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.3, delay: CHECK3_DELAY, ease: 'backOut' }}
        >
          <Check className="w-3 h-3 text-emerald-400 stroke-[2.5]" />
        </motion.div>

        {/* 4. 'calm, and shipping' */}
        <div className="absolute right-[10%] sm:right-[14%] top-[3%] sm:top-[7%]">
          <div className="rounded-full border border-emerald-500/40 bg-[#070c1e]/95 px-2.5 py-0.5 text-[9px] sm:text-[11px] font-mono text-emerald-300 shadow-md backdrop-blur-md flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>calm, and shipping</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EngineeringLifelineGraph;
