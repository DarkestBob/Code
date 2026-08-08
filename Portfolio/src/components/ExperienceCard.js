export default function ExperienceCard({ role, company, date, description, isCurrent = false, index = 0 }) {
  return (
    <div
      className="animate-fade-in-up relative flex gap-6 pb-12 last:pb-0"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Timeline line & dot */}
      <div className="relative flex flex-col items-center">
        <div
          className={`relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
            isCurrent
              ? "border-accent bg-accent shadow-md shadow-accent/30"
              : "border-border bg-white"
          }`}
        >
          {isCurrent && (
            <span className="absolute h-4 w-4 animate-ping rounded-full bg-accent/30" />
          )}
        </div>
        <div className="absolute top-4 h-full w-px bg-gradient-to-b from-border to-transparent" />
      </div>

      {/* Content card */}
      <div className="group flex-1 rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:border-accent/20 hover:shadow-md -mt-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-heading group-hover:text-accent transition-colors duration-200">
              {role}
            </h3>
            <p className="mt-0.5 text-sm font-medium text-accent">{company}</p>
          </div>
          <span className="inline-flex items-center rounded-lg bg-surface px-3 py-1 text-xs font-medium text-muted">
            {date}
          </span>
        </div>
        {description && (
          <ul className="mt-4 space-y-2">
            {description.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-muted">
                <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
