import { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Search, Code, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomProject } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  repos: CustomProject[];
}

export default function Projects({ repos }: ProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Entrance animations for Section header and search bar
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects-reveal-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.projects-reveal-header',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.search-filter-panel',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: '.search-filter-panel',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Filter projects based on query
  const filteredRepos = repos.filter((repo) => {
    const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);
  const indexOfLastRepo = currentPage * itemsPerPage;
  const indexOfFirstRepo = indexOfLastRepo - itemsPerPage;
  const currentRepos = filteredRepos.slice(indexOfFirstRepo, indexOfLastRepo);

  // Card stagger entrance triggers whenever repos or filters change
  useEffect(() => {
    if (filteredRepos.length === 0) return;

    const ctx = gsap.context(() => {
      const config: gsap.TweenVars = {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.06,
        duration: 0.5,
        ease: 'power2.out',
      };

      if (!searchQuery && currentPage === 1) {
        config.scrollTrigger = {
          trigger: '.projects-grid-container',
          start: 'top 85%',
        };
      }

      gsap.fromTo(
        '.project-card-item',
        { opacity: 0, y: 20, scale: 0.98 },
        config
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [searchQuery, filteredRepos.length, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll back to the projects section
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 md:py-36 bg-bg-light dark:bg-[#0a0a0a] border-b border-black/5 dark:border-white/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="projects-reveal-header text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 border border-black/10 dark:border-white/10 text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-[0.2em] font-sans bg-transparent mb-6">
            <Code size={11} className="text-slate-400 dark:text-slate-500" />
            <span>Portfolio Work</span>
          </div>
          <h2 className="font-serif font-light text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-wide leading-tight italic">
            Featured Projects
          </h2>
          <p className="font-serif text-lg text-slate-500 dark:text-slate-400 font-light mt-3 max-w-lg mx-auto italic">
            A curated set of portfolio projects drawn from local project data, showcasing live demos and source code links.
          </p>
        </div>

        {/* Search Bar */}
        <div className="search-filter-panel mb-16 flex flex-col gap-4 max-w-5xl mx-auto">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
              <Search size={15} />
            </span>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-black/10 dark:border-white/10 rounded-none text-xs uppercase tracking-[0.1em] placeholder-slate-400 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-all text-slate-800 dark:text-white"
              id="projects-search-input"
            />
          </div>
        </div>

        {/* Projects Cards Container */}
        <div className="projects-grid-container min-h-[400px]">
          {filteredRepos.length === 0 ? (
            /* Empty Filter / Search Result State */
             <div className="text-center py-16 bg-white/50 dark:bg-[#111] border border-dashed border-black/10 dark:border-white/10 max-w-lg mx-auto rounded-none">
              <div className="w-12 h-12 border border-black/10 dark:border-white/10 bg-transparent flex items-center justify-center text-slate-400 mx-auto mb-4 rounded-none">
                <Search size={16} />
              </div>
              <h3 className="font-serif italic text-lg text-slate-800 dark:text-white">No projects found</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 px-4 uppercase tracking-[0.1em] font-sans">
                No repositories matching "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                }}
                className="mt-6 px-5 py-2.5 border border-slate-900 dark:border-white bg-slate-900 text-white dark:bg-white dark:text-black hover:bg-transparent hover:text-slate-900 dark:hover:bg-transparent dark:hover:text-white font-sans uppercase tracking-[0.2em] text-[10px] transition-all cursor-pointer rounded-none"
                id="reset-filters-btn"
              >
                Clear Search
              </button>
            </div>
          ) : (
            /* Project Cards Render & Pagination */
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentRepos.map((repo) => (
                  <div
                    key={repo.id}
                    className="project-card-item group p-6 border border-black/5 dark:border-white/10 bg-white/70 dark:bg-[#111] hover:border-black/20 dark:hover:border-white/20 transition-all duration-500 flex flex-col justify-between rounded-none shadow-none"
                    id={`repo-card-${repo.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="space-y-5">
                      <div className="space-y-4">
                        <a
                          href={repo.liveLink || repo.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block hover:opacity-80 transition-opacity"
                        >
                          <h3 className="font-serif italic text-lg text-slate-900 dark:text-white tracking-wide group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors truncate">
                            {repo.name}
                          </h3>
                        </a>
                        <a
                          href={repo.liveLink || repo.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block overflow-hidden"
                        >
                          <div className="relative aspect-[16/10] w-full overflow-hidden border border-black/5 dark:border-white/5 bg-slate-100 dark:bg-neutral-900">
                            <img
                              src={repo.imageUrl}
                              alt={repo.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                            />
                          </div>
                        </a>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <a
                          href={repo.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-slate-900 dark:hover:border-white hover:text-slate-900 dark:hover:text-white transition-all text-xs uppercase tracking-[0.12em] font-semibold rounded-none"
                          title="View source code"
                        >
                          <Github size={12} />
                          Source
                        </a>
                        <a
                          href={repo.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-slate-900 dark:hover:border-white hover:text-slate-900 dark:hover:text-white transition-all text-xs uppercase tracking-[0.12em] font-semibold rounded-none"
                          title="Open live demo"
                        >
                          <span>Live Demo</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dynamic Editorial Pagination Bar */}
              {totalPages > 1 && (
                <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-black/5 dark:border-white/10">
                  <p className="font-serif italic text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
                    Showing <span className="font-mono text-[10px] not-italic font-semibold text-slate-900 dark:text-white">{indexOfFirstRepo + 1}</span> to{' '}
                    <span className="font-mono text-[10px] not-italic font-semibold text-slate-900 dark:text-white">
                      {Math.min(indexOfLastRepo, filteredRepos.length)}
                    </span>{' '}
                    of <span className="font-mono text-[10px] not-italic font-semibold text-slate-900 dark:text-white">{filteredRepos.length}</span> projects
                  </p>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 border border-black/10 dark:border-white/10 hover:border-slate-900 dark:hover:border-white text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-transparent disabled:opacity-30 disabled:hover:border-black/10 disabled:hover:text-slate-500 dark:disabled:hover:border-white/10 dark:disabled:hover:text-slate-500 transition-all duration-300 cursor-pointer rounded-none"
                      aria-label="Previous Page"
                      id="projects-prev-page"
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
                          id={`projects-page-btn-${pageNum}`}
                        >
                          {String(pageNum).padStart(2, '0')}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 border border-black/10 dark:border-white/10 hover:border-slate-900 dark:hover:border-white text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-transparent disabled:opacity-30 disabled:hover:border-black/10 disabled:hover:text-slate-500 dark:disabled:hover:border-white/10 dark:disabled:hover:text-slate-500 transition-all duration-300 cursor-pointer rounded-none"
                      aria-label="Next Page"
                      id="projects-next-page"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
