import { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Search, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomProject } from '../types';
import { getFeaturedProjects, getPracticeProjects } from '../constant/projectCollections';
import ProjectImage from './ProjectImage';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  repos: CustomProject[];
}

export default function Projects({ repos }: ProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const itemsPerPage = 6;

  const featuredRepos = getFeaturedProjects(repos);
  const practiceRepos = getPracticeProjects(repos);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects-reveal-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: '.projects-reveal-header', start: 'top 85%' },
        }
      );
      gsap.fromTo(
        '.featured-project-card',
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.featured-projects-grid', start: 'top 85%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Filter practice archive based on query
  const filteredPractice = practiceRepos.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPractice.length / itemsPerPage);
  const indexOfLastRepo = currentPage * itemsPerPage;
  const indexOfFirstRepo = indexOfLastRepo - itemsPerPage;
  const currentPracticeRepos = filteredPractice.slice(indexOfFirstRepo, indexOfLastRepo);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById('projects-archive');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 md:py-28 bg-bg-light dark:bg-[#10110f] border-b border-black/5 dark:border-white/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Section Header */}
        <div className="projects-reveal-header max-w-3xl mb-12 md:mb-16">
          <p className="text-sm text-teal-700 dark:text-teal-300 mb-4">Selected work</p>
          <h2 className="font-serif font-medium text-4xl sm:text-6xl text-slate-950 dark:text-white leading-tight">
            Projects
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-4 max-w-xl leading-relaxed">
            A selection of interfaces and applications I’ve built, with the live work and source
            available to explore.
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="featured-projects-grid grid grid-cols-1 md:grid-cols-[repeat(2,minmax(0,1fr))] gap-x-8 gap-y-14 mb-8">
          {featuredRepos.map((repo) => (
            <div
              key={repo.id}
              className="featured-project-card group flex min-w-0 flex-col"
              id={`repo-card-${repo.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="space-y-5">
                <a
                  href={repo.liveLink || repo.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden"
                  aria-label={`Open ${repo.name} project`}
                >
                  <ProjectImage
                    src={repo.imageUrl}
                    alt={`${repo.name} project preview`}
                    frameClassName="aspect-[16/10] w-full overflow-hidden bg-slate-200 dark:bg-[#20211e]"
                    imageClassName="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                  />
                </a>

                <a
                  href={repo.liveLink || repo.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <h3 className="font-serif text-2xl text-slate-950 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors duration-200">
                    {repo.name}
                  </h3>
                </a>

                {repo.description && (
                  <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {repo.description}
                  </p>
                )}

                {repo.tech && repo.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {repo.tech.map((t) => (
                      <span
                        key={t}
                        className="text-sm text-slate-500 dark:text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                <a
                  href={repo.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200 underline decoration-slate-400 underline-offset-4 hover:decoration-teal-300 transition-colors duration-200"
                  title="View source code"
                >
                  <Github size={12} />
                  Source
                </a>
                <a
                  href={repo.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200 underline decoration-slate-400 underline-offset-4 hover:decoration-teal-300 transition-colors duration-200"
                  title="Open live demo"
                >
                  <span>Live Demo</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Practice Archive Toggle */}
        <div id="projects-archive" className="pt-12 border-t border-black/10 dark:border-white/15">
          <button
            onClick={() => setArchiveOpen((v) => !v)}
            aria-expanded={archiveOpen}
            aria-controls="practice-projects-content"
            className="w-full max-w-5xl flex items-center justify-between py-4 text-left text-lg text-slate-800 dark:text-slate-100 hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-200 cursor-pointer"
            id="toggle-practice-archive"
          >
            <span className="font-serif text-2xl">More projects</span>
            <ChevronDown
              size={16}
              className={`text-slate-400 transition-transform duration-300 ${archiveOpen ? 'rotate-180' : ''}`}
            />
          </button>

          <div
            id="practice-projects-content"
            hidden={!archiveOpen}
            className="mt-8 space-y-8"
          >
              {/* Search Bar */}
              <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Search size={15} />
                </span>
                <input
                  type="text"
                  aria-label="Search practice projects"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-black/10 dark:border-white/10 rounded-none text-xs uppercase tracking-[0.1em] placeholder-slate-400 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-all text-slate-800 dark:text-white"
                  id="projects-search-input"
                />
              </div>

              {filteredPractice.length === 0 ? (
                <div className="text-center py-16 bg-white/50 dark:bg-[#111] border border-dashed border-black/10 dark:border-white/10 rounded-none">
                  <h3 className="font-serif italic text-lg text-slate-800 dark:text-white">No projects found</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-[0.1em] font-sans">
                    No matches for "{searchQuery}".
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentPracticeRepos.map((repo) => (
                      <div
                        key={repo.id}
                        className="p-4 border border-black/5 dark:border-white/10 bg-white/50 dark:bg-[#0d0d0d] hover:border-black/20 dark:hover:border-white/20 transition-all flex items-center justify-between gap-3"
                        id={`repo-card-${repo.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <span className="font-serif text-sm text-slate-700 dark:text-slate-300 truncate">{repo.name}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={repo.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                            aria-label={`View ${repo.name} source code`}
                          >
                            <Github size={13} />
                          </a>
                          <a
                            href={repo.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                            aria-label={`Open ${repo.name} live demo`}
                          >
                            <ExternalLink size={13} />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6">
                      <p className="font-serif italic text-xs text-slate-500 dark:text-slate-400">
                        Showing {indexOfFirstRepo + 1}–{Math.min(indexOfLastRepo, filteredPractice.length)} of {filteredPractice.length}
                      </p>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="p-2 border border-black/10 dark:border-white/10 hover:border-slate-900 dark:hover:border-white text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-transparent disabled:opacity-30 transition-all duration-300 cursor-pointer rounded-none"
                          aria-label="Previous Page"
                        >
                          <ChevronLeft size={14} />
                        </button>
                        {Array.from({ length: totalPages }).map((_, idx) => {
                          const pageNum = idx + 1;
                          const isCurrent = pageNum === currentPage;
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`w-8 h-8 font-mono text-[9px] font-bold border transition-all duration-300 cursor-pointer rounded-none ${
                                isCurrent
                                  ? 'bg-slate-900 border-slate-900 text-[#faf9f6] dark:bg-white dark:border-white dark:text-slate-950'
                                  : 'border-black/10 dark:border-white/10 hover:border-slate-900 dark:hover:border-white text-slate-500 hover:text-slate-900 dark:hover:text-white'
                              }`}
                            >
                              {String(pageNum).padStart(2, '0')}
                            </button>
                          );
                        })}
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="p-2 border border-black/10 dark:border-white/10 hover:border-slate-900 dark:hover:border-white text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-transparent disabled:opacity-30 transition-all duration-300 cursor-pointer rounded-none"
                          aria-label="Next Page"
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
        </div>

      </div>
    </section>
  );
}
