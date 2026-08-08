export default function SectionHeading({ title, subtitle, align = "left" }) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col ${alignClass} mb-12 space-y-3`}>
      <h2 className="animate-fade-in-up text-3xl font-bold tracking-tight text-heading sm:text-4xl">
        {title}
      </h2>
      <div className="animate-draw-line delay-200 h-1 w-12 rounded-full bg-accent" />
      {subtitle && (
        <p className="animate-fade-in-up delay-300 mt-2 max-w-xl text-base leading-relaxed text-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}
