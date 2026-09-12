import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ConditionsSection from "./components/ConditionsSection";
import NeuroRehabilitation from "./components/NeuroRehabilitation";
import HowItWorks from "./components/HowItWorks";
import WhyChooseUs from "./components/WhyChooseUs";
import BookingSection, { INITIAL_FORM_DATA } from "./components/BookingSection";
import BookingSummaryModal from "./components/BookingSummaryModal";
import SuccessPage from "./components/SuccessPage";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";
import FixedMobileBar from "./components/FixedMobileBar";
import PolicyModals from "./components/PolicyModals";
import { PatientFormData, BookingConfirmation, ConditionName } from "./types";

export default function App() {
  const [formData, setFormData] = useState<PatientFormData>(INITIAL_FORM_DATA);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingConfirmation | null>(null);
  const [activePolicy, setActivePolicy] = useState<"privacy" | "terms" | "disclaimer" | null>(null);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBookClick = () => {
    scrollToSection("booking-section");
    // Auto-focus input after smooth scroll
    setTimeout(() => {
      const nameInput = document.getElementById("field-fullName");
      if (nameInput) {
        nameInput.focus();
      }
    }, 450);
  };

  const handleExploreConditions = () => {
    scrollToSection("conditions");
  };

  const handleSelectCondition = (conditionName: ConditionName) => {
    setFormData((prev) => ({ ...prev, problem: conditionName }));
    scrollToSection("booking-section");
    setTimeout(() => {
      const conditionSelect = document.getElementById("field-problem");
      if (conditionSelect) {
        conditionSelect.focus();
      }
    }, 450);
  };

  const handleProceedToSummary = () => {
    setIsSummaryModalOpen(true);
  };

  const handlePaymentSuccess = (booking: BookingConfirmation) => {
    setIsSummaryModalOpen(false);
    setConfirmedBooking(booking);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setConfirmedBooking(null);
    setFormData(INITIAL_FORM_DATA);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // If consultation was booked and verified successfully, display the Success Confirmation View
  if (confirmedBooking) {
    return (
      <div className="min-h-screen bg-[#070d1e] font-sans text-slate-100">
        <SuccessPage booking={confirmedBooking} onBackToHome={handleBackToHome} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070d1e] font-sans text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white pb-16 lg:pb-0">
      {/* Sticky Header */}
      <Header onBookClick={handleBookClick} onNavigate={scrollToSection} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onBookClick={handleBookClick}
          onExploreConditions={handleExploreConditions}
        />

        {/* Conditions We Help With */}
        <ConditionsSection onSelectCondition={handleSelectCondition} />

        {/* Specialized Neuro Rehabilitation */}
        <NeuroRehabilitation onBookClick={handleBookClick} />

        {/* How It Works (3 simple steps) */}
        <HowItWorks />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Booking Consultation Intake Form */}
        <BookingSection
          formData={formData}
          setFormData={setFormData}
          onProceedToSummary={handleProceedToSummary}
        />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenPolicy={(policy) => setActivePolicy(policy)}
        onNavigate={scrollToSection}
        onBookClick={handleBookClick}
      />

      {/* Fixed Mobile Bottom Button (without price) */}
      <FixedMobileBar onBookClick={handleBookClick} />

      {/* Booking Summary & Razorpay Payment Modal */}
      <BookingSummaryModal
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
        formData={formData}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Policy and Medical Disclaimer Modals */}
      <PolicyModals policyType={activePolicy} onClose={() => setActivePolicy(null)} />
    </div>
  );
}
