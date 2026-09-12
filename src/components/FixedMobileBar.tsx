import { ArrowRight, Calendar } from "lucide-react";

interface FixedMobileBarProps {
  onBookClick: () => void;
}

export default function FixedMobileBar({ onBookClick }: FixedMobileBarProps) {
  return (
    <div
      id="fixed-mobile-bottom-bar"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-lg shadow-slate-900/10"
    >
      <div className="max-w-md mx-auto">
        <button
          id="fixed-mobile-book-btn"
          onClick={onBookClick}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-blue-700 hover:bg-blue-800 active:scale-[0.99] text-white text-base font-bold shadow-md shadow-blue-700/20 transition-all cursor-pointer"
        >
          <Calendar className="w-5 h-5" />
          <span>Book Appointment</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
}
