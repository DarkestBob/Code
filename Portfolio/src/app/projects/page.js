import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";

export const metadata = {
  title: "Projects",
  description: "Explore Ethan's curated collection of recent work, side projects, and experiments.",
};

const projects = [
  {
    title: "E-Commerce Dashboard",
    description:
      "A comprehensive analytics dashboard for e-commerce businesses featuring real-time data visualization, order management, and customer insights with a clean, intuitive interface.",
    tags: ["React", "Next.js", "Tailwind CSS", "Chart.js"],
    link: "#",
  },
  {
    title: "Weather Companion App",
    description:
      "A beautifully designed weather application that provides detailed forecasts, interactive maps, and personalized weather alerts with smooth animations and location-based features.",
    tags: ["JavaScript", "REST API", "CSS3", "Geolocation"],
    link: "#",
  },
  {
    title: "Task Management Platform",
    description:
      "A collaborative task management tool with drag-and-drop boards, team workspaces, real-time updates, and productivity analytics to streamline project workflows.",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    link: "#",
  },
  {
    title: "Portfolio Website",
    description:
      "A modern, minimalist portfolio website built with Next.js and Tailwind CSS featuring smooth animations, responsive design, and a clean component architecture.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    link: "#",
  },
];

export default function ProjectsPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          title="Projects"
          subtitle="A curated selection of recent work and side projects that showcase my skills and interests."
        />

        {/* Project Grid */}
        <div className="grid gap-8 sm:grid-cols-2" id="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              link={project.link}
              index={i}
            />
          ))}
        </div>

        {/* More coming soon */}
        <div className="animate-fade-in-up delay-500 mt-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            More projects coming soon
          </div>
        </div>
      </div>
    </div>
  );
}
