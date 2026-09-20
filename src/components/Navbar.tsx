import React, { useState } from 'react';
import { Leaf, BookOpen, Sparkles, History, Info, Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'identify' | 'library' | 'history' | 'about';
  setActiveTab: (tab: 'home' | 'identify' | 'library' | 'history' | 'about') => void;
  onQuickIdentify?: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onQuickIdentify,
  isDarkMode = false,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Leaf },
    { id: 'identify', label: 'Identify', icon: Sparkles },
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'history', label: 'History', icon: History },
    { id: 'about', label: 'About', icon: Info },
  ] as const;

  const handleNavClick = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-3 z-40 px-3 sm:px-6 lg:px-8 transition-all">
      <div className="max-w-7xl mx-auto">
        <div className="liquid-glass rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-lg">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
            id="brand-logo-btn"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1E4D2B] to-[#388252] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 transition-transform group-hover:rotate-12" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-lg tracking-tight text-neutral-900 dark:text-neutral-50 font-serif-display">
                  PLANT
                </span>
                <span className="font-bold text-lg tracking-tight text-[#2E7D46] dark:text-[#52B773] font-serif-display">
                  VEDA
                </span>
              </div>
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium tracking-wide uppercase">
                Ayurvedic Flora AI
              </p>
            </div>
          </button>

          {/* Desktop Floating Navigation Pills */}
          <nav className="hidden md:flex items-center gap-1.5 liquid-glass-subtle p-1 rounded-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#234E35] text-white shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-300' : 'opacity-70'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions: Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onToggleTheme && (
              <button
                id="theme-toggle-btn"
                onClick={onToggleTheme}
                className="p-2 rounded-full liquid-glass-subtle text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/15 transition-colors focus:outline-none"
                aria-label={isDarkMode ? 'Switch to Light mode' : 'Switch to Dark mode'}
                title={isDarkMode ? 'Light mode' : 'Dark mode'}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-amber-300 animate-in spin-in-90 duration-300" />
                ) : (
                  <Moon className="w-4 h-4 text-emerald-800 animate-in spin-in-90 duration-300" />
                )}
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full liquid-glass-subtle text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Liquid Glass Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 liquid-glass rounded-2xl p-4 space-y-1 shadow-xl animate-in slide-in-from-top-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#234E35] text-white shadow-sm'
                      : 'text-neutral-700 dark:text-neutral-200 hover:bg-white/40 dark:hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'opacity-70'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-2">
              <button
                id="mobile-cta-identify-btn"
                onClick={() => handleNavClick('identify')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl liquid-btn-primary text-xs font-semibold tracking-wide"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>Identify a Plant Now</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
