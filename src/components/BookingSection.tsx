import { useState, useRef, ChangeEvent, FormEvent, Dispatch, SetStateAction } from "react";
import { PatientFormData, ConditionName } from "../types";
import { CONDITIONS_LIST, INDIAN_STATES } from "../data/conditions";
import {
  AlertTriangle,
  Upload,
  FileText,
  X,
  ArrowRight,
  CheckCircle2,
  Lock,
} from "lucide-react";

interface BookingSectionProps {
  formData: PatientFormData;
  setFormData: Dispatch<SetStateAction<PatientFormData>>;
  onProceedToSummary: () => void;
}

export const INITIAL_FORM_DATA: PatientFormData = {
  fullName: "",
  age: "",
  mobileNumber: "",
  address: "",
  city: "",
  state: "",
  problem: "",
  duration: "",
  description: "",
  previousTreatment: "No",
  reportName: "",
  reportData: "",
};

export default function BookingSection({
  formData,
  setFormData,
  onProceedToSummary,
}: BookingSectionProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const durationOptions = [
    "Less than 1 week (Acute)",
    "1 - 4 weeks",
    "1 - 6 months (Sub-acute)",
    "6 - 12 months",
    "More than 1 year (Chronic)",
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, report: "File size exceeds 10MB limit." }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        reportName: file.name,
        reportData: reader.result as string,
      }));
      setErrors((prev) => ({ ...prev, report: "" }));
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, reportName: "", reportData: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = (): { isValid: boolean; firstErrorKey?: string } => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter patient full name";
    }

    if (!formData.age.trim() || isNaN(Number(formData.age)) || Number(formData.age) < 1 || Number(formData.age) > 115) {
      newErrors.age = "Please provide a valid age (1-115)";
    }

    const cleanedPhone = formData.mobileNumber.replace(/\D/g, "");
    if (!cleanedPhone || cleanedPhone.length < 10) {
      newErrors.mobileNumber = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Please enter patient residential address";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Please enter city";
    }

    if (!formData.state.trim()) {
      newErrors.state = "Please select state";
    }

    if (!formData.problem) {
      newErrors.problem = "Please select your primary condition or problem";
    }

    setErrors(newErrors);
    const keys = Object.keys(newErrors);
    return { isValid: keys.length === 0, firstErrorKey: keys[0] };
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { isValid, firstErrorKey } = validateForm();
    if (isValid) {
      onProceedToSummary();
    } else if (firstErrorKey) {
      const el = document.getElementById(`field-${firstErrorKey}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.focus();
      }
    }
  };

  // Popular conditions for one-tap mobile ad selection
  const popularConditions: ConditionName[] = [
    "Stroke Recovery",
    "Paralysis",
    "Slip Disc / Disc Bulge",
    "Back Pain",
    "Knee Pain",
    "Cerebral Palsy",
  ];

  return (
    <section id="booking-section" className="py-10 sm:py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-10">
          <span className="inline-block text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-100/80 px-3.5 py-1.5 rounded-full">
            Fast Clinical Intake
          </span>
          <h2
            id="booking-heading"
            className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2.5 mb-2 sm:mb-3"
          >
            Book Your Physiotherapy Appointment
          </h2>
          <p id="booking-subheading" className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Fill the details below for a dedicated neuro, ortho, or pediatric physiotherapy consultation.
          </p>
        </div>

        {/* Main Booking Form Card - Optimized mobile padding */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-slate-200/90 p-4 sm:p-8 md:p-10">
          <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-6">
            {/* Row 1: Full Name & Age */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 sm:gap-5">
              <div className="sm:col-span-8">
                <label
                  htmlFor="field-fullName"
                  className="block text-xs sm:text-sm font-bold text-slate-900 mb-1"
                >
                  Full Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  id="field-fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Ramesh Chandra Verma"
                  className={`w-full min-h-[48px] sm:min-h-[42px] px-4 py-3 sm:py-2.5 rounded-xl border text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.fullName
                      ? "border-rose-400 focus:ring-rose-200 bg-rose-50/20"
                      : "border-slate-300 focus:border-blue-600 focus:ring-blue-100"
                  }`}
                  required
                />
                {errors.fullName && (
                  <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.fullName}</p>
                )}
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="field-age"
                  className="block text-xs sm:text-sm font-bold text-slate-900 mb-1"
                >
                  Age <span className="text-rose-600">*</span>{" "}
                  <span className="text-[11px] font-normal text-slate-500">(Years)</span>
                </label>
                <input
                  type="number"
                  id="field-age"
                  name="age"
                  min="1"
                  max="115"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="e.g. 48"
                  className={`w-full min-h-[48px] sm:min-h-[42px] px-4 py-3 sm:py-2.5 rounded-xl border text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.age
                      ? "border-rose-400 focus:ring-rose-200 bg-rose-50/20"
                      : "border-slate-300 focus:border-blue-600 focus:ring-blue-100"
                  }`}
                  required
                />
                {errors.age && (
                  <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.age}</p>
                )}
              </div>
            </div>

            {/* Row 2: Mobile Number */}
            <div>
              <label
                htmlFor="field-mobileNumber"
                className="block text-xs sm:text-sm font-bold text-slate-900 mb-1"
              >
                Mobile / WhatsApp Number <span className="text-rose-600">*</span>
              </label>
              <div className="relative flex rounded-xl shadow-2xs">
                <span className="inline-flex items-center justify-center min-h-[48px] sm:min-h-[42px] px-3.5 sm:px-4 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-700 text-base sm:text-sm font-bold">
                  +91
                </span>
                <input
                  type="tel"
                  id="field-mobileNumber"
                  name="mobileNumber"
                  maxLength={10}
                  inputMode="numeric"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  placeholder="9876543210"
                  className={`w-full min-h-[48px] sm:min-h-[42px] px-4 py-3 sm:py-2.5 rounded-r-xl border text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all font-mono tracking-wider ${
                    errors.mobileNumber
                      ? "border-rose-400 focus:ring-rose-200 bg-rose-50/20"
                      : "border-slate-300 focus:border-blue-600 focus:ring-blue-100"
                  }`}
                  required
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Appointment confirmation &amp; prescription will be sent on this WhatsApp number.
              </p>
              {errors.mobileNumber && (
                <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.mobileNumber}</p>
              )}
            </div>

            {/* Row 3: Address */}
            <div>
              <label
                htmlFor="field-address"
                className="block text-xs sm:text-sm font-bold text-slate-900 mb-1"
              >
                Address / Locality <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                id="field-address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="House / Flat No., Street, Area"
                className={`w-full min-h-[48px] sm:min-h-[42px] px-4 py-3 sm:py-2.5 rounded-xl border text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.address
                    ? "border-rose-400 focus:ring-rose-200 bg-rose-50/20"
                    : "border-slate-300 focus:border-blue-600 focus:ring-blue-100"
                }`}
                required
              />
              {errors.address && (
                <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.address}</p>
              )}
            </div>

            {/* Row 4: City & State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
              <div>
                <label
                  htmlFor="field-city"
                  className="block text-xs sm:text-sm font-bold text-slate-900 mb-1"
                >
                  City <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  id="field-city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g. Pune, Jaipur, Lucknow"
                  className={`w-full min-h-[48px] sm:min-h-[42px] px-4 py-3 sm:py-2.5 rounded-xl border text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.city
                      ? "border-rose-400 focus:ring-rose-200 bg-rose-50/20"
                      : "border-slate-300 focus:border-blue-600 focus:ring-blue-100"
                  }`}
                  required
                />
                {errors.city && (
                  <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.city}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="field-state"
                  className="block text-xs sm:text-sm font-bold text-slate-900 mb-1"
                >
                  State <span className="text-rose-600">*</span>
                </label>
                <select
                  id="field-state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`w-full min-h-[48px] sm:min-h-[42px] px-4 py-3 sm:py-2.5 rounded-xl border text-base sm:text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                    errors.state
                      ? "border-rose-400 focus:ring-rose-200 bg-rose-50/20"
                      : "border-slate-300 focus:border-blue-600 focus:ring-blue-100"
                  }`}
                  required
                >
                  <option value="">Select State / UT</option>
                  {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.state}</p>
                )}
              </div>
            </div>

            {/* Row 5: Problem / Condition Selection */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="field-problem"
                  className="block text-xs sm:text-sm font-bold text-slate-900"
                >
                  Problem / Primary Condition <span className="text-rose-600">*</span>
                </label>
                <span className="text-[11px] font-medium text-blue-700">
                  Neuro • Ortho • Pediatric
                </span>
              </div>

              {/* Quick Tap Chips for Mobile Ad Traffic */}
              <div className="mb-2">
                <p className="text-[11px] font-semibold text-slate-500 mb-1.5 flex items-center gap-1">
                  <span>⚡ Quick Tap:</span>
                  <span className="font-normal text-slate-400">(Tap your condition to auto-fill)</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {popularConditions.map((cond) => (
                    <button
                      key={cond}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, problem: cond }));
                        if (errors.problem) setErrors((prev) => ({ ...prev, problem: "" }));
                      }}
                      className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border text-left cursor-pointer active:scale-95 ${
                        formData.problem === cond
                          ? "bg-blue-700 text-white border-blue-700 shadow-xs"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                      }`}
                    >
                      {cond}
                    </button>
                  ))}
                </div>
              </div>

              <select
                id="field-problem"
                name="problem"
                value={formData.problem}
                onChange={handleInputChange}
                className={`w-full min-h-[48px] sm:min-h-[42px] px-4 py-3 sm:py-2.5 rounded-xl border text-base sm:text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                  errors.problem
                    ? "border-rose-400 focus:ring-rose-200 bg-rose-50/20"
                    : "border-slate-300 focus:border-blue-600 focus:ring-blue-100"
                }`}
                required
              >
                <option value="">Or select full list of conditions...</option>

                <optgroup label="🧠 Neurological Rehabilitation">
                  {CONDITIONS_LIST.filter((c) => c.category === "Neuro Rehabilitation").map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </optgroup>

                <optgroup label="🦴 Orthopedic & Spine Rehabilitation">
                  {CONDITIONS_LIST.filter((c) => c.category === "Ortho & Spine").map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </optgroup>

                <optgroup label="🧸 Pediatric Physiotherapy">
                  {CONDITIONS_LIST.filter((c) => c.category === "Pediatric Physiotherapy").map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </optgroup>

                <optgroup label="⚕️ General Rehabilitation & Other">
                  {CONDITIONS_LIST.filter((c) => c.category === "Rehabilitation & Mobility").map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </optgroup>
              </select>
              {errors.problem && (
                <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.problem}</p>
              )}
            </div>

            {/* Row 6: Since when are you experiencing this problem? */}
            <div>
              <label
                htmlFor="field-duration"
                className="block text-xs sm:text-sm font-bold text-slate-900 mb-1"
              >
                Since when are you experiencing this problem?
              </label>
              <select
                id="field-duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full min-h-[48px] sm:min-h-[42px] px-4 py-3 sm:py-2.5 rounded-xl border border-slate-300 text-base sm:text-sm text-slate-900 bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
              >
                <option value="">Select approximate duration</option>
                {durationOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Row 7: Briefly describe your problem */}
            <div>
              <label
                htmlFor="field-description"
                className="block text-xs sm:text-sm font-bold text-slate-900 mb-1"
              >
                Briefly describe your symptoms / difficulties
              </label>
              <textarea
                id="field-description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Mention specific difficulties like walking balance, hand grip weakness, radiating nerve pain, stiffness, or daily challenges..."
                className="w-full p-3.5 sm:p-3 rounded-xl border border-slate-300 text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all resize-y"
              ></textarea>
            </div>

            {/* Row 8: Have you taken previous treatment? - Touch-friendly card pills */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-2">
                Have you taken previous treatment?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, previousTreatment: "Yes" }))}
                  className={`min-h-[48px] p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer active:scale-[0.99] ${
                    formData.previousTreatment === "Yes"
                      ? "border-blue-600 bg-blue-50/80 text-blue-950 ring-1 ring-blue-600 shadow-xs"
                      : "border-slate-200 bg-slate-50/60 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      formData.previousTreatment === "Yes"
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-400 bg-white"
                    }`}
                  >
                    {formData.previousTreatment === "Yes" && (
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                    )}
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold block">
                      Yes, Previous Treatment
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      Physio, surgery, or medications
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, previousTreatment: "No" }))}
                  className={`min-h-[48px] p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer active:scale-[0.99] ${
                    formData.previousTreatment === "No"
                      ? "border-blue-600 bg-blue-50/80 text-blue-950 ring-1 ring-blue-600 shadow-xs"
                      : "border-slate-200 bg-slate-50/60 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      formData.previousTreatment === "No"
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-400 bg-white"
                    }`}
                  >
                    {formData.previousTreatment === "No" && (
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                    )}
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold block">
                      No, First Consultation
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      Fresh case / first assessment
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Row 9: Upload relevant medical report (Optional) */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                Upload relevant medical report <span className="text-slate-500 text-xs font-normal">(Optional)</span>
              </label>

              {!formData.reportName ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleFileUpload(e.dataTransfer.files[0]);
                    }
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`min-h-[110px] border-2 border-dashed rounded-2xl p-4 sm:p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center active:bg-blue-50/60 ${
                    isDragging
                      ? "border-blue-600 bg-blue-50/70"
                      : "border-slate-300 hover:border-blue-500 bg-slate-50/60"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                  />
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-1.5 shadow-2xs">
                    <Upload className="w-5 h-5" />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800">
                    Tap to upload MRI, X-Ray, or Discharge summary
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    PDF, JPG, PNG up to 10MB (Optional)
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <FileText className="w-5 h-5 text-blue-700 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-slate-900 truncate">
                      {formData.reportName}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Remove file"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
              {errors.report && (
                <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.report}</p>
              )}
            </div>

            {/* Payment Method Preview Banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 via-sky-50 to-blue-50 border border-blue-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs text-slate-700 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-700 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                  ₹
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 text-sm">
                    Appointment Fee: ₹100
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Pay via UPI (GPay, PhonePe, Paytm, PNB QR) or NetBanking
                  </p>
                </div>
              </div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-800 bg-white px-3 py-1.5 rounded-lg border border-blue-200 shrink-0">
                <span>Official PNB QR Standee</span>
              </div>
            </div>

            {/* Submission Action - High Conversion Mobile Touch Target */}
            <div className="pt-2 sm:pt-4 border-t border-slate-100 flex flex-col gap-3">
              <button
                type="submit"
                id="submit-booking-form-btn"
                className="w-full min-h-[54px] py-4 px-6 rounded-xl text-base sm:text-lg font-extrabold text-white bg-blue-700 hover:bg-blue-800 transition-all shadow-lg shadow-blue-700/25 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Book &amp; Pay ₹100</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>100% Confidential • Instant WhatsApp Confirmation</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
