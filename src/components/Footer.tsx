import { Activity, Phone, MessageCircle, Mail, MapPin, ShieldAlert, ArrowUp } from "lucide-react";

interface FooterProps {
  onOpenPolicy: (type: "privacy" | "terms" | "disclaimer") => void;
  onNavigate: (sectionId: string) => void;
  onBookClick: () => void;
}

export default function Footer({ onOpenPolicy, onNavigate, onBookClick }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="bg-slate-900 text-slate-300 pt-16 pb-24 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Overview */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-xl font-bold tracking-tight text-white leading-tight">
                  AuraNeuro
                </span>
                <span className="block text-xs font-semibold text-blue-400 tracking-wide">
                  Neuro • Ortho • Pediatrics Physiotherapy
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pr-4">
              Dedicated clinical physiotherapy and multi-disciplinary rehabilitation guidance for Neurological disorders, Orthopedic joint &amp; spine conditions, and Pediatric developmental recovery.
            </p>

            <div className="pt-2">
              <button
                id="footer-book-btn"
                onClick={onBookClick}
                className="inline-flex items-center px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Book Appointment
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate("hero")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("specialized-rehab")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Specializations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("conditions")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("how-it-works")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("why-choose-us")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Why Choose Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("faq")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Clinical Specializations */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Clinical Focus</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="font-semibold text-slate-300">Neurological Rehab</li>
              <li>• Stroke &amp; Paralysis Recovery</li>
              <li>• Spinal Cord &amp; Gait Re-education</li>
              <li className="font-semibold text-slate-300 pt-1">Orthopedic &amp; Spine</li>
              <li>• Joint Replacements (TKR/THR)</li>
              <li>• Sciatica, Slip Disc &amp; Sports Rehab</li>
              <li className="font-semibold text-slate-300 pt-1">Pediatric Physiotherapy</li>
              <li>• Cerebral Palsy (CP) Care</li>
              <li>• Motor Milestones &amp; Gait Retraining</li>
            </ul>
          </div>

          {/* Col 4: Contact & WhatsApp */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contact &amp; Clinic</h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  Plot 42, Medical Enclave, Sector 18, Central Healthcare Corridor, India
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+91 98765 43210 / 011-2849021</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>appointments@auraneurophysio.com</span>
              </div>
              <div className="pt-2">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-700/80 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer Banner in Footer */}
        <div className="py-6 border-b border-slate-800 text-xs text-slate-400 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-300 font-semibold">Medical Disclaimer: </strong>
            This appointment provides physiotherapy guidance and does not replace emergency medical care or a complete medical diagnosis. For sudden paralysis, sudden weakness, facial drooping, difficulty speaking, loss of consciousness, severe chest pain or other emergency symptoms, please seek immediate emergency medical care at an accredited hospital.
          </p>
        </div>

        {/* Bottom Bar: Policies & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} AuraNeuro Physiotherapy &amp; Rehabilitation Clinic. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <button
              onClick={() => onOpenPolicy("privacy")}
              className="hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenPolicy("terms")}
              className="hover:text-blue-400 transition-colors"
            >
              Terms &amp; Conditions
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenPolicy("disclaimer")}
              className="hover:text-blue-400 transition-colors"
            >
              Medical Disclaimer
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
