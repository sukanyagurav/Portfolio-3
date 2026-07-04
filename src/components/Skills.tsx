import { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const skillsList: Skill[] = [
    { name: 'React.js' },
    { name: 'JavaScript (ES6+)' },
    { name: 'TypeScript' },
    { name: 'HTML5 & CSS3' },
    { name: 'Svelte Kit' },
    { name: 'Svelte5' },
    { name: 'Tailwind CSS' },
    { name: 'GSAP (GreenSock)' },
    { name: 'Framer Motion' },
    { name: 'Responsive Layouts' },
    { name: 'Node.js' },
    { name: 'Firebase' },
    { name: 'RESTful APIs' },
    { name: 'Git & GitHub' },
    { name: 'Vite & Webpack' },
    { name: 'npm & Yarn' },
    { name: 'Chrome DevTools' },
  ];

  // GSAP animation for progress bars and grid entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      // General title fade
      gsap.fromTo(
        '.skills-reveal-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.skills-reveal-title',
            start: 'top 85%',
          },
        }
      );

      // Stagger cards on scroll
      gsap.fromTo(
        '.skill-item-card',
        { opacity: 0, scale: 0.9, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredSkills = skillsList;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 md:py-36 bg-bg-light dark:bg-[#0a0a0a] border-b border-black/5 dark:border-white/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="skills-reveal-title text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 border border-black/10 dark:border-white/10 text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-[0.2em] font-sans bg-transparent mb-6">
            <Sparkles size={11} className="text-slate-400 dark:text-slate-500" />
            <span>My Expertise</span>
          </div>
          <h2 className="font-serif font-light text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-wide leading-tight italic">
            Technical Superpowers
          </h2>
          <p className="font-serif text-lg text-slate-500 dark:text-slate-400 font-light mt-3 max-w-lg mx-auto italic">
            A complete list of skills across frontend, styling, backend, and tooling — all shown together.
          </p>
        </div>

        {/* Skills Cards Grid Container */}
        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="skill-item-card p-6 border border-black/5 dark:border-white/10 bg-white/70 dark:bg-[#111] hover:border-black/20 dark:hover:border-white/20 transition-all duration-500 group"
              id={`skill-card-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.15em] font-sans font-semibold text-slate-800 dark:text-slate-200">
                  {skill.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight footer message */}
        <div className="mt-16 text-center text-[10px] uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 font-sans">
          <span>💡 Continuously expanding skills through active open source work.</span>
        </div>

      </div>
    </section>
  );
}
