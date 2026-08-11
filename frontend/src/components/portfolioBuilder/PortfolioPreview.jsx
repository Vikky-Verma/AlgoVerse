import {
  ArrowUpRight,
  BriefcaseBusiness,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function PortfolioPreview({ portfolio }) {
  const p = portfolio;

  const githubUrl = p.links?.github || "#";
  const linkedinUrl = p.links?.linkedin || "#";

  return (
    <div
      id="portfolio-to-print"
      className="w-full overflow-hidden rounded-xl border border-[#182238] bg-[#030712] text-white shadow-2xl"
    >
      {/* NAVBAR */}
      <nav className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div className="text-sm font-bold">{p.name || "Your Name"}</div>

        <div className="hidden gap-5 text-[10px] text-slate-400 md:flex">
          <a href="#home" className="hover:text-white">
            Home
          </a>

          <a href="#about" className="hover:text-white">
            About
          </a>

          <a href="#skills" className="hover:text-white">
            Skills
          </a>

          <a href="#experience" className="hover:text-white">
            Experience
          </a>

          <a href="#projects" className="hover:text-white">
            Projects
          </a>

          <a href="#contact" className="hover:text-white">
            Contact
          </a>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-slate-300 hover:text-white"
          >
            <FaGithub size={13} />
          </a>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-slate-300 hover:text-white"
          >
            <FaLinkedinIn size={13} />
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-[430px] overflow-hidden px-6 py-16"
      >
        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(124,58,237,0.18),transparent_35%),radial-gradient(circle_at_30%_70%,rgba(168,85,247,0.08),transparent_30%)]" />

        <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1fr_220px]">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-purple-400">
              {p.tagline || "Full Stack Developer"}
            </p>

            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              {p.name || "Your Name"}
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">
              {p.about ||
                "I build modern, scalable and user-friendly applications."}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="flex items-center gap-2 rounded-md bg-purple-600 px-4 py-2 text-[10px] font-semibold text-white"
              >
                View My Work
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>

          {/* PROFILE IMAGE */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-purple-600/20 blur-xl" />

              {p.profileImage ? (
                <img
                  src={p.profileImage}
                  alt={p.name || "Profile"}
                  className="relative h-44 w-44 rounded-full border-2 border-purple-500/50 object-cover"
                />
              ) : (
                <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-2 border-purple-500/50 bg-[#111827]">
                  <UserRound size={55} className="text-slate-500" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-white/10 px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-400">
            About Me
          </p>

          <h2 className="mt-2 text-2xl font-bold">About Me</h2>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400">
            {p.about ||
              "I am a passionate developer who enjoys building useful and beautiful digital products."}
          </p>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="border-t border-white/10 px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-400">
            Skills
          </p>

          <h2 className="mt-2 text-2xl font-bold">Technologies I Work With</h2>

          <div className="mt-7 flex flex-wrap gap-2">
            {(p.skills || []).map((skill, index) => (
              <span
                key={index}
                className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] text-slate-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="border-t border-white/10 px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-2">
            <BriefcaseBusiness size={16} className="text-purple-400" />

            <h2 className="text-2xl font-bold">Experience</h2>
          </div>

          <div className="mt-7 space-y-5">
            {(p.experience || []).map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
              >
                <h3 className="font-semibold">{item.role || item.title}</h3>

                <p className="mt-1 text-[11px] text-purple-400">
                  {item.company}
                </p>

                <p className="mt-3 text-xs leading-6 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="border-t border-white/10 px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-2">
            <GraduationCap size={16} className="text-purple-400" />

            <h2 className="text-2xl font-bold">Education</h2>
          </div>

          <div className="mt-7 space-y-5">
            {(p.education || []).map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
              >
                <h3 className="font-semibold">{item.degree}</h3>

                <p className="mt-1 text-[11px] text-purple-400">
                  {item.institution}
                </p>

                <p className="mt-2 text-xs text-slate-500">{item.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="border-t border-white/10 px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-400">
            Projects
          </p>

          <h2 className="mt-2 text-2xl font-bold">Featured Projects</h2>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {(p.projects || []).map((project, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
              >
                <h3 className="font-semibold">
                  {project.title || project.name}
                </h3>

                <p className="mt-3 text-xs leading-6 text-slate-400">
                  {project.description}
                </p>

                {project.technologies && (
                  <p className="mt-4 text-[10px] text-purple-400">
                    {Array.isArray(project.technologies)
                      ? project.technologies.join(" • ")
                      : project.technologies}
                  </p>
                )}

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-[10px] text-slate-300"
                  >
                    View Project
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-white/10 px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-400">
            Contact
          </p>

          <h2 className="mt-2 text-2xl font-bold">Let's Work Together</h2>

          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {p.email && (
              <a
                href={`mailto:${p.email}`}
                className="flex items-center gap-3 rounded-lg border border-white/10 p-4"
              >
                <Mail size={15} className="text-purple-400" />
                <span className="text-xs text-slate-300">{p.email}</span>
              </a>
            )}

            {p.phone && (
              <div className="flex items-center gap-3 rounded-lg border border-white/10 p-4">
                <Phone size={15} className="text-purple-400" />
                <span className="text-xs text-slate-300">{p.phone}</span>
              </div>
            )}

            {p.location && (
              <div className="flex items-center gap-3 rounded-lg border border-white/10 p-4">
                <MapPin size={15} className="text-purple-400" />
                <span className="text-xs text-slate-300">{p.location}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-7">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <p className="text-[10px] text-slate-500">
            © {new Date().getFullYear()} {p.name || "Your Name"}
          </p>

          <div className="flex gap-2">
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white"
            >
              <FaGithub size={14} />
            </a>

            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white"
            >
              <FaLinkedinIn size={14} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
