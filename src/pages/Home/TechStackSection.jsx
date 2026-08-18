import React, { useState, useEffect, useRef, memo } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles } from 'lucide-react';
import logo from '../../assets/images/AdmireSoftech_logo.png';
import {
  LOGOS,
  categories,
  categoryData,
  innerOrbitTechs,
  outerOrbitTechs,
} from '../../data/techStackData';

/* -------------------------------------------------------------------------- */
/* DEVICON CDN LOGO COMPONENT                                                 */
/* -------------------------------------------------------------------------- */
const LogoImg = memo(({ logoKey, name, size = "w-7 h-7" }) => {
  const src = LOGOS[logoKey];
  if (!src) return null;

  return (
    <img
      src={src}
      alt={name}
      className={`${size} object-contain`}
      loading="lazy"
      onError={(e) => { e.target.style.display = 'none'; }}
    />
  );
});

LogoImg.displayName = 'LogoImg';

/* -------------------------------------------------------------------------- */
/* ORBIT BADGE (Portal-based tooltip, immune to CSS transforms)               */
/* -------------------------------------------------------------------------- */
const OrbitBadge = memo(({ item, style }) => {
  const [tooltipPos, setTooltipPos] = useState(null);
  const badgeRef = useRef(null);

  const handleMouseEnter = () => {
    if (badgeRef.current) {
      const rect = badgeRef.current.getBoundingClientRect();
      setTooltipPos({
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    }
  };

  const handleMouseLeave = () => setTooltipPos(null);

  return (
    <div className="absolute top-1/2 left-1/2" style={style}>
      <div className="relative -ml-5 -mt-5 sm:-ml-7 sm:-mt-7">
        <div
          ref={badgeRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl border bg-slate-900/95 backdrop-blur-md ${item.bg} shadow-lg flex items-center justify-center p-1.5 sm:p-2 transition-all duration-300 hover:scale-125 hover:z-30 cursor-pointer`}
        >
          <LogoImg logoKey={item.logoKey} name={item.name} size="w-5 h-5 sm:w-8 sm:h-8" />
        </div>
      </div>

      {/* Portal tooltip — rendered on document.body, upright and centered */}
      {tooltipPos && createPortal(
        <div
          className="pointer-events-none"
          style={{
            position: 'fixed',
            left: tooltipPos.x,
            top: tooltipPos.y - 8,
            transform: 'translate(-50%, -100%)',
            zIndex: 9999,
          }}
        >
          <div className="bg-slate-800 border border-slate-600/80 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl shadow-black/50">
            {item.name}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
});

OrbitBadge.displayName = 'OrbitBadge';

/* -------------------------------------------------------------------------- */
/* TECH SKILL CARD (With Animated Progress Bar & Counter)                     */
/* -------------------------------------------------------------------------- */
const TechCard = memo(({ tech }) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setAnimatedWidth(0);
    setCount(0);

    const barTimeout = setTimeout(() => {
      setAnimatedWidth(tech.percentage);
    }, 60);

    let start = 0;
    const duration = 800;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = tech.percentage / steps;

    const countTimer = setInterval(() => {
      start += increment;
      if (start >= tech.percentage) {
        setCount(tech.percentage);
        clearInterval(countTimer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => {
      clearTimeout(barTimeout);
      clearInterval(countTimer);
    };
  }, [tech.name, tech.percentage]);

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }}
      className="spotlight-card group relative rounded-xl border border-slate-800/90 bg-slate-900/60 p-3 transition-all duration-300 hover:border-cyan-400/50 hover:bg-slate-900/95 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-0.5"
    >
      <div className="flex items-center gap-2.5 mb-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/90 border border-slate-700/60 p-1.5 shrink-0 group-hover:scale-110 group-hover:border-cyan-400/40 transition-all duration-300 shadow-sm">
          <LogoImg logoKey={tech.logoKey} name={tech.name} size="w-5 h-5" />
        </div>
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <span className="text-xs font-bold text-white truncate group-hover:text-cyan-400 transition-colors">
            {tech.name}
          </span>
          <span className="shrink-0 rounded-full border border-slate-700/50 bg-slate-800/80 px-1.5 py-0.5 text-[9px] uppercase tracking-wide font-semibold text-slate-400">
            {tech.badge}
          </span>
        </div>
        <span className="text-xs font-extrabold text-cyan-400 shrink-0 font-mono">
          {count}%
        </span>
      </div>

      {/* Animated Skill Progress Bar */}
      <div className="w-full h-1.5 rounded-full bg-slate-800/90 overflow-hidden p-0.5">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${tech.color} transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(6,182,212,0.6)]`}
          style={{ width: `${animatedWidth}%` }}
        />
      </div>
    </div>
  );
});

TechCard.displayName = 'TechCard';

/* -------------------------------------------------------------------------- */
/* ROTATING ORBIT WHEEL COMPONENT                                             */
/* -------------------------------------------------------------------------- */
const TechOrbitWheel = memo(() => (
  <div className="lg:col-span-5 flex items-center justify-center relative min-h-[360px] sm:min-h-[520px] lg:sticky lg:top-28 w-full overflow-hidden sm:overflow-visible py-4 sm:py-0">
    <div className="relative w-[280px] h-[280px] sm:w-[440px] sm:h-[440px] flex items-center justify-center scale-[0.88] xs:scale-[0.95] sm:scale-100 transition-transform">

      {/* Central Glowing Company Logo Badge */}
      <div className="absolute z-20 w-18 h-18 sm:w-28 sm:h-28 rounded-full bg-slate-900 border-2 border-blue-600/50 shadow-[0_0_35px_rgba(37,99,235,0.4)] flex items-center justify-center p-2.5 sm:p-3 transition-transform duration-300 hover:scale-110">
        <img
          src={logo}
          alt="Admire Softech"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/assets/images/AdmireSoftech_logo.png';
          }}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Inner Orbit Line */}
      <div className="absolute w-[170px] h-[170px] sm:w-[280px] sm:h-[280px] rounded-full border border-dashed border-cyan-400/30 animate-pulse" />

      {/* Inner Rotating Tech Orbit */}
      <div className="absolute w-[170px] h-[170px] sm:w-[280px] sm:h-[280px] animate-spin-orbit z-10">
        {innerOrbitTechs.map((item, idx) => {
          const angle = (idx / innerOrbitTechs.length) * 360;
          return (
            <OrbitBadge
              key={item.name}
              item={item}
              style={{
                transform: `rotate(${angle}deg) translate(var(--orbit-r, 85px)) rotate(-${angle}deg)`,
              }}
            />
          );
        })}
      </div>

      {/* Outer Orbit Line */}
      <div className="absolute w-[250px] h-[250px] sm:w-[420px] sm:h-[420px] rounded-full border border-slate-800/80" />

      {/* Outer Rotating Tech Orbit (Reverse Spin) */}
      <div className="absolute w-[250px] h-[250px] sm:w-[420px] sm:h-[420px] animate-spin-orbit-reverse z-10">
        {outerOrbitTechs.map((item, idx) => {
          const angle = (idx / outerOrbitTechs.length) * 360;
          return (
            <OrbitBadge
              key={item.name}
              item={item}
              style={{
                transform: `rotate(${angle}deg) translate(var(--orbit-r-outer, 125px)) rotate(-${angle}deg)`,
              }}
            />
          );
        })}
      </div>

    </div>

    {/* Responsive CSS Variable for orbit distances */}
    <style>{`
      @media (min-width: 640px) {
        :root { --orbit-r: 140px; --orbit-r-outer: 210px; }
      }
      @media (max-width: 639px) {
        :root { --orbit-r: 85px; --orbit-r-outer: 125px; }
      }
    `}</style>
  </div>
));

