import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Mail, ArrowUpRight } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Monitor scroll position to apply dynamic background styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalStyle || '';
        document.documentElement.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [isOpen]);

  // Close menu on screen resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '#home', num: '01' },
    { name: 'About', href: '#about', num: '02' },
    { name: 'Experience', href: '#experience', num: '03' },
    { name: 'Projects', href: '#projects', num: '04' },
    { name: 'Skills', href: '#skills', num: '05' },
    { name: 'Contact', href: '#contact', num: '06' },
  ];

  // Use scroll position to determine which section is currently active.
  // This is more reliable than a narrow IntersectionObserver when a section is tall.
  useEffect(() => {
    const updateActiveSection = () => {
      const viewportPosition = window.scrollY + window.innerHeight * 0.35;
      let currentSection = 'home';

      navLinks.forEach((link) => {
        const id = link.href.replace('#', '');
        const element = document.getElementById(id);

        if (!element) return;

        const offsetTop = element.offsetTop - 110;
        if (viewportPosition >= offsetTop) {
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    
    const target = document.querySelector(href);
    if (target) {
      // Small timeout to allow drawer closing animation to start without stuttering
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <>
      {/* Primary Fixed Navigation Bar */}
      <header
        id="header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3.5 sm:py-4'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center group relative z-50"
            id="logo-link"
            aria-label="Sukanya Gurav Portfolio Home"
          >
            <span className="font-sans text-xs md:text-sm uppercase text-white transition-colors duration-300 flex items-center select-none">
              <span className="flex flex-col items-start -space-y-1">
                <span className="font-bold tracking-[0.25em] text-white group-hover:text-teal-300 transition-colors duration-300 text-[11px] md:text-xs">
                  SUKANYA
                </span>
                <span className="text-[8px] font-medium tracking-[0.38em] text-slate-400 group-hover:text-white/70 transition-colors duration-300">
                  GURAV
                </span>
              </span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8" id="desktop-nav">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-[11px] uppercase tracking-[0.25em] font-sans transition-colors duration-300 relative py-1.5 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  id={`nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-teal-400 transition-all duration-300" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Controls */}
          <div className="flex items-center space-x-3 sm:space-x-4" id="header-actions">
            {/* Social Icons (Desktop only) */}
            <div className="hidden lg:flex items-center space-x-3 border-l border-white/10 pl-4">
              <a
                href="https://github.com/sukanyagurav"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors p-1"
                aria-label="GitHub Profile"
                id="header-social-github"
              >
                <Github size={15} />
              </a>
              <a
                href="mailto:sukanyagurav6@gmail.com"
                className="text-slate-400 hover:text-white transition-colors p-1"
                aria-label="Email Me"
                id="header-social-email"
              >
                <Mail size={15} />
              </a>
            </div>

            {/* Mobile Menu Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative z-50 p-2.5 bg-[#141414] text-white border border-white/15 hover:border-white/30 hover:bg-[#1f1f1f] active:scale-95 transition-all flex items-center justify-center cursor-pointer"
              aria-label={isOpen ? 'Close mobile menu' : 'Open mobile menu'}
              aria-expanded={isOpen}
              id="mobile-menu-toggle"
            >
              {isOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop Overlay for Mobile Menu */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] md:hidden transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Mobile Drawer Navigation (Slide-in Right Panel) */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-[340px] h-[100dvh] bg-[#0d0d0d] shadow-2xl border-l border-white/15 z-[70] md:hidden flex flex-col justify-between overflow-y-auto overscroll-contain transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
        id="mobile-menu-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        {/* Drawer Top Header Bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#121212] sticky top-0 z-10">
          <div className="flex flex-col">
            <span className="font-sans text-[11px] font-bold tracking-[0.25em] text-white uppercase">
              Navigation
            </span>
            <span className="text-[9px] text-slate-500 font-mono tracking-wider">
              Sukanya Gurav
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2 -mr-1 text-slate-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer rounded-none border border-white/10"
            aria-label="Close navigation menu"
            id="mobile-menu-close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Links List */}
        <div className="px-6 py-6 flex-1">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`group flex items-center justify-between text-xs uppercase tracking-[0.25em] font-sans py-3 px-3 transition-all duration-200 border-l-2 ${
                    isActive
                      ? 'text-teal-300 font-semibold border-teal-400 bg-teal-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border-transparent hover:border-slate-500'
                  }`}
                  id={`mobile-nav-${link.name.toLowerCase()}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-400">
                      {link.num}
                    </span>
                    <span>{link.name}</span>
                  </span>
                  <ArrowUpRight
                    size={14}
                    className={`transition-transform duration-200 ${
                      isActive ? 'text-teal-400 opacity-100' : 'text-slate-600 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5'
                    }`}
                  />
                </a>
              );
            })}
          </nav>
        </div>

        {/* Drawer Footer Socials & Info */}
        <div className="p-6 border-t border-white/10 bg-[#121212]">
          <p className="text-[9px] uppercase tracking-[0.3em] text-slate-400 mb-3 font-sans font-medium">
            CONNECT WITH ME
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href="https://github.com/sukanyagurav"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-3 py-2.5 text-xs bg-[#1a1a1a] text-slate-200 border border-white/10 hover:text-white hover:border-white/30 hover:bg-[#222] transition-all font-sans tracking-wider"
              id="mobile-social-github"
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
            <a
              href="mailto:sukanyagurav6@gmail.com"
              className="flex items-center justify-center gap-2 px-3 py-2.5 text-xs bg-[#1a1a1a] text-slate-200 border border-white/10 hover:text-white hover:border-white/30 hover:bg-[#222] transition-all font-sans tracking-wider"
              id="mobile-social-email"
            >
              <Mail size={14} />
              <span>Email</span>
            </a>
          </div>
          <p className="text-[9px] uppercase tracking-[0.15em] text-slate-500 mt-4 text-center font-sans">
            © 2026 Sukanya Gurav • Frontend Dev
          </p>
        </div>
      </div>
    </>
  );
}