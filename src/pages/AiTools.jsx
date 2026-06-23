import { useState } from "react";
import { useApp } from "../context/AppContext";
import { useAI } from "../hooks/useAI";

const TABS = [
  { id: "analyzer", label: "Resume Analyzer" },
  { id: "cover-letter", label: "Cover Letter" },
];

export default function AiTools() {
  const { resume } = useApp();
  const { ask, loading, error } = useAI();

  const [activeTab, setActiveTab] = useState("analyzer");
  const [jobDescription, setJobDescription] = useState("");

  const [analysis, setAnalysis] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");

  const runAnalysis = async () => {
    setAnalysis(null);
    const system =
      "You are a professional resume reviewer. Given a candidate's resume data and optionally a target job description, " +
      "respond with ONLY a JSON object (no markdown, no commentary) in this exact shape: " +
      '{"score": number (0-100), "strengths": string[], "weaknesses": string[], "suggestions": string[]}.';

    const userMessage = JSON.stringify({ resume, jobDescription: jobDescription || undefined });

    try {
      const reply = await ask([{ role: "user", content: userMessage }], system);
      const cleaned = reply.replace(/```json|```/g, "").trim();
      setAnalysis(JSON.parse(cleaned));
    } catch {
      setAnalysis({ error: "Couldn't analyze the resume. Try again." });
    }
  };

  const runCoverLetter = async () => {
    setCoverLetter("");
    const system =
      "You are an expert cover letter writer. Given a candidate's resume data and a job description, write a concise, " +
      "compelling, professional cover letter (3-4 paragraphs), addressed to 'Dear Hiring Manager' unless a company name " +
      "is given. Return only the cover letter text, no preamble or explanation.";

    const userMessage = JSON.stringify({ resume, jobDescription });

    try {
      const reply = await ask([{ role: "user", content: userMessage }], system);
      setCoverLetter(reply);
    } catch {
      setCoverLetter("Couldn't generate a cover letter. Try again.");
    }
  };

  return (
    <div className="ai-tools">
      <h1>AI Tools</h1>

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

      {activeTab === "analyzer" && (
        <div className="ai-tool-card">
          <p className="ai-tool-hint">
            Analyzes your current resume from Resume Builder. Optionally paste a job
            description to tailor the feedback.
          </p>

          <textarea
            placeholder="Paste a job description (optional)"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <button className="btn-add" onClick={runAnalysis} disabled={loading}>
            {loading ? "Analyzing…" : "Analyze Resume"}
          </button>

          {error && <p className="field-error">{error}</p>}

          {analysis && !analysis.error && (
            <div className="analysis-result">
              <div className="score-badge">{analysis.score}/100</div>

              <h3>Strengths</h3>
              <ul>
                {analysis.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>

              <h3>Weaknesses</h3>
              <ul>
                {analysis.weaknesses.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>

              <h3>Suggestions</h3>
              <ul>
                {analysis.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {analysis?.error && <p className="field-error">{analysis.error}</p>}
        </div>
      )}

      {activeTab === "cover-letter" && (
        <div className="ai-tool-card">
          <p className="ai-tool-hint">
            Generates a cover letter using your resume and the job description below.
          </p>

          <textarea
            placeholder="Paste the job description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <button
            className="btn-add"
            onClick={runCoverLetter}
            disabled={loading || !jobDescription.trim()}
          >
            {loading ? "Generating…" : "Generate Cover Letter"}
          </button>

          {error && <p className="field-error">{error}</p>}

          {coverLetter && (
            <div className="cover-letter-result">
              <pre>{coverLetter}</pre>
              <button
                className="btn-cancel"
                onClick={() => navigator.clipboard.writeText(coverLetter)}
              >
                Copy
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
