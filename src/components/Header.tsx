import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import gsap from 'gsap';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Monitor scroll position to apply background styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  // Monitor viewport intersections to determine the active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id) {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const id = link.href.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // GSAP animation for mobile menu
  useEffect(() => {
    if (isOpen) {
      gsap.to(mobileMenuRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out',
      });
      // Stagger animate menu items
      gsap.fromTo(
        '.mobile-nav-link',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08, delay: 0.1, duration: 0.3, ease: 'back.out(1.2)' }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
      });
    }
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg-light/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md shadow-sm border-b border-black/5 dark:border-white/10 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="flex items-center group"
          id="logo-link"
        >
          <span className="font-sans text-xs md:text-sm uppercase text-white transition-colors duration-300 flex items-center gap-3 select-none">
            {/* Monogram Box with Border glow effect */}
            <span className="relative flex items-center justify-center w-8 h-8 rounded bg-white/[0.03] border border-white/10 group-hover:border-teal-400/40 group-hover:bg-teal-500/5 transition-all duration-500 overflow-hidden">
              {/* Sweep glow effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <span className="font-mono text-xs font-bold text-teal-400 tracking-wider group-hover:text-white transition-colors duration-300">
                S
              </span>
              <span className="font-mono text-[9px] font-light text-slate-400 group-hover:text-teal-300 transition-colors duration-300 -ml-0.5">
                G
              </span>
            </span>
            {/* Elegant tracking-rich Typography */}
            <span className="flex flex-col items-start -space-y-1">
              <span className="font-bold tracking-[0.25em] text-white group-hover:text-teal-300 transition-colors duration-300 text-[11px] md:text-xs">
                SUKANYA
              </span>
              <span className="text-[8px] font-medium tracking-[0.38em] text-slate-500 group-hover:text-white/60 transition-colors duration-300">
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
                    ? 'text-slate-950 dark:text-white font-semibold'
                    : 'text-slate-500 hover:text-slate-950 dark:text-[#888] dark:hover:text-white'
                }`}
                id={`nav-${link.name.toLowerCase()}`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-950 dark:bg-white transition-all duration-300" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-4" id="header-actions">
          {/* Social Icons (Desktop only) */}
          <div className="hidden lg:flex items-center space-x-3 border-l border-slate-200 dark:border-white/10 pl-4">
            <a
              href="https://github.com/sukanyagurav"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-white transition-colors"
              aria-label="GitHub Profile"
              id="header-social-github"
            >
              <Github size={15} />
            </a>
            <a
              href="mailto:sukanyagurav6@gmail.com"
              className="text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-white transition-colors"
              aria-label="Email Me"
              id="header-social-email"
            >
              <Mail size={15} />
            </a>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-[#111] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Slide-in Right Panel) */}
      <div
        ref={mobileMenuRef}
        style={{ transform: 'translateX(100%)', opacity: 0 }}
        className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-bg-light dark:bg-[#0a0a0a] shadow-2xl border-l border-slate-200 dark:border-white/10 z-40 md:hidden flex flex-col justify-between"
        id="mobile-menu-drawer"
      >
        <div className="px-8 pt-28 pb-8 overflow-y-auto">
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`mobile-nav-link block text-xs uppercase tracking-[0.25em] font-sans transition-all duration-300 ${
                    isActive
                      ? 'text-slate-950 dark:text-white font-semibold pl-3 border-l border-slate-950 dark:border-white'
                      : 'text-slate-600 dark:text-[#888] hover:text-slate-950 dark:hover:text-white pl-0 border-l border-transparent'
                  }`}
                  id={`mobile-nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
        </div>

        <div className="p-8 border-t border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-[#111]/30">
          <p className="text-[9px] uppercase tracking-[0.3em] text-slate-400 dark:text-[#555] mb-4 font-sans">CONNECT WITH ME</p>
          <div className="flex space-x-4">
            <a
              href="https://github.com/sukanyagurav"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white dark:bg-[#111] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:text-slate-900 dark:hover:text-white transition-all duration-300 shadow-sm"
              id="mobile-social-github"
            >
              <Github size={16} />
            </a>
            <a
              href="mailto:sukanyagurav6@gmail.com"
              className="p-3 rounded-full bg-white dark:bg-[#111] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:text-slate-900 dark:hover:text-white transition-all duration-300 shadow-sm"
              id="mobile-social-email"
            >
              <Mail size={16} />
            </a>
          </div>
          <p className="text-[9px] uppercase tracking-[0.15em] text-slate-400 dark:text-[#444] mt-6 font-sans">
            © 2026 Sukanya Gurav. All rights reserved.
          </p>
        </div>
      </div>
    </header>
  );
}
