import React, { useMemo, useState } from "react";
import ResumePreview from "../components/resumeBuilder/ResumePreview";

const emptyExperience = {
  company: "",
  role: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
};

const emptyEducation = {
  degree: "",
  institution: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
};

const emptyProject = {
  name: "",
  link: "",
  technologies: "",
  description: "",
};

const emptyAchievement = {
  title: "",
  organization: "",
  date: "",
  description: "",
};

const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState("Profile");

  const [target, setTarget] = useState({
    role: "",
    company: "",
    jobDescription: "",
  });

  const [resume, setResume] = useState({
    profile: {
      fullName: "",
      location: "",
      email: "",
      phone: "",
      github: "",
      linkedin: "",
      portfolio: "",
      summary: "",
    },

    experience: [{ ...emptyExperience }],

    education: [{ ...emptyEducation }],

    skills: {
      languages: "",
      frameworks: "",
      databases: "",
      tools: "",
      other: "",
    },

    projects: [{ ...emptyProject }],

    achievements: [{ ...emptyAchievement }],
  });

  const sections = [
    "Profile",
    "Experience",
    "Education",
    "Skills",
    "Projects",
    "Achievements",
  ];

  const updateProfile = (field, value) => {
    setResume((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }));
  };

  const updateArrayItem = (section, index, field, value) => {
    setResume((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      ),
    }));
  };

  const addArrayItem = (section, template) => {
    setResume((prev) => ({
      ...prev,
      [section]: [...prev[section], { ...template }],
    }));
  };

  const removeArrayItem = (section, index) => {
    setResume((prev) => ({
      ...prev,
      [section]:
        prev[section].length > 1
          ? prev[section].filter((_, i) => i !== index)
          : prev[section],
    }));
  };

  const updateSkills = (field, value) => {
    setResume((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [field]: value,
      },
    }));
  };

  const calculateStrength = useMemo(() => {
    let score = 0;

    const { profile } = resume;

    if (profile.fullName) score += 10;
    if (profile.location) score += 5;
    if (profile.email) score += 5;
    if (profile.phone) score += 5;
    if (profile.github) score += 5;
    if (profile.linkedin) score += 5;
    if (profile.portfolio) score += 5;
    if (profile.summary) score += 10;

    if (
      resume.experience.some(
        (item) => item.company || item.role || item.description
      )
    ) {
      score += 15;
    }

    if (
      resume.education.some(
        (item) => item.degree || item.institution
      )
    ) {
      score += 10;
    }

    if (
      Object.values(resume.skills).some(
        (value) => value.trim() !== ""
      )
    ) {
      score += 10;
    }

    if (
      resume.projects.some(
        (item) => item.name || item.description
      )
    ) {
      score += 10;
    }

    if (
      resume.achievements.some(
        (item) => item.title || item.description
      )
    ) {
      score += 5;
    }

    return Math.min(score, 100);
  }, [resume]);

  const handleTargetChange = (field, value) => {
    setTarget((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderInput = (
    label,
    value,
    onChange,
    placeholder = "",
    type = "text"
  ) => (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-800 bg-[#080b12] px-4 py-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      />
    </div>
  );

  const renderTextarea = (
    label,
    value,
    onChange,
    placeholder = ""
  ) => (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={5}
        className="w-full resize-y rounded-xl border border-slate-800 bg-[#080b12] px-4 py-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      />
    </div>
  );

  const renderProfile = () => (
    <div>
      <div className="mb-7">
        <h2 className="text-2xl font-bold text-white">Profile</h2>

        <p className="mt-1 text-sm text-slate-500">
          Your contact information appears at the top of the resume.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {renderInput(
          "Full Name",
          resume.profile.fullName,
          (v) => updateProfile("fullName", v),
          "e.g. Vikky Verma"
        )}

        {renderInput(
          "Location",
          resume.profile.location,
          (v) => updateProfile("location", v),
          "e.g. Gorakhpur, India"
        )}

        {renderInput(
          "Email",
          resume.profile.email,
          (v) => updateProfile("email", v),
          "name@email.com",
          "email"
        )}

        {renderInput(
          "Phone",
          resume.profile.phone,
          (v) => updateProfile("phone", v),
          "+91 XXXXX XXXXX"
        )}

        {renderInput(
          "GitHub",
          resume.profile.github,
          (v) => updateProfile("github", v),
          "github.com/username"
        )}

        {renderInput(
          "LinkedIn",
          resume.profile.linkedin,
          (v) => updateProfile("linkedin", v),
          "linkedin.com/in/username"
        )}

        <div className="md:col-span-2">
          {renderInput(
            "Portfolio",
            resume.profile.portfolio,
            (v) => updateProfile("portfolio", v),
            "portfolio.dev"
          )}
        </div>

        <div className="md:col-span-2">
          {renderTextarea(
            "Professional Summary",
            resume.profile.summary,
            (v) => updateProfile("summary", v),
            "Write a concise, ATS-friendly summary..."
          )}
        </div>
      </div>
    </div>
  );

  const renderExperience = () => (
    <div>
      <div className="mb-7">
        <h2 className="text-2xl font-bold text-white">
          Experience
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Add internships, jobs and relevant professional experience.
        </p>
      </div>

      <div className="space-y-6">
        {resume.experience.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-800 bg-[#0a0d15] p-5"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-semibold text-white">
                Experience {index + 1}
              </h3>

              {resume.experience.length > 1 && (
                <button
                  onClick={() =>
                    removeArrayItem("experience", index)
                  }
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {renderInput(
                "Job Title",
                item.role,
                (v) =>
                  updateArrayItem(
                    "experience",
                    index,
                    "role",
                    v
                  ),
                "Software Engineer"
              )}

              {renderInput(
                "Company",
                item.company,
                (v) =>
                  updateArrayItem(
                    "experience",
                    index,
                    "company",
                    v
                  ),
                "Company name"
              )}

              {renderInput(
                "Location",
                item.location,
                (v) =>
                  updateArrayItem(
                    "experience",
                    index,
                    "location",
                    v
                  ),
                "City, Country"
              )}

              <div />

              {renderInput(
                "Start Date",
                item.startDate,
                (v) =>
                  updateArrayItem(
                    "experience",
                    index,
                    "startDate",
                    v
                  ),
                "Jan 2025"
              )}

              {renderInput(
                "End Date",
                item.endDate,
                (v) =>
                  updateArrayItem(
                    "experience",
                    index,
                    "endDate",
                    v
                  ),
                "Present"
              )}

              <div className="md:col-span-2">
                {renderTextarea(
                  "Responsibilities & Achievements",
                  item.description,
                  (v) =>
                    updateArrayItem(
                      "experience",
                      index,
                      "description",
                      v
                    ),
                  "Use action verbs and measurable achievements..."
                )}
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() =>
            addArrayItem("experience", emptyExperience)
          }
          className="rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-5 py-3 text-sm font-semibold text-indigo-300 hover:bg-indigo-500/20"
        >
          + Add Experience
        </button>
      </div>
    </div>
  );

  const renderEducation = () => (
    <div>
      <div className="mb-7">
        <h2 className="text-2xl font-bold text-white">
          Education
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Add your academic qualifications.
        </p>
      </div>

      <div className="space-y-6">
        {resume.education.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-800 bg-[#0a0d15] p-5"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-semibold text-white">
                Education {index + 1}
              </h3>

              {resume.education.length > 1 && (
                <button
                  onClick={() =>
                    removeArrayItem("education", index)
                  }
                  className="text-sm text-red-400"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {renderInput(
                "Degree",
                item.degree,
                (v) =>
                  updateArrayItem(
                    "education",
                    index,
                    "degree",
                    v
                  ),
                "B.Tech in Computer Science"
              )}

              {renderInput(
                "Institution",
                item.institution,
                (v) =>
                  updateArrayItem(
                    "education",
                    index,
                    "institution",
                    v
                  ),
                "University / College"
              )}

              {renderInput(
                "Location",
                item.location,
                (v) =>
                  updateArrayItem(
                    "education",
                    index,
                    "location",
                    v
                  ),
                "Gorakhpur, India"
              )}

              <div />

              {renderInput(
                "Start Date",
                item.startDate,
                (v) =>
                  updateArrayItem(
                    "education",
                    index,
                    "startDate",
                    v
                  ),
                "2022"
              )}

              {renderInput(
                "End Date",
                item.endDate,
                (v) =>
                  updateArrayItem(
                    "education",
                    index,
                    "endDate",
                    v
                  ),
                "2026"
              )}

              <div className="md:col-span-2">
                {renderTextarea(
                  "Details",
                  item.description,
                  (v) =>
                    updateArrayItem(
                      "education",
                      index,
                      "description",
                      v
                    ),
                  "CGPA, coursework, academic achievements..."
                )}
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() =>
            addArrayItem("education", emptyEducation)
          }
          className="rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-5 py-3 text-sm font-semibold text-indigo-300 hover:bg-indigo-500/20"
        >
          + Add Education
        </button>
      </div>
    </div>
  );

  const renderSkills = () => (
    <div>
      <div className="mb-7">
        <h2 className="text-2xl font-bold text-white">Skills</h2>

        <p className="mt-1 text-sm text-slate-500">
          Add skills relevant to your target role.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {renderInput(
          "Programming Languages",
          resume.skills.languages,
          (v) => updateSkills("languages", v),
          "C++, Java, Python, JavaScript"
        )}

        {renderInput(
          "Frameworks & Libraries",
          resume.skills.frameworks,
          (v) => updateSkills("frameworks", v),
          "React, Node.js, Django"
        )}

        {renderInput(
          "Databases",
          resume.skills.databases,
          (v) => updateSkills("databases", v),
          "PostgreSQL, MySQL, MongoDB"
        )}

        {renderInput(
          "Tools & Technologies",
          resume.skills.tools,
          (v) => updateSkills("tools", v),
          "Git, Docker, AWS"
        )}

        <div className="md:col-span-2">
          {renderInput(
            "Other Skills",
            resume.skills.other,
            (v) => updateSkills("other", v),
            "REST APIs, System Design, DSA"
          )}
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div>
      <div className="mb-7">
        <h2 className="text-2xl font-bold text-white">
          Projects
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Showcase projects that match your target role.
        </p>
      </div>

      <div className="space-y-6">
        {resume.projects.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-800 bg-[#0a0d15] p-5"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-semibold text-white">
                Project {index + 1}
              </h3>

              {resume.projects.length > 1 && (
                <button
                  onClick={() =>
                    removeArrayItem("projects", index)
                  }
                  className="text-sm text-red-400"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {renderInput(
                "Project Name",
                item.name,
                (v) =>
                  updateArrayItem(
                    "projects",
                    index,
                    "name",
                    v
                  ),
                "AI Resume Analyzer"
              )}

              {renderInput(
                "Project Link",
                item.link,
                (v) =>
                  updateArrayItem(
                    "projects",
                    index,
                    "link",
                    v
                  ),
                "github.com/username/project"
              )}

              <div className="md:col-span-2">
                {renderInput(
                  "Technologies",
                  item.technologies,
                  (v) =>
                    updateArrayItem(
                      "projects",
                      index,
                      "technologies",
                      v
                    ),
                  "React, Node.js, PostgreSQL"
                )}
              </div>

              <div className="md:col-span-2">
                {renderTextarea(
                  "Project Description",
                  item.description,
                  (v) =>
                    updateArrayItem(
                      "projects",
                      index,
                      "description",
                      v
                    ),
                  "Describe impact, features and measurable results..."
                )}
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() =>
            addArrayItem("projects", emptyProject)
          }
          className="rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-5 py-3 text-sm font-semibold text-indigo-300 hover:bg-indigo-500/20"
        >
          + Add Project
        </button>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div>
      <div className="mb-7">
        <h2 className="text-2xl font-bold text-white">
          Achievements
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Add awards, certifications and notable achievements.
        </p>
      </div>

      <div className="space-y-6">
        {resume.achievements.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-800 bg-[#0a0d15] p-5"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-semibold text-white">
                Achievement {index + 1}
              </h3>

              {resume.achievements.length > 1 && (
                <button
                  onClick={() =>
                    removeArrayItem(
                      "achievements",
                      index
                    )
                  }
                  className="text-sm text-red-400"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {renderInput(
                "Achievement",
                item.title,
                (v) =>
                  updateArrayItem(
                    "achievements",
                    index,
                    "title",
                    v
                  ),
                "Hackathon Winner"
              )}

              {renderInput(
                "Organization",
                item.organization,
                (v) =>
                  updateArrayItem(
                    "achievements",
                    index,
                    "organization",
                    v
                  ),
                "Organization name"
              )}

              {renderInput(
                "Date",
                item.date,
                (v) =>
                  updateArrayItem(
                    "achievements",
                    index,
                    "date",
                    v
                  ),
                "2026"
              )}

              <div />

              <div className="md:col-span-2">
                {renderTextarea(
                  "Description",
                  item.description,
                  (v) =>
                    updateArrayItem(
                      "achievements",
                      index,
                      "description",
                      v
                    ),
                  "Describe the achievement..."
                )}
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() =>
            addArrayItem(
              "achievements",
              emptyAchievement
            )
          }
          className="rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-5 py-3 text-sm font-semibold text-indigo-300 hover:bg-indigo-500/20"
        >
          + Add Achievement
        </button>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case "Profile":
        return renderProfile();

      case "Experience":
        return renderExperience();

      case "Education":
        return renderEducation();

      case "Skills":
        return renderSkills();

      case "Projects":
        return renderProjects();

      case "Achievements":
        return renderAchievements();

      default:
        return renderProfile();
    }
  };

  return (
    <div className="min-h-screen bg-[#080b12] px-4 py-6 text-slate-200 md:px-6">
      <div className="mx-auto max-w-[1800px]">

        {/* HEADER */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Resume Builder
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Build an ATS-friendly resume tailored to your target.
              </p>
            </div>

            <div className="hidden text-right md:block">
              <div className="text-xs uppercase tracking-wider text-slate-500">
                Resume Strength
              </div>

              <div className="mt-1 text-2xl font-bold text-indigo-400">
                {calculateStrength}%
              </div>
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-900">
            <div
              className="h-full rounded-full bg-indigo-500 transition-all duration-300"
              style={{ width: `${calculateStrength}%` }}
            />
          </div>
        </div>

        {/* TARGET SECTION — LEFT UNCHANGED CONCEPTUALLY */}
        <div className="mb-6 rounded-2xl border border-slate-800 bg-[#0d111b] p-5">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-white">
              Target Resume
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Optimize your resume according to a specific role
              and company.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {renderInput(
              "Target Role",
              target.role,
              (v) => handleTargetChange("role", v),
              "e.g. Software Engineer"
            )}

            {renderInput(
              "Target Company",
              target.company,
              (v) => handleTargetChange("company", v),
              "e.g. Google"
            )}

            <div className="md:col-span-2">
              {renderTextarea(
                "Job Description",
                target.jobDescription,
                (v) =>
                  handleTargetChange(
                    "jobDescription",
                    v
                  ),
                "Paste the job description here..."
              )}
            </div>

            <div className="md:col-span-2">
              <button
                className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
                onClick={() => {
                  alert(
                    "Target optimization will use the role, company and job description to improve resume content."
                  );
                }}
              >
                Optimize for Target
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================
            MIDDLE GRID
            HORIZONTAL SECTION BAR IS HERE
        ===================================================== */}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(500px,0.85fr)]">

          {/* LEFT / EDITOR */}
          <div className="min-w-0">

            {/* HORIZONTAL TOP BAR */}
            <div className="mb-4 overflow-x-auto rounded-2xl border border-slate-800 bg-[#0d111b]">
              <div className="flex min-w-max">
                {sections.map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    className={`relative whitespace-nowrap px-5 py-4 text-sm font-medium transition ${
                      activeSection === section
                        ? "bg-indigo-500/10 text-indigo-400"
                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    {section}

                    {activeSection === section && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-indigo-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* CURRENT SECTION CONTENT */}
            <div className="rounded-2xl border border-slate-800 bg-[#0d111b] p-6">
              {renderActiveSection()}
            </div>
          </div>

          {/* RIGHT / PREVIEW */}
          <div className="min-w-0">
            <ResumePreview
              resume={resume}
              target={target}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;