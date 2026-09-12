import { X, ShieldAlert, FileText, Lock } from "lucide-react";

interface PolicyModalsProps {
  policyType: "privacy" | "terms" | "disclaimer" | null;
  onClose: () => void;
}

export default function PolicyModals({ policyType, onClose }: PolicyModalsProps) {
  if (!policyType) return null;

  return (
    <div
      id="policy-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto"
    >
      <div
        id="policy-modal-container"
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            {policyType === "privacy" && <Lock className="w-5 h-5 text-blue-600" />}
            {policyType === "terms" && <FileText className="w-5 h-5 text-blue-600" />}
            {policyType === "disclaimer" && <ShieldAlert className="w-5 h-5 text-amber-600" />}

            <h3 className="text-lg font-bold text-slate-900">
              {policyType === "privacy" && "Privacy & Clinical Data Protection Policy"}
              {policyType === "terms" && "Terms of Appointment Service"}
              {policyType === "disclaimer" && "Comprehensive Medical Disclaimer"}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {policyType === "privacy" && (
            <>
              <p>
                <strong>1. Patient Confidentiality:</strong> AuraNeuro Physiotherapy Clinic strictly respects the confidentiality of your health data, personal contact information, medical reports, and clinical evaluation records.
              </p>
              <p>
                <strong>2. Data Usage:</strong> Your phone number, address, and uploaded diagnostic files are used exclusively by our certified physiotherapists for case assessment and coordination. We do not sell or distribute patient information to any third parties.
              </p>
              <p>
                <strong>3. Payment Security:</strong> Financial transactions are processed via Razorpay’s PCI-DSS compliant secure payment gateway. We never store debit/credit card numbers or banking passwords on our servers.
              </p>
            </>
          )}

          {policyType === "terms" && (
            <>
              <p>
                <strong>1. Nature of Appointment:</strong> The ₹100 appointment fee covers an initial case intake review, clinical assessment, and professional physiotherapy guidance tailored to your reported condition.
              </p>
              <p>
                <strong>2. Appointment Scheduling:</strong> Upon successful verified payment, our clinical team will coordinate with you to confirm a mutually convenient appointment time via WhatsApp or phone.
              </p>
              <p>
                <strong>3. Cancellation &amp; Rescheduling:</strong> Patients may request to reschedule their appointment slot up to 2 hours prior to the scheduled time without additional charges.
              </p>
              <p>
                <strong>4. Scope:</strong> Physiotherapy recommendations must be executed within pain-free or clinician-advised limits. Patients should stop any exercise immediately if they experience sharp pain or dizziness.
              </p>
            </>
          )}

          {policyType === "disclaimer" && (
            <>
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 font-medium text-xs">
                ⚠️ Emergency Alert: This appointment provides physiotherapy guidance and does NOT replace emergency medical care, intensive hospital care, or an urgent physician’s diagnosis.
              </div>
              <p>
                <strong>Emergency Symptoms:</strong> For sudden paralysis, sudden loss of speech or comprehension, facial drooping, sudden loss of vision, loss of consciousness, acute chest pain, or trauma following high-impact accidents, immediately contact local emergency services (112 / 108) or visit the nearest emergency medical facility.
              </p>
              <p>
                <strong>Non-Diagnostic Advisory:</strong> Digital physiotherapy appointments are intended for rehabilitative exercise planning, functional motor education, and musculoskeletal symptom management. They do not constitute an invasive diagnostic procedure.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors"
          >
            Understood &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
}
