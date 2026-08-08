import SectionHeading from "@/components/SectionHeading";
import SkillBadge from "@/components/SkillBadge";

export const metadata = {
  title: "About",
  description: "Learn about Ethan's background, skills, and journey as a developer and designer.",
};

const skills = [
  { name: "JavaScript", icon: "⚡" },
  { name: "TypeScript", icon: "🔷" },
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "Node.js", icon: "🟢" },
  { name: "Python", icon: "🐍" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "HTML/CSS", icon: "🌐" },
  { name: "Git", icon: "📦" },
  { name: "Figma", icon: "🎯" },
  { name: "REST APIs", icon: "🔗" },
  { name: "SQL", icon: "🗄️" },
];

const interests = [
  { label: "UI/UX Design", emoji: "🎨" },
  { label: "Open Source", emoji: "💻" },
  { label: "Photography", emoji: "📸" },
  { label: "Music", emoji: "🎵" },
  { label: "Gaming", emoji: "🎮" },
  { label: "Travel", emoji: "✈️" },
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Profile Section */}
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Avatar */}
          <div className="flex justify-center lg:col-span-2 lg:justify-start">
            <div className="animate-fade-in-up relative">
              <div className="relative h-72 w-72 overflow-hidden rounded-3xl bg-gradient-to-br from-accent-light to-accent/10 shadow-xl sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-center">
                    <div className="text-7xl">👨‍💻</div>
                    <p className="mt-3 text-sm font-medium text-accent-dark">Profile Photo</p>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3 h-24 w-24 rounded-2xl border-2 border-accent/20 -z-10" />
              <div className="absolute -bottom-3 -left-3 h-24 w-24 rounded-2xl bg-accent-light/40 -z-10" />
            </div>
          </div>

          {/* Bio */}
          <div className="lg:col-span-3">
            <SectionHeading
              title="About Me"
              subtitle="A bit about who I am and what I do."
            />
            <div className="space-y-4 text-base leading-relaxed text-muted">
              <p className="animate-fade-in-up delay-200">
                Hi there! I&apos;m <span className="font-semibold text-heading">Ethan</span>, a developer and designer based
                in the digital world. I&apos;m passionate about building elegant, user-focused web
                experiences that combine clean code with thoughtful design.
              </p>
              <p className="animate-fade-in-up delay-300">
                My journey in tech started with a curiosity for how things work on the web. Since then,
                I&apos;ve been honing my skills across the full stack, from crafting pixel-perfect UIs to
                building robust backend systems.
              </p>
              <p className="animate-fade-in-up delay-400">
                When I&apos;m not coding, you can find me exploring new technologies, contributing to
                open-source projects, or working on creative side projects that push the boundaries
                of what&apos;s possible on the web.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <section className="mt-24" id="skills-section">
          <SectionHeading
            title="Skills & Technologies"
            subtitle="Tools and technologies I work with on a daily basis."
            align="center"
          />
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, i) => (
              <SkillBadge key={skill.name} name={skill.name} icon={skill.icon} index={i} />
            ))}
          </div>
        </section>

        {/* Interests Section */}
        <section className="mt-24" id="interests-section">
          <SectionHeading
            title="Beyond Code"
            subtitle="A few things I enjoy when I step away from the keyboard."
            align="center"
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {interests.map((item, i) => (
              <div
                key={item.label}
                className="animate-scale-in group flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:border-accent/20 hover:shadow-md hover:-translate-y-1"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="text-3xl transition-transform duration-300 group-hover:scale-125">
                  {item.emoji}
                </span>
                <span className="text-sm font-medium text-heading">{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
