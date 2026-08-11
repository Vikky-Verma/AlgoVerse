import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import html2pdf from "html2pdf.js";
import PortfolioPreview from "../components/portfolioBuilder/PortfolioPreview";
import {
  Award,
  BriefcaseBusiness,
  ChevronRight,
  CircleUserRound,
  Code2,
  Download,
  Eye,
  FolderKanban,
  FolderOpen,
  Globe2,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Plus,
  RefreshCw,
  Save,
  Sparkles,
  Trash2,
  Trophy,
  Upload,
  User,
  UserRound,
  Wrench,
  X,
} from "lucide-react";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const STORAGE_KEY = "algoVerse_portfolio_builder";

const defaultPortfolio = {
  name: "Vikky Verma",
  tagline: "Full Stack Developer",
  location: "Gorakhpur, India",
  email: "vikkyverma@email.com",
  phone: "+91 98765 43210",
  bio:
    "Passionate developer building modern web applications with JavaScript, React, Node.js and more.",
  profileImage: "",
  github: "github.com/vikkyverma",
  linkedin: "linkedin.com/in/vikkyverma",
  website: "yourname.dev",

  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Express.js",
    "Next.js",
    "MongoDB",
    "Tailwind CSS",
  ],

  experience: [
    {
      title: "Full Stack Developer",
      company: "Tech Solutions Inc.",
      duration: "Jan 2023 - Present",
      description:
        "Building scalable web applications using MERN stack. Collaborating with cross-functional teams to deliver high-quality solutions.",
    },
    {
      title: "Frontend Developer",
      company: "Web Creators",
      duration: "Jun 2021 - Dec 2022",
      description:
        "Developed responsive user interfaces using React.js and Tailwind CSS. Improved application performance and user experience.",
    },
  ],

  education: [
    {
      degree: "Bachelor of Technology",
      institute: "Lovely Professional University",
      duration: "2019 - 2023",
      description: "Computer Science and Engineering • CGPA: 8.45",
    },
    {
      degree: "Senior Secondary (12th)",
      institute: "DAV Public School",
      duration: "2018 - 2019",
      description: "Science Stream • Percentage: 92.6%",
    },
  ],

  projects: [
    {
      name: "AI Resume Analyzer",
      description:
        "AI-powered resume analysis tool with ATS scoring and feedback.",
      tech: ["React", "Node.js", "MongoDB"],
      image: "",
      live: "#",
      github: "https://github.com/vikkyverma",
    },
    {
      name: "Smart Library System",
      description:
        "Library management system with student, books, issue/return management.",
      tech: ["React", "Node.js", "MongoDB"],
      image: "",
      live: "#",
      github: "https://github.com/vikkyverma",
    },
    {
      name: "E-Commerce Website",
      description:
        "Full-stack e-commerce platform with cart, orders and payment integration.",
      tech: ["Next.js", "Stripe", "MongoDB"],
      image: "",
      live: "#",
      github: "https://github.com/vikkyverma",
    },
  ],

  achievements: [
    {
      title: "LeetCode",
      subtitle: "Highest Rating",
      value: "1559",
      icon: "🏅",
    },
    {
      title: "CodeChef",
      subtitle: "Rating",
      value: "1821",
      icon: "👨‍🍳",
    },
    {
      title: "Codeforces",
      subtitle: "Rating",
      value: "1508",
      icon: "📊",
    },
    {
      title: "Winner",
      subtitle: "Hackathon 2023",
      value: "1st Position",
      icon: "🏆",
    },
    {
      title: "Certificates",
      subtitle: "Earned",
      value: "5+",
      icon: "⭐",
    },
  ],
};

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "about", label: "About", icon: UserRound },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "contact", label: "Contact", icon: Mail },
];

