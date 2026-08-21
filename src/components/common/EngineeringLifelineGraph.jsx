import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';

/* ── TIMING ORCHESTRATION ─────────────────────────────────── */
const ZIGZAG_DURATION = 2.2;          // zigzag draws left → midpoint
const PAUSE_AT_MID = 0.5;          // dramatic pause at midpoint
const CALM_START = ZIGZAG_DURATION + PAUSE_AT_MID;
const CALM_DURATION = 1.6;          // calm line draws midpoint → right
const BALL_START = CALM_START + 0.25;

// Checkmarks pop in as the calm line sweeps past
const CHECK1_DELAY = CALM_START + CALM_DURATION * 0.30;
const CHECK2_DELAY = CALM_START + CALM_DURATION * 0.55;
const CHECK3_DELAY = CALM_START + CALM_DURATION * 0.80;

// Badge reveals
const BADGE_CHAOS_DELAY = 0.3;
const BADGE_MID_DELAY = ZIGZAG_DURATION + 0.2;
const BADGE_CALM_DELAY = CALM_START + 0.4;

const EngineeringLifelineGraph = ({ className = '' }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });

  /* ── SVG PATHS ──────────────────────────────────────────── */
  // Zigzag: aggressive peaks on the left, gradually smoothing into curves
  // that ease gently into the midpoint (500,100) for a flowing transition
  const chaoticPath =
    'M 0 100 L 25 55 L 45 140 L 65 100 L 95 35 L 115 160 L 140 100 ' +
    'L 170 60 L 190 145 L 215 100 L 245 40 L 265 155 L 290 100 ' +
    'L 320 50 L 345 148 L 370 100 ' +
    // peaks start softening — switch from sharp L to smooth C curves
    'C 382 60, 395 38, 400 55 C 405 72, 415 155, 425 150 C 435 145, 442 105, 450 100 ' +
    // final gentle wave easing into midpoint
    'C 458 95, 468 82, 475 88 C 482 94, 492 104, 500 100';

  // Calm: gentle sinusoidal ease from midpoint to right edge
  const calmPath =
    'M 500 100 C 540 96 570 104 620 100 C 670 96 720 104 770 100 C 820 97 870 103 920 100 L 1000 100';

  // Full combined path (zigzag + calm) for the traveling ball
  // Strip the 'M 500 100' from calmPath to continue seamlessly
  const calmPathContinuation = calmPath.replace('M 500 100 ', '');
  const fullPath = `${chaoticPath} ${calmPathContinuation}`;

  // Fill areas
  const chaoticFillPath = `${chaoticPath} L 500 220 L 0 220 Z`;
  const calmFillPath = `${calmPath} L 1000 220 L 500 220 Z`;

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
            {/* ── Area fill gradients ── */}
            <linearGradient id="wd-pulse-chaos-fill" x1="0" y1="20" x2="0" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.22" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="wd-pulse-calm-fill" x1="0" y1="85" x2="0" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.18" />
              <stop offset="50%" stopColor="#34d399" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
            </linearGradient>

            {/* ── Stroke gradients ── */}
            <linearGradient id="chaosStroke" x1="0" y1="0" x2="500" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="30%" stopColor="#f97316" />
              <stop offset="70%" stopColor="#fbbf24" />
              <stop offset="92%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>

            <linearGradient id="calmStroke" x1="500" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="45%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>

            {/* ── Glow filters ── */}
            <filter id="crispGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="strongGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* ── Energy pulse gradient for traveling spark ── */}
            <radialGradient id="sparkGrad">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
              <stop offset="60%" stopColor="#f97316" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </radialGradient>

            {/* Full-path traveling ball gradient */}
            <linearGradient id="fullPathStroke" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="25%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="75%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>

            <radialGradient id="travelBallGrad">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ── Background Area Fills ── */}
          <motion.path
            d={chaoticFillPath}
            fill="url(#wd-pulse-chaos-fill)"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <motion.path
            d={calmFillPath}
            fill="url(#wd-pulse-calm-fill)"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: CALM_START }}
          />

          {/* ── Dotted grid baseline ── */}
          <line x1="0" y1="100" x2="1000" y2="100" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 5" />

          {/* ── Center vertical milestone marker ── */}
          <motion.line
            x1="500" y1="25" x2="500" y2="210"
            stroke="#334155" strokeWidth="1" strokeDasharray="2 3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: ZIGZAG_DURATION - 0.3 }}
          />

          {/* ── Ghost paths (faint static underlay) ── */}
          <path
            d={chaoticPath}
            stroke="url(#chaosStroke)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.1"
          />
          <path
            d={calmPath}
            stroke="url(#calmStroke)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.1"
          />

          {/* ── ANIMATED Zigzag (draws from far-left → midpoint) ── */}
          <motion.path
            d={chaoticPath}
            stroke="url(#chaosStroke)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#crispGlow)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: ZIGZAG_DURATION, ease: 'easeInOut' }}
          />

          {/* ── Energy spark traveling along zigzag only (initial draw) ── */}
          <motion.circle
            r="4"
            fill="url(#sparkGrad)"
            filter="url(#strongGlow)"
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
              offsetPath: `path("${chaoticPath}")`,
            }}
            transition={{
              duration: ZIGZAG_DURATION,
              ease: 'easeInOut',
            }}
          />

          {/* ── Glowing ball traveling the FULL path (zigzag → calm), loops forever ── */}
          {/* Uses keyframe offsets so it slows gracefully at midpoint, then flows out */}
          <motion.circle
            r="5"
            fill="url(#travelBallGrad)"
            filter="url(#strongGlow)"
            initial={{ opacity: 0 }}
            animate={
              isInView
                ? {
                  // Keyframed distances: fast through zigzag, slow through mid, smooth through calm
                  offsetDistance: ['0%', '30%', '46%', '50%', '54%', '75%', '100%'],
                  opacity: [0, 1, 1, 1, 1, 0.9, 0],
                }
                : { opacity: 0 }
            }
            style={{
              offsetPath: `path("${fullPath}")`,
            }}
            transition={{
              duration: ZIGZAG_DURATION + PAUSE_AT_MID + CALM_DURATION + 1,
              delay: ZIGZAG_DURATION + PAUSE_AT_MID + CALM_DURATION + 1.5,
              repeat: Infinity,
              repeatDelay: 2.5,
              ease: 'easeInOut',
              // individual property timing for extra smoothness
              offsetDistance: {
                duration: ZIGZAG_DURATION + PAUSE_AT_MID + CALM_DURATION + 1,
                ease: [0.4, 0, 0.2, 1], // decelerate into midpoint, accelerate out
              },
            }}
          />

          {/* ── ANIMATED Calm line (draws after pause at midpoint) ── */}
          <motion.path
            d={calmPath}
            stroke="url(#calmStroke)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            filter="url(#crispGlow)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: CALM_DURATION, delay: CALM_START, ease: 'easeOut' }}
          />

          {/* ── Small ball running along calm line (infinite loop) ── */}
          <motion.circle
            r="3.5"
            fill="#34d399"
            filter="url(#strongGlow)"
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

          {/* ── Midpoint milestone: pulsing ring + solid dot ── */}
          <motion.circle
            cx="500" cy="100" r="8"
            stroke="#06b6d4" strokeWidth="1.5" fill="none"
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isInView
                ? {
                  opacity: [0, 0.7, 0.3, 0.7],
                  scale: [0, 1, 1.3, 1],
                }
                : { opacity: 0, scale: 0 }
            }
            transition={{
              duration: 2,
              delay: ZIGZAG_DURATION,
              repeat: Infinity,
              repeatDelay: 1,
              ease: 'easeInOut',
            }}
          />
          <motion.circle
            cx="500" cy="100" r="3.5"
            fill="#06b6d4"
            filter="url(#crispGlow)"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.4, delay: ZIGZAG_DURATION, ease: 'backOut' }}
          />

          {/* ── Vertical stem line to "Join" badge ── */}
          <motion.line
            x1="500" y1="108" x2="500" y2="175"
            stroke="#06b6d4" strokeWidth="1.2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: ZIGZAG_DURATION + 0.2 }}
          />
        </svg>

        {/* ──── OVERLAY BADGES ──── */}

        {/* 1. "your Workflows" — chaos zone label */}
        <motion.div
          className="absolute left-[19%] sm:left-[21%] top-[3%] sm:top-[6%] -translate-x-1/2"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.5, delay: BADGE_CHAOS_DELAY, ease: 'easeOut' }}
        >
          <div className="rounded-full border border-red-500/40 bg-[#070c1e]/95 px-2.5 py-0.5 text-[9px] sm:text-[11px] font-mono text-red-300 shadow-md shadow-red-500/10 backdrop-blur-md flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            <span>your Workflows</span>
          </div>
        </motion.div>

        {/* 2. "Join With Us" — midpoint badge */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-[6%] sm:bottom-[10%]"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: BADGE_MID_DELAY, ease: 'easeOut' }}
        >
          <div className="rounded-full border border-cyan-400/50 bg-[#070c1e]/95 px-3 py-1 text-[10px] sm:text-[11px] font-mono font-semibold text-cyan-200 shadow-lg shadow-cyan-500/15 backdrop-blur-md flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Join With Us</span>
          </div>
        </motion.div>

        {/* 3. Checkmarks — pop in as calm line sweeps past */}
        <motion.div
          className="absolute left-[62%] top-[30%] sm:top-[32%]"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.35, delay: CHECK1_DELAY, ease: 'backOut' }}
        >
          <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5] drop-shadow-[0_0_4px_rgba(52,211,153,0.5)]" />
        </motion.div>
        <motion.div
          className="absolute left-[74%] top-[30%] sm:top-[32%]"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.35, delay: CHECK2_DELAY, ease: 'backOut' }}
        >
          <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5] drop-shadow-[0_0_4px_rgba(52,211,153,0.5)]" />
        </motion.div>
        <motion.div
          className="absolute left-[86%] top-[30%] sm:top-[32%]"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.35, delay: CHECK3_DELAY, ease: 'backOut' }}
        >
          <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5] drop-shadow-[0_0_4px_rgba(52,211,153,0.5)]" />
        </motion.div>

        {/* 4. "calm, and shipping" — calm zone label */}
        <motion.div
          className="absolute right-[10%] sm:right-[14%] top-[3%] sm:top-[7%]"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.5, delay: BADGE_CALM_DELAY, ease: 'easeOut' }}
        >
          <div className="rounded-full border border-emerald-500/40 bg-[#070c1e]/95 px-2.5 py-0.5 text-[9px] sm:text-[11px] font-mono text-emerald-300 shadow-md shadow-emerald-500/10 backdrop-blur-md flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>calm, and shipping</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default EngineeringLifelineGraph;
