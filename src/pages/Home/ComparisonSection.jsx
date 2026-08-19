import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Zap, ArrowRight } from 'lucide-react';
import EngineeringLifelineGraph from '../../components/common/EngineeringLifelineGraph';

const ComparisonSection = () => {
  return (
    <section className="relative py-20 bg-[#070C1E] text-slate-100 overflow-hidden border-b border-slate-800/50">
      
      {/* Background ambient lighting glows */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-cyan-500/8 blur-[100px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-5xl mx-auto mb-14 space-y-4"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 shadow-sm shadow-blue-500/20">
            <span>Build your business. Leave the IT to us.</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-2xl sm:text-4xl lg:text-[2.85rem] font-extrabold tracking-tight text-white leading-[1.2]">
            <span>You don’t need to hire an IT team.</span>
            <span className="block mt-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent sm:whitespace-nowrap">
              You need the right technology partner.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto font-light">
            We provide the developers, DevOps engineers, infrastructure, and technical expertise you need to take your business digital — without the cost and complexity of building an in-house team.
          </p>

          {/* Tagline */}
          <div className="pt-2">
            <span className="inline-block px-4 py-1 rounded-full bg-slate-900/90 border border-slate-700/60 text-xs sm:text-sm font-semibold tracking-wider text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              Your vision. Our technology. One team.
            </span>
          </div>
        </motion.div>

        {/* ──── RUNNING SERVICE LIFELINE / EKG GRAPH ──── */}
        <EngineeringLifelineGraph className="mb-14 -mt-2" />

        {/* Comparison Cards Row */}
        <div className="relative max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* Central VS Badge (Floating between cards on desktop) */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full border border-slate-700/80 bg-slate-950 shadow-[0_0_20px_rgba(0,0,0,0.8)] items-center justify-center text-[10px] font-black text-slate-400 uppercase tracking-wider">
            VS
          </div>

          {/* LEFT CARD: Building In-House */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 sm:p-8 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 hover:border-slate-700/80"
          >
            <div>
              {/* Card Tag */}
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Build your own IT team</span>
              </div>

              {/* Big Metric */}
              <div className="space-y-1 mb-6">
                <div className="text-4xl sm:text-5xl font-extrabold text-slate-300 font-mono tracking-tight">
                  Months
                </div>
                <div className="text-xs text-slate-400 font-medium">until your team is ready</div>
              </div>

              {/* Steps List */}
              <div className="border-t border-slate-800/80 pt-5 space-y-3 mb-6">
                {[
                  'Find the right developers',
                  'Interview & hire talent',
                  'Build your technical team',
                  'Manage salaries & overhead',
                  'Onboard & get them productive',
                ].map((step) => (
                  <div key={step} className="flex items-center gap-3 text-xs sm:text-sm text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full border border-slate-500 bg-transparent shrink-0" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="border-t border-slate-800/80 pt-4 text-xs text-slate-400 font-medium italic">
              Your projects wait while you build the team.
            </div>
          </motion.div>

          {/* RIGHT CARD: With Us (Highlighted) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-blue-950/40 via-slate-900/80 to-slate-900/90 p-6 sm:p-8 flex flex-col justify-between backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.15)] overflow-hidden group hover:border-cyan-400/70 transition-all duration-300"
          >
            {/* Ambient Corner Glow */}
            <div className="pointer-events-none absolute -top-12 -right-12 w-36 h-36 bg-cyan-500/20 blur-2xl rounded-full transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative z-10">
              {/* Card Tag */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>Your IT team, ready to go</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-2.5 py-0.5">
                  Instant Deployment
                </span>
              </div>

              {/* Big Metric */}
              <div className="space-y-1 mb-6">
                <div className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 font-mono tracking-tight drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  Days
                </div>
                <div className="text-xs text-cyan-300/80 font-medium">until you start building</div>
              </div>

              {/* Steps List */}
              <div className="border-t border-cyan-500/20 pt-5 space-y-3 mb-6">
                {[
                  'Experienced developers',
                  'DevOps & infrastructure experts',
                  'Development & automation',
                  'Managed by our technical team',
                  'Start building from day one',
                ].map((step) => (
                  <div key={step} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 group-hover:text-emerald-400 transition-colors" />
                    <span className="font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="relative z-10 border-t border-cyan-500/20 pt-4 flex items-center justify-between text-xs text-slate-200">
              <span className="font-medium">You focus on your business. We handle the technology.</span>
              <a
                href="#contact"
                className="inline-flex items-center gap-1 text-cyan-400 hover:text-white font-semibold transition-colors shrink-0 ml-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ComparisonSection;
