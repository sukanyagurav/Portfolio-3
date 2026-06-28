import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { GitHubProfile, GitHubRepo } from './types';

// Fallback high-fidelity profile data in case API fails/rate limits
const FALLBACK_PROFILE: GitHubProfile = {
  login: 'sukanyagurav',
  id: 82828282,
  avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
  name: 'Sukanya Gurav',
  company: null,
  blog: null,
  location: 'Mumbai, India',
  email: 'sukanyagurav6@gmail.com',
  bio: 'A passionate Frontend Developer specializing in building interactive, pixel-perfect, and highly responsive user interfaces with modern React and Tailwind CSS.',
  twitter_username: null,
  public_repos: 12,
  public_gists: 0,
  followers: 18,
  following: 22,
  created_at: '2022-04-12',
};

// Fallback high-fidelity repositories in case API fails/rate limits
const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 101,
    name: 'Portflio',
    full_name: 'sukanyagurav/Portflio',
    html_url: 'https://github.com/sukanyagurav/Portflio',
    description: 'My flagship developer portfolio built on HTML5, CSS3, JavaScript and GSAP. Contains detailed project descriptions, core competencies, and animated scrolls.',
    fork: false,
    created_at: '2025-01-10',
    updated_at: '2026-06-25',
    pushed_at: '2026-06-25',
    homepage: 'https://sukanyagurav.github.io/Portflio/',
    size: 2048,
    stargazers_count: 8,
    watchers_count: 8,
    language: 'JavaScript',
    forks_count: 2,
    open_issues_count: 0,
    topics: ['portfolio', 'javascript', 'gsap-animations', 'css3-transitions', 'responsive-design'],
  },
  {
    id: 102,
    name: 'Interactive-Task-Planner',
    full_name: 'sukanyagurav/Interactive-Task-Planner',
    html_url: 'https://github.com/sukanyagurav/Interactive-Task-Planner',
    description: 'A modern agile task coordination whiteboard. Supports real-time subtask creations, dynamic categorization labels, filtering, and deep client persistence.',
    fork: false,
    created_at: '2025-05-15',
    updated_at: '2026-05-20',
    pushed_at: '2026-05-20',
    homepage: null,
    size: 3072,
    stargazers_count: 5,
    watchers_count: 5,
    language: 'React',
    forks_count: 1,
    open_issues_count: 0,
    topics: ['react', 'tailwindcss', 'localstorage-persistence', 'task-management', 'ui-ux'],
  },
  {
    id: 103,
    name: 'Responsive-Weather-Widget',
    full_name: 'sukanyagurav/Responsive-Weather-Widget',
    html_url: 'https://github.com/sukanyagurav/Responsive-Weather-Widget',
    description: 'A beautifully animated weather query application. Synthesizes live weather forecasting APIs with responsive localized sky backdrops and conversion metrics.',
    fork: false,
    created_at: '2025-08-20',
    updated_at: '2026-04-18',
    pushed_at: '2026-04-18',
    homepage: null,
    size: 1536,
    stargazers_count: 4,
    watchers_count: 4,
    language: 'JavaScript',
    forks_count: 0,
    open_issues_count: 0,
    topics: ['weather-api', 'geolocation', 'responsive-layout', 'css-animations'],
  },
  {
    id: 104,
    name: 'GSAP-Landing-Showcase',
    full_name: 'sukanyagurav/GSAP-Landing-Showcase',
    html_url: 'https://github.com/sukanyagurav/GSAP-Landing-Showcase',
    description: 'A gorgeous landing page highlighting advanced design methods: scroll-driven parallax grids, text reveals, magnet cursors, and physics-based GSAP timelines.',
    fork: false,
    created_at: '2025-11-12',
    updated_at: '2026-03-01',
    pushed_at: '2026-03-01',
    homepage: null,
    size: 4096,
    stargazers_count: 6,
    watchers_count: 6,
    language: 'HTML',
    forks_count: 3,
    open_issues_count: 0,
    topics: ['gsap', 'scrolltrigger', 'creative-web-design', 'parallax-effect', 'animations'],
  },
  {
    id: 105,
    name: 'D3-Visual-Analytics-Panel',
    full_name: 'sukanyagurav/D3-Visual-Analytics-Panel',
    html_url: 'https://github.com/sukanyagurav/D3-Visual-Analytics-Panel',
    description: 'An advanced data analytics platform visualizing complex client streams using interactive D3 node links, scatter charts, and grouped timelines.',
    fork: false,
    created_at: '2025-03-02',
    updated_at: '2026-02-28',
    pushed_at: '2026-02-28',
    homepage: null,
    size: 5120,
    stargazers_count: 7,
    watchers_count: 7,
    language: 'TypeScript',
    forks_count: 1,
    open_issues_count: 0,
    topics: ['d3-charts', 'data-visualisation', 'typescript', 'analytics-dashboard'],
  },
];

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check local storage or system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true; // Default dark
  });

  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Sync Dark Mode state with document classes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Fetch data from GitHub API
  const fetchGitHubData = async () => {
    setLoading(true);
    try {
      // Fetch User profile details
      const profileRes = await fetch('https://api.github.com/users/sukanyagurav');
      let profileData: GitHubProfile | null = null;
      if (profileRes.ok) {
        profileData = await profileRes.json();
        setProfile(profileData);
      } else {
        console.warn('Failed to load GitHub profile. Using fallback.');
        setProfile(FALLBACK_PROFILE);
      }

      // Fetch User public repositories
      const reposRes = await fetch(
        'https://api.github.com/users/sukanyagurav/repos?sort=updated&per_page=30'
      );
      if (reposRes.ok) {
        let reposData: GitHubRepo[] = await reposRes.json();
        // Filter out fork repositories to show her original creations prominently
        const originalRepos = reposData.filter(repo => !repo.fork);
        // If there are too few original repos, fall back to showing all repos
        const displayRepos = originalRepos.length >= 3 ? originalRepos : reposData;
        
        // Sort repos by stars and updated time
        displayRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepos(displayRepos);
      } else {
        console.warn('Failed to load GitHub repos. Using fallback.');
        setRepos(FALLBACK_REPOS);
      }
    } catch (err) {
      console.error('Error fetching GitHub API data:', err);
      // Fallback
      setProfile(FALLBACK_PROFILE);
      setRepos(FALLBACK_REPOS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-bg-light dark:bg-[#0a0a0a] text-slate-800 dark:text-slate-100 selection:bg-slate-900 selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300">
      {/* Interactive Custom Animated Cursor */}
      <CustomCursor />

      {/* Dynamic Header with Dark Mode and Nav Actions */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Container */}
      <main id="main-content">
        {/* Hero Landing Section */}
        <Hero profile={profile} loading={loading} />

        {/* About Bio and Stats Section */}
        <About profile={profile} />

        {/* Core Technology Skills Grid */}
        <Skills />

        {/* Professional Work Experience Timeline */}
        <Experience />

        {/* Dynamic Project Repository Showcase */}
        <Projects repos={repos} loading={loading} onRefresh={fetchGitHubData} />

        {/* Polished Interactive Contact Section */}
        <Contact />
      </main>

      {/* Footer Branding and directory */}
      <Footer />
    </div>
  );
}
