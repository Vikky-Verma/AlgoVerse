import { Code2, Briefcase, Globe, AtSign, ExternalLink, Sparkles } from "lucide-react";

const AVATAR_COLORS = [
  "#6366f1", "#0ea5e9", "#f59e0b", "#10b981", "#f43f5e", "#a855f7", "#14b8a6",
];

const avatarColor = (name = "") => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

const LINK_META = {
  github: { icon: Code2, label: "GitHub" },
  linkedin: { icon: Briefcase, label: "LinkedIn" },
  website: { icon: Globe, label: "Website" },
  twitter: { icon: AtSign, label: "Twitter" },
};

const normalizeUrl = (url) => {
  if (!url) return "";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

/**
 * Read-only rendering of what the public /portfolio/:slug page will look
 * like, sized to sit inside the builder as a live preview panel (mirrors
 * how ResumePreview works for the resume builder).
 */
const PortfolioPreview = ({ portfolio, name }) => {
  const links = Object.entries(portfolio?.links || {}).filter(([, v]) => v);
  const skills = portfolio?.skills || [];
  const projects = portfolio?.projects || [];

  return (
    <div
      id="portfolio-to-print"
      className="bg-[#0a0b10] text-slate-300 mx-auto"
      style={{ width: "680px", minHeight: "760px" }}
    >
      <div className="px-10 py-12">
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white shrink-0"
            style={{ backgroundColor: avatarColor(name) }}
          >
            {name?.slice(0, 2).toUpperCase() || "P"}
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              {name || "Your Name"}
            </h1>
            {portfolio?.headline && (
              <p className="text-indigo-400 text-sm font-medium mt-1">{portfolio.headline}</p>
            )}
          </div>
        </div>

        {portfolio?.bio && (
          <p className="text-slate-400 text-[14px] leading-relaxed mt-5">{portfolio.bio}</p>
        )}

        {links.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-5">
            {links.map(([key, value]) => {
              const meta = LINK_META[key] || { icon: Globe, label: key };
              const Icon = meta.icon;
              return (
                <span
                  key={key}
                  className="flex items-center gap-1.5 bg-[#12141c] border border-[#20222c] text-slate-300 text-xs font-medium rounded-lg px-2.5 py-1.5"
                >
                  <Icon size={12} />
                  {meta.label}
                </span>
              );
            })}
          </div>
        )}

        {skills.length > 0 && (
          <div className="mt-8">
            <h2 className="text-[10.5px] font-semibold text-slate-500 uppercase tracking-wide mb-2.5">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-[#12141c] border border-[#20222c] text-slate-300 text-[11px] font-medium px-2 py-1 rounded-lg"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div className="mt-8">
            <h2 className="text-[10.5px] font-semibold text-slate-500 uppercase tracking-wide mb-2.5">
              Projects
            </h2>
            <div className="grid grid-cols-2 gap-2.5">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="bg-[#12141c]/80 border border-[#20222c] rounded-xl p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-white font-semibold text-[12.5px]">
                      {project.name || "Untitled project"}
                    </p>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {project.github && <Code2 size={11} className="text-slate-500" />}
                      {project.link && <ExternalLink size={11} className="text-slate-500" />}
                    </div>
                  </div>
                  {project.description && (
                    <p className="text-slate-500 text-[11px] leading-relaxed mt-1 line-clamp-2">
                      {project.description}
                    </p>
                  )}
                  {project.techStack?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[9.5px] font-medium text-slate-500 bg-[#0e0f16] border border-[#1c1e28] rounded px-1.5 py-0.5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {links.length === 0 && skills.length === 0 && projects.length === 0 && !portfolio?.bio && (
          <p className="text-slate-600 text-[12px] mt-8">
            Fill in the sections on the left to see your public page take shape here.
          </p>
        )}

        <div className="mt-12 pt-5 border-t border-[#1c1e28] flex items-center justify-center gap-1.5">
          <Sparkles size={10} className="text-slate-700" />
          <p className="text-[10px] text-slate-700">Built with AI Resume Analyser</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPreview;