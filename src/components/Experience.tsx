import { useEffect, useRef } from 'react';
import { Calendar } from 'lucide-react';
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
    role: 'Software Developer (Frontend)',
    company: 'Kyndryl',
    period: '2023 - Present',
    location: 'Bangalore, India',
    current: true,
    skills: ['Svelte5', 'TypeScript', 'Lit JS'],
    achievements: [
      'Building and maintaining component-driven UIs in Svelte5 and Lit JS for internal enterprise tooling.',
      'Migrated legacy view logic to TypeScript, reducing runtime type errors across shared modules.',
      'Collaborated cross-functionally with backend and design teams to ship features on sprint cadence.',
    ],
  },
  {
    id: 'exp-2',
    role: 'React Developer',
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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
      className="py-20 md:py-28 bg-bg-light dark:bg-[#10110f] border-b border-black/5 dark:border-white/10 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="experience-reveal-title max-w-3xl mb-12 md:mb-16">
          <p className="text-sm text-teal-700 dark:text-teal-300 mb-4">Experience</p>
          <h2 className="font-serif font-medium text-4xl sm:text-6xl text-slate-950 dark:text-white leading-tight">
            Work Experience
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-4 max-w-xl leading-relaxed">
            Frontend roles building and maintaining interfaces for real product teams.
          </p>
        </div>

        {/* Simplified Centered Timeline Layout */}
        <div className="timeline-container w-full max-w-3xl mx-auto">
          <div className="relative border-l border-black/10 dark:border-white/15 pl-6 md:pl-8 ml-3 space-y-8">
            {EXPERIENCES.map((exp) => {
              return (
                <div
                  key={exp.id}
                  className="timeline-card relative border-b border-black/10 dark:border-white/10 pb-8 last:border-b-0"
                  id={`experience-item-${exp.id}`}
                >
                  {/* Timeline marker */}
                  <span className="absolute -left-[31px] md:-left-[39px] top-2 w-3 h-3 rounded-full bg-teal-600 dark:bg-teal-300" />

                  {/* Timeline Header content only for minimal layout */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-serif text-2xl sm:text-3xl text-slate-950 dark:text-white">
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span className="px-2 py-0.5 text-xs font-sans border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {exp.company} • {exp.location}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1.5 text-slate-500 dark:text-slate-400 text-sm font-sans self-start sm:self-center">
                      <Calendar size={14} />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Achievement bullets */}
                  <ul className="mt-5 space-y-2.5">
                    {exp.achievements.map((point, i) => (
                      <li
                        key={i}
                        className="text-base text-slate-600 dark:text-slate-300 leading-relaxed flex gap-3"
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
                        className="inline-flex items-center rounded-full border border-slate-300/70 dark:border-white/15 bg-white/70 dark:bg-white/[0.04] px-3 py-1.5 text-sm text-slate-700 dark:text-slate-200"
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