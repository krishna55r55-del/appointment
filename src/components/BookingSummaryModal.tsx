import { useState } from "react";
import { PatientFormData, BookingConfirmation } from "../types";
import UpiPaymentCard from "./UpiPaymentCard";
import {
  X,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Phone,
  MapPin,
  Clock,
  Lock,
  QrCode,
} from "lucide-react";

interface BookingSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: PatientFormData;
  onPaymentSuccess: (booking: BookingConfirmation) => void;
}

export default function BookingSummaryModal({
  isOpen,
  onClose,
  formData,
  onPaymentSuccess,
}: BookingSummaryModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showTestSimulator, setShowTestSimulator] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<string>("");
  const [simulatorMethod, setSimulatorMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [paymentTab, setPaymentTab] = useState<"upi_qr" | "online">("upi_qr");

  if (!isOpen) return null;

  // Handle UPI QR UTR Submission
  const handleUpiUtrSubmit = async (utrNumber: string) => {
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/verify-upi-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          utrNumber,
          bookingData: formData,
          paymentMethod: "UPI Scan & Pay (Punjab National Bank A/c 7084)",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Payment verification failed. Please check your UTR number.");
      }

      setIsProcessing(false);
      onPaymentSuccess(data.booking);
    } catch (err: any) {
      console.error("UPI verification error:", err);
      setIsProcessing(false);
      setErrorMessage(err.message || "Failed to submit UPI payment details. Please try again.");
    }
  };

  const initiatePayment = async () => {
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // 1. Request Razorpay Order from backend
      const response = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: formData.fullName,
          mobileNumber: formData.mobileNumber,
          problem: formData.problem,
          amount: 10000, // 10000 paise = ₹100
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to initialize payment order. Please try again.");
      }

      const orderData = await response.json();
      setCurrentOrderId(orderData.orderId);

      // 2. Check if Razorpay JS SDK is loaded in window
      const Razorpay = (window as any).Razorpay;

      // If real Razorpay key is configured and Razorpay SDK is available:
      if (!orderData.isTestMode && Razorpay && orderData.keyId !== "rzp_test_sandbox_mode") {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount, // 10000 paise
          currency: orderData.currency || "INR",
          name: "AuraNeuro Physiotherapy",
          description: `Physiotherapy Appointment - ${formData.problem}`,
          order_id: orderData.orderId,
          prefill: {
            name: formData.fullName,
            contact: formData.mobileNumber,
          },
          notes: {
            condition: formData.problem,
            city: formData.city,
          },
          theme: {
            color: "#1d4ed8",
          },
          handler: async (paymentResponse: any) => {
            await verifyPayment({
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
            });
          },
          modal: {
            ondismiss: () => {
              setIsProcessing(false);
            },
          },
        };

        const rzpInstance = new Razorpay(options);
        rzpInstance.on("payment.failed", (failRes: any) => {
          setIsProcessing(false);
          setErrorMessage(failRes.error?.description || "Payment failed. Please try again.");
        });
        rzpInstance.open();
      } else {
        // Safe Razorpay Test Mode Simulator (ensures preview and sandbox flow work without setup hurdles)
        setShowTestSimulator(true);
        setIsProcessing(false);
      }
    } catch (err: any) {
      console.error("Order creation error:", err);
      setIsProcessing(false);
      setErrorMessage(err.message || "Something went wrong while initiating checkout.");
    }
  };

  // 3. Verify Payment on Backend securely
  const verifyPayment = async (verificationPayload: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => {
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/verify-razorpay-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...verificationPayload,
          bookingData: formData,
        }),
      });

      const verifyData = await response.json();

      if (!response.ok || !verifyData.success) {
        throw new Error(verifyData.error || "Payment verification failed.");
      }

      // Success!
      setIsProcessing(false);
      setShowTestSimulator(false);
      onPaymentSuccess(verifyData.booking);
    } catch (err: any) {
      console.error("Verification error:", err);
      setIsProcessing(false);
      setErrorMessage(err.message || "Failed to verify transaction. Please contact clinic support.");
    }
  };

  // Test Simulator Payment trigger
  const handleTestSimulatorSubmit = async () => {
    const testPaymentId = `pay_test_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const testSignature = `sig_test_valid_${Date.now()}`;

    await verifyPayment({
      razorpay_order_id: currentOrderId || `order_test_${Date.now()}`,
      razorpay_payment_id: testPaymentId,
      razorpay_signature: testSignature,
    });
  };

  return (
    <div
      id="booking-summary-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto"
    >
      <div
        id="booking-summary-modal-card"
        className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-4 sm:my-6 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 bg-slate-50/70">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Booking Summary</h3>
            <p className="text-[11px] sm:text-xs text-slate-600">Please review your appointment details</p>
          </div>
          <button
            id="close-summary-modal-btn"
            onClick={onClose}
            disabled={isProcessing}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Summary Details */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-800 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Patient Details Breakdown */}
          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80 space-y-3">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200/60">
              <div className="flex items-center gap-2 text-slate-700 text-xs font-semibold">
                <User className="w-4 h-4 text-blue-600" />
                <span>Patient</span>
              </div>
              <span className="text-sm font-bold text-slate-900 text-right">
                {formData.fullName} ({formData.age} yrs)
              </span>
            </div>

            <div className="flex items-start justify-between pb-3 border-b border-slate-200/60">
              <div className="flex items-center gap-2 text-slate-700 text-xs font-semibold">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Contact</span>
              </div>
              <span className="text-xs font-medium text-slate-800 text-right">
                +91 {formData.mobileNumber}
              </span>
            </div>

            <div className="flex items-start justify-between pb-3 border-b border-slate-200/60">
              <div className="flex items-center gap-2 text-slate-700 text-xs font-semibold">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Location</span>
              </div>
              <span className="text-xs font-medium text-slate-800 text-right max-w-[200px] truncate">
                {formData.city}, {formData.state}
              </span>
            </div>

            <div className="flex items-start justify-between pb-3 border-b border-slate-200/60">
              <div className="flex items-center gap-2 text-slate-700 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Selected Condition</span>
              </div>
              <span className="text-xs font-bold text-blue-800 bg-blue-100/70 px-2 py-0.5 rounded">
                {formData.problem}
              </span>
            </div>

            {formData.duration && (
              <div className="flex items-start justify-between pb-3 border-b border-slate-200/60">
                <div className="flex items-center gap-2 text-slate-700 text-xs font-semibold">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Duration</span>
                </div>
                <span className="text-xs text-slate-700 text-right">{formData.duration}</span>
              </div>
            )}

            {formData.reportName && (
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 text-slate-700 text-xs font-semibold">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Attached Report</span>
                </div>
                <span className="text-xs text-slate-700 text-right truncate max-w-[180px]">
                  {formData.reportName}
                </span>
              </div>
            )}
          </div>

          {/* Single Strategic Display of Appointment Fee: ₹100 */}
          <div
            id="appointment-fee-display-card"
            className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-800">
                Appointment Fee
              </p>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Includes clinical case review &amp; rehabilitation guidance
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-blue-950">₹100</span>
              <p className="text-[10px] text-slate-600 font-medium">All inclusive</p>
            </div>
          </div>

          {/* Payment Method Selector Tabs */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Select Payment Method
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100/90 rounded-xl border border-slate-200">
              <button
                type="button"
                id="tab-upi-qr-payment"
                onClick={() => setPaymentTab("upi_qr")}
                className={`min-h-[46px] py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  paymentTab === "upi_qr"
                    ? "bg-white text-blue-800 shadow-xs border border-blue-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <QrCode className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-center">UPI Scan &amp; Pay</span>
                <span className="hidden sm:inline-block text-[9px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full font-bold">
                  Fast
                </span>
              </button>

              <button
                type="button"
                id="tab-online-gateway-payment"
                onClick={() => setPaymentTab("online")}
                className={`min-h-[46px] py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  paymentTab === "online"
                    ? "bg-white text-blue-800 shadow-xs border border-blue-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <CreditCard className="w-4 h-4 text-slate-600 shrink-0" />
                <span className="text-center">Card / NetBanking</span>
              </button>
            </div>
          </div>

          {/* Tab Content: UPI Scan & Pay Card */}
          {paymentTab === "upi_qr" && (
            <div className="pt-1">
              <UpiPaymentCard
                amountRupees={100}
                patientName={formData.fullName}
                problem={formData.problem}
                onUtrSubmit={handleUpiUtrSubmit}
                isSubmitting={isProcessing}
                errorMessage={errorMessage}
              />
            </div>
          )}

          {/* Tab Content: Online Gateway (Cards / NetBanking / Razorpay) */}
          {paymentTab === "online" && (
            <div className="space-y-4 pt-1">
              {/* Security & Razorpay test note */}
              <div className="flex items-center gap-2 text-[11px] text-slate-600 justify-center">
                <Lock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Secured with 256-bit Razorpay Payment Gateway</span>
              </div>

              {/* Test Simulator Section (Active when in sandbox/test mode) */}
              {showTestSimulator ? (
                <div className="rounded-xl border border-blue-300 bg-blue-50/40 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      Razorpay Checkout Test Sandbox
                    </span>
                    <span className="text-[10px] bg-blue-200 text-blue-900 font-semibold px-2 py-0.5 rounded">
                      Test Mode
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Select test payment instrument to verify backend signature and confirm appointment:
                  </p>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setSimulatorMethod("upi")}
                      className={`py-2 px-3 rounded-lg font-medium border text-center transition-all ${
                        simulatorMethod === "upi"
                          ? "bg-blue-700 text-white border-blue-700 shadow-2xs"
                          : "bg-white text-slate-700 border-slate-300"
                      }`}
                    >
                      UPI (GPay/PhonePe)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSimulatorMethod("card")}
                      className={`py-2 px-3 rounded-lg font-medium border text-center transition-all ${
                        simulatorMethod === "card"
                          ? "bg-blue-700 text-white border-blue-700 shadow-2xs"
                          : "bg-white text-slate-700 border-slate-300"
                      }`}
                    >
                      Debit / Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setSimulatorMethod("netbanking")}
                      className={`py-2 px-3 rounded-lg font-medium border text-center transition-all ${
                        simulatorMethod === "netbanking"
                          ? "bg-blue-700 text-white border-blue-700 shadow-2xs"
                          : "bg-white text-slate-700 border-slate-300"
                      }`}
                    >
                      Net Banking
                    </button>
                  </div>

                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 flex justify-between items-center">
                    <span>Test Payment Amount:</span>
                    <span className="font-bold text-slate-900">₹100 (10000 paise)</span>
                  </div>

                  <button
                    type="button"
                    id="razorpay-test-submit-btn"
                    onClick={handleTestSimulatorSubmit}
                    disabled={isProcessing}
                    className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isProcessing ? (
                      <span>Verifying Backend Payment...</span>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        <span>Authorize Test Payment of ₹100</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                /* Primary Payment Button */
                <button
                  type="button"
                  id="pay-appointment-btn"
                  onClick={initiatePayment}
                  disabled={isProcessing}
                  className="w-full py-3.5 px-6 rounded-xl text-base font-bold text-white bg-blue-700 hover:bg-blue-800 transition-all shadow-md shadow-blue-700/25 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isProcessing ? (
                    <span>Connecting to Razorpay...</span>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>Pay ₹100 &amp; Book Appointment</span>
                    </>
                  )}
                </button>
              )}

              <p className="text-[11px] text-center text-slate-600">
                Payment is verified securely on our server before appointment confirmation is issued.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
