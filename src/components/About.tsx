import { ArrowUpRight } from 'lucide-react';

const principles = [
  'Build clear, responsive interfaces',
  'Keep components practical and maintainable',
  'Work closely with design and engineering teams',
];

export default function About() {
  return (
    <section
      id="about"
      className="bg-bg-light dark:bg-[#10110f] border-b border-black/5 dark:border-white/10 py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-10 lg:gap-24">
          <div>
            <p className="text-sm text-teal-700 dark:text-teal-300">A little about my work</p>
            <h2 className="mt-4 max-w-md font-serif text-4xl sm:text-5xl leading-tight text-slate-950 dark:text-white">
              Thoughtful interfaces, built to work.
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              I’m a frontend developer who enjoys turning product requirements and visual designs
              into clear, responsive interfaces. My work spans React and Svelte, with a focus on
              reusable components, practical accessibility, and close collaboration with design
              and engineering teams.
            </p>

            <ul className="mt-8 divide-y divide-black/10 dark:divide-white/10 border-y border-black/10 dark:border-white/10">
              {principles.map((principle) => (
                <li
                  key={principle}
                  className="flex items-center justify-between gap-6 py-4 text-base text-slate-700 dark:text-slate-200"
                >
                  {principle}
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-teal-700 dark:text-teal-300"
                    aria-hidden="true"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
