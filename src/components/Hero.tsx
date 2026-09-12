import { CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import neuroDoctorTreatmentImg from "../assets/images/neuro_treatment_doctor_1789217205721.jpg";

interface HeroProps {
  onBookClick: () => void;
  onExploreConditions: () => void;
}

export default function Hero({ onBookClick, onExploreConditions }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-[#060c1d] via-[#091530] to-[#070d1e] pt-10 pb-16 md:py-20 lg:py-24 border-b border-blue-900/40 text-slate-100"
    >
      {/* Background ambient doctor neuro treatment image with deep blue overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15 mix-blend-screen">
        <img
          src={neuroDoctorTreatmentImg}
          alt="Neuro doctor treatment ambient background"
          className="w-full h-full object-cover object-center filter blur-md scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070d1e] via-[#070d1e]/80 to-transparent" />
      </div>

      {/* Radial soft glowing light circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-20 right-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Small label */}
            <div
              id="hero-label"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/90 border border-blue-800/60 text-blue-300 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-5 shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              NEURO • ORTHO • PEDIATRICS PHYSIOTHERAPY &amp; REHABILITATION
            </div>

            {/* Main Heading */}
            <h1
              id="hero-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] font-extrabold text-white tracking-tight leading-[1.15] mb-5 text-balance"
            >
              Specialized Neuro, Ortho &amp; Pediatric Physiotherapy
            </h1>

            {/* Subheading */}
            <p
              id="hero-subheading"
              className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mb-8"
            >
              Personalized, clinical physiotherapy guidance and rehabilitation for neurological recovery,
              stroke, paralysis, orthopedic joint &amp; spine pain, and pediatric developmental milestones.
            </p>

            {/* CTAs and Price Badge */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8">
              <button
                id="hero-primary-cta"
                onClick={onBookClick}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 active:scale-[0.99] cursor-pointer"
              >
                <span>Book Appointment</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>

              <button
                id="hero-secondary-cta"
                onClick={onExploreConditions}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-base font-semibold text-slate-200 bg-[#0d1c3e] hover:bg-[#132754] border border-blue-800/50 transition-colors shadow-sm cursor-pointer"
              >
                Explore Conditions
              </button>

              {/* Single Hero Badge: Appointment ₹100 */}
              <div
                id="hero-price-badge"
                className="inline-flex items-center justify-center gap-2 self-start sm:self-center px-3.5 py-2 rounded-lg bg-blue-950/80 border border-blue-700/60 text-blue-200 text-sm font-medium shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-bold text-white">Appointment ₹100</span>
              </div>
            </div>

            {/* Trust Highlights representing the 3 specialties */}
            <div className="pt-6 border-t border-blue-900/50 w-full grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="flex items-center gap-2 text-slate-300 text-xs sm:text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Neuro: Stroke &amp; Paralysis</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-xs sm:text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Ortho: Joint, Spine &amp; Sports</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-xs sm:text-sm font-medium">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Pediatrics: CP &amp; Milestones</span>
              </div>
            </div>
          </div>

          {/* Right Column: Doctors Neuro Treatment Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glowing Dark Blue Medical Aura */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 to-cyan-500/20 rounded-3xl blur-2xl opacity-80 -z-10"></div>

              {/* Main Image Container */}
              <div
                id="hero-image-card"
                className="relative rounded-2xl overflow-hidden bg-[#0d1b3e] shadow-2xl shadow-blue-950 border border-blue-700/50 group"
              >
                <img
                  src={neuroDoctorTreatmentImg}
                  alt="Doctor performing specialized neurological physiotherapy treatment and motor rehabilitation"
                  className="w-full h-[360px] sm:h-[440px] object-cover object-center transform group-hover:scale-102 transition-transform duration-500"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* Overlaid Clinical Status Banner */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#060c1d] via-[#070e24]/90 to-transparent p-5 text-white">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                          Doctor-Led Neuro Rehabilitation
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-slate-100">
                        Advanced Neural &amp; Motor Therapy
                      </p>
                    </div>
                    <span className="px-3 py-1.5 rounded-lg bg-blue-600/90 text-white text-xs font-bold border border-blue-400/30 shadow-md backdrop-blur-xs shrink-0">
                      1-on-1 Care
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