function Input({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-[10px] text-slate-500 mb-1">
        {label}
      </label>

      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-9 rounded-md border border-[#20283b] bg-[#080d17] px-3 text-[11px] text-slate-200 outline-none focus:border-purple-500"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 4 }) {
  return (
    <div>
      <label className="block text-[10px] text-slate-500 mb-1">
        {label}
      </label>

      <textarea
        rows={rows}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-[#20283b] bg-[#080d17] px-3 py-2 text-[11px] text-slate-200 outline-none focus:border-purple-500 resize-none"
      />
    </div>
  );
}

function TagEditor({ tags, setTags }) {
  const [value, setValue] = useState("");

  const add = () => {
    const clean = value.trim();

    if (!clean) return;

    if (!tags.includes(clean)) {
      setTags([...tags, clean]);
    }

    setValue("");
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 rounded-md bg-[#17132b] border border-purple-500/20 px-2 py-1 text-[10px] text-purple-300"
          >
            {tag}

            <button
              onClick={() =>
                setTags(tags.filter((item) => item !== tag))
              }
              className="text-slate-500 hover:text-red-400"
            >
              <X size={10} />
            </button>
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder="Type skill and press Enter"
          className="flex-1 h-9 rounded-md border border-[#20283b] bg-[#080d17] px-3 text-[11px] text-white outline-none"
        />

        <button
          onClick={add}
          className="px-3 rounded-md bg-purple-600 text-white text-[11px]"
        >
          Add
        </button>
      </div>
    </div>
  );
}

function ArrayEditor({
  title,
  items,
  setItems,
  fields,
  createItem,
}) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-lg border border-[#20283b] bg-[#090e19] p-3"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] text-purple-400 uppercase">
              {title} {index + 1}
            </span>

            <button
              onClick={() =>
                setItems(items.filter((_, i) => i !== index))
              }
              className="text-slate-500 hover:text-red-400"
            >
              <Trash2 size={13} />
            </button>
          </div>

          <div className="space-y-2">
            {fields.map((field) => (
              <Input
                key={field.key}
                label={field.label}
                value={item[field.key]}
                onChange={(value) => {
                  const copy = [...items];

                  copy[index] = {
                    ...copy[index],
                    [field.key]: value,
                  };

                  setItems(copy);
                }}
              />
            ))}

            {fields.some((field) => field.textarea) && (
              <TextArea
                label="Description"
                value={item.description}
                onChange={(value) => {
                  const copy = [...items];

                  copy[index] = {
                    ...copy[index],
                    description: value,
                  };

                  setItems(copy);
                }}
              />
            )}
          </div>
        </div>
      ))}

      <button
        onClick={() => setItems([...items, createItem()])}
        className="w-full h-9 rounded-md border border-dashed border-purple-500/40 text-purple-300 text-[11px] hover:bg-purple-500/10"
      >
        <Plus size={13} className="inline mr-1" />
        Add {title}
      </button>
    </div>
  );
}

