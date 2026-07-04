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
  metric?: {
    value: string;
    label: string;
  };
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Associate software developer',
    company: 'Kyndryl',
    period: '2023 - Present',
    location: 'Bangalore, India',
    skills: ['Svelte5', 'TypeScript', 'Lit JS'],
  },
  {
    id: 'exp-2',
    role: 'Associate Technical Engineer',
    company: 'Kyndryl',
    period: '2021 - 2023',
    location: 'Bangalore, India',
    skills: ['React', 'JavaScript', 'CSS Grid', 'REST APIs', 'Vite', 'Figma'],
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
                  className="timeline-card relative group transition-all duration-300 p-6 sm:p-8 border border-black/5 dark:border-white/10 bg-white/70 dark:bg-[#111] hover:border-black/20 dark:hover:border-white/20 rounded-none shadow-none"
                  id={`experience-item-${exp.id}`}
                >
                  {/* Timeline Node marker */}
                  <span className="absolute -left-[31px] md:-left-[39px] top-8 sm:top-10 w-4 h-4 border bg-bg-light dark:bg-[#0a0a0a] border-black/20 dark:border-white/20 group-hover:border-slate-950 dark:group-hover:border-white group-hover:bg-slate-900 dark:group-hover:bg-white transition-all duration-500" />

                  {/* Timeline Header content only for minimal layout */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl italic text-slate-900 dark:text-white">
                        {exp.role}
                      </h3>
                      <p className="text-[10px] uppercase tracking-[0.15em] font-sans font-semibold text-slate-500 dark:text-slate-400 mt-1">
                        {exp.company} • {exp.location}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1.5 text-slate-400 dark:text-slate-500 text-[9px] uppercase tracking-[0.1em] font-sans self-start sm:self-center">
                      <Calendar size={11} />
                      <span>{exp.period}</span>
                    </div>
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
