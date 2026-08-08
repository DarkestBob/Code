import SectionHeading from "@/components/SectionHeading";
import ExperienceCard from "@/components/ExperienceCard";

export const metadata = {
  title: "Experience",
  description: "Explore Ethan's professional experience, education, and career journey.",
};

const experiences = [
  {
    role: "Frontend Developer",
    company: "Tech Company Inc.",
    date: "2024 — Present",
    isCurrent: true,
    description: [
      "Building responsive and performant web applications using React and Next.js",
      "Collaborating with design teams to implement pixel-perfect UI components",
      "Optimizing application performance and improving core web vitals scores",
      "Mentoring junior developers and conducting code reviews",
    ],
  },
  {
    role: "Web Developer Intern",
    company: "Creative Studio",
    date: "2023 — 2024",
    description: [
      "Developed and maintained client websites using modern JavaScript frameworks",
      "Implemented responsive designs from Figma mockups with attention to detail",
      "Integrated RESTful APIs and managed application state efficiently",
    ],
  },
  {
    role: "Freelance Developer",
    company: "Self-Employed",
    date: "2022 — 2023",
    description: [
      "Built custom websites and web applications for small businesses",
      "Managed full project lifecycle from requirements gathering to deployment",
      "Delivered projects on time while maintaining high code quality standards",
    ],
  },
];

const education = [
  {
    role: "Bachelor of Computer Science",
    company: "University of Technology",
    date: "2020 — 2024",
    description: [
      "Focused on software engineering and web development",
      "Relevant coursework: Data Structures, Algorithms, Web Technologies, UI/UX Design",
      "Graduated with honors",
    ],
  },
];

export default function ExperiencePage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Work Experience */}
        <section id="work-experience">
          <SectionHeading
            title="Work Experience"
            subtitle="My professional journey so far — building products that matter."
          />
          <div className="ml-2 mt-8 max-w-3xl">
            {experiences.map((exp, i) => (
              <ExperienceCard
                key={exp.role + exp.company}
                role={exp.role}
                company={exp.company}
                date={exp.date}
                description={exp.description}
                isCurrent={exp.isCurrent}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mt-24" id="education">
          <SectionHeading
            title="Education"
            subtitle="Where it all started — my academic foundation."
          />
          <div className="ml-2 mt-8 max-w-3xl">
            {education.map((edu, i) => (
              <ExperienceCard
                key={edu.role + edu.company}
                role={edu.role}
                company={edu.company}
                date={edu.date}
                description={edu.description}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24" id="experience-cta">
          <div className="animate-fade-in-up rounded-3xl bg-gradient-to-br from-accent-light/40 to-accent/5 border border-accent/10 p-10 text-center sm:p-14">
            <h3 className="text-2xl font-bold text-heading sm:text-3xl">
              Interested in working together?
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-base text-muted">
              I&apos;m always open to discussing new opportunities, interesting projects, or
              ways to contribute to your team.
            </p>
            <a
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-300 hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5"
              id="experience-contact-cta"
            >
              Let&apos;s Connect
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
