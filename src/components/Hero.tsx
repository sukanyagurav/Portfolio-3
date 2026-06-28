import { useEffect, useRef } from 'react';
import { ArrowDownRight, Github, Mail, Sparkles, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { GitHubProfile } from '../types';

interface HeroProps {
  profile: GitHubProfile | null;
  loading: boolean;
}

export default function Hero({ profile, loading }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background gradient animation
      gsap.to('.hero-bg-blob-1', {
        x: '30%',
        y: '-10%',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.hero-bg-blob-2', {
        x: '-20%',
        y: '20%',
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Typographic reveal timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.hero-pre',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.3 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.6 },
          '-=0.4'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const displayName = profile?.name || 'Sukanya Gurav';
  const displayBio = profile?.bio || 'A passionate Frontend Developer specializing in creating interactive, pixel-perfect, and highly responsive user experiences.';
  const displayLocation = profile?.location || 'India';

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-bg-light dark:bg-[#0a0a0a] transition-colors duration-300"
    >
      {/* Background Animated Gradient Blobs - Muted for sophisticated feeling */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 rounded-full bg-slate-200/40 dark:bg-zinc-800/20 blur-3xl hero-bg-blob-1 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 rounded-full bg-zinc-200/40 dark:bg-neutral-900/10 blur-3xl hero-bg-blob-2 pointer-events-none" />

      {/* Grid Overlay for subtle editorial structure */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20 relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          
          {/* Typographic Content Center Column */}
          <div className="space-y-8 w-full flex flex-col items-center">
            
            {/* Minimalist Editorial Tag */}
            <div
              id="hero-available-tag"
              className="hero-pre inline-flex items-center space-x-2 px-4 py-1.5 border border-black/10 dark:border-white/10 text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-[0.2em] font-sans bg-transparent"
            >
              <Sparkles size={11} className="animate-pulse text-slate-400 dark:text-slate-500" />
              <span>Available for Freelance & Projects</span>
            </div>

            {/* Main Greeting and Name */}
            <div className="space-y-3">
              <span className="font-serif font-light text-slate-400 dark:text-slate-500 italic block text-xl md:text-2xl">
                Creative developer & portfolio
              </span>
              <h1
                ref={titleRef}
                className="font-serif font-light text-5xl sm:text-6xl md:text-8xl leading-none text-slate-900 dark:text-white tracking-wide"
              >
                {displayName}
              </h1>
            </div>

            {/* Dynamic Animated Subtitle Roles */}
            <div
              ref={subtitleRef}
              className="text-[11px] font-sans uppercase tracking-[0.25em] text-slate-500 dark:text-[#888] flex flex-wrap items-center justify-center gap-3"
            >
              <span>Creative Frontend Engineer</span>
              <span className="text-slate-300 dark:text-slate-800">•</span>
              <span>UI/UX Specialist</span>
              <span className="text-slate-300 dark:text-slate-800">•</span>
              <span>React Architect</span>
            </div>

            {/* Bio / Description */}
            <p
              ref={descRef}
              className="max-w-2xl mx-auto font-serif text-lg sm:text-xl md:text-2xl font-light italic text-slate-700 dark:text-slate-300 leading-relaxed"
            >
              "{displayBio}"
            </p>

            {/* Meta Information (Location, GitHub Bio, etc.) */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] text-slate-400 dark:text-slate-500 font-sans tracking-[0.15em] uppercase">
              <span className="flex items-center gap-2">
                <MapPin size={12} className="text-slate-400 dark:text-slate-500" />
                {displayLocation}
              </span>
              {profile && (
                <span className="flex items-center gap-2 border-l border-slate-200 dark:border-white/10 pl-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600" />
                  {profile.public_repos} public repositories
                </span>
              )}
            </div>

            {/* Action CTAs */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto"
            >
              <button
                onClick={() => handleScrollTo('#projects')}
                className="w-full sm:w-auto px-8 py-3.5 border border-slate-900 dark:border-white bg-slate-900 text-[#faf9f6] dark:bg-white dark:text-slate-950 hover:bg-transparent hover:text-slate-900 dark:hover:bg-transparent dark:hover:text-white font-sans uppercase tracking-[0.25em] text-[10px] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                id="hero-cta-projects"
              >
                Explore Projects
                <ArrowDownRight size={14} className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />
              </button>

              <button
                onClick={() => handleScrollTo('#contact')}
                className="w-full sm:w-auto px-8 py-3.5 border border-slate-300 dark:border-white/25 bg-transparent text-slate-800 dark:text-white hover:border-slate-900 dark:hover:border-white font-sans uppercase tracking-[0.25em] text-[10px] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                id="hero-cta-contact"
              >
                <Mail size={14} />
                Get in Touch
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