TechOrbitWheel.displayName = 'TechOrbitWheel';

/* -------------------------------------------------------------------------- */
/* DYNAMIC FULL-LINE RUNNING / TYPEWRITER TEXT                                */
/* -------------------------------------------------------------------------- */
const PHRASES = [
  { prefix: 'We build with ', highlight: 'precision' },
  { prefix: 'We architect for ', highlight: 'scalability' },
  { prefix: 'We engineer with ', highlight: 'intelligence' },
  { prefix: 'We deliver with ', highlight: 'excellence' },
  { prefix: 'We develop for ', highlight: 'modern speed' },
];

const FullLineTypewriter = () => {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentPhrase = PHRASES[phraseIdx % PHRASES.length];
  const fullLength = currentPhrase.prefix.length + currentPhrase.highlight.length;

  useEffect(() => {
    let timer;

    if (!isDeleting && charCount === fullLength) {
      // Completed full line: pause longer for comfortable reading
      timer = setTimeout(() => setIsDeleting(true), 2800);
    } else if (isDeleting && charCount === 0) {
      // Completed reverse delete: gentle pause before next phrase starts
      setIsDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % PHRASES.length);
      timer = setTimeout(() => {}, 600);
    } else {
      // Slower, smoother typing cadence (110ms typing / 50ms reverse)
      const speed = isDeleting ? 50 : 110;
      timer = setTimeout(() => {
        setCharCount((prev) => (isDeleting ? prev - 1 : prev + 1));
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [charCount, isDeleting, fullLength, phraseIdx]);

  // Compute prefix and highlight slices based on charCount
  const prefixLength = currentPhrase.prefix.length;
  const prefixVisible = currentPhrase.prefix.slice(0, Math.min(charCount, prefixLength));
  const highlightVisible =
    charCount > prefixLength
      ? currentPhrase.highlight.slice(0, charCount - prefixLength)
      : '';

  return (
    <span className="inline-flex items-baseline flex-wrap justify-center">
      <span className="text-white whitespace-pre">{prefixVisible}</span>
      {highlightVisible && (
        <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent text-gradient-animate whitespace-pre">
          {highlightVisible}
        </span>
      )}
      <span className="inline-block w-[3px] h-[0.85em] ml-1 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.9)]" />
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/* MAIN TECH STACK SECTION                                                    */
/* -------------------------------------------------------------------------- */
const TechStackSection = ({ compact = false }) => {
  const [activeTab, setActiveTab] = useState('web');
  const currentTechs = categoryData[activeTab] || categoryData.web;

  return (
    <section id="tech-stack" className="relative py-24 bg-[#070C1E] overflow-hidden border-t border-b border-slate-800/60">
      {/* Ambient background glow orbs */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

        {/* ───── SECTION HEADER ───── */}
        <div className="mx-auto mb-16 max-w-3xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-400 shadow-sm shadow-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>TECH STACK</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl min-h-[58px] sm:min-h-[68px] flex items-center justify-center">
            <FullLineTypewriter />
          </h2>

          <p className="text-base text-slate-400 sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Every technology is chosen with intent, optimized for speed, scalability, and long-term reliability.
          </p>
        </div>

        {/* ───── MAIN CONTENT GRID ───── */}
        <div className={`grid grid-cols-1 ${compact ? 'lg:grid-cols-1' : 'lg:grid-cols-12'} gap-12 lg:gap-8 items-start`}>

          {/* Orbit Wheel (shown unless compact) */}
          {!compact && <TechOrbitWheel />}

          {/* Right Panel: Categorized Proficiency Bars */}
          <div className={`${compact ? 'w-full' : 'lg:col-span-7'} space-y-6`}>

            {/* Category Filter Tabs */}
            <div className="overflow-x-auto pb-1 -mx-1 px-1">
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md w-max min-w-full">
                {categories.map((cat) => {
                  const isActive = activeTab === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveTab(cat.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 border border-blue-500/50'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tech Items Skill Cards Grid */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${compact ? 'lg:grid-cols-3 xl:grid-cols-4' : 'xl:grid-cols-3'} gap-2.5 pt-2`}>
              {currentTechs.map((tech) => (
                <TechCard key={tech.name} tech={tech} />
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default TechStackSection;
