import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  Sparkles,
} from 'lucide-react';
import { teamMembersData } from '../../data/teamData';
import TrustedBrands from '../Home/TrustedBrands';

const TeamPage = () => {
  const [selectedDept, setSelectedDept] = useState('All');

  const departments = [
    'All',
    'Leadership',
    'AI & Engineering',
    'Infrastructure',
    'Design',
    'Security',
    'Data',
  ];

  const filteredMembers =
    selectedDept === 'All'
      ? teamMembersData
      : teamMembersData.filter((member) => member.department === selectedDept);

  return (
    <main className="min-h-screen bg-[#070C1E] text-slate-100 font-poppins pt-36 pb-24 relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-10 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
      <div className="pointer-events-none absolute top-1/3 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />

      {/* ──── HERO SECTION ──── */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-14 text-center">
      

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5 leading-tight">
          Team{' '}
          <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Members
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-7">
          Meet the Admire Softech team: the senior DevOps, SRE, platform, AI, and full-stack engineers, architects, and operators behind every client engagement.
        </p>

        {/* Clutch Rating Badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-800 bg-slate-900/90 px-4 py-1.5 text-xs font-mono text-slate-300 shadow-xl backdrop-blur-md">
          <div className="flex items-center text-amber-400 gap-0.5">
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
          </div>
          <span className="font-bold text-white">4.9 / 5</span>
          <span className="text-slate-600">•</span>
          <span className="uppercase tracking-wider text-slate-400 font-medium">ON CLUTCH</span>
          <span className="text-slate-600">•</span>
          <span className="text-cyan-400 font-semibold">25+ REVIEWS</span>
        </div>
      </section>

      {/* ──── TEAM GRID SECTION ──── */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400 mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Your trusted team</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Meet the Team Behind Admire Softech
          </h2>

          {/* Department Filter Pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDept(dept)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                  selectedDept === dept
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/25 scale-105'
                    : 'border border-slate-800 bg-slate-900/80 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Responsive Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="group rounded-2xl border border-slate-800/90 bg-slate-900/80 hover:border-cyan-500/50 hover:bg-slate-900/95 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-[0_12px_28px_rgba(0,0,0,0.6)] flex flex-col"
            >
              {/* Full Headshot Portrait (Preserves Entire Face & Head without awkward cropping) */}
              <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-800">
                <img
                  src={member.avatarImg}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Subtle gradient overlay at bottom of portrait */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />
                
                {/* Experience Badge */}
                <div className="absolute top-3 right-3 rounded-full bg-slate-950/80 border border-slate-700/80 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-cyan-300 backdrop-blur-md shadow-md">
                  {member.experience}
                </div>

                {/* Department Tag */}
                <div className="absolute bottom-3 left-3 rounded-md bg-blue-600/30 border border-blue-400/30 px-2.5 py-0.5 text-[9px] font-bold text-cyan-200 uppercase tracking-wider backdrop-blur-md">
                  {member.department}
                </div>
              </div>

              {/* Text Area (No Truncation - Full Clean Visibility) */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed mt-1">
                    {member.role}
                  </p>
                </div>

                {/* Bottom Row: Social Profiles */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Connect
                  </span>

                  <div className="flex items-center gap-2">
                    {member.social?.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800 transition-all"
                        aria-label="LinkedIn"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                      </a>
                    )}
                    {member.social?.github && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800 transition-all"
                        aria-label="GitHub"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──── CTA BANNER ──── */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-r from-blue-950/60 via-slate-900/90 to-slate-900 p-7 sm:p-10 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Want to work directly with our senior engineers?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-light">
              Schedule a technical discovery session with our leads or explore open freelance and full-time positions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-blue-600/30 transition-all cursor-pointer hover:scale-105"
            >
              Talk to an Engineer
            </Link>
            <Link
              to="/careers"
              className="px-5 py-2.5 rounded-full border border-slate-700 hover:border-cyan-500/50 bg-slate-900/60 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              View Open Roles
            </Link>
          </div>
        </div>
      </section>

      {/* ──── TRUSTED CLIENTS TICKER ──── */}
      <TrustedBrands />

    </main>
  );
};

export default TeamPage;
