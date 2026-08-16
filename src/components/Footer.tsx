import React from 'react';
import { ArrowUp, Github, Mail, Linkedin } from 'lucide-react';

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
              Designing interfaces and coding modern reactive web systems with
              structural excellence.
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
              <a
                href="https://www.linkedin.com/in/sukanya-gurav-frontend-developer/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all"
                title="LinkedIn"
                id="footer-social-linkedin"
              >
                <Linkedin size={14} />
              </a>
              <a
                href="https://www.frontendmentor.io/profile/sukanyagurav"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all"
                title="Frontend Mentor "
                id="footer-social-frontendmentor"
              >
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(-4,29) scale(0.1,-0.1)"
                    fill="#FFFFFF"
                    stroke="none"
                  >
                    <path d="M157 233 c-11 -10 -8 -103 3 -103 6 0 10 25 10 55 0 56 -1 60 -13 48z" />
                    <path d="M213 197 c-29 -13 -29 -21 2 -35 14 -6 25 -8 25 -3 0 5 -6 12 -12 14 -10 4 -9 8 2 16 21 14 9 20 -17 8z" />
                    <path d="M85 139 c19 -35 81 -67 98 -50 8 8 4 11 -15 11 -25 0 -78 40 -78 60 0 5 -5 10 -10 10 -6 0 -4 -13 5 -31z" />
                  </g>
                </svg>
              </a>
            </div>

            {/* Back to top clicker */}
            <button
              onClick={handleScrollToTop}
              className="p-2.5 border border-black/10 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-slate-900 dark:hover:border-white hover:text-slate-900 dark:hover:text-white bg-transparent transition-all duration-300 shadow-[0_0_0_1px_rgba(0,213,190,0.08),0_0_14px_rgba(0,213,190,0.12)] hover:shadow-[0_0_0_1px_rgba(0,213,190,0.22),0_0_22px_rgba(0,213,190,0.18)] cursor-pointer rounded-none"
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
          
        </div>
      </div>
    </footer>
  );
}
