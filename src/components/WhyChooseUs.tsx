import {
  Award,
  ClipboardList,
  Activity,
  HeartHandshake,
  Smartphone,
  BadgeIndianRupee,
} from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Professional Physiotherapy Guidance",
      description: "Clinical appointments delivered with rigor, evidence-based mobility techniques, and functional safety standards.",
      icon: Award,
    },
    {
      title: "Personalized Assessment",
      description: "Every condition is evaluated individually based on onset, symptom severity, medical history, and mobility limitations.",
      icon: ClipboardList,
    },
    {
      title: "Neuro, Ortho & Pediatric Expertise",
      description: "Integrated clinical focus across adult neuroplasticity, complex orthopedic joint & spine protocols, and specialized pediatric developmental milestones.",
      icon: Activity,
    },
    {
      title: "Patient-Focused Care",
      description: "Empathetic communication that involves both the patient and family caregivers in setting practical recovery goals.",
      icon: HeartHandshake,
    },
    {
      title: "Easy Online Booking",
      description: "Simple, transparent digital scheduling that respects your time without long waiting queues or complex friction.",
      icon: Smartphone,
    },
    {
      title: "Affordable Appointments",
      description: "High-quality, specialized physiotherapy appointments accessible to every patient and household without prohibitive upfront costs.",
      icon: BadgeIndianRupee,
    },
  ];

  return (
    <section id="why-choose-us" className="py-16 md:py-24 bg-[#070d1e] border-b border-blue-900/40 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest bg-blue-950/90 border border-blue-800/60 px-3.5 py-1 rounded-full">
            Clinical Commitment
          </span>
          <h2
            id="why-choose-us-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-4 mb-4"
          >
            Why Choose Us
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Dedicated to advancing functional mobility, relieving pain, and delivering dependable recovery guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={idx}
                id={`why-choose-card-${idx}`}
                className="bg-[#0d1b3e] rounded-xl p-6 border border-blue-900/50 hover:border-blue-500/50 hover:bg-[#11234f] transition-all shadow-md shadow-black/20 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-950/80 text-cyan-400 flex items-center justify-center mb-4 border border-blue-800/60">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
