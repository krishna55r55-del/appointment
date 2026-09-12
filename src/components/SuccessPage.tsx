import { BookingConfirmation } from "../types";
import {
  CheckCircle2,
  Calendar,
  User,
  Activity,
  CreditCard,
  MessageCircle,
  Home,
  Download,
  Clock,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";

interface SuccessPageProps {
  booking: BookingConfirmation;
  onBackToHome: () => void;
}

export default function SuccessPage({ booking, onBackToHome }: SuccessPageProps) {
  const whatsappMessage = encodeURIComponent(
    `Hello AuraNeuro Physiotherapy Team, I have booked an appointment.\n\nBooking ID: ${booking.id}\nPatient: ${booking.patientName}\nCondition: ${booking.problem}\nPayment: ${booking.paymentStatus} (₹100)\n\nPlease share the appointment schedule.`
  );

  const whatsappUrl = `https://wa.me/919876543210?text=${whatsappMessage}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="booking-success-container"
      className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center"
    >
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-auto">
        {/* Top Celebration Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-800 p-8 text-white text-center relative overflow-hidden">
          <div className="inline-flex p-3 rounded-full bg-emerald-400 text-slate-950 mb-3 shadow-lg shadow-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1
            id="success-heading"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2"
          >
            Appointment Booked Successfully
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm max-w-md mx-auto">
            Your physiotherapy appointment request has been received and verified. Our clinical team is reviewing your intake details.
          </p>
        </div>

        {/* Clinical Confirmation Receipt Card */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Main Key-Value Grid */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Clinical Booking ID
              </span>
              <span
                id="confirmed-booking-id"
                className="text-base sm:text-lg font-mono font-bold text-blue-800 mt-0.5 sm:mt-0"
              >
                {booking.id}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-600" />
                Patient Name
              </span>
              <span id="confirmed-patient-name" className="text-sm font-bold text-slate-900 mt-0.5 sm:mt-0">
                {booking.patientName} (Age: {booking.age})
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-blue-600" />
                Problem / Condition
              </span>
              <span id="confirmed-problem" className="text-xs font-bold text-blue-700 bg-blue-100/80 px-2.5 py-1 rounded-md mt-0.5 sm:mt-0">
                {booking.problem}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                Payment Status
              </span>
              <div className="flex flex-col sm:items-end mt-0.5 sm:mt-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span id="confirmed-payment-status" className="text-xs font-bold text-emerald-700">
                    Verified &amp; Paid (₹100)
                  </span>
                </div>
                <span className="text-[11px] text-slate-600 font-medium">
                  {booking.paymentMethod || "UPI / Online Payment"}
                </span>
                {booking.utrNumber && (
                  <span className="text-[10px] text-slate-500 font-mono">
                    UTR: {booking.utrNumber}
                  </span>
                )}
                {!booking.utrNumber && (
                  <span className="text-[10px] text-slate-600 font-mono">
                    Ref: {booking.paymentId}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                Booking Date
              </span>
              <span id="confirmed-booking-date" className="text-xs font-medium text-slate-800 mt-0.5 sm:mt-0">
                {booking.bookingDate}
              </span>
            </div>
          </div>

          {/* Next Steps Card */}
          <div className="bg-blue-50/60 rounded-xl p-4 border border-blue-100">
            <h2 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-700" />
              What Happens Next?
            </h2>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-700">1.</span>
                <span>Our physiotherapist reviews your medical history, symptoms, and uploaded report.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-700">2.</span>
                <span>You will receive an appointment confirmation call/WhatsApp on <strong>+91 {booking.mobileNumber}</strong> within 2-4 hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-700">3.</span>
                <span>Guided 1-on-1 appointment and customized rehabilitation roadmap will be provided.</span>
              </li>
            </ul>
          </div>

          {/* Actions: WhatsApp & Back to Home */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              id="whatsapp-contact-btn"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-all active:scale-[0.99]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact on WhatsApp</span>
            </a>

            <button
              type="button"
              id="print-summary-btn"
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Print Slip</span>
            </button>

            <button
              type="button"
              id="back-to-home-btn"
              onClick={onBackToHome}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-md transition-all active:scale-[0.99] cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="text-center pt-2">
            <p className="text-[11px] text-slate-600 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>AuraNeuro Physiotherapy &amp; Rehabilitation Clinic • Reg. Healthcare Provider</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
