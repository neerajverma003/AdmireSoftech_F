import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Users, Award, Clock } from 'lucide-react';

const highlights = [
  {
    icon: Zap,
    title: 'Rapid Agile Execution',
    description: 'Accelerated development sprints ensuring fast time-to-market without compromising code quality.',
  },
  {
    icon: Users,
    title: 'Dedicated IT Experts',
    description: 'Seasoned developers, AI specialists, and cloud architects working as your extended team.',
  },
  {
    icon: Award,
    title: 'Enterprise Scalability',
    description: 'Robust, battle-tested architecture designed to scale seamlessly with your growing business demand.',
  },
  {
    icon: Clock,
    title: '24/7 Technical Support',
    description: 'Continuous monitoring and proactive support to guarantee maximum system uptime and reliability.',
  },
];

const stats = [
  { value: '250+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction', cyan: true },
  { value: '12+', label: 'Industries Served' },
  { value: '50+', label: 'Global Experts' },
];

const WhyChooseUs = () => {
  return (
    <section id="about" className="py-20 bg-[#070C1E] border-t border-blue-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-extrabold text-white sm:text-4xl leading-tight"
          >
            Why Partner With <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">AdmireSoftech</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base text-slate-400 sm:text-lg"
          >
            We combine technical mastery with strategic domain knowledge to build software that scales reliably.
          </motion.p>
        </div>

        {/* 4 Highlight Bullet Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-20">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="group relative flex flex-col justify-between h-full rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 sm:p-7 transition-all duration-300 hover:border-cyan-400/40 hover:bg-slate-900/90 hover:shadow-2xl hover:shadow-blue-500/20 transform-gpu hover:-translate-y-1"
              >
                <div>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-600/10 text-cyan-400 shadow-lg shadow-blue-500/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2">
                    <Icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h4 className="mb-2 text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 pt-10 border-t border-slate-800/60">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center gap-1 text-center"
            >
              <span
                className={`text-4xl sm:text-5xl font-extrabold leading-none ${
                  stat.cyan
                    ? 'bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                    : 'text-white'
                }`}
              >
                {stat.value}
              </span>
              <span className="text-sm text-slate-400 font-medium mt-1">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
