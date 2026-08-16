import { useEffect, useRef } from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  skills: string[];
  current?: boolean;
  achievements: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Associate Software Developer',
    company: 'Kyndryl',
    period: '2023 - Present',
    location: 'Bangalore, India',
    current: true,
    skills: ['Svelte5', 'TypeScript', 'Lit JS'],
    achievements: [
      // TODO: swap in real numbers/specifics — recruiters weigh quantified impact heavily.
      'Building and maintaining component-driven UIs in Svelte5 and Lit JS for internal enterprise tooling.',
      'Migrated legacy view logic to TypeScript, reducing runtime type errors across shared modules.',
      'Collaborated cross-functionally with backend and design teams to ship features on sprint cadence.',
    ],
  },
  {
    id: 'exp-2',
    role: 'Associate Technical Engineer',
    company: 'Kyndryl',
    period: '2021 - 2023',
    location: 'Bangalore, India',
    skills: ['React', 'JavaScript', 'CSS Grid', 'REST APIs', 'Vite', 'Figma'],
    achievements: [
      'Developed responsive React interfaces from Figma designs, integrating REST APIs for live data.',
      'Set up and maintained Vite-based build tooling to speed up local development workflows.',
      'Partnered with QA to identify and resolve UI regressions before release.',
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // General section header fade-in
      gsap.fromTo(
        '.experience-reveal-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.experience-reveal-title',
            start: 'top 85%',
          },
        }
      );

      // Stagger timeline items
      gsap.fromTo(
        '.timeline-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 md:py-36 bg-bg-light dark:bg-[#0a0a0a] border-b border-black/5 dark:border-white/10 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="experience-reveal-title text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 border border-black/10 dark:border-white/10 text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-[0.2em] font-sans bg-transparent mb-6">
            <Briefcase size={11} className="text-slate-400 dark:text-slate-500" />
            <span>Professional Career</span>
          </div>
          <h2 className="font-serif font-light text-3xl sm:text-5xl md:text-6xl text-slate-900 dark:text-white tracking-wide leading-tight italic">
            Work Experience
          </h2>
          <p className="font-serif text-lg text-slate-500 dark:text-slate-400 font-light mt-3 max-w-lg mx-auto italic">
            A journey of engineering clean, modular frontends and immersive client-driven interfaces.
          </p>
        </div>

        {/* Simplified Centered Timeline Layout */}
        <div className="timeline-container w-full max-w-3xl mx-auto">
          <div className="relative border-l border-black/10 dark:border-white/10 pl-6 md:pl-8 ml-3 space-y-12">
            {EXPERIENCES.map((exp) => {
              return (
                <div
                  key={exp.id}
                  className="timeline-card relative group transition-all duration-300 p-6 sm:p-8 border border-black/5 dark:border-white/10 bg-white/70 dark:bg-[#111] hover:border-black/20 dark:hover:border-white/20 rounded-none shadow-[0_0_0_1px_rgba(0,213,190,0.08),0_0_18px_rgba(0,213,190,0.12)] hover:shadow-[0_0_0_1px_rgba(0,213,190,0.2),0_0_24px_rgba(0,213,190,0.18)]"
                  id={`experience-item-${exp.id}`}
                >
                  {/* Timeline Node marker */}
                  <span className="absolute -left-[31px] md:-left-[39px] top-8 sm:top-10 w-4 h-4 border bg-bg-light dark:bg-[#0a0a0a] border-black/20 dark:border-white/20 group-hover:border-slate-950 dark:group-hover:border-white group-hover:bg-slate-900 dark:group-hover:bg-white transition-all duration-500" />

                  {/* Timeline Header content only for minimal layout */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-serif text-xl sm:text-2xl italic text-slate-900 dark:text-white">
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span className="px-2 py-0.5 text-[8px] uppercase tracking-[0.15em] font-sans font-bold border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.15em] font-sans font-semibold text-slate-500 dark:text-slate-400 mt-1">
                        {exp.company} • {exp.location}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1.5 text-slate-400 dark:text-slate-500 text-[9px] uppercase tracking-[0.1em] font-sans self-start sm:self-center">
                      <Calendar size={11} />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Achievement bullets */}
                  <ul className="mt-5 space-y-2.5">
                    {exp.achievements.map((point, i) => (
                      <li
                        key={i}
                        className="font-serif text-sm sm:text-base font-light text-slate-600 dark:text-slate-300 leading-relaxed flex gap-3"
                      >
                        <span className="mt-2 w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-600 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skill tags */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {exp.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-1 text-[9px] uppercase tracking-[0.1em] font-sans font-semibold text-slate-500 dark:text-slate-400 border border-black/10 dark:border-white/10"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}