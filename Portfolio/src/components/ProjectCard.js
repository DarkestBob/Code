import Link from "next/link";
import Image from "next/image";

export default function ProjectCard({ title, description, tags, link, image, index = 0 }) {
  return (
    <div
      className="animate-fade-in-up group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm card-hover"
      style={{ animationDelay: `${index * 100}ms` }}
      id={`project-card-${index}`}
    >
      {/* Image placeholder */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-surface to-accent-light/30">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80 shadow-sm">
              <svg className="h-8 w-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
            </div>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-accent/0 transition-all duration-300 group-hover:bg-accent/5">
          <div className="scale-90 rounded-full bg-white px-5 py-2 text-sm font-medium text-accent opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
            View Project →
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-heading transition-colors duration-200 group-hover:text-accent">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg bg-surface px-2.5 py-1 text-xs font-medium text-muted transition-colors duration-200 hover:bg-accent-light hover:text-accent-dark"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link */}
        {link && (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all duration-200 hover:gap-2.5"
          >
            View Project
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
