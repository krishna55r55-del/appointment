import { useState } from "react";
import { CONDITIONS_LIST } from "../data/conditions";
import { ConditionInfo, ConditionName } from "../types";
import { ArrowUpRight, Activity, Filter } from "lucide-react";

interface ConditionsSectionProps {
  onSelectCondition: (conditionName: ConditionName) => void;
}

export default function ConditionsSection({ onSelectCondition }: ConditionsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "Neuro Rehabilitation",
    "Ortho & Spine",
    "Pediatric Physiotherapy",
    "Rehabilitation & Mobility",
  ];

  const filteredConditions =
    activeCategory === "All"
      ? CONDITIONS_LIST
      : CONDITIONS_LIST.filter((c) => c.category === activeCategory);

  return (
    <section id="conditions" className="py-16 md:py-24 bg-[#0a1228] border-b border-blue-900/40 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/90 border border-blue-800/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Clinical Scope</span>
          </div>
          <h2
            id="conditions-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4"
          >
            Conditions We Help With
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Our evidence-guided physiotherapy appointments provide specialized clinical protocols for
            Neurological recovery, Orthopedic &amp; musculoskeletal disorders, and Pediatric developmental milestones.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`filter-category-${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-blue-400/40"
                    : "bg-[#0f1d40] text-slate-300 hover:bg-[#152754] border border-blue-900/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Condition Cards Grid */}
        <div
          id="conditions-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
        >
          {filteredConditions.map((condition: ConditionInfo) => (
            <div
              key={condition.name}
              id={`condition-card-${condition.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
              className="group flex flex-col bg-[#0d1b3e] rounded-xl overflow-hidden border border-blue-900/50 hover:border-blue-500/50 hover:bg-[#11234f] hover:shadow-xl hover:shadow-blue-950/50 transition-all duration-200"
            >
              {/* Card Image */}
              <div className="relative h-44 w-full bg-[#080f22] overflow-hidden">
                <img
                  src={condition.image}
                  alt={`${condition.name} physiotherapy rehabilitation`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide bg-[#070d1e]/90 text-cyan-300 border border-blue-800/60 shadow-xs backdrop-blur-xs">
                    {condition.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5 leading-snug">
                    {condition.name}
                  </h3>
                  <p className="text-xs font-semibold text-cyan-400 mb-2.5">
                    {condition.tagline}
                  </p>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {condition.description}
                  </p>
                </div>

                <div className="mt-4 pt-3.5 border-t border-blue-900/50 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-400">
                    {condition.focusArea}
                  </span>
                  <button
                    id={`select-condition-btn-${condition.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                    onClick={() => onSelectCondition(condition.name)}
                    className="inline-flex items-center text-xs font-bold text-cyan-400 hover:text-cyan-300 group-hover:underline cursor-pointer"
                  >
                    <span>Book Appointment</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
