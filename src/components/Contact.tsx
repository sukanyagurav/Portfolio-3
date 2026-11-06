import React, { useState, useEffect, useRef } from 'react';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailDraftReady, setEmailDraftReady] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // GSAP Entrance Animations
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
    setEmailDraftReady(false);
    setIsSuccess(false);
  };

  // Sign up free at https://formspree.io, create a form, and paste your endpoint ID below.
  // Until FORMSPREE_ENDPOINT is set, submissions fall back to opening the visitor's email client.
  const FORMSPREE_ENDPOINT = ''; // e.g. 'https://formspree.io/f/xxxxxxx'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

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
    setEmailDraftReady(false);
    setIsSuccess(false);

    if (!FORMSPREE_ENDPOINT) {
      // The visitor must send the generated draft in their email app.
      const mailBody = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:sukanyagurav6@gmail.com?subject=${encodeURIComponent(
        subject || 'Portfolio contact form'
      )}&body=${mailBody}`;
      setIsSubmitting(false);
      setEmailDraftReady(true);
      return;
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!res.ok) throw new Error('Submission failed');

      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setErrorMsg('Something went wrong sending your message. Please email me directly instead.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-28 bg-bg-light dark:bg-[#10110f] border-b border-black/5 dark:border-white/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="contact-reveal-title max-w-3xl mb-12 md:mb-16">
          <p className="text-sm text-teal-700 dark:text-teal-300 mb-4">Contact</p>
          <h2 className="font-serif font-medium text-4xl sm:text-6xl text-slate-950 dark:text-white leading-tight">
            Let’s talk.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-4 max-w-xl leading-relaxed">
            Have a project in mind, need a talented engineer, or just want to discuss web technology? My inbox is always open.
          </p>
        </div>

        <div className="max-w-2xl mx-auto w-full">
          
          {/* Contact Form Column */}
          <div className="contact-form-panel border-t border-black/10 dark:border-white/15 pt-8">
            <h3 className="font-serif font-medium text-2xl text-slate-950 dark:text-white mb-4">
              Send Me A Message
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              {FORMSPREE_ENDPOINT
                ? 'Your message will be submitted through the contact form.'
                : 'Submitting opens a draft in your email app; send it there to complete your message.'}
            </p>

            {/* Form submission */}
            <form onSubmit={handleSubmit} className="space-y-6" id="contact-message-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Full name input */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-600 dark:text-slate-300">
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
                    className="w-full px-4 py-3 bg-white dark:bg-[#20211e] border border-black/10 dark:border-white/10 rounded-none text-base placeholder-slate-400 focus:border-teal-700 dark:focus:border-teal-300 transition-colors duration-200 text-slate-800 dark:text-white"
                  />
                </div>

                {/* Email address input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-600 dark:text-slate-300">
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
                    className="w-full px-4 py-3 bg-white dark:bg-[#20211e] border border-black/10 dark:border-white/10 rounded-none text-base placeholder-slate-400 focus:border-teal-700 dark:focus:border-teal-300 transition-colors duration-200 text-slate-800 dark:text-white"
                  />
                </div>

              </div>

              {/* Subject Input */}
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this regarding?"
                  className="w-full px-4 py-3 bg-white dark:bg-[#20211e] border border-black/10 dark:border-white/10 rounded-none text-base placeholder-slate-400 focus:border-teal-700 dark:focus:border-teal-300 transition-colors duration-200 text-slate-800 dark:text-white"
                />
              </div>

              {/* Message text area */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-600 dark:text-slate-300">
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
                  className="w-full px-4 py-3 bg-white dark:bg-[#20211e] border border-black/10 dark:border-white/10 rounded-none text-base placeholder-slate-400 focus:border-teal-700 dark:focus:border-teal-300 transition-colors duration-200 text-slate-800 dark:text-white resize-none"
                />
              </div>

              {/* Alert prompt handlers */}
              {errorMsg && (
                <div role="alert" className="p-4 border border-rose-500/20 bg-rose-50/50 dark:bg-rose-950/10 text-rose-600 dark:text-rose-400 rounded-none text-xs flex items-center space-x-2 font-mono uppercase tracking-[0.1em]">
                  <AlertCircle size={13} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {emailDraftReady && (
                <div role="status" aria-live="polite" className="p-4 border border-sky-500/20 bg-sky-50/50 dark:bg-sky-950/10 text-sky-700 dark:text-sky-300 rounded-none text-xs flex items-center space-x-2 font-mono uppercase tracking-[0.1em]">
                  <Mail size={13} />
                  <span>Your email app should open with a draft. Send it there to complete your message.</span>
                </div>
              )}

              {isSuccess && (
                <div role="status" aria-live="polite" className="p-4 border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/10 text-emerald-600 dark:text-emerald-400 rounded-none text-xs flex items-center space-x-2 font-mono uppercase tracking-[0.1em]">
                  <CheckCircle size={13} />
                  <span>Success! Your message was sent cleanly. I will respond to you shortly.</span>
                </div>
              )}

              {/* Submit CTA button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 border border-slate-900 dark:border-white bg-slate-900 text-white dark:bg-white dark:text-slate-950 hover:bg-transparent hover:text-slate-900 dark:hover:bg-transparent dark:hover:text-white font-sans uppercase tracking-[0.2em] text-[10px] font-semibold transition-all duration-300 flex items-center justify-center space-x-2 disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer rounded-none shadow-[0_0_0_1px_rgba(0,213,190,0.12),0_0_20px_rgba(0,213,190,0.18)] hover:shadow-[0_0_0_1px_rgba(0,213,190,0.25),0_0_28px_rgba(0,213,190,0.24)]"
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
