import Hero from "@/components/Hero";
import Link from "next/link";

const highlights = [
  {
    title: "About Me",
    description: "Learn about my background, skills, and what drives me as a developer.",
    href: "/about",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: "Projects",
    description: "Explore a curated collection of my recent work and side projects.",
    href: "/projects",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: "Get in Touch",
    description: "Have a project in mind? Let's connect and create something great together.",
    href: "/contact",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Highlights Section */}
      <section className="relative bg-surface py-24" id="highlights-section">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="animate-fade-in-up text-3xl font-bold tracking-tight text-heading sm:text-4xl">
              What I Do
            </h2>
            <div className="mx-auto mt-3 h-1 w-12 animate-draw-line rounded-full bg-accent" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="animate-fade-in-up group relative flex flex-col items-start rounded-2xl border border-border bg-white p-8 shadow-sm transition-all duration-300 hover:border-accent/20 hover:shadow-lg hover:-translate-y-1"
                style={{ animationDelay: `${i * 100 + 200}ms` }}
                id={`highlight-card-${i}`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-light/50 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:shadow-lg group-hover:shadow-accent/20">
                  {item.icon}
                </div>
                <h3 className="mt-5 text-lg font-bold text-heading">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all duration-200 group-hover:gap-2.5">
                  Explore
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20" id="stats-section">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { value: "3+", label: "Years Experience" },
              { value: "15+", label: "Projects Built" },
              { value: "10+", label: "Technologies" },
              { value: "∞", label: "Curiosity" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="animate-fade-in-up text-center"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl font-extrabold text-accent sm:text-5xl">
                  {stat.value}
                </div>
                <p className="mt-2 text-sm font-medium text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
