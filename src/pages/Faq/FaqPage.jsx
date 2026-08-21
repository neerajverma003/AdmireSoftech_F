import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Code,
  Zap,
  DollarSign,
  ArrowRight,
  Search,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react';
import { getActiveFaqs } from '../../api/faqsApi';
import TrustedBrands from '../Home/TrustedBrands';
import QuickQuoteModal from '../../components/common/QuickQuoteModal';

const CATEGORIES = [
  { id: 'All', label: 'All Questions', icon: HelpCircle },
  { id: 'Engineering & Tech', label: 'Engineering & Tech', icon: Code },
  { id: 'Security & NDA', label: 'Security & NDA', icon: ShieldCheck },
  { id: 'Process & Timelines', label: 'Process & Timelines', icon: Zap },
  { id: 'Pricing & Engagement', label: 'Pricing & Engagement', icon: DollarSign },
];

const FaqPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchKnowledgeBase = async () => {
      try {
        const data = await getActiveFaqs();
        if (isMounted && Array.isArray(data)) {
          setFaqs(data);
        }
      } catch (err) {
        console.warn('[FaqPage] Error fetching FAQs from backend:', err.message);
      }
    };
    fetchKnowledgeBase();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.highlights?.some((h) => h.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
  }, [faqs, activeCategory, searchQuery]);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <main className="min-h-screen bg-[#070C1E] text-slate-100 font-poppins pt-36 pb-24 relative overflow-hidden">
      <QuickQuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />

      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-10 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
      <div className="pointer-events-none absolute top-1/3 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />

      {/* ──── HERO SECTION ──── */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-16 text-center">
        

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Frequently Asked{' '}
          <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Questions
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-8">
          Everything you need to know about our engineering engagement models, security standards, sprint timelines, and IP ownership.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setIsQuoteModalOpen(true)}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Ask a specific question</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <Link
            to="/contact"
            className="px-7 py-3.5 rounded-full border border-slate-700 hover:border-cyan-500/50 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            Contact Engineering Team
          </Link>
        </div>
      </section>

      {/* ──── SEARCH & CATEGORIES BAR ──── */}
      <section className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mb-12">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs by keyword (e.g., NDA, Microservices, Pricing, Turnaround)..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-800 bg-slate-900/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all shadow-lg backdrop-blur-md"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/25 scale-105'
                    : 'border border-slate-800 bg-slate-900/70 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ──── FAQ ACCORDION LIST ──── */}
      <section className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mb-24">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16 rounded-3xl border border-slate-800 bg-slate-900/40">
            <HelpCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-300 font-medium">No questions matched your search query.</p>
            <p className="text-xs text-slate-500 mt-1">Try searching for terms like "NDA", "Sprints", or "Pricing".</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-cyan-500/50 bg-slate-900/90 shadow-xl shadow-blue-950/40'
                      : 'border-slate-800/80 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900/80'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="w-7 h-7 rounded-lg bg-blue-600/15 border border-blue-500/30 text-cyan-400 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                        {faq.faqNumber || String(idx + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <ChevronDown
                      className={`w-4 h-4 text-cyan-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-800/60"
                      >
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-4">
                          {faq.answer}
                        </p>

                        {faq.highlights && (
                          <div className="space-y-2 pt-2">
                            {faq.highlights.map((item, hIdx) => (
                              <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ──── BOTTOM STILL HAVE QUESTIONS BANNER ──── */}
      <section className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mb-20">
        <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-r from-blue-950/60 via-slate-900/90 to-slate-900 p-8 sm:p-10 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Still have a specific technical question?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              Our principal architects respond to all inquiries within 24 business hours.
            </p>
          </div>

          <Link
            to="/contact"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-blue-600/30 transition-all cursor-pointer hover:scale-105 shrink-0"
          >
            Talk to an Engineer
          </Link>
        </div>
      </section>

      {/* ──── TRUSTED CLIENTS TICKER ──── */}
      <TrustedBrands />

    </main>
  );
};

export default FaqPage;
