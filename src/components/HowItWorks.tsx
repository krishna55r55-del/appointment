import { CalendarCheck, FileText, Stethoscope } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Book Appointment",
      desc: "Initiate your clinical appointment request online through our streamlined portal in under two minutes.",
      icon: CalendarCheck,
    },
    {
      step: "02",
      title: "Complete Patient Details",
      desc: "Provide details about your condition, symptom duration, previous treatments, and optionally attach medical reports.",
      icon: FileText,
    },
    {
      step: "03",
      title: "Get Professional Guidance",
      desc: "Receive structured clinical guidance, exercise protocols, and functional rehabilitation advice from a physiotherapist.",
      icon: Stethoscope,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-[#0a1228] border-b border-blue-900/40 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest bg-blue-950/90 border border-blue-800/60 px-3.5 py-1 rounded-full">
            Simple Process
          </span>
          <h2
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-4 mb-4"
          >
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A seamless, structured 3-step path to receiving dedicated physiotherapy evaluation and rehabilitation planning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.step}
                id={`how-it-works-step-${item.step}`}
                className="relative flex flex-col bg-[#0d1b3e] rounded-2xl p-6 sm:p-8 border border-blue-900/50 hover:border-blue-500/50 hover:bg-[#11234f] transition-all shadow-lg shadow-black/20 group"
              >
                {/* Step indicator header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-700/50 text-cyan-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-md">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-3xl sm:text-4xl font-black text-blue-900/80 group-hover:text-cyan-400/50 transition-colors">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed flex-1">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
