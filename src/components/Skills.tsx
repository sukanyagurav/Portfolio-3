import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const skillGroups = [
    {
      name: 'Frontend',
      skills: ['React.js', 'SvelteKit', 'Svelte 5', 'Lit JS', 'JavaScript (ES6+)', 'TypeScript', 'HTML5 & CSS3'],
    },
    {
      name: 'Styling & Motion',
      skills: ['Tailwind CSS', 'Responsive Layouts', 'GSAP', 'Framer Motion'],
    },
    {
      name: 'APIs & Backend',
      skills: ['Node.js', 'Firebase', 'RESTful APIs'],
    },
    {
      name: 'Tools',
      skills: ['Git & GitHub', 'Vite & Webpack', 'npm & Yarn', 'Chrome DevTools'],
    },
  ];

  // GSAP animation for progress bars and grid entrance
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 md:py-28 bg-bg-light dark:bg-[#10110f] border-b border-black/5 dark:border-white/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="skills-reveal-title max-w-3xl mb-12 md:mb-16">
          <p className="text-sm text-teal-700 dark:text-teal-300 mb-4">Tools I use</p>
          <h2 className="font-serif font-medium text-4xl sm:text-6xl text-slate-950 dark:text-white leading-tight">
            Skills
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-4 max-w-xl leading-relaxed">
            Browse by focus area. Project cards show the tools behind each build.
          </p>
        </div>

        {/* Skills grouped by focus area */}
        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.name}
              className="skill-item-card border-t border-black/10 dark:border-white/15 pt-5"
            >
              <h3 className="text-base font-medium text-slate-900 dark:text-white mb-4">
                {group.name}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-full border border-slate-300/70 dark:border-white/15 bg-white/70 dark:bg-white/[0.04] px-3 py-1.5 text-sm text-slate-700 dark:text-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
