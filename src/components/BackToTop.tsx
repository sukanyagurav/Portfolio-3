import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      onClick={handleScrollToTop}
      className={`fixed bottom-6 right-6 p-2.5 border border-black/10 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-slate-900 dark:hover:border-white hover:text-slate-900 dark:hover:text-white bg-bg-light dark:bg-[#0a0a0a] transition-all duration-300 shadow-[0_0_0_1px_rgba(0,213,190,0.08),0_0_14px_rgba(0,213,190,0.12)] hover:shadow-[0_0_0_1px_rgba(0,213,190,0.22),0_0_22px_rgba(0,213,190,0.18)] cursor-pointer rounded-none z-40 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      title="Back to top"
      aria-label="Back to top"
      id="back-to-top"
    >
      <ArrowUp size={14} />
    </button>
  );
}
