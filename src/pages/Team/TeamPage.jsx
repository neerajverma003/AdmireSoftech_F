import React, { useState, useEffect, useMemo } from 'react';
import SEO from '../../components/SEO';
import { Link } from 'react-router-dom';
import {
  Star,
  Sparkles,
  Users,
} from 'lucide-react';
import { getActiveTeamMembers } from '../../api/teamApi';
import TrustedBrands from '../Home/TrustedBrands';

const TeamPage = () => {
  const [team, setTeam] = useState([]);
  const [selectedDept, setSelectedDept] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchTeam = async () => {
      try {
        const data = await getActiveTeamMembers();
        if (isMounted && Array.isArray(data)) {
          setTeam(data);
        }
      } catch (err) {
        console.warn('[TeamPage] Error fetching live team members:', err.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchTeam();
    return () => {
      isMounted = false;
    };
  }, []);

  const departments = useMemo(() => {
    const rawDepts = team.map((m) => m.department).filter(Boolean);
    return ['All', ...new Set(rawDepts)];
  }, [team]);

  const filteredMembers = useMemo(() => {
    return selectedDept === 'All'
      ? team
      : team.filter((member) => member.department === selectedDept);
  }, [team, selectedDept]);

  return (
    <>
      <SEO
        title="Our Team"
        description="Meet the team behind Admire Softech and discover the engineers and technology professionals building innovative digital solutions."
        canonical="https://admiresoftech.com/team"
      />

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
          {departments.length > 1 && (
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
          )}
        </div>

        {/* Clean Responsive Team Cards Grid */}
        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id || member._id}
                className="group rounded-2xl border border-slate-800/90 bg-slate-900/80 hover:border-cyan-500/50 hover:bg-slate-900/95 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-[0_12px_28px_rgba(0,0,0,0.6)] flex flex-col"
              >
                {/* Full Headshot Portrait */}
                <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-800">
                  <img
                    src={member.avatarImg || member.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Subtle gradient overlay at bottom of portrait */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />
                  
                  {/* Experience Badge */}
                  {member.experience && (
                    <div className="absolute top-3 right-3 rounded-full bg-slate-950/80 border border-slate-700/80 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-cyan-300 backdrop-blur-md shadow-md">
                      {member.experience}
                    </div>
                  )}

                  {/* Department Tag */}
                  {member.department && (
                    <div className="absolute bottom-3 left-3 rounded-md bg-blue-600/30 border border-blue-400/30 px-2.5 py-0.5 text-[9px] font-bold text-cyan-200 uppercase tracking-wider backdrop-blur-md">
                      {member.department}
                    </div>
                  )}
                </div>

                {/* Text Area */}
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
        ) : !isLoading ? (
          <div className="text-center py-16 rounded-3xl border border-slate-800 bg-slate-900/40">
            <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-300 font-medium">No team members found in this category.</p>
          </div>
        ) : null}
      </section>

      {/* ──── TRUSTED BRANDS CAROUSEL ──── */}
      <section className="relative z-10 border-t border-slate-800/80 pt-16">
        <TrustedBrands />
      </section>

      {/* ──── BOTTOM CTA BANNER ──── */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-20">
        <div className="rounded-3xl border border-blue-900/40 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-[#070C1E] p-8 sm:p-12 text-center shadow-2xl backdrop-blur-xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 shadow-sm shadow-cyan-400/20">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
            <span>Join Our Engineering Talent</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight max-w-2xl mx-auto">
            Want to build mission-critical systems alongside our team?
          </h3>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            We are always looking for senior full-stack, DevOps, and AI engineers passionate about high-impact cloud architectures.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/careers"
              className="px-7 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Explore Open Positions
            </Link>
            <Link
              to="/contact"
              className="px-7 py-3 rounded-full border border-slate-700 hover:border-cyan-500/50 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              Contact Leadership
            </Link>
          </div>
        </div>
      </section>

    </main>
  </>
);
};

export default TeamPage;
