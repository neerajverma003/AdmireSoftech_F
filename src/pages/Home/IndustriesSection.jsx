import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Code2,
  Smartphone,
  Cloud,
  Cpu,
  TrendingUp,
  Activity,
  BarChart3,
  ShieldCheck,
  GraduationCap,
  Truck,
  Building2,
  Lock,
  Stethoscope,
  Landmark,
  ShoppingBag,
} from 'lucide-react';
import { industriesData } from '../../data/industries';
import { getActiveIndustries } from '../../api/industriesApi';

const iconMap = {
  Code2,
  Smartphone,
  Cloud,
  Cpu,
  TrendingUp,
  Activity,
  BarChart3,
  ShieldCheck,
  GraduationCap,
  Truck,
  Building2,
  Lock,
  Stethoscope,
  Landmark,
  ShoppingBag,
  Sparkles,
};

const IndustriesSection = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchHomeIndustries = async () => {
      try {
        const live = await getActiveIndustries();
        if (isMounted && Array.isArray(live) && live.length > 0) {
          setItems(live.slice(0, 6));
        } else {
          setItems(industriesData);
        }
      } catch {
        if (isMounted) setItems(industriesData);
      }
    };
    fetchHomeIndustries();
    return () => {
      isMounted = false;
    };
  }, []);

  const displayItems = items.length > 0 ? items : industriesData;

  return (
    <section id="industries" className="py-24 relative overflow-hidden bg-[#070C1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-cyan-400 uppercase">
              INDUSTRIES WE SERVE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Solutions Across Industries
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              We deliver domain-tailored technology platforms to empower organizations across diverse enterprise sectors.
            </p>
          </div>

          <Link
            to="/industries"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 group transition-colors self-start md:self-auto"
          >
            <span>View All Industries</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayItems.map((item) => {
            const Icon = typeof item.icon === 'string' ? (iconMap[item.icon] || Sparkles) : (item.icon || Sparkles);
            const itemId = item.id || item._id;
            return (
              <Link
                key={itemId}
                to="/industries"
                className="group glass-card glass-card-hover p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-6">
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-700/60 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:text-cyan-300 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-cyan-400">
                  <span>Explore Domain</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default IndustriesSection;
