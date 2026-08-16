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
import { GitHubProfile } from './types';
import projectsData from './constant/projectsData';

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
  bio: 'Frontend Developer with 3+ years shipping production interfaces in React and Svelte — turning designs into fast, accessible, pixel-precise experiences.',
  twitter_username: null,
  public_repos: 12,
  public_gists: 0,
  followers: 18,
  following: 22,
  created_at: '2022-04-12',
};

export default function App() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);

  // Sync Dark Mode state with document classes
  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const fetchGitHubProfile = async () => {
    try {
      const profileRes = await fetch('https://api.github.com/users/sukanyagurav');
      if (profileRes.ok) {
        const profileData: GitHubProfile = await profileRes.json();
        setProfile(profileData);
      } else {
        console.warn('Failed to load GitHub profile. Using fallback.');
        setProfile(FALLBACK_PROFILE);
      }
    } catch (err) {
      console.error('Error fetching GitHub profile:', err);
      setProfile(FALLBACK_PROFILE);
    }
  };

  useEffect(() => {
    fetchGitHubProfile();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-bg-light dark:bg-[#0a0a0a] text-slate-800 dark:text-slate-100 selection:bg-slate-900 selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300">
      {/* Interactive Custom Animated Cursor */}
      <CustomCursor />

      {/* Dynamic Header with Nav Actions */}
      <Header />

      {/* Main Container */}
      <main id="main-content">
        {/* Hero Landing Section */}
        <Hero profile={profile} />

        {/* About Bio and Stats Section */}
        <About profile={profile} />

        {/* Professional Work Experience Timeline */}
        <Experience />
       
        {/* Dynamic Project Showcase */}
        <Projects repos={projectsData} />

         {/* Core Technology Skills Grid */}
        <Skills />


        {/* Polished Interactive Contact Section */}
        <Contact />
      </main>

      {/* Footer Branding and directory */}
      <Footer />
    </div>
  );
}
