import { useState } from "react";
import { useApp } from "../context/AppContext";

const TABS = [
  { id: "contact", label: "Contact" },
  { id: "summary", label: "Summary" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
];

export default function ResumeBuilder() {
  const { resume, setResume } = useApp();
  const [activeTab, setActiveTab] = useState("contact");
  const [skillInput, setSkillInput] = useState("");
  //update
  const updateField = (field, value) =>
    setResume({ ...resume, [field]: value });
  //add
  const addSkill = () => {
    if (!skillInput.trim()) return;
    setResume({ ...resume, skills: [...resume.skills, skillInput.trim()] });
    setSkillInput("");
  };
  //remove
  const removeSkill = (index) => {
    setResume({
      ...resume,
      skills: resume.skills.filter((_, i) => i !== index),
    });
  };
  const addExperience = () => {
    setResume({
      ...resume,
      experience: [
        ...resume.experience,
        {
          id: crypto.randomUUID(),
          company: "",
          role: "",
          start: "",
          end: "",
          description: "",
        },
      ],
    });
  };
  const updateExperience = (id, field, value) => {
    setResume({
      ...resume,
      experience: resume.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    });
  };

  const removeExperience = (id) => {
    setResume({
      ...resume,
      experience: resume.experience.filter((exp) => exp.id !== id),
    });
  };

  return (
    <div className="resume-builder">
      <h1>Resume Builder</h1>
      <div className="resume-layout">
        <div className="resume-editor">
          <div className="resume-tabs">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`resume-tab ${activeTab === tab.id ? "resume-tab-active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {activeTab === "contact" && (
            <div className="resume-form">
              <input
                placeholder="Full Name"
                value={resume.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
              <input
                placeholder="Title"
                value={resume.title}
                onChange={(e) => updateField("title", e.target.value)}
              />
              <input
                placeholder="Email"
                value={resume.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
              <input
                placeholder="Phone"
                value={resume.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
              <input
                placeholder="Location"
                value={resume.location}
                onChange={(e) => updateField("location", e.target.value)}
              />
            </div>
          )}
          {activeTab==="summary"&&(
            <div className="resume-form">
                <textarea
                placeholder="Professional Summary"
                value={resume.summary}
                onChange={(e)=>updateField("summary",e.target.value)}
                />
                </div>
          )}

          {activeTab === "skills" && (
            <div className="resume-form">
              <div className="skill-input-row">
                <input
                  placeholder="Add a skill"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                />
                <button type="button" className="btn-add" onClick={addSkill}>
                  Add
                </button>
              </div>
              <div className="skill-chips">
                {resume.skills.map((skill, index) => (
                  <span key={skill + index} className="skill-chip">
                    {skill}
                    <button type="button" onClick={() => removeSkill(index)}>
                      x
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
          {activeTab === "experience" && (
            <div className="resume-form">
              {resume.experience.map((exp) => (
                <div key={exp.id} className="experience-entry">
                  <input
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(exp.id, "company", e.target.value)
                    }
                  />
                  <input
                    placeholder="Role"
                    value={exp.role}
                    onChange={(e) =>
                      updateExperience(exp.id, "role", e.target.value)
                    }
                  />
                  <div className="experience-dates">
                    <input
                      placeholder="Start (e.g. 2023)"
                      value={exp.start}
                      onChange={(e) =>
                        updateExperience(exp.id, "start", e.target.value)
                      }
                    />
                    <input
                      placeholder="End (e.g. Present)"
                      value={exp.end}
                      onChange={(e) =>
                        updateExperience(exp.id, "end", e.target.value)
                      }
                    />
                  </div>
                  <textarea
                    placeholder="Description"
                    value={exp.description}
                    onChange={(e) =>
                      updateExperience(exp.id, "description", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeExperience(exp.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" className="btn-add" onClick={addExperience}>
                + Add Experience
              </button>
            </div>
          )}
        </div>
        <div className="resume-preview">
          <h2 className="preview-name">{resume.name || "Your Name"}</h2>
          <p className="preview-title">{resume.title}</p>

          <p className="preview-contact">
            {[resume.email, resume.phone, resume.location]
              .filter(Boolean)
              .join(" • ")}
          </p>

          {resume.summary && (
            <>
              <h3>Summary</h3>
              <p>{resume.summary}</p>
            </>
          )}

          {resume.skills.length > 0 && (
            <>
              <h3>Skills</h3>
              <div className="skill-chips">
                {resume.skills.map((skill, index) => (
                  <span
                    key={skill + index}
                    className="skill-chip skill-chip-static"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </>
          )}

          {resume.experience.length > 0 && (
            <>
              <h3>Experience</h3>
              {resume.experience.map((exp) => (
                <div key={exp.id} className="preview-experience">
                  <div className="preview-experience-header">
                    <strong>{exp.role || "Role"}</strong>
                    <span>
                      {[exp.start, exp.end].filter(Boolean).join(" – ")}
                    </span>
                  </div>
                  <p className="preview-company">{exp.company}</p>
                  <p>{exp.description}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
