import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import projectsData from '../constant/projectsData';
import { getCarouselProjects } from '../constant/projectCollections';
import ProjectImage from './ProjectImage';

const CAROUSEL_PROJECTS = getCarouselProjects(projectsData);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const activeProject = CAROUSEL_PROJECTS[activeProjectIndex];
  const carouselSlideRef = useRef<HTMLDivElement>(null);

  const showProject = (index: number, direction: number) => {
    setSlideDirection(direction);
    setActiveProjectIndex((index + CAROUSEL_PROJECTS.length) % CAROUSEL_PROJECTS.length);
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-copy > *',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power2.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const nextProject =
      CAROUSEL_PROJECTS[(activeProjectIndex + 1) % CAROUSEL_PROJECTS.length];
    if (!nextProject) return;

    const image = new Image();
    image.src = nextProject.imageUrl;
  }, [activeProjectIndex]);

  useEffect(() => {
    if (!carouselSlideRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const tween = gsap.fromTo(
      carouselSlideRef.current,
      { autoAlpha: 0.75, x: slideDirection * 10 },
      { autoAlpha: 1, x: 0, duration: 0.48, ease: 'power3.out', overwrite: true }
    );

    return () => {
      tween.kill();
    };
  }, [activeProjectIndex, slideDirection]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[min(800px,100svh)] flex items-center bg-bg-light dark:bg-[#10110f] text-slate-900 dark:text-white"
    >
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-center">
          <div className="hero-copy max-w-xl">
            <p className="text-sm text-teal-700 dark:text-teal-300 mb-6">
              Frontend developer · Mumbai, India
            </p>
            <h1 className="font-serif font-medium text-6xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-slate-950 dark:text-white">
              Sukanya
              <br />
              Gurav
            </h1>
            <p className="mt-7 max-w-lg text-lg sm:text-xl leading-relaxed text-slate-600 dark:text-slate-300">
              I build thoughtful, responsive web experiences with React and Svelte.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-teal-300 px-5 py-3 text-sm font-medium text-slate-950 hover:bg-teal-200 transition-colors duration-200"
              >
                Explore my work
                <ArrowDownRight size={16} aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="text-sm text-slate-700 dark:text-slate-200 underline decoration-slate-400 underline-offset-4 hover:decoration-teal-300 transition-colors duration-200"
              >
                Get in touch
              </a>
            </div>
          </div>

          {activeProject && (
            <div
              className="min-w-0"
              role="region"
              aria-roledescription="carousel"
              aria-label="More projects"
              onKeyDown={(event) => {
                if (event.key === 'ArrowLeft') {
                  event.preventDefault();
                  showProject(activeProjectIndex - 1, -1);
                } else if (event.key === 'ArrowRight') {
                  event.preventDefault();
                  showProject(activeProjectIndex + 1, 1);
                }
              }}
            >
              <div ref={carouselSlideRef}>
                <a
                  href={activeProject.liveLink || activeProject.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${activeProject.name} live project`}
                  className="group relative block min-w-0"
                >
                  <ProjectImage
                    key={activeProject.id}
                    src={activeProject.imageUrl}
                    alt={`${activeProject.name} application preview`}
                    loading={activeProjectIndex === 0 ? 'eager' : 'lazy'}
                    fetchPriority={activeProjectIndex === 0 ? 'high' : 'auto'}
                    frameClassName="overflow-hidden bg-[#1a1b18] aspect-[16/10]"
                    imageClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="mt-4 flex items-start justify-between gap-6 border-b border-black/10 dark:border-white/15 pb-4">
                    <div aria-live="polite" aria-atomic="true">
                      <h2 className="mt-1 font-serif text-2xl text-slate-900 dark:text-white">
                        {activeProject.name}
                      </h2>
                    </div>
                    <ExternalLink
                      size={18}
                      className="mt-2 shrink-0 text-teal-700 dark:text-teal-300"
                      aria-hidden="true"
                    />
                  </div>
                </a>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2" aria-label="Choose a project">
                  {CAROUSEL_PROJECTS.map((project, index) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() =>
                        showProject(index, index >= activeProjectIndex ? 1 : -1)
                      }
                      aria-label={`Show project ${index + 1}: ${project.name}`}
                      aria-current={index === activeProjectIndex ? 'true' : undefined}
                      className={`h-2.5 rounded-full transition-[width,background-color] duration-500 ease-out ${
                        index === activeProjectIndex
                          ? 'w-7 bg-teal-500'
                          : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-teal-400'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="mr-2 text-sm tabular-nums text-slate-500 dark:text-slate-400" aria-live="polite">
                    {String(activeProjectIndex + 1).padStart(2, '0')} / {String(CAROUSEL_PROJECTS.length).padStart(2, '0')}
                  </span>
                  <button
                    type="button"
                    onClick={() => showProject(activeProjectIndex - 1, -1)}
                    aria-label="Previous project"
                    className="inline-flex h-10 w-10 items-center justify-center border border-black/10 text-slate-700 transition-colors duration-200 hover:border-teal-500 hover:text-teal-700 dark:border-white/15 dark:text-slate-200 dark:hover:text-teal-300"
                  >
                    <ChevronLeft size={18} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => showProject(activeProjectIndex + 1, 1)}
                    aria-label="Next project"
                    className="inline-flex h-10 w-10 items-center justify-center border border-black/10 text-slate-700 transition-colors duration-200 hover:border-teal-500 hover:text-teal-700 dark:border-white/15 dark:text-slate-200 dark:hover:text-teal-300"
                  >
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
