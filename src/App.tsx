import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import projectsData from './constant/projectsData';
import BackToTop from './components/BackToTop';

export default function App() {
  // Sync Dark Mode state with document classes
  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  return (
    <div className="min-h-screen bg-bg-light dark:bg-[#10110f] text-slate-800 dark:text-slate-100 selection:bg-slate-900 selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300">
      {/* Interactive Custom Animated Cursor */}
      <CustomCursor />

      {/* Dynamic Header with Nav Actions */}
      <Header />

      {/* Main Container */}
      <main id="main-content">
        {/* Hero Landing Section */}
        <Hero />

        {/* Dynamic Project Showcase */}
        <Projects repos={projectsData} />

        {/* Professional Work Experience Timeline */}
        <Experience />

        {/* About and selected work approach */}
        <About />

        {/* Core Technology Skills Grid */}
        <Skills />

        {/* Polished Interactive Contact Section */}
        <Contact />
      </main>
      <BackToTop />

      {/* Footer Branding and directory */}
      <Footer />
    </div>
  );
}
