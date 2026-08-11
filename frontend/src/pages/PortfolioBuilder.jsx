import { useEffect, useMemo, useRef, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import StepperRail from "../components/shared/StepperRail";
import CompletionSummary from "../components/shared/CompletionSummary";
import PortfolioPreview from "../components/portfolioBuilder/PortfolioPreview";
import { useAuth } from "../context/AuthContext";
import {
  Loader2,
  Plus,
  X,
  Trash2,
  Copy,
  ExternalLink,
  Sparkles,
  Code2,
  Briefcase,
  Globe,
  AtSign,
  Save,
  User,
  Link2,
  Wrench,
  FolderGit2,
  Rocket,
  RefreshCw,
  Maximize2,
  Minimize2,
  Printer,
} from "lucide-react";

const blankPortfolioFields = () => ({
  displayName: "",
  headline: "",
  bio: "",
  skills: [],
  projects: [],
  links: { github: "", linkedin: "", website: "", twitter: "" },
});

const PORTFOLIO_SECTIONS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "links", label: "Links", icon: Link2 },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "publish", label: "Publish", icon: Rocket },
];

const PUBLIC_BASE =
  (import.meta.env.VITE_APP_URL || window.location.origin) + "/portfolio/";

const EMPTY_PROJECT = { name: "", techStack: [], description: "", link: "", github: "" };

