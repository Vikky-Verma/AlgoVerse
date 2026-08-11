import React from "react";

const cleanUrl = (url) => {
  if (!url) return "";

  if (
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url;
  }

  return `https://${url}`;
};

const ResumePreview = ({ resume, target }) => {
  const { profile, experience, education, skills, projects, achievements } =
    resume;

  return (
    <div className="sticky top-5">
      {/* PREVIEW HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />

            <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Live Preview
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-600">
            Updates automatically as you edit
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
        >
          Download / Print PDF
        </button>
      </div>

      {/* PAPER */}
      <div className="overflow-auto rounded-2xl border border-slate-800 bg-[#151923] p-3 shadow-2xl">
        <div
          id="resume-preview"
          className="mx-auto min-h-[1120px] w-full max-w-[800px] bg-white px-10 py-10 text-[11px] leading-[1.45] text-black"
        >
          {/* HEADER */}
          <header className="text-center">
            <h1 className="text-[25px] font-bold tracking-tight">
              {profile.fullName || "Your Name"}
            </h1>

            {profile.location && (
              <div className="mt-1 text-[10px] text-gray-700">
                {profile.location}
              </div>
            )}

            <div className="mt-1 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[9px] text-gray-700">
              {profile.email && (
                <span>{profile.email}</span>
              )}

              {profile.phone && (
                <span>{profile.phone}</span>
              )}

              {profile.github && (
                <a
                  href={cleanUrl(profile.github)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700"
                >
                  GitHub
                </a>
              )}

              {profile.linkedin && (
                <a
                  href={cleanUrl(profile.linkedin)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700"
                >
                  LinkedIn
                </a>
              )}

              {profile.portfolio && (
                <a
                  href={cleanUrl(profile.portfolio)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700"
                >
                  Portfolio
                </a>
              )}
            </div>
          </header>

          {/* SUMMARY */}
          {profile.summary && (
            <section className="mt-5">
              <SectionTitle title="PROFESSIONAL SUMMARY" />

              <p className="mt-2 whitespace-pre-line">
                {profile.summary}
              </p>
            </section>
          )}

          {/* EXPERIENCE */}
          {experience.some(
            (item) =>
              item.company ||
              item.role ||
              item.description
          ) && (
            <section className="mt-5">
              <SectionTitle title="EXPERIENCE" />

              <div className="mt-2 space-y-4">
                {experience.map((item, index) => {
                  if (
                    !item.company &&
                    !item.role &&
                    !item.description
                  ) {
                    return null;
                  }

                  return (
                    <div key={index}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-bold">
                            {item.role}
                          </div>

                          <div className="font-semibold">
                            {item.company}
                          </div>
                        </div>

                        <div className="text-right text-gray-600">
                          {item.startDate}
                          {item.startDate &&
                            item.endDate &&
                            " – "}
                          {item.endDate}
                        </div>
                      </div>

                      {item.location && (
                        <div className="text-gray-600">
                          {item.location}
                        </div>
                      )}

                      {item.description && (
                        <p className="mt-1 whitespace-pre-line">
                          {item.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* EDUCATION */}
          {education.some(
            (item) =>
              item.degree ||
              item.institution
          ) && (
            <section className="mt-5">
              <SectionTitle title="EDUCATION" />

              <div className="mt-2 space-y-3">
                {education.map((item, index) => {
                  if (
                    !item.degree &&
                    !item.institution
                  ) {
                    return null;
                  }

                  return (
                    <div key={index}>
                      <div className="flex justify-between gap-4">
                        <div>
                          <div className="font-bold">
                            {item.degree}
                          </div>

                          <div>
                            {item.institution}
                          </div>

                          {item.location && (
                            <div className="text-gray-600">
                              {item.location}
                            </div>
                          )}
                        </div>

                        <div className="text-right text-gray-600">
                          {item.startDate}
                          {item.startDate &&
                            item.endDate &&
                            " – "}
                          {item.endDate}
                        </div>
                      </div>

                      {item.description && (
                        <p className="mt-1 whitespace-pre-line">
                          {item.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* SKILLS */}
          {Object.values(skills).some(
            (value) => value.trim()
          ) && (
            <section className="mt-5">
              <SectionTitle title="SKILLS" />

              <div className="mt-2 space-y-1">
                {skills.languages && (
                  <SkillLine
                    label="Languages"
                    value={skills.languages}
                  />
                )}

                {skills.frameworks && (
                  <SkillLine
                    label="Frameworks"
                    value={skills.frameworks}
                  />
                )}

                {skills.databases && (
                  <SkillLine
                    label="Databases"
                    value={skills.databases}
                  />
                )}

                {skills.tools && (
                  <SkillLine
                    label="Tools"
                    value={skills.tools}
                  />
                )}

                {skills.other && (
                  <SkillLine
                    label="Other"
                    value={skills.other}
                  />
                )}
              </div>
            </section>
          )}

          {/* PROJECTS */}
          {projects.some(
            (item) =>
              item.name ||
              item.description
          ) && (
            <section className="mt-5">
              <SectionTitle title="PROJECTS" />

              <div className="mt-2 space-y-4">
                {projects.map((item, index) => {
                  if (
                    !item.name &&
                    !item.description
                  ) {
                    return null;
                  }

                  return (
                    <div key={index}>
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="font-bold">
                          {item.name}
                        </span>

                        {item.technologies && (
                          <span className="text-gray-600">
                            | {item.technologies}
                          </span>
                        )}

                        {item.link && (
                          <a
                            href={cleanUrl(item.link)}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-700"
                          >
                            Link
                          </a>
                        )}
                      </div>

                      {item.description && (
                        <p className="mt-1 whitespace-pre-line">
                          {item.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ACHIEVEMENTS */}
          {achievements.some(
            (item) =>
              item.title ||
              item.description
          ) && (
            <section className="mt-5">
              <SectionTitle title="ACHIEVEMENTS" />

              <div className="mt-2 space-y-3">
                {achievements.map((item, index) => {
                  if (
                    !item.title &&
                    !item.description
                  ) {
                    return null;
                  }

                  return (
                    <div key={index}>
                      <div className="flex justify-between gap-4">
                        <div>
                          <span className="font-bold">
                            {item.title}
                          </span>

                          {item.organization && (
                            <span>
                              {" "}
                              — {item.organization}
                            </span>
                          )}
                        </div>

                        {item.date && (
                          <span className="text-gray-600">
                            {item.date}
                          </span>
                        )}
                      </div>

                      {item.description && (
                        <p className="mt-1 whitespace-pre-line">
                          {item.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* TARGET INFORMATION IS NOT SHOWN */}
          {/* Target role/company are intentionally NOT printed on resume */}
        </div>
      </div>
    </div>
  );
};

const SectionTitle = ({ title }) => (
  <div className="border-b border-gray-800 pb-1 text-[11px] font-bold tracking-wide">
    {title}
  </div>
);

const SkillLine = ({ label, value }) => (
  <div>
    <span className="font-bold">{label}: </span>
    <span>{value}</span>
  </div>
);

export default ResumePreview;