import React from 'react';
import { Github, Mail, Linkedin } from 'lucide-react';

export default function Footer() {

  return (
    <footer className="bg-bg-light dark:bg-[#10110f] border-t border-black/5 dark:border-white/10 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Logo and Tagline block */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <img src="/logo.svg" alt="" aria-hidden="true" className="h-9 w-9" />
              <span className="font-serif text-lg text-slate-800 dark:text-white">
                Sukanya Gurav
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
              Frontend developer working with React and Svelte.
            </p>
          </div>

          {/* Controls - Socials and Scroll-up */}
          <div className="flex items-center space-x-4">
            {/* Quick socials */}
            <div className="flex items-center space-x-2 pr-4">
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
