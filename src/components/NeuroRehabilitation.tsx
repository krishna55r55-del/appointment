import { useState, type ReactNode } from "react";
import { CheckCircle2, ArrowRight, Brain, Activity, HeartPulse, Sparkles, ShieldCheck } from "lucide-react";
import neuroDoctorTreatmentImg from "../assets/images/neuro_treatment_doctor_1789217205721.jpg";

interface NeuroRehabProps {
  onBookClick: () => void;
}

type TabType = "neuro" | "ortho" | "pediatrics";

interface SpecialtyContent {
  id: TabType;
  tabLabel: string;
  badge: string;
  badgeIcon: ReactNode;
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
  badgeOverlay: string;
  overlaySubtext: string;
  highlights: { title: string; desc: string }[];
}

export default function NeuroRehabilitation({ onBookClick }: NeuroRehabProps) {
  const [activeTab, setActiveTab] = useState<TabType>("neuro");

  const specialties: Record<TabType, SpecialtyContent> = {
    neuro: {
      id: "neuro",
      tabLabel: "Neurological Rehab",
      badge: "Neuro Rehabilitation",
      badgeIcon: <Brain className="w-4 h-4 text-cyan-400" />,
      heading: "Neurological Physiotherapy & Motor Rehabilitation",
      description:
        "Specialized neuroplasticity-focused therapy for patients recovering from stroke, paralysis, hemiplegia, spinal cord trauma, and complex neuromuscular conditions. Our protocols prioritize functional restoration and long-term autonomy.",
      image: neuroDoctorTreatmentImg,
      imageAlt: "Doctor neuro treatment and clinical motor rehabilitation",
      badgeOverlay: "Neuroplasticity & Motor Recovery",
      overlaySubtext: "Evidence-based Bobath & task-oriented motor facilitation for stroke & paralysis.",
      highlights: [
        {
          title: "Paralysis & Hemiplegia Care",
          desc: "Targeted neuromuscular reactivation for affected upper and lower extremities.",
        },
        {
          title: "Post-Stroke Recovery",
          desc: "Stimulating neuroplasticity, symmetric movement re-education, and spasticity reduction.",
        },
        {
          title: "Gait & Ambulation Training",
          desc: "Step cycle retraining, weight-shifting, and safe assistive-walking guidance.",
        },
        {
          title: "Balance & Core Stabilization",
          desc: "Sensory-integration drills, postural equilibrium, and effective fall prevention.",
        },
        {
          title: "Muscle Tone Regulation",
          desc: "Inhibitory and facilitatory techniques for spastic, hypertonic, or flaccid muscles.",
        },
        {
          title: "Functional Autonomy",
          desc: "Bed mobility, sit-to-stand transfers, and caregiver-assisted mobility protocols.",
        },
      ],
    },
    ortho: {
      id: "ortho",
      tabLabel: "Orthopedic & Spine",
      badge: "Orthopedic Care",
      badgeIcon: <Activity className="w-4 h-4 text-blue-600" />,
      heading: "Orthopedic & Musculoskeletal Rehabilitation",
      description:
        "Comprehensive clinical rehabilitation for spine disorders, disc bulges, joint replacements, arthritis, and acute sports trauma. We focus on mechanical decompression, joint kinematics, and pain-free loading.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Orthopedic physiotherapist assessing joint alignment and muscular function",
      badgeOverlay: "Joint Mobility & Biomechanics",
      overlaySubtext: "Milestone-oriented post-operative and mechanical decompression therapy.",
      highlights: [
        {
          title: "Spine & Sciatica Relief",
          desc: "McKenzie directional preferences, disc stabilization, and lumbar decompression.",
        },
        {
          title: "Joint Replacement Rehab",
          desc: "Structured post-op protocols for Total Knee (TKR) and Total Hip (THR) procedures.",
        },
        {
          title: "Cervical & Neck Therapy",
          desc: "Manual therapy and deep cervical flexor retraining for stiffness and radiculopathy.",
        },
        {
          title: "Rotator Cuff & Shoulder",
          desc: "Scapular kinematics, capsular mobilization, and impingement resolution.",
        },
        {
          title: "Osteoarthritis Management",
          desc: "Joint shielding, synovial fluid circulation, and low-impact quadriceps strengthening.",
        },
        {
          title: "Sports & Ligament Recovery",
          desc: "Phased kinetic chain rehab for ACL tears, ankle sprains, and tendon pathologies.",
        },
      ],
    },
    pediatrics: {
      id: "pediatrics",
      tabLabel: "Pediatric Physiotherapy",
      badge: "Pediatric Care",
      badgeIcon: <HeartPulse className="w-4 h-4 text-blue-600" />,
      heading: "Pediatric Physiotherapy & Early Intervention",
      description:
        "Gentle, play-based developmental therapy for infants, toddlers, and growing children experiencing motor delays, cerebral palsy, or postural anomalies. We partner closely with parents to achieve key physical milestones.",
      image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Pediatric physiotherapist working gently with an infant to facilitate motor milestones",
      badgeOverlay: "Developmental Milestone Care",
      overlaySubtext: "Play-infused neurodevelopmental therapy (NDT) tailored to infants & children.",
      highlights: [
        {
          title: "Cerebral Palsy (CP) Care",
          desc: "Neurodevelopmental therapy (NDT) to optimize muscle tone and functional movement.",
        },
        {
          title: "Motor Milestone Delay",
          desc: "Targeted facilitation for rolling, independent sitting, crawling, and standing.",
        },
        {
          title: "Pediatric Gait & Stability",
          desc: "Correction for toe-walking, in-toeing, flat feet, and balance incoordination.",
        },
        {
          title: "Hypotonia & Muscle Tone",
          desc: "Stimulatory exercises for low muscle tone and joint laxity in early childhood.",
        },
        {
          title: "Congenital Torticollis",
          desc: "Gentle neck stretching, active positioning, and symmetry restoration for infants.",
        },
        {
          title: "Parent & Caregiver Guidance",
          desc: "Practical home-handling and therapeutic play positions to support daily progress.",
        },
      ],
    },
  };

  const current = specialties[activeTab];

  return (
    <section
      id="specialized-rehab"
      className="py-16 md:py-24 bg-[#070d1e] border-b border-blue-900/40 scroll-mt-12 text-slate-100"
    >
      {/* Anchor shim for neuro-rehab */}
      <div id="neuro-rehab" className="-top-20 relative pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/90 border border-blue-800/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Clinical Departments</span>
          </div>
          <h2
            id="specialized-rehab-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4"
          >
            Our Specialized Clinical Disciplines
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            From complex neurological neuroplasticity to orthopedic joint restoration and pediatric milestone
            facilitation, our clinical appointments are guided by certified clinical specialists.
          </p>

          {/* Department Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            <button
              id="tab-btn-neuro"
              onClick={() => setActiveTab("neuro")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "neuro"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-400 ring-offset-2 ring-offset-[#070d1e]"
                  : "bg-[#0d1b3e] text-slate-300 border border-blue-900/50 hover:bg-[#122452]"
              }`}
            >
              <Brain className="w-4 h-4 shrink-0 text-cyan-400" />
              <span>Neurological Rehab</span>
            </button>

            <button
              id="tab-btn-ortho"
              onClick={() => setActiveTab("ortho")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "ortho"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-400 ring-offset-2 ring-offset-[#070d1e]"
                  : "bg-[#0d1b3e] text-slate-300 border border-blue-900/50 hover:bg-[#122452]"
              }`}
            >
              <Activity className="w-4 h-4 shrink-0 text-cyan-400" />
              <span>Orthopedic &amp; Spine</span>
            </button>

            <button
              id="tab-btn-pediatrics"
              onClick={() => setActiveTab("pediatrics")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "pediatrics"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-400 ring-offset-2 ring-offset-[#070d1e]"
                  : "bg-[#0d1b3e] text-slate-300 border border-blue-900/50 hover:bg-[#122452]"
              }`}
            >
              <HeartPulse className="w-4 h-4 shrink-0 text-cyan-400" />
              <span>Pediatric Physiotherapy</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Realistic clinical photography */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-blue-800/60 bg-[#0d1b3e]">
              <img
                src={current.image}
                alt={current.imageAlt}
                className="w-full h-[380px] sm:h-[460px] object-cover object-center transition-all duration-300"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Overlay Department Tag */}
              <div className="absolute top-4 left-4 bg-[#070d1e]/90 border border-blue-800/60 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-xs flex items-center gap-2 shadow-md">
                {current.badgeIcon}
                <span>{current.badgeOverlay}</span>
              </div>

              {/* Bottom Insight Card */}
              <div className="absolute bottom-4 inset-x-4 bg-[#070d1e]/90 backdrop-blur-md rounded-xl p-4 border border-blue-800/50 shadow-lg text-slate-100">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-600/30 border border-blue-500/40 text-cyan-300 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{current.badge}</p>
                    <p className="text-[12px] text-slate-300 leading-snug">
                      {current.overlaySubtext}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Heading, Overview & Highlights */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/50 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
              {current.badgeIcon}
              <span>{current.badge}</span>
            </div>

            <h3
              id="department-heading"
              className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-white tracking-tight leading-tight mb-4"
            >
              {current.heading}
            </h3>

            <p
              id="department-description"
              className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6"
            >
              {current.description}
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-8">
              {current.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0d1b3e] border border-blue-900/50 shadow-sm hover:border-blue-500/50 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-300 leading-normal mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Book CTA Button */}
            <button
              id="department-book-cta"
              onClick={onBookClick}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 active:scale-[0.99] cursor-pointer"
            >
              <span>Book Appointment</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
