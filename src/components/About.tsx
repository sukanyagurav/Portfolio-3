import { useEffect, useRef } from 'react';
import { User, Code, Heart, Award, Users, BookOpen, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GitHubProfile } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  profile: GitHubProfile | null;
}

export default function About({ profile }: AboutProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // GSAP Reveal Animations on Scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      // General section title fade-in
      gsap.fromTo(
        '.about-reveal-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.about-reveal-title',
            start: 'top 85%',
          },
        }
      );

      // Stagger stats cards
      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-container',
            start: 'top 85%',
          },
        }
      );

      // Left column text slide-in
      gsap.fromTo(
        '.about-text-left',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.about-text-left',
            start: 'top 80%',
          },
        }
      );

      // Right column bento grid reveal
      gsap.fromTo(
        '.about-card-right',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.about-card-right',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      label: 'Public Repos',
      value: profile?.public_repos ?? '12+',
      icon: <Code className="text-slate-400 dark:text-slate-500" size={20} />,
      desc: 'Created repositories',
    },
    {
      label: 'Followers',
      value: profile?.followers ?? '15+',
      icon: <Users className="text-slate-400 dark:text-slate-500" size={20} />,
      desc: 'Global connections',
    },
    {
      label: 'Following',
      value: profile?.following ?? '20+',
      icon: <Heart className="text-slate-400 dark:text-slate-500" size={20} />,
      desc: 'Industry tracking',
    },
  ];

  const coreValues = [
    {
      title: 'Performance First',
      description: 'Writing semantic, clean code, compressed assets, and leveraging virtualization for rapid load speeds and smooth scrolling.',
      icon: <Award className="text-slate-400 dark:text-slate-500" size={16} />,
    },
    {
      title: 'Flawless Adaptability',
      description: 'Strict testing for comprehensive responsive grid layouts that adapt beautifully across massive screens and compact phone viewports.',
      icon: <Layers className="text-slate-400 dark:text-slate-500" size={16} />,
    },
    {
      title: 'Interactive Design',
      description: 'Crafting detailed interaction pathways, dynamic hover cues, and physics-inspired GSAP micro-interactions.',
      icon: <BookOpen className="text-slate-400 dark:text-slate-500" size={16} />,
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-36 bg-bg-light dark:bg-[#0a0a0a] border-b border-black/5 dark:border-white/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="about-reveal-title text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 border border-black/10 dark:border-white/10 text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-[0.2em] font-sans bg-transparent mb-6">
            <User size={11} className="text-slate-400 dark:text-slate-500" />
            <span>Biography & Metrics</span>
          </div>
          <h2 className="font-serif font-light text-3xl sm:text-5xl md:text-6xl text-slate-900 dark:text-white tracking-wide leading-tight italic">
            Designing Interfaces, <br className="hidden sm:inline" />
            Coding Experiences
          </h2>
        </div>

        {/* Live GitHub Stats Cards Grid */}
        <div className="stats-container grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 md:mb-28">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="stat-card p-6 border border-black/5 dark:border-white/10 bg-white/70 dark:bg-[#111] hover:border-black/20 dark:hover:border-white/20 transition-all duration-500 flex items-center space-x-5 group"
              id={`stat-card-${idx}`}
            >
              <div className="p-3.5 rounded-none bg-white/40 dark:bg-[#0a0a0a] border border-black/5 dark:border-white/5 transition-colors">
                {stat.icon}
              </div>
              <div>
                <p className="font-serif font-light text-3xl text-slate-900 dark:text-white">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] font-sans font-medium text-slate-500 dark:text-slate-400 mt-1">{stat.label}</p>
                <p className="text-[9px] uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500 font-sans mt-0.5">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Narrative columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left bio narrative */}
          <div className="about-text-left lg:col-span-6 space-y-8">
            <h3 className="font-serif font-light text-2xl md:text-3xl italic text-slate-900 dark:text-white">
              My Professional Mission
            </h3>
            <p className="font-serif text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed">
              I am a driven software creator who sits at the intersection of creative front-end design and solid engineering paradigms. I craft dynamic web experiences that emphasize structural precision, accessibility standards, and absolute client delight.
            </p>
            <p className="font-serif text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed">
              With a primary tech stack centering React, Tailwind CSS, TypeScript, and interactive tools like GSAP, I turn complex interfaces into smooth, natural digital touchpoints. I focus on writing maintainable, component-driven modular architectures that look fantastic and perform cleanly.
            </p>
            
            {/* Direct Bio Bullet points */}
            <div className="space-y-4 pt-4 text-[10px] uppercase tracking-[0.2em] font-sans text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-3">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span>Expertise in React Hooks, Router, & Context</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span>Modern Layout Design via Grid & Flexbox</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span>Interactive Timelines powered by GSAP & Motion</span>
              </div>
            </div>
          </div>

          {/* Right values grid list */}
          <div className="about-card-right lg:col-span-6 space-y-6">
            <h3 className="font-serif font-light text-2xl md:text-3xl italic text-slate-900 dark:text-white mb-8 lg:mt-0">
              Core Engineering Values
            </h3>
            
            <div className="space-y-4">
              {coreValues.map((value, idx) => (
                <div
                  key={idx}
                  className="p-6 border border-black/5 dark:border-white/10 bg-white/70 dark:bg-[#111] flex space-x-5 hover:border-black/20 dark:hover:border-white/20 transition-all duration-500"
                  id={`value-card-${idx}`}
                >
                  <div className="p-3 h-fit bg-white/40 dark:bg-[#0a0a0a] border border-black/5 dark:border-white/5 shadow-sm">
                    {value.icon}
                  </div>
                  <div>
                    <h4 className="text-[11px] uppercase tracking-[0.2em] font-sans font-semibold text-slate-800 dark:text-white">
                      {value.title}
                    </h4>
                    <p className="font-serif text-base font-light text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
