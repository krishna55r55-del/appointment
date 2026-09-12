import { useState, useEffect } from "react";
import { Activity, Menu, X, Phone, ShieldCheck, ChevronRight } from "lucide-react";

interface HeaderProps {
  onBookClick: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ onBookClick, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "hero" },
    { label: "Specializations", href: "specialized-rehab" },
    { label: "Conditions", href: "conditions" },
    { label: "How It Works", href: "how-it-works" },
    { label: "Why Choose Us", href: "why-choose-us" },
    { label: "FAQ", href: "faq" },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      id="header"
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#070d1e]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-blue-900/50 py-3"
          : "bg-[#070d1e]/85 backdrop-blur-sm border-b border-blue-950/80 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Clinic Brand */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick("hero")}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-blue-700 to-cyan-500 text-white flex items-center justify-center shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-lg sm:text-xl font-bold tracking-tight text-white leading-tight">
                AuraNeuro
              </span>
              <span className="block text-[11px] sm:text-xs font-semibold text-blue-400 tracking-wide">
                Neuro • Ortho • Pediatrics Physiotherapy
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
            {navItems.map((item) => (
              <button
                key={item.href}
                id={`nav-link-${item.href}`}
                onClick={() => handleNavClick(item.href)}
                className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors cursor-pointer py-1"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              id="header-book-appointment-btn"
              onClick={onBookClick}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-md shadow-blue-600/30 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-300 hover:bg-blue-950/80 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden border-b border-blue-900/60 bg-[#0a1329] px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2"
        >
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                id={`mobile-nav-${item.href}`}
                onClick={() => handleNavClick(item.href)}
                className="flex items-center justify-between px-3 py-2.5 rounded-md text-base font-medium text-slate-200 hover:bg-blue-950 hover:text-blue-400 text-left"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
            <div className="pt-3">
              <button
                id="mobile-drawer-book-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full py-3 px-4 rounded-lg text-center font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 cursor-pointer"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
