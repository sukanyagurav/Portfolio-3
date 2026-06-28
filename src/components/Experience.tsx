import { useEffect, useRef } from 'react';
import { Briefcase, Calendar, Trophy } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  skills: string[];
  metric?: {
    value: string;
    label: string;
  };
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Creative Frontend Engineer',
    company: 'Freelance & Creative Labs',
    period: '2024 - Present',
    location: 'Mumbai, India (Remote)',
    description: 'Developing high-performance, pixel-perfect web interfaces and bespoke interactive experiences for global clients using modern React, Tailwind CSS, and advanced motion libraries.',
    achievements: [
      'Engineered a flagship digital showcase with scroll-driven parallax grids and interactive D3 analytics, increasing visitor engagement by 40%.',
      'Developed modular weather forecasting widgets and agile task coordinators using strict custom React Hooks and client-side memory architectures.',
      'Refactored legacy design files into highly performant and accessible React components, lowering cumulative layout shifts (CLS) to near zero.'
    ],
    skills: ['React', 'TypeScript', 'GSAP', 'Tailwind CSS', 'D3.js', 'Redux'],
    metric: {
      value: '40%+',
      label: 'Engagement Boost'
    }
  },
  {
    id: 'exp-2',
    role: 'React UI Specialist',
    company: 'Tech Solutions Hub',
    period: '2023 - 2024',
    location: 'Remote',
    description: 'Led the UI/UX frontend overhaul for high-fidelity interactive platforms, focusing on component-driven system architectures and modular typography standardization.',
    achievements: [
      'Architected a custom state-driven project board utilizing deep localStorage synchronization and virtualized grid panels for immediate performance.',
      'Designed and coded modern layout layers using pure CSS Grid, Flexbox, and Tailwind, securing perfect responsiveness across mobile, tablet, and wide displays.',
      'Implemented fluid micro-animations and custom theme pipelines, boosting user-satisfaction ratings on internal panels by 25%.'
    ],
    skills: ['React', 'JavaScript', 'CSS Grid', 'REST APIs', 'Vite', 'Figma'],
    metric: {
      value: '25%+',
      label: 'UX Score Increase'
    }
  },
  {
    id: 'exp-3',
    role: 'Frontend UI Developer Intern',
    company: 'Innovate Tech Labs',
    period: '2022 - 2023',
    location: 'Hybrid',
    description: 'Coordinated with creative directors and engineering teams to translate layout mocks into clean, semantic, and modular frontend code bases.',
    achievements: [
      'Developed static landing pages and animated interactive campaigns utilizing lightweight CSS transitions and optimized multimedia assets.',
      'Wrote comprehensive unit and regression tests, eliminating critical frontend rendering bugs prior to production releases.',
      'Assisted in building custom SVG visualizations and responsive tables using standard DOM manipulation and utility wrappers.'
    ],
    skills: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Git', 'Responsive Design'],
    metric: {
      value: '99%',
      label: 'Code Quality Score'
    }
  }
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
