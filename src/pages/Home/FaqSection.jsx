import React, { useState, useEffect, useMemo } from 'react';
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
  X,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react';
import { getActiveFaqs } from '../../api/faqsApi';
import QuickQuoteModal from '../../components/common/QuickQuoteModal';

const CATEGORIES = [
  { id: 'All', label: 'All Questions', icon: HelpCircle },
  { id: 'Engineering & Tech', label: 'Engineering & Tech', icon: Code },
  { id: 'Security & NDA', label: 'Security & NDA', icon: ShieldCheck },
  { id: 'Process & Timelines', label: 'Process & Timelines', icon: Zap },
  { id: 'Pricing & Engagement', label: 'Pricing & Engagement', icon: DollarSign },
];

const FaqSection = ({ onOpenContactModal }) => {
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
        console.warn('[FaqSection] Error fetching FAQs from backend:', err.message);
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

  const handleOpenModal = () => {
    if (onOpenContactModal) {
      onOpenContactModal();
    } else {
      setIsQuoteModalOpen(true);
    }
  };

  return (
    <section
      id="faq"
      className="relative py-24 bg-[#070C1E] text-slate-100 overflow-hidden border-t border-blue-900/20"
    >
      {/* Background ambient glow orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* ───── SECTION HEADER ───── */}
        <div className="text-center mb-10 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 shadow-sm shadow-cyan-500/20"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
            <span>Got Questions? We’ve Got Answers</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight"
          >
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Questions
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed font-light"
          >
            Everything you need to know about our engineering standards, delivery timelines, security compliance, and flexible engagement models.
          </motion.p>

          {/* ───── SEARCH BAR ───── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="pt-4 max-w-xl mx-auto"
          >
            <div className="relative group">
              {/* Glowing border background */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-600/40 via-cyan-400/60 to-blue-600/40 opacity-40 blur-sm transition-opacity duration-300 group-hover:opacity-80 group-focus-within:opacity-100 group-focus-within:blur-md" />

              <div className="relative flex items-center rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl overflow-hidden backdrop-blur-xl">
                {/* Search Logo/Icon with Glowing Badge */}
                <div className="flex h-12 w-12 items-center justify-center pl-3.5 text-cyan-400 group-focus-within:text-cyan-300 transition-colors">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600/20 border border-blue-500/30 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.35)]">
                    <Search className="h-4 w-4" />
                  </div>
                </div>

                {/* Input Field */}
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions (e.g. NDA, architecture, pricing, SLA)..."
                  className="w-full bg-transparent px-3.5 py-3.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
                />

                {/* Clear Button */}
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="mr-3 p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ───── CATEGORY FILTER PILLS ───── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenIndex(0);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/30 border border-cyan-400/50 scale-[1.02]'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800/90'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* ───── FAQ ACCORDION LIST ───── */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-14 border border-slate-800/90 rounded-3xl bg-slate-900/50 backdrop-blur-md space-y-3"
            >
              <HelpCircle className="h-10 w-10 text-slate-500 mx-auto" />
              <p className="text-slate-300 text-sm font-semibold">
                No questions found matching "{searchQuery}"
              </p>
              <p className="text-slate-500 text-xs">
                Try searching for keywords like "architecture", "security", "NDA", or "pricing".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="mt-2 text-xs font-bold text-cyan-400 hover:underline cursor-pointer"
              >
                Reset Search Filters
              </button>
            </motion.div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-cyan-500/50 bg-slate-900/95 shadow-2xl shadow-blue-500/15 border-l-4 border-l-cyan-400'
                      : 'border-slate-800/90 bg-slate-900/60 hover:border-slate-700/90 hover:bg-slate-900/80'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Numbered ID Badge */}
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-mono font-bold shrink-0 transition-colors ${
                          isOpen
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                            : 'bg-slate-800 text-slate-400 border border-slate-700/60 group-hover:text-slate-200'
                        }`}
                      >
                        {faq.faqNumber || String(index + 1).padStart(2, '0')}
                      </span>

                      <span
                        className={`text-sm sm:text-base font-bold transition-colors ${
                          isOpen ? 'text-cyan-300' : 'text-white group-hover:text-slate-100'
                        }`}
                      >
                        {faq.question}
                      </span>
                    </div>

                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                        isOpen
                          ? 'bg-cyan-500/20 text-cyan-400 rotate-180 border border-cyan-400/40 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                          : 'bg-slate-800 text-slate-400 border border-slate-700/60 group-hover:text-white'
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  {/* Accordion Content Body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden px-5 sm:px-6"
                      >
                        <div className="border-t border-slate-800/80 pt-4 pb-6 space-y-3.5">
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                            {faq.answer}
                          </p>

                          {/* Key Highlight Bullets */}
                          {faq.highlights && (
                            <div className="rounded-xl bg-slate-950/60 p-3.5 border border-slate-800/80 space-y-2">
                              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                                Key Deliverables & Guarantees:
                              </div>
                              <ul className="space-y-1.5">
                                {faq.highlights.map((h, i) => (
                                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                                    <span>{h}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>

        {/* ───── BOTTOM ARCHITECT CALLOUT ───── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 rounded-3xl border border-blue-600/30 bg-gradient-to-r from-blue-950/70 via-slate-900 to-slate-900 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-2xl"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/20 text-cyan-400 border border-blue-500/40 shrink-0 shadow-lg shadow-blue-600/25">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-base sm:text-lg font-bold text-white">
                Have a customized enterprise requirement?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Speak directly with a Senior Solutions Architect without sales pressure.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpenModal}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:opacity-95 transition-all cursor-pointer shrink-0 active:scale-95 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          >
            <span>Ask an Architect</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>

      {/* Quick Quote Modal */}
      <QuickQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </section>
  );
};

export default FaqSection;