const TagInput = ({ tags, onChange, placeholder }) => {
  const [draft, setDraft] = useState("");

  const commit = () => {
    const value = draft.trim();
    if (value && !tags.includes(value)) onChange([...tags, value]);
    setDraft("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commit();
    } else if (e.key === "Backspace" && !draft && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 bg-[#12141c] border border-[#20222c] rounded-lg px-2.5 py-2 focus-within:border-indigo-500/60 transition-colors">
      {tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 bg-[#1c1e28] text-slate-300 text-[11px] font-medium px-2 py-1 rounded-md"
        >
          {tag}
          <button
            type="button"
            onClick={() => onChange(tags.filter((t) => t !== tag))}
            className="text-slate-500 hover:text-rose-400"
          >
            <X size={10} />
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={commit}
        placeholder={placeholder}
        className="flex-1 min-w-[100px] bg-transparent text-sm text-slate-200 focus:outline-none py-0.5"
      />
    </div>
  );
};

const ProjectEditor = ({ project, index, onChange, onRemove }) => (
  <div className="bg-[#12141c]/80 backdrop-blur-xl border border-[#20222c] rounded-xl p-4 space-y-3">
    <div className="flex items-center justify-between">
      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
        Project {index + 1}
      </span>
      <button
        type="button"
        onClick={onRemove}
        className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-[#1c1e28]"
      >
        <Trash2 size={13} />
      </button>
    </div>

    <input
      type="text"
      value={project.name}
      onChange={(e) => onChange({ ...project, name: e.target.value })}
      placeholder="Project name"
      className="w-full bg-[#0e0f16] border border-[#20222c] rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/60 transition-colors"
    />

    <textarea
      value={project.description}
      onChange={(e) => onChange({ ...project, description: e.target.value })}
      rows={2}
      placeholder="What does it do?"
      className="w-full bg-[#0e0f16] border border-[#20222c] rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/60 transition-colors resize-none"
    />

    <TagInput
      tags={project.techStack || []}
      onChange={(techStack) => onChange({ ...project, techStack })}
      placeholder="Add tech, press Enter"
    />

    <div className="grid grid-cols-2 gap-2.5">
      <input
        type="text"
        value={project.link || ""}
        onChange={(e) => onChange({ ...project, link: e.target.value })}
        placeholder="Live link"
        className="w-full bg-[#0e0f16] border border-[#20222c] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/60 transition-colors"
      />
      <input
        type="text"
        value={project.github || ""}
        onChange={(e) => onChange({ ...project, github: e.target.value })}
        placeholder="GitHub link"
        className="w-full bg-[#0e0f16] border border-[#20222c] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/60 transition-colors"
      />
    </div>
  </div>
);

const PortfolioBuilder = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [portfolio, setPortfolio] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [activeSection, setActiveSection] = useState("profile");
  const savedSnapshot = useRef(null);
  const [isDirty, setIsDirty] = useState(false);
  const [previewExpanded, setPreviewExpanded] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [portfolioRes, resumesRes] = await Promise.all([
          API.get("/portfolio/me"),
          API.get("/resume/my-resumes"),
        ]);
        setPortfolio(portfolioRes.data.data.portfolio);
        savedSnapshot.current = JSON.stringify(portfolioRes.data.data.portfolio);
        setResumes(resumesRes.data.resumes || []);
      } catch (err) {
        toast.error(err.response?.data?.message || "Couldn't load your portfolio.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Tracks whether there are unsaved edits, so the toolbar can show
  // "All changes saved" vs "Unsaved changes".
  useEffect(() => {
    if (loading || !portfolio) return;
    setIsDirty(JSON.stringify(portfolio) !== savedSnapshot.current);
  }, [portfolio, loading]);

  const publicUrl = useMemo(
    () => (portfolio ? `${PUBLIC_BASE}${portfolio.slug}` : ""),
    [portfolio]
  );

  const sectionStatus = useMemo(() => {
    if (!portfolio) return PORTFOLIO_SECTIONS.map((s) => ({ ...s, done: false }));
    const links = portfolio.links || {};
    const doneMap = {
      profile: Boolean(portfolio.headline?.trim() && portfolio.bio?.trim()),
      links: Object.values(links).some((v) => v?.trim()),
      skills: (portfolio.skills || []).length > 0,
      projects: (portfolio.projects || []).length > 0,
      publish: Boolean(portfolio.isPublic),
    };
    return PORTFOLIO_SECTIONS.map((s) => ({ ...s, done: doneMap[s.id] }));
  }, [portfolio]);

  const strengthScore = useMemo(() => {
    const doneCount = sectionStatus.filter((s) => s.done).length;
    return Math.round((doneCount / sectionStatus.length) * 100);
  }, [sectionStatus]);

  const missingSections = useMemo(
    () => sectionStatus.filter((s) => !s.done).map((s) => s.label),
    [sectionStatus]
  );

  const updateField = (field) => (value) =>
    setPortfolio((p) => ({ ...p, [field]: value }));

  const updateLink = (key) => (e) =>
    setPortfolio((p) => ({ ...p, links: { ...p.links, [key]: e.target.value } }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const { displayName, headline, bio, skills, projects, links, slug } = portfolio;
      const res = await API.put("/portfolio/me", { displayName, headline, bio, skills, projects, links, slug });
      setPortfolio(res.data.data.portfolio);
      savedSnapshot.current = JSON.stringify(res.data.data.portfolio);
      setIsDirty(false);
      toast.success("Portfolio saved");
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't save changes");
    } finally {
      setSaving(false);
    }
  };

  // A portfolio is one-per-account, so there's no row to drop the way a
  // resume has — "Delete" here permanently clears its content (headline,
  // bio, skills, projects, links) and saves that empty state right away.
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Delete all portfolio content? This clears your headline, bio, skills, projects and links and can't be undone."
    );
    if (!confirmed) return;

    setDeleting(true);
    try {
      const cleared = { ...blankPortfolioFields(), slug: portfolio.slug };
      const res = await API.put("/portfolio/me", cleared);
      setPortfolio(res.data.data.portfolio);
      savedSnapshot.current = JSON.stringify(res.data.data.portfolio);
      setIsDirty(false);
      setActiveSection("profile");
      toast.success("Portfolio content deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't delete portfolio content");
    } finally {
      setDeleting(false);
    }
  };

  // Clears local edits and starts the form over from the beginning. Nothing
  // is saved until the user hits Save, but any unsaved edits are lost, so we
  // confirm first.
  const handleRefresh = () => {
    const confirmed = window.confirm(
      "This will clear everything you've entered and start the portfolio form over from the beginning. Any unsaved changes will be lost. Continue?"
    );
    if (!confirmed) return;

    setPortfolio((p) => ({ ...p, ...blankPortfolioFields() }));
    setActiveSection("profile");
    window.alert("Portfolio form reset. You're starting fresh from Profile.");
    toast.success("Portfolio reset from the start");
  };

  const handlePublishToggle = async () => {
    setPublishing(true);
    try {
      const res = await API.patch("/portfolio/me/publish", { isPublic: !portfolio.isPublic });
      setPortfolio(res.data.data.portfolio);
      toast.success(res.data.data.portfolio.isPublic ? "Portfolio is now public" : "Portfolio is now private");
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't update visibility");
    } finally {
      setPublishing(false);
    }
  };

  const handleImport = async () => {
    if (!selectedResumeId) {
      toast.error("Pick a resume to import from");
      return;
    }
    setImporting(true);
    try {
      const res = await API.post("/portfolio/import", { resumeId: selectedResumeId });
      setPortfolio(res.data.data.portfolio);
      toast.success("Pulled skills and projects from your resume");
    } catch (err) {
      toast.error(err.response?.data?.message || "Import failed");
    } finally {
      setImporting(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    toast.success("Link copied");
  };

  const addProject = () =>
    setPortfolio((p) => ({ ...p, projects: [...(p.projects || []), { ...EMPTY_PROJECT }] }));

  const updateProject = (idx) => (next) =>
    setPortfolio((p) => ({
      ...p,
      projects: p.projects.map((proj, i) => (i === idx ? next : proj)),
    }));

  const removeProject = (idx) =>
    setPortfolio((p) => ({ ...p, projects: p.projects.filter((_, i) => i !== idx) }));

  const handlePrint = () => window.print();

  if (loading || !portfolio) {
    return (
      <div className="min-h-screen">
        <div className="flex items-center justify-center py-32">
          <Loader2 size={22} className="text-indigo-400 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-[#1c1e28]">
          <div>
            <h1 className="text-xl font-bold text-white">Portfolio Builder</h1>
            <p className="text-slate-500 text-[13px] mt-1">
              A public page recruiters can open — built from your resume and projects.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={handlePublishToggle}
              disabled={publishing}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors disabled:opacity-60 ${
                portfolio.isPublic
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-[#12141c] border-[#20222c] text-slate-400"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${portfolio.isPublic ? "bg-emerald-400" : "bg-slate-600"}`} />
              {portfolio.isPublic ? "Public" : "Private"}
            </button>
            <button
              type="button"
              onClick={handleRefresh}
              className="flex items-center gap-1.5 bg-[#12141c] border border-[#20222c] hover:border-amber-500/40 text-slate-300 hover:text-white text-xs font-semibold rounded-lg px-3 py-2 transition-colors"
            >
              <RefreshCw size={13} /> Refresh
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-1.5 bg-[#12141c] border border-[#20222c] hover:border-rose-500/40 text-slate-300 hover:text-rose-400 text-xs font-semibold rounded-lg px-3 py-2 transition-colors disabled:opacity-60"
            >
              {deleting ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />} Delete
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm rounded-lg px-4 py-2 transition-colors disabled:opacity-60"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Save
            </button>
          </div>
        </div>

        <p className="mt-2 text-xs font-medium">
          {saving ? (
            <span className="text-slate-500">Saving...</span>
          ) : isDirty ? (
            <span className="text-amber-400">Unsaved changes</span>
          ) : (
            <span className="text-emerald-400">All changes saved</span>
          )}
        </p>

        <div className="mt-5">
          <CompletionSummary label="Portfolio Strength" score={strengthScore} missing={missingSections} />
        </div>

        {/* Mobile stepper */}
        <div className="lg:hidden mt-5">
          <StepperRail
            orientation="horizontal"
            sections={sectionStatus}
            activeId={activeSection}
            onSelect={setActiveSection}
          />
        </div>

        <div className="mt-6 grid lg:grid-cols-[180px_1fr_390px] gap-6 items-start">
          {/* Connected stepper rail */}
          <div className="hidden lg:block sticky top-6">
            <StepperRail sections={sectionStatus} activeId={activeSection} onSelect={setActiveSection} />
          </div>

          <div className="min-w-0">
            {/* Only the active section renders — one at a time, not a long scroll */}
            {activeSection === "profile" && (
              <div>
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-3">Profile</p>
                <div>
                  <label className="text-[11px] font-medium text-slate-500 mb-1.5 block">Display Name</label>
                  <input
                    type="text"
                    value={portfolio.displayName || ""}
                    onChange={(e) => updateField("displayName")(e.target.value)}
                    placeholder={user?.name || "Your Name"}
                    className="w-full bg-[#12141c] border border-[#20222c] rounded-lg px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/60 transition-colors"
                  />
                  <p className="text-[11px] text-slate-600 mt-1.5">
                    Shown on your public page instead of your account name. Leave blank to use "{user?.name || "your account name"}".
                  </p>
                </div>

                <div className="mt-4">
                  <label className="text-[11px] font-medium text-slate-500 mb-1.5 block">Headline</label>
                  <input
                    type="text"
                    value={portfolio.headline || ""}
                    onChange={(e) => updateField("headline")(e.target.value)}
                    placeholder="Full-Stack Developer | Building products people use"
                    className="w-full bg-[#12141c] border border-[#20222c] rounded-lg px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/60 transition-colors"
                  />
                </div>

                <div className="mt-4">
                  <label className="text-[11px] font-medium text-slate-500 mb-1.5 block">Bio</label>
                  <textarea
                    value={portfolio.bio || ""}
                    onChange={(e) => updateField("bio")(e.target.value)}
                    rows={4}
                    placeholder="A short summary of who you are and what you build."
                    className="w-full bg-[#12141c] border border-[#20222c] rounded-lg px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/60 transition-colors resize-none"
                  />
                </div>
              </div>
            )}

            {activeSection === "links" && (
              <div>
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-3">Links</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="flex items-center gap-2 bg-[#12141c] border border-[#20222c] rounded-lg px-3 focus-within:border-indigo-500/60">
                    <Code2 size={14} className="text-slate-500 shrink-0" />
                    <input
                      type="text"
                      value={portfolio.links?.github || ""}
                      onChange={updateLink("github")}
                      placeholder="github.com/you"
                      className="flex-1 bg-transparent py-2.5 text-sm text-slate-200 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 bg-[#12141c] border border-[#20222c] rounded-lg px-3 focus-within:border-indigo-500/60">
                    <Briefcase size={14} className="text-slate-500 shrink-0" />
                    <input
                      type="text"
                      value={portfolio.links?.linkedin || ""}
                      onChange={updateLink("linkedin")}
                      placeholder="linkedin.com/in/you"
                      className="flex-1 bg-transparent py-2.5 text-sm text-slate-200 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 bg-[#12141c] border border-[#20222c] rounded-lg px-3 focus-within:border-indigo-500/60">
                    <Globe size={14} className="text-slate-500 shrink-0" />
                    <input
                      type="text"
                      value={portfolio.links?.website || ""}
                      onChange={updateLink("website")}
                      placeholder="yoursite.com"
                      className="flex-1 bg-transparent py-2.5 text-sm text-slate-200 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 bg-[#12141c] border border-[#20222c] rounded-lg px-3 focus-within:border-indigo-500/60">
                    <AtSign size={14} className="text-slate-500 shrink-0" />
                    <input
                      type="text"
                      value={portfolio.links?.twitter || ""}
                      onChange={updateLink("twitter")}
                      placeholder="x.com/you"
                      className="flex-1 bg-transparent py-2.5 text-sm text-slate-200 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === "skills" && (
              <div>
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-3">Skills</p>
                <TagInput
                  tags={portfolio.skills || []}
                  onChange={updateField("skills")}
                  placeholder="Add a skill, press Enter"
                />
              </div>
            )}

            {activeSection === "projects" && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Projects</p>
                  <button
                    type="button"
                    onClick={addProject}
                    className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                  >
                    <Plus size={13} />
                    Add project
                  </button>
                </div>

                {(!portfolio.projects || portfolio.projects.length === 0) ? (
                  <div className="bg-[#12141c] border border-dashed border-[#20222c] rounded-xl py-8 text-center">
                    <p className="text-[12px] text-slate-600">No projects yet — add one or import from a resume.</p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {portfolio.projects.map((project, idx) => (
                      <ProjectEditor
                        key={idx}
                        project={project}
                        index={idx}
                        onChange={updateProject(idx)}
                        onRemove={() => removeProject(idx)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeSection === "publish" && (
              <div>
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-3">Publish</p>

                <div>
                  <label className="text-[11px] font-medium text-slate-500 mb-1.5 block">Public link</label>
                  <div className="flex items-center gap-0 bg-[#12141c] border border-[#20222c] rounded-lg overflow-hidden focus-within:border-indigo-500/60">
                    <span className="pl-3 text-xs text-slate-600 whitespace-nowrap">{PUBLIC_BASE}</span>
                    <input
                      type="text"
                      value={portfolio.slug}
                      onChange={(e) => updateField("slug")(e.target.value)}
                      className="flex-1 bg-transparent px-1 py-2.5 text-sm text-slate-200 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 bg-[#12141c] border border-[#20222c] rounded-xl px-4 py-3">
                  <span className="text-xs text-slate-500 truncate flex-1">{publicUrl}</span>
                  <button
                    type="button"
                    onClick={copyLink}
                    className="p-1.5 rounded-md text-slate-500 hover:text-white hover:bg-[#1c1e28] shrink-0"
                  >
                    <Copy size={14} />
                  </button>
                  {portfolio.isPublic && (
                    <a
                      href={publicUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-md text-slate-500 hover:text-white hover:bg-[#1c1e28] shrink-0"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handlePublishToggle}
                  disabled={publishing}
                  className={`mt-3 w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-semibold border transition-colors disabled:opacity-60 ${
                    portfolio.isPublic
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : "bg-[#12141c] border-[#20222c] text-slate-400 hover:border-indigo-500/40"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${portfolio.isPublic ? "bg-emerald-400" : "bg-slate-600"}`} />
                  {portfolio.isPublic ? "Portfolio is public — anyone with the link can view it" : "Make portfolio public"}
                </button>

                <div className="mt-6 pt-5 border-t border-[#1c1e28]">
                  <label className="text-[11px] font-medium text-slate-500 mb-1.5 block">Import from resume</label>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <select
                      value={selectedResumeId}
                      onChange={(e) => setSelectedResumeId(e.target.value)}
                      className="flex-1 min-w-0 bg-[#12141c] border border-[#20222c] rounded-lg px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-indigo-500/60"
                    >
                      <option value="">Select a resume to import from...</option>
                      {resumes.map((r) => (
                        <option key={r.id} value={r.id}>{r.originalName}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={handleImport}
                      disabled={importing}
                      className="flex items-center justify-center gap-2 bg-[#12141c] border border-[#20222c] hover:border-indigo-500/40 text-slate-300 hover:text-white text-sm font-semibold rounded-lg px-4 py-2.5 transition-colors disabled:opacity-60 shrink-0"
                    >
                      {importing ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                      Import skills & projects
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Prev / Next / Save — navigates one section at a time */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#1c1e28]">
              {(() => {
                const idx = PORTFOLIO_SECTIONS.findIndex((s) => s.id === activeSection);
                const prev = PORTFOLIO_SECTIONS[idx - 1];
                const next = PORTFOLIO_SECTIONS[idx + 1];
                return (
                  <>
                    {prev ? (
                      <button
                        type="button"
                        onClick={() => setActiveSection(prev.id)}
                        className="text-xs font-semibold text-slate-400 hover:text-white px-3 py-2"
                      >
                        ← {prev.label}
                      </button>
                    ) : <span />}
                    {next ? (
                      <button
                        type="button"
                        onClick={() => setActiveSection(next.id)}
                        className="flex items-center gap-2 bg-[#12141c] border border-[#20222c] hover:border-indigo-500/40 text-slate-300 hover:text-white text-xs font-semibold rounded-lg px-4 py-2.5 transition-colors"
                      >
                        Next: {next.label} →
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm rounded-lg px-5 py-2.5 transition-colors disabled:opacity-60"
                      >
                        {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                        Save changes
                      </button>
                    )}
                  </>
                );
              })()}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-6">
              <div
                className="flex items-center justify-between bg-[#12141c] border border-[#20222c] rounded-lg px-3 py-1.5 mb-2"
                style={{ width: 374 }}
              >
                <span className="text-[11px] font-medium text-slate-500">55%</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setPreviewExpanded(true)}
                    className="p-1.5 rounded-md text-slate-500 hover:text-white hover:bg-[#1c1e28] transition-colors"
                    aria-label="Expand preview"
                  >
                    <Maximize2 size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="p-1.5 rounded-md text-slate-500 hover:text-white hover:bg-[#1c1e28] transition-colors"
                    aria-label="Print portfolio"
                  >
                    <Printer size={13} />
                  </button>
                </div>
              </div>
              {/* Fixed 390px column + no overflow-hidden: the visual size
                  after scale(0.55) is ~374px, so it fits without clipping
                  or squeezing the form column next to it. */}
              <div className="border border-[#20222c] rounded-xl" style={{ transform: "scale(0.55)", transformOrigin: "top left" }}>
                <PortfolioPreview portfolio={portfolio} name={portfolio.displayName || user?.name} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {previewExpanded && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center overflow-auto py-10 px-4"
          onClick={() => setPreviewExpanded(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="relative">
            <div className="sticky top-0 flex items-center justify-end gap-2 mb-3 z-10">
              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-[#12141c] border border-[#20222c] rounded-lg px-3 py-1.5 transition-colors"
              >
                <Printer size={13} /> Print
              </button>
              <button
                type="button"
                onClick={() => setPreviewExpanded(false)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-[#12141c] border border-[#20222c] rounded-lg px-3 py-1.5 transition-colors"
              >
                <Minimize2 size={13} /> Close
              </button>
            </div>
            <div className="border border-[#20222c] rounded-xl overflow-hidden">
              <PortfolioPreview portfolio={portfolio} name={portfolio.displayName || user?.name} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioBuilder;