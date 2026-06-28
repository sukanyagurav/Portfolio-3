import React, { useState, useEffect, useRef } from 'react';
import { Mail, Send, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-reveal-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.contact-reveal-title',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.contact-form-panel',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form-panel',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setErrorMsg('Please complete all mandatory fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please specify a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-36 bg-bg-light dark:bg-[#0a0a0a] border-b border-black/5 dark:border-white/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="contact-reveal-title text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 border border-black/10 dark:border-white/10 text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-[0.2em] font-sans bg-transparent mb-6">
            <Mail size={11} className="text-slate-400 dark:text-slate-500" />
            <span>Let's Connect</span>
          </div>
          <h2 className="font-serif font-light text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-wide leading-tight italic">
            Start A Conversation
          </h2>
          <p className="font-serif text-lg text-slate-500 dark:text-slate-400 font-light mt-3 max-w-lg mx-auto italic">
            Have a project in mind, need a talented engineer, or just want to discuss web technology? My inbox is always open.
          </p>
        </div>

        <div className="max-w-2xl mx-auto w-full">
          
          {/* Contact Form Column */}
          <div className="contact-form-panel border border-black/5 dark:border-white/10 bg-white/70 dark:bg-[#111] p-8 rounded-none shadow-none">
            <h3 className="font-serif font-light text-2xl italic text-slate-900 dark:text-white mb-6">
              Send Me A Message
            </h3>

            {/* Form submission */}
            <form onSubmit={handleSubmit} className="space-y-6" id="contact-message-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Full name input */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[9px] uppercase tracking-[0.15em] font-sans font-semibold text-slate-500 dark:text-slate-400">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-none text-sm placeholder-slate-400 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-all text-slate-800 dark:text-white font-serif"
                  />
                </div>

                {/* Email address input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[9px] uppercase tracking-[0.15em] font-sans font-semibold text-slate-500 dark:text-slate-400">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-none text-sm placeholder-slate-400 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-all text-slate-800 dark:text-white font-serif"
                  />
                </div>

              </div>

              {/* Subject Input */}
              <div className="space-y-2">
                <label htmlFor="subject" className="text-[9px] uppercase tracking-[0.15em] font-sans font-semibold text-slate-500 dark:text-slate-400">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this regarding?"
                  className="w-full px-4 py-3 bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-none text-sm placeholder-slate-400 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-all text-slate-800 dark:text-white font-serif"
                />
              </div>

              {/* Message text area */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-[9px] uppercase tracking-[0.15em] font-sans font-semibold text-slate-500 dark:text-slate-400">
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-none text-sm placeholder-slate-400 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-all text-slate-800 dark:text-white resize-none font-serif"
                />
              </div>

              {/* Alert prompt handlers */}
              {errorMsg && (
                <div className="p-4 border border-rose-500/20 bg-rose-50/50 dark:bg-rose-950/10 text-rose-600 dark:text-rose-400 rounded-none text-xs flex items-center space-x-2 font-mono uppercase tracking-[0.1em]">
                  <AlertCircle size={13} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {isSuccess && (
                <div className="p-4 border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/10 text-emerald-600 dark:text-emerald-400 rounded-none text-xs flex items-center space-x-2 font-mono uppercase tracking-[0.1em]">
                  <CheckCircle size={13} />
                  <span>Success! Your message was sent cleanly. I will respond to you shortly.</span>
                </div>
              )}

              {/* Submit CTA button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 border border-slate-900 dark:border-white bg-slate-900 text-white dark:bg-white dark:text-slate-950 hover:bg-transparent hover:text-slate-900 dark:hover:bg-transparent dark:hover:text-white font-sans uppercase tracking-[0.2em] text-[10px] font-semibold transition-all duration-300 flex items-center justify-center space-x-2 disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer rounded-none"
                id="contact-submit-btn"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border border-white dark:border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={13} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
