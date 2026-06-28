import { useState, useEffect, useRef } from 'react';
import { Layers, Terminal, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'styling' | 'backend' | 'tools';
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'styling' | 'backend' | 'tools'>('all');

  const skillsList: Skill[] = [
    // Frontend
    { name: 'React.js', level: 90, category: 'frontend' },
    { name: 'JavaScript (ES6+)', level: 88, category: 'frontend' },
    { name: 'TypeScript', level: 82, category: 'frontend' },
    { name: 'HTML5 & CSS3', level: 95, category: 'frontend' },
    
    // Styling & Animations
    { name: 'Tailwind CSS', level: 92, category: 'styling' },
    { name: 'GSAP (GreenSock)', level: 85, category: 'styling' },
    { name: 'Framer Motion', level: 80, category: 'styling' },
    { name: 'Responsive Layouts', level: 94, category: 'styling' },

    // Backend
    { name: 'Node.js', level: 75, category: 'backend' },
    { name: 'Express.js', level: 78, category: 'backend' },
    { name: 'Firebase', level: 72, category: 'backend' },
    { name: 'RESTful APIs', level: 85, category: 'backend' },

    // Tools
    { name: 'Git & GitHub', level: 90, category: 'tools' },
    { name: 'Vite & Webpack', level: 84, category: 'tools' },
    { name: 'npm & Yarn', level: 88, category: 'tools' },
    { name: 'Chrome DevTools', level: 92, category: 'tools' },
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
  }, [activeCategory]); // Re-run triggers on category change to ensure correct animations apply

  const categories = [
    { id: 'all', label: 'All Skills', icon: <Filter size={11} /> },
    { id: 'frontend', label: 'Frontend Core', icon: <Layers size={11} /> },
    { id: 'styling', label: 'Styling & Motion', icon: <Sparkles size={11} /> },
    { id: 'backend', label: 'Backend & APIs', icon: <Terminal size={11} /> },
    { id: 'tools', label: 'Tools & Workflow', icon: <CheckCircle2 size={11} /> },
  ];

  const filteredSkills = skillsList.filter(
    (skill) => activeCategory === 'all' || skill.category === activeCategory
  );

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
            A curated list of core languages, frame layers, animations, and tools that I specialize in.
          </p>
        </div>

        {/* Filter Navigation buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-16 max-w-4xl mx-auto" id="skills-filter-container">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex items-center gap-2 px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-sans transition-all duration-300 cursor-pointer border ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-[#faf9f6] dark:bg-white dark:text-slate-950 border-slate-900 dark:border-white font-medium shadow-sm'
                  : 'bg-transparent text-slate-500 dark:text-[#888] border-black/10 dark:border-white/10 hover:border-slate-900 dark:hover:border-white'
              }`}
              id={`skill-filter-${cat.id}`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
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
