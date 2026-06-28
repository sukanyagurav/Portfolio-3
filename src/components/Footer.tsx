import React from 'react';
import { ArrowUp, Github, Mail } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-bg-light dark:bg-[#0a0a0a] border-t border-black/5 dark:border-white/10 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          
          {/* Logo and Tagline block */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-900 text-bg-light dark:bg-white dark:text-slate-950 flex items-center justify-center font-sans font-bold text-xs rounded-none">
                SG
              </div>
              <span className="font-serif font-light text-lg text-slate-800 dark:text-white tracking-wide italic">
                Sukanya Gurav
              </span>
            </div>
            <p className="font-serif font-light text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed italic">
              Designing interfaces and coding modern reactive web systems with structural excellence.
            </p>
          </div>

          {/* Controls - Socials and Scroll-up */}
          <div className="flex items-center space-x-4">
            
            {/* Quick socials */}
            <div className="flex items-center space-x-2 border-r border-black/5 dark:border-white/10 pr-4">
              <a
                href="https://github.com/sukanyagurav"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all"
                title="GitHub"
                id="footer-social-github"
              >
                <Github size={14} />
              </a>
              <a
                href="mailto:sukanyagurav6@gmail.com"
                className="p-2 text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all"
                title="Email Me"
                id="footer-social-email"
              >
                <Mail size={14} />
              </a>
            </div>

            {/* Back to top clicker */}
            <button
              onClick={handleScrollToTop}
              className="p-2.5 border border-black/10 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-slate-900 dark:hover:border-white hover:text-slate-900 dark:hover:text-white bg-transparent transition-all duration-300 shadow-none cursor-pointer rounded-none"
              title="Back to top"
              aria-label="Back to top"
              id="footer-back-to-top"
            >
              <ArrowUp size={14} />
            </button>
          </div>

        </div>

        {/* Legal copyrights block */}
        <div className="mt-12 pt-8 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] uppercase tracking-[0.15em] text-slate-400 font-sans">
          <p>© 2026 Sukanya Gurav. All rights reserved.</p>
          <div className="flex items-center space-x-1">
            <span>Built with React, Tailwind v4, & GSAP</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
