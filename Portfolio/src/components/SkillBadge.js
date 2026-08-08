export default function SkillBadge({ name, icon, index = 0 }) {
  return (
    <div
      className="animate-scale-in group flex items-center gap-2.5 rounded-xl border border-border bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:border-accent/30 hover:shadow-md hover:-translate-y-0.5"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {icon && (
        <span className="text-lg transition-transform duration-300 group-hover:scale-110">
          {icon}
        </span>
      )}
      <span className="text-sm font-medium text-heading">{name}</span>
    </div>
  );
}
