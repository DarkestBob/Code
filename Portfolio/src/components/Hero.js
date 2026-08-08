import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden" id="hero-section">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent-light/40 blur-3xl" />
        <div className="absolute bottom-10 -left-24 h-72 w-72 rounded-full bg-accent-light/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-glow blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Greeting badge */}
          <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-light/60 px-4 py-1.5 text-sm font-medium text-accent-dark shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for opportunities
          </div>

          {/* Main heading */}
          <h1 className="animate-fade-in-up delay-100 text-5xl font-extrabold tracking-tight text-heading sm:text-6xl lg:text-7xl leading-none">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-accent via-emerald-600 to-accent-dark bg-clip-text text-transparent">
              Ethan
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in-up delay-200 mt-6 text-xl leading-relaxed text-muted sm:text-2xl max-w-2xl">
            A passionate <span className="font-semibold text-heading">developer</span> &amp;{" "}
            <span className="font-semibold text-heading">designer</span> who loves crafting
            beautiful, functional digital experiences.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up delay-300 mt-10 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-300 hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5"
              id="hero-cta-projects"
            >
              View My Work
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-7 py-3.5 text-sm font-semibold text-heading shadow-sm transition-all duration-300 hover:border-accent/30 hover:bg-accent-light/20 hover:-translate-y-0.5"
              id="hero-cta-contact"
            >
              Get in Touch
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="animate-fade-in delay-500 mt-16 flex items-center gap-3 text-text-light">
            <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-text-light/40 p-1">
              <div className="h-1.5 w-1 animate-bounce rounded-full bg-text-light/60" />
            </div>
            <span className="text-xs font-medium uppercase tracking-widest">Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