export default function PortfolioBuilder() {
  const [portfolio, setPortfolio] = useState(defaultPortfolio);
  const [activeSection, setActiveSection] = useState("profile");
  const [saved, setSaved] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      try {
        setPortfolio(JSON.parse(savedData));
      } catch {
        setPortfolio(defaultPortfolio);
      }
    }
  }, []);

  const update = (field, value) => {
    setPortfolio((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSaved(false);
  };

  const saveChanges = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
    setSaved(true);
    toast.success("Changes saved locally");
  };

  const clearAll = () => {
    if (!window.confirm("Clear your portfolio data?")) return;

    localStorage.removeItem(STORAGE_KEY);
    setPortfolio(defaultPortfolio);
    setSaved(false);

    toast.success("Portfolio cleared");
  };

  const handleImage = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      update("profileImage", reader.result);
    };

    reader.readAsDataURL(file);
  };

  const completed = useMemo(() => {
    let score = 0;

    if (portfolio.name) score += 10;
    if (portfolio.tagline) score += 10;
    if (portfolio.bio) score += 10;
    if (portfolio.profileImage) score += 10;
    if (portfolio.skills.length) score += 15;
    if (portfolio.experience.length) score += 15;
    if (portfolio.education.length) score += 10;
    if (portfolio.projects.length) score += 10;
    if (portfolio.achievements.length) score += 10;

    return score;
  }, [portfolio]);

  const downloadPortfolio = async () => {
  const element = document.getElementById("portfolio-to-print");

  if (!element) {
    toast.error("Portfolio preview not found");
    return;
  }

  toast.loading("Generating PDF...", {
    id: "portfolio-pdf",
  });

  const options = {
    margin: [8, 8, 8, 8],

    filename: `${portfolio.name
      .replace(/\s+/g, "-")
      .toLowerCase()}-portfolio.pdf`,

    image: {
      type: "jpeg",
      quality: 0.98,
    },

    html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: "#030712",
      logging: false,
    },

    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    },

    pagebreak: {
      mode: ["css", "legacy"],
    },
  };

  try {
    await html2pdf()
      .set(options)
      .from(element)
      .save();

    toast.success("Portfolio PDF downloaded!", {
      id: "portfolio-pdf",
    });
  } catch (error) {
    console.error("PDF generation error:", error);

    toast.error("Failed to generate PDF", {
      id: "portfolio-pdf",
    });
  }
};

  if (!portfolio) return null;

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200">

      {/* TOP BUILDER BAR */}

      <div className="border-b border-[#172033] bg-[#050a13] px-4 py-3">

        <div className="flex flex-col xl:flex-row xl:items-center gap-4">

          <div className="w-full xl:w-48">

            <h1 className="text-sm font-bold text-white tracking-wide">
              PORTFOLIO BUILDER
            </h1>

            <p className="text-[9px] text-slate-500">
              Build your professional portfolio in minutes 🚀
            </p>

          </div>

          <div className="flex-1">

            <div className="flex justify-between text-[9px] mb-1">

              <span>Portfolio Strength</span>

              <span className="text-purple-400 font-bold">
                {completed}%
              </span>

            </div>

            <div className="h-1.5 bg-[#151c2c] rounded-full overflow-hidden">

              <div
                className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-500"
                style={{ width: `${completed}%` }}
              />

            </div>

            <div className="text-[8px] text-green-400 mt-1">
              ● Great job! Keep it up.
            </div>

          </div>

          <div className="flex gap-2">

            <button
              onClick={() =>
                document
                  .getElementById("portfolio-preview")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="h-8 px-3 rounded-md border border-[#283247] text-[10px] flex items-center gap-1"
            >
              <Eye size={12} />
              Preview
            </button>

            <button
              onClick={downloadPortfolio}
              className="h-8 px-3 rounded-md bg-gradient-to-r from-purple-600 to-fuchsia-600 text-[10px] flex items-center gap-1"
            >
              <Download size={12} />
              Download Portfolio
            </button>

          </div>

        </div>

      </div>

      {/* BASIC INFO */}

      <div className="px-4 py-3 border-b border-[#172033] bg-[#050a13]">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

          <Input
            label="Your Name / Brand"
            value={portfolio.name}
            onChange={(value) => update("name", value)}
          />

          <Input
            label="Portfolio Tagline"
            value={portfolio.tagline}
            onChange={(value) => update("tagline", value)}
          />

          <Input
            label="Custom Domain (Optional)"
            value={portfolio.website}
            onChange={(value) => update("website", value)}
          />

        </div>

        <div className="flex justify-end mt-3">

          <button
            onClick={saveChanges}
            className="px-4 h-8 rounded-md bg-purple-600 text-[10px] flex items-center gap-1"
          >
            <Save size={12} />

            {saved ? "Save Changes" : "Save Changes *"}
          </button>

        </div>

      </div>

      {/* NAVIGATION */}

      <div className="border-b border-[#172033] bg-[#070c16] overflow-x-auto">

        <div className="flex min-w-max">

          {sections.map((section) => {

            const Icon = section.icon;

            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-5 py-3 text-[10px] flex items-center gap-1.5 border-b-2 transition ${
                  activeSection === section.id
                    ? "text-purple-400 border-purple-500 bg-purple-500/5"
                    : "text-slate-400 border-transparent hover:text-white"
                }`}
              >
                <Icon size={12} />
                {section.label}
              </button>
            );
          })}

        </div>

      </div>

      {/* MAIN */}

      <div className="grid grid-cols-1 xl:grid-cols-[390px_1fr] min-h-[900px]">

        {/* EDITOR */}

        <div className="border-r border-[#172033] p-4">

          {activeSection === "profile" && (
            <div className="space-y-4">

              <div>

                <h2 className="text-sm font-semibold text-white">
                  Profile
                </h2>

                <p className="text-[9px] text-slate-500">
                  Add your basic information.
                </p>

              </div>

              <div className="flex items-center gap-3">

                <div className="w-16 h-16 rounded-full border-2 border-purple-500 overflow-hidden bg-[#111827]">

                  {portfolio.profileImage ? (
                    <img
                      src={portfolio.profileImage}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-purple-400">
                      <User size={24} />
                    </div>
                  )}

                </div>

                <div className="flex gap-2">

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-2 border border-[#283247] rounded-md text-[9px]"
                  >
                    <Upload size={11} className="inline mr-1" />
                    Change Photo
                  </button>

                  <button
                    onClick={() => update("profileImage", "")}
                    className="px-3 py-2 border border-red-500/20 text-red-400 rounded-md text-[9px]"
                  >
                    Remove
                  </button>

                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImage}
                />

              </div>

              <div className="grid grid-cols-2 gap-3">

                <Input
                  label="Full Name"
                  value={portfolio.name}
                  onChange={(value) => update("name", value)}
                />

                <Input
                  label="Professional Title"
                  value={portfolio.tagline}
                  onChange={(value) => update("tagline", value)}
                />

                <Input
                  label="Location"
                  value={portfolio.location}
                  onChange={(value) => update("location", value)}
                />

                <Input
                  label="Email"
                  value={portfolio.email}
                  onChange={(value) => update("email", value)}
                />

                <Input
                  label="Phone"
                  value={portfolio.phone}
                  onChange={(value) => update("phone", value)}
                />

                <Input
                  label="Website"
                  value={portfolio.website}
                  onChange={(value) => update("website", value)}
                />

              </div>

              <TextArea
                label="Bio"
                value={portfolio.bio}
                onChange={(value) => update("bio", value)}
                rows={6}
              />

            </div>
          )}

          {activeSection === "about" && (
            <div className="space-y-4">

              <h2 className="text-sm font-semibold">
                About Me
              </h2>

              <TextArea
                label="Introduction"
                value={portfolio.bio}
                onChange={(value) => update("bio", value)}
                rows={10}
              />

            </div>
          )}

          {activeSection === "skills" && (
            <div className="space-y-4">

              <h2 className="text-sm font-semibold">
                Skills
              </h2>

              <TagEditor
                tags={portfolio.skills}
                setTags={(value) => update("skills", value)}
              />

            </div>
          )}

          {activeSection === "experience" && (
            <div>

              <h2 className="text-sm font-semibold mb-4">
                Experience
              </h2>

              <ArrayEditor
                title="Experience"
                items={portfolio.experience}
                setItems={(value) => update("experience", value)}
                fields={[
                  { key: "title", label: "Job Title" },
                  { key: "company", label: "Company" },
                  { key: "duration", label: "Duration" },
                  {
                    key: "description",
                    label: "Description",
                    textarea: true,
                  },
                ]}
                createItem={() => ({
                  title: "",
                  company: "",
                  duration: "",
                  description: "",
                })}
              />

            </div>
          )}

          {activeSection === "education" && (
            <div>

              <h2 className="text-sm font-semibold mb-4">
                Education
              </h2>

              <ArrayEditor
                title="Education"
                items={portfolio.education}
                setItems={(value) => update("education", value)}
                fields={[
                  { key: "degree", label: "Degree" },
                  { key: "institute", label: "Institute" },
                  { key: "duration", label: "Duration" },
                  {
                    key: "description",
                    label: "Description",
                    textarea: true,
                  },
                ]}
                createItem={() => ({
                  degree: "",
                  institute: "",
                  duration: "",
                  description: "",
                })}
              />

            </div>
          )}

          {activeSection === "projects" && (
            <div className="space-y-3">

              <h2 className="text-sm font-semibold">
                Projects
              </h2>

              {portfolio.projects.map((project, index) => (

                <div
                  key={index}
                  className="p-3 rounded-lg border border-[#20283b] bg-[#090e19] space-y-2"
                >

                  <div className="flex justify-between">

                    <span className="text-[10px] text-purple-400">
                      Project {index + 1}
                    </span>

                    <button
                      onClick={() =>
                        update(
                          "projects",
                          portfolio.projects.filter(
                            (_, i) => i !== index
                          )
                        )
                      }
                    >
                      <Trash2
                        size={13}
                        className="text-slate-500 hover:text-red-400"
                      />
                    </button>

                  </div>

                  <Input
                    label="Project Name"
                    value={project.name}
                    onChange={(value) => {

                      const copy = [...portfolio.projects];

                      copy[index] = {
                        ...copy[index],
                        name: value,
                      };

                      update("projects", copy);

                    }}
                  />

                  <TextArea
                    label="Description"
                    value={project.description}
                    onChange={(value) => {

                      const copy = [...portfolio.projects];

                      copy[index] = {
                        ...copy[index],
                        description: value,
                      };

                      update("projects", copy);

                    }}
                    rows={3}
                  />

                  <Input
                    label="Live Link"
                    value={project.live}
                    onChange={(value) => {

                      const copy = [...portfolio.projects];

                      copy[index] = {
                        ...copy[index],
                        live: value,
                      };

                      update("projects", copy);

                    }}
                  />

                  <Input
                    label="GitHub"
                    value={project.github}
                    onChange={(value) => {

                      const copy = [...portfolio.projects];

                      copy[index] = {
                        ...copy[index],
                        github: value,
                      };

                      update("projects", copy);

                    }}
                  />

                </div>

              ))}

              <button
                onClick={() =>
                  update("projects", [
                    ...portfolio.projects,
                    {
                      name: "",
                      description: "",
                      tech: [],
                      image: "",
                      live: "#",
                      github: "",
                    },
                  ])
                }
                className="w-full h-9 border border-dashed border-purple-500/40 rounded-md text-[10px] text-purple-400"
              >
                <Plus size={12} className="inline mr-1" />
                Add Project
              </button>

            </div>
          )}

          {activeSection === "achievements" && (
            <div>

              <h2 className="text-sm font-semibold mb-4">
                Achievements
              </h2>

              <ArrayEditor
                title="Achievement"
                items={portfolio.achievements}
                setItems={(value) => update("achievements", value)}
                fields={[
                  { key: "title", label: "Title" },
                  { key: "subtitle", label: "Subtitle" },
                  { key: "value", label: "Value" },
                  { key: "icon", label: "Emoji / Icon" },
                ]}
                createItem={() => ({
                  title: "",
                  subtitle: "",
                  value: "",
                  icon: "🏆",
                })}
              />

            </div>
          )}

          {activeSection === "contact" && (
            <div className="space-y-4">

              <h2 className="text-sm font-semibold">
                Contact & Social Links
              </h2>

              <Input
                label="GitHub"
                value={portfolio.github}
                onChange={(value) => update("github", value)}
                placeholder="github.com/username"
              />

              <Input
                label="LinkedIn"
                value={portfolio.linkedin}
                onChange={(value) => update("linkedin", value)}
                placeholder="linkedin.com/in/username"
              />

              <Input
                label="Email"
                value={portfolio.email}
                onChange={(value) => update("email", value)}
              />

              <Input
                label="Phone"
                value={portfolio.phone}
                onChange={(value) => update("phone", value)}
              />

              <Input
                label="Location"
                value={portfolio.location}
                onChange={(value) => update("location", value)}
              />

            </div>
          )}

          {/* LOCAL ACTIONS */}

          <div className="mt-8 pt-4 border-t border-[#172033] flex gap-2">

            <button
              onClick={saveChanges}
              className="flex-1 h-9 rounded-md bg-purple-600 text-[10px] flex justify-center items-center gap-1"
            >
              <Save size={12} />
              Save Locally
            </button>

            <button
              onClick={downloadPortfolio}
              className="flex-1 h-9 rounded-md bg-[#151c2c] border border-[#283247] text-[10px] flex justify-center items-center gap-1"
            >
              <Download size={12} />
              Download
            </button>

            <button
              onClick={clearAll}
              className="h-9 px-3 rounded-md border border-red-500/20 text-red-400"
            >
              <Trash2 size={12} />
            </button>

          </div>

        </div>

        {/* PREVIEW */}

        <div
          id="portfolio-preview"
          className="bg-[#020617] p-4 xl:p-6"
        >

          <div className="flex items-center gap-2 mb-3">

            <span className="w-2 h-2 rounded-full bg-green-400" />

            <span className="text-[10px] text-slate-400">
              Live Preview
            </span>

          </div>

          <PortfolioPreview portfolio={portfolio} />

        </div>

      </div>

    </div>
  );
}