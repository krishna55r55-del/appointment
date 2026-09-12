import { useState, useEffect, useRef, FormEvent } from "react";
import QRCode from "qrcode";
import { Check, Copy, Download, ExternalLink, ShieldCheck, Sparkles, Smartphone, ArrowRight, CreditCard, RefreshCw } from "lucide-react";

interface UpiPaymentCardProps {
  amountRupees?: number;
  patientName?: string;
  problem?: string;
  onUtrSubmit?: (utrNumber: string) => void;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  compact?: boolean;
}

export default function UpiPaymentCard({
  amountRupees = 100,
  patientName = "",
  problem = "",
  onUtrSubmit,
  isSubmitting = false,
  errorMessage = null,
  compact = false,
}: UpiPaymentCardProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [utrInput, setUtrInput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // UPI deep link string according to NPCI specifications
  const upiId = "auraneuro.pnb@upi";
  const note = problem ? `AuraNeuro - ${problem.slice(0, 20)}` : "AuraNeuro Appointment";
  const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent("Aura Neuro")}&am=${amountRupees}.00&cu=INR&tn=${encodeURIComponent(note)}`;

  useEffect(() => {
    // Generate crisp QR code data URL
    QRCode.toDataURL(upiUrl, {
      width: 480,
      margin: 1,
      color: {
        dark: "#0a192f",
        light: "#ffffff",
      },
      errorCorrectionLevel: "H",
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error("QR Code generation error:", err));
  }, [upiUrl]);

  const handleCopyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    const trimmed = utrInput.trim();
    if (!trimmed) {
      setLocalError("Please enter the 12-digit UPI reference (UTR) number after paying ₹100.");
      return;
    }

    if (trimmed.length < 6) {
      setLocalError("Please enter a valid UPI reference number from your payment receipt.");
      return;
    }

    if (onUtrSubmit) {
      onUtrSubmit(trimmed);
    }
  };

  const handleTestAutoFill = () => {
    const random12Digit = `${Math.floor(400000000000 + Math.random() * 599999999999)}`;
    setUtrInput(random12Digit);
    setLocalError(null);
  };

  const downloadQrCard = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.download = `Aura-Neuro-UPI-Payment-QR-100.png`;
    link.href = qrDataUrl;
    link.click();
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Visual Standee Card matching User's Exact Artwork */}
      <div
        ref={cardRef}
        id="aura-neuro-upi-standee"
        className="w-full max-w-[370px] bg-white rounded-3xl border-2 border-slate-100 shadow-xl overflow-hidden text-slate-900 transition-all relative"
      >
        {/* Top Header with Brain Logo & Aura Neuro typography */}
        <div className="pt-5 pb-3 px-6 text-center bg-gradient-to-b from-blue-50/50 to-white">
          <div className="flex items-center justify-center gap-2.5 mb-1">
            {/* Brain/Neuron Icon SVG */}
            <svg
              viewBox="0 0 100 100"
              className="w-10 h-10 text-blue-600 shrink-0"
              fill="currentColor"
            >
              {/* Left Hemisphere */}
              <path
                d="M48 20 C36 18 20 28 20 44 C20 54 26 62 26 72 C26 78 32 84 42 84 C45 84 48 82 48 78 Z"
                fill="none"
                stroke="#0284c7"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="28" cy="35" r="4.5" fill="#0284c7" />
              <circle cx="38" cy="28" r="4" fill="#0369a1" />
              <circle cx="24" cy="52" r="4.5" fill="#0284c7" />
              <circle cx="34" cy="48" r="3.5" fill="#0ea5e9" />
              <circle cx="28" cy="68" r="4.5" fill="#0284c7" />
              <circle cx="38" cy="64" r="3.5" fill="#0369a1" />
              <line x1="28" y1="35" x2="38" y2="28" stroke="#0284c7" strokeWidth="2.5" />
              <line x1="28" y1="35" x2="34" y2="48" stroke="#0284c7" strokeWidth="2.5" />
              <line x1="24" y1="52" x2="34" y2="48" stroke="#0284c7" strokeWidth="2.5" />
              <line x1="34" y1="48" x2="28" y2="68" stroke="#0284c7" strokeWidth="2.5" />
              <line x1="28" y1="68" x2="38" y2="64" stroke="#0284c7" strokeWidth="2.5" />

              {/* Right Hemisphere */}
              <path
                d="M52 20 C64 18 80 28 80 44 C80 54 74 62 74 72 C74 78 68 84 58 84 C55 84 52 82 52 78 Z"
                fill="none"
                stroke="#1d4ed8"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="72" cy="35" r="4.5" fill="#1d4ed8" />
              <circle cx="62" cy="28" r="4" fill="#1e40af" />
              <circle cx="76" cy="52" r="4.5" fill="#1d4ed8" />
              <circle cx="66" cy="48" r="3.5" fill="#3b82f6" />
              <circle cx="72" cy="68" r="4.5" fill="#1d4ed8" />
              <circle cx="62" cy="64" r="3.5" fill="#1e40af" />
              <line x1="72" y1="35" x2="62" y2="28" stroke="#1d4ed8" strokeWidth="2.5" />
              <line x1="72" y1="35" x2="66" y2="48" stroke="#1d4ed8" strokeWidth="2.5" />
              <line x1="76" y1="52" x2="66" y2="48" stroke="#1d4ed8" strokeWidth="2.5" />
              <line x1="66" y1="48" x2="72" y2="68" stroke="#1d4ed8" strokeWidth="2.5" />
              <line x1="72" y1="68" x2="62" y2="64" stroke="#1d4ed8" strokeWidth="2.5" />
            </svg>

            <div className="text-left">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                Aura Neuro
              </h3>
              <p className="text-[10px] font-bold text-sky-700 tracking-widest uppercase mt-1">
                HEALTH • BALANCE • BETTER YOU
              </p>
            </div>
          </div>
        </div>

        {/* Central QR Frame: Cyan/Royal Blue rounded border box */}
        <div className="px-5 py-2">
          <div className="border-[3.5px] border-[#0284c7] rounded-3xl p-3.5 bg-white shadow-inner flex flex-col items-center">
            {/* High Resolution Dynamic QR Code */}
            <div className="w-52 h-52 sm:w-56 sm:h-56 bg-white flex items-center justify-center relative p-1">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="Aura Neuro UPI QR Code"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <div className="w-full h-full bg-slate-100 animate-pulse rounded-lg flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-slate-400 animate-spin" />
                </div>
              )}
            </div>

            {/* Scan & Pay Banner inside the Blue Border Box */}
            <div className="w-full mt-2 py-2 px-3 rounded-xl bg-[#0284c7] text-white flex items-center justify-center gap-2.5 shadow-xs">
              <div className="w-4 h-6 border-2 border-white rounded-md flex items-end justify-center pb-0.5">
                <span className="w-1 h-1 bg-white rounded-full"></span>
              </div>
              <span className="text-sm font-bold tracking-wide">
                Scan &amp; Pay via any UPI app
              </span>
            </div>
          </div>
        </div>

        {/* Bank & UPI Information Strip */}
        <div className="px-5 py-2">
          <div className="py-2.5 px-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between shadow-xs">
            {/* Punjab National Bank Brand */}
            <div className="flex items-center gap-2.5">
              {/* PNB Logo Circle */}
              <div className="w-8 h-8 rounded-full bg-[#991b1b] flex items-center justify-center text-amber-300 font-bold text-sm shadow-xs border border-amber-300/40 shrink-0">
                प
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  Punjab National Bank
                </p>
                <p className="text-[11px] font-semibold text-slate-500">
                  A/c No. 7084
                </p>
              </div>
            </div>

            <div className="h-7 w-px bg-slate-200 mx-1"></div>

            {/* UPI Logo */}
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 font-black text-sm tracking-tight text-slate-800">
                <span>UPI</span>
                <span className="flex">
                  <span className="w-1.5 h-2.5 bg-emerald-600 skew-x-12 inline-block rounded-xs"></span>
                  <span className="w-1.5 h-2.5 bg-amber-500 skew-x-12 inline-block rounded-xs ml-0.5"></span>
                </span>
              </div>
              <span className="text-[8px] font-bold text-slate-600 tracking-tight leading-none uppercase">
                UNIFIED PAYMENTS INTERFACE
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Booking Pill: Book Appointment ₹100 */}
        <div className="px-5 pb-5 pt-1">
          <div className="py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#034ea2] via-[#0060b6] to-[#034ea2] text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/15 border border-white/30 flex items-center justify-center shrink-0">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <path d="M9 16l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-sm font-bold tracking-tight">
                Book Appointment
              </span>
            </div>

            {/* Radiant ₹100 Pill */}
            <div className="flex items-center gap-1">
              <span className="text-white/80 text-xs font-mono font-bold">\\ | /</span>
              <div className="px-3.5 py-1 rounded-full bg-white text-[#0055b8] font-black text-sm shadow-sm">
                ₹{amountRupees}
              </div>
              <span className="text-white/80 text-xs font-mono font-bold">\\ | /</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Tools: Direct UPI Link & Copy Details */}
      {!compact && (
        <div className="w-full max-w-[370px] mt-3.5 space-y-3">
          {/* Quick Pay via Installed App on Mobile */}
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl">
            <p className="text-xs font-bold text-slate-900 mb-2 flex items-center justify-between">
              <span>Pay directly via your favorite UPI app:</span>
              <span className="text-[11px] font-normal text-blue-700">₹{amountRupees}</span>
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              <a
                href={upiUrl}
                className="min-h-[44px] px-2.5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-xs font-bold text-slate-800 flex items-center justify-center gap-1 shadow-xs hover:bg-slate-50 active:scale-95 transition-all"
              >
                <span>GPay</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
              <a
                href={upiUrl}
                className="min-h-[44px] px-2.5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-xs font-bold text-slate-800 flex items-center justify-center gap-1 shadow-xs hover:bg-slate-50 active:scale-95 transition-all"
              >
                <span>PhonePe</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
              <a
                href={upiUrl}
                className="min-h-[44px] px-2.5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-xs font-bold text-slate-800 flex items-center justify-center gap-1 shadow-xs hover:bg-slate-50 active:scale-95 transition-all"
              >
                <span>Paytm</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
              <a
                href={upiUrl}
                className="min-h-[44px] px-2.5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-xs font-bold text-slate-800 flex items-center justify-center gap-1 shadow-xs hover:bg-slate-50 active:scale-95 transition-all"
              >
                <span>Any UPI</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Copy UPI ID & Download Card */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <button
              type="button"
              onClick={handleCopyUpiId}
              className="min-h-[44px] flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center gap-1.5 active:scale-98 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">UPI ID Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Copy UPI ID</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={downloadQrCard}
              className="min-h-[44px] py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center gap-1.5 active:scale-98 transition-all cursor-pointer"
              title="Download QR"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Save QR</span>
            </button>
          </div>

          {/* UTR / Reference ID Submission Form */}
          {onUtrSubmit && (
            <form
              onSubmit={handleFormSubmit}
              className="mt-3 p-4 rounded-2xl bg-white border-2 border-blue-200 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <label
                  htmlFor="field-utr-number"
                  className="block text-xs font-bold text-slate-900"
                >
                  Enter UPI Reference / UTR Number <span className="text-rose-600">*</span>
                </label>
                <button
                  type="button"
                  onClick={handleTestAutoFill}
                  className="min-h-[36px] px-2 py-1 text-[11px] font-bold text-blue-700 hover:underline flex items-center cursor-pointer"
                >
                  Auto-fill Demo UTR
                </button>
              </div>

              <div className="relative">
                <input
                  id="field-utr-number"
                  type="text"
                  maxLength={18}
                  placeholder="e.g. 423871928471"
                  value={utrInput}
                  onChange={(e) => {
                    setUtrInput(e.target.value);
                    setLocalError(null);
                  }}
                  className="w-full min-h-[48px] px-3.5 py-3 rounded-xl border border-slate-300 text-base sm:text-sm font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50"
                  required
                />
              </div>

              <p className="text-[11px] text-slate-500 leading-tight">
                Found in your Google Pay, PhonePe, or Paytm payment receipt after paying ₹100.
              </p>

              {(localError || errorMessage) && (
                <p className="text-xs text-rose-600 font-semibold">
                  {localError || errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                id="submit-upi-appointment-btn"
                className="w-full min-h-[52px] py-3.5 px-4 rounded-xl text-sm sm:text-base font-extrabold text-white bg-blue-700 hover:bg-blue-800 transition-all shadow-md shadow-blue-700/20 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying UPI Appointment...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    <span>Submit UTR &amp; Confirm Appointment</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
