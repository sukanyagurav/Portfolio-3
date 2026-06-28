import { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Star, GitFork, Search, Sparkles, Filter, Code, RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GitHubRepo } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  repos: GitHubRepo[];
  loading: boolean;
  onRefresh: () => void;
}

export default function Projects({ repos, loading, onRefresh }: ProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const langContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset to first page when search query or language filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedLanguage]);

  // Support dragging and wheel-based horizontal scrolling for languages container
  useEffect(() => {
    const el = langContainerRef.current;
    if (!el) return;

    let isDown = false;
    let startX: number;
    let startY: number;
    let scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      isDraggingRef.current = false;
      startX = e.pageX - el.offsetLeft;
      startY = e.pageY - el.offsetTop;
      scrollLeft = el.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
    };

    const handleMouseUp = () => {
      isDown = false;
      // Delay resetting isDraggingRef so that the click handler knows it was a drag
      setTimeout(() => {
        isDraggingRef.current = false;
      }, 50);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      
      const x = e.pageX - el.offsetLeft;
      const y = e.pageY - el.offsetTop;
      const walkX = x - startX;
      const walkY = y - startY;

      // If the cursor moved significantly, treat it as a drag
      if (Math.abs(walkX) > 5 || Math.abs(walkY) > 5) {
        isDraggingRef.current = true;
      }

      if (isDraggingRef.current) {
        e.preventDefault();
        el.scrollLeft = scrollLeft - walkX * 1.5;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseup', handleMouseUp);
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseup', handleMouseUp);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('wheel', handleWheel);
    };
  }, []);

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

  // Card stagger entrance triggers whenever repos load or filters change
  useEffect(() => {
    if (loading || filteredRepos.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card-item',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-grid-container',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, searchQuery, selectedLanguage, repos, currentPage]);

  // Extract unique languages from repositories to build filter tabs dynamically
  const languages = ['all', ...Array.from(new Set(repos.map(repo => repo.language).filter(Boolean) as string[]))];

  // Language color map replicating GitHub's scheme
  const getLanguageColor = (lang: string | null): string => {
    if (!lang) return '#94a3b8';
    const colors: { [key: string]: string } = {
      javascript: '#f1e05a',
      typescript: '#3178c6',
      html: '#e34c26',
      css: '#563d7c',
      java: '#b07219',
      python: '#3572a5',
      vue: '#41b883',
      c: '#555555',
      'c++': '#f34b7d',
    };
    return colors[lang.toLowerCase()] || '#14b8a6';
  };

  // Filter repositories based on query and language
  const filteredRepos = repos.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLang = selectedLanguage === 'all' || repo.language === selectedLanguage;
    return matchesSearch && matchesLang;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);
  const indexOfLastRepo = currentPage * itemsPerPage;
  const indexOfFirstRepo = indexOfLastRepo - itemsPerPage;
  const currentRepos = filteredRepos.slice(indexOfFirstRepo, indexOfLastRepo);

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
            Featured GitHub Repositories
          </h2>
          <p className="font-serif text-lg text-slate-500 dark:text-slate-400 font-light mt-3 max-w-lg mx-auto italic">
            These projects are dynamically pulled from my GitHub profile live, representing my latest developments, frameworks, and tools.
          </p>
        </div>

        {/* Search, Filter, and Action Bar */}
        <div className="search-filter-panel mb-16 flex flex-col gap-4 max-w-5xl mx-auto">
          
          {/* Row 1: Search & Refresh Button side-by-side */}
          <div className="flex items-center gap-2 w-full">
            {/* Search Box */}
            <div className="relative flex-1">
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

            {/* Live Synchronizer Button besides search */}
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-3 border border-black/10 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-slate-900 dark:hover:border-white hover:text-slate-900 dark:hover:text-white bg-transparent transition-all duration-300 cursor-pointer flex items-center justify-center rounded-none shrink-0"
              title="Sync GitHub Live Data"
              aria-label="Refresh GitHub Data"
              id="projects-refresh-btn"
            >
              <RotateCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>

          {/* Row 2: Language Selection Buttons below search */}
          <div
            ref={langContainerRef}
            className="flex flex-nowrap overflow-x-auto w-full gap-1 p-1 border border-black/10 dark:border-white/10 rounded-none bg-transparent scroll-smooth no-scrollbar cursor-grab active:cursor-grabbing select-none"
          >
            {languages.slice(0, 5).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  if (isDraggingRef.current) return;
                  setSelectedLanguage(lang);
                }}
                className={`px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] font-sans font-medium transition-all duration-200 cursor-pointer rounded-none shrink-0 whitespace-nowrap ${
                  selectedLanguage === lang
                    ? 'bg-slate-900 text-[#faf9f6] dark:bg-white dark:text-slate-950 shadow-none'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
                id={`lang-filter-${lang.toLowerCase()}`}
              >
                {lang === 'all' ? 'All' : lang}
              </button>
            ))}
          </div>

        </div>

        {/* Projects Cards Container */}
        <div className="projects-grid-container min-h-[400px]">
          {loading ? (
            /* Card Loading Skeletons */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="p-6 rounded-none bg-slate-100 dark:bg-neutral-900/50 border border-black/5 dark:border-white/5 space-y-4 animate-pulse"
                >
                  <div className="flex justify-between items-start">
                    <div className="h-6 w-32 bg-slate-200 dark:bg-neutral-800 rounded-none" />
                    <div className="h-8 w-8 bg-slate-200 dark:bg-neutral-800 rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-slate-200 dark:bg-neutral-800 rounded-none" />
                    <div className="h-4 w-5/6 bg-slate-200 dark:bg-neutral-800 rounded-none" />
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-neutral-800/80">
                    <div className="h-4 w-16 bg-slate-200 dark:bg-neutral-800 rounded-none" />
                    <div className="h-4 w-12 bg-slate-200 dark:bg-neutral-800 rounded-none" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredRepos.length === 0 ? (
            /* Empty Filter / Search Result State */
             <div className="text-center py-16 bg-white/50 dark:bg-[#111] border border-dashed border-black/10 dark:border-white/10 max-w-lg mx-auto rounded-none">
              <div className="w-12 h-12 border border-black/10 dark:border-white/10 bg-transparent flex items-center justify-center text-slate-400 mx-auto mb-4 rounded-none">
                <Search size={16} />
              </div>
              <h3 className="font-serif italic text-lg text-slate-800 dark:text-white">No projects found</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 px-4 uppercase tracking-[0.1em] font-sans">
                No repositories matching "{searchQuery}" under "{selectedLanguage}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLanguage('all');
                }}
                className="mt-6 px-5 py-2.5 border border-slate-900 dark:border-white bg-slate-900 text-white dark:bg-white dark:text-black hover:bg-transparent hover:text-slate-900 dark:hover:bg-transparent dark:hover:text-white font-sans uppercase tracking-[0.2em] text-[10px] transition-all cursor-pointer rounded-none"
                id="reset-filters-btn"
              >
                Clear Filters
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
                      {/* Repository Name & Image Preview */}
                      <div className="space-y-4">
                        <a
                          href={repo.homepage || repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block hover:opacity-80 transition-opacity"
                        >
                          <h3 className="font-serif italic text-lg text-slate-900 dark:text-white tracking-wide group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors truncate">
                            {repo.name}
                          </h3>
                        </a>
                        <a
                          href={repo.homepage || repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block overflow-hidden"
                        >
                          <div className="relative aspect-[16/10] w-full overflow-hidden border border-black/5 dark:border-white/5 bg-slate-100 dark:bg-neutral-900">
                            <img
                              src={`https://picsum.photos/seed/${encodeURIComponent(repo.name)}/600/375`}
                              alt={repo.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                            />
                          </div>
                        </a>
                      </div>

                      {/* Tags of topics */}
                      {repo.topics && repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {repo.topics.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 border border-black/5 dark:border-white/5 text-slate-400 dark:text-slate-500 font-sans text-[9px] uppercase tracking-[0.1em]"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Repository Stats (Stars, Forks, Main Language) */}
                    <div className="flex items-center justify-between pt-4 mt-6 border-t border-black/5 dark:border-white/5 text-slate-400 text-[10px] uppercase tracking-[0.15em] font-sans">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-1.5 h-1.5 inline-block"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        />
                        <span className="text-slate-500 dark:text-slate-400 font-medium capitalize">
                          {repo.language || 'Documentation'}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-0.5 hover:text-slate-900 dark:hover:text-white transition-colors" title="GitHub Stars">
                          <Star size={11} />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-0.5 hover:text-slate-900 dark:hover:text-white transition-colors" title="GitHub Forks">
                          <GitFork size={11} />
                          {repo.forks_count}
                        </span>
                        <span className="text-slate-300 dark:text-neutral-800">|</span>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-slate-900 dark:hover:text-white transition-colors p-0.5"
                          title="View Source on GitHub"
                          id={`repo-src-link-${repo.id}`}
                        >
                          <Github size={12} />
                        </a>
                        {repo.homepage && (
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-2 py-0.5 border border-black/10 dark:border-white/10 hover:border-slate-950 dark:hover:border-white text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-all font-sans text-[9px] uppercase tracking-wider font-semibold bg-white/40 dark:bg-black/20"
                            title="Launch Live Demo"
                            id={`repo-live-link-${repo.id}`}
                          >
                            <span>Live URL</span>
                            <ExternalLink size={10} />
                          </a>
                        )}
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
