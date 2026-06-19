import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const DEFAULT_RESUME = {
  name: "John Doe",
  title: "Frontend Developer",
  email: "john.doe@email.com",
  phone: "+1 123-456-7890",
  location: "San Francisco, CA",
  summary: "Frontend Developer with 3+ years building React apps.",
  skills: ["React", "TypeScript", "CSS", "Node.js"],
  experience: [],
};

export default function Settings() {
  const { user, setUser, theme, setTheme, dispatch, setResume } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || "");

  const saveName = () => {
    setUser({ ...user, name });
  };
  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };
  const clearJobs = () => {
    if (!window.confirm("Delete all tracked jobs? This Can't be undone"))
      return;
    dispatch({ type: "CLEAR" });
  };
  const resetResume = () => {
    if (!window.confirm("Reset your resume to the default template?")) return;
    setResume(DEFAULT_RESUME);
  };
  return (
    <div className="settings">
      <h1>Settings</h1>
      <div className="setting-card">
        <h2>Profile</h2>
        <div className="setting-row">
          <label>Name</label>
          <div className="settings-inline">
            <input value={name} onchange={(e) => setName(e.target.value)} />
            <button className="btn-add" onClick={saveName}>
              Save
            </button>
          </div>
        </div>

        <div className="settings-row">
          <label>Email</label>
          <span className="settings-static">
            {user?.email || "Not signed in"}
          </span>
        </div>

        <button className="btn-remove" onClick={handleLogout}>
          Log Out
        </button>
      </div>

      <div className="settings-card">
        <h2>Appearance</h2>

        <div className="settings-row">
          <label>Theme</label>
          <div className="theme-options">
            <button
              className={`resume-tab ${theme === "light" ? "resume-tab-active" : ""}`}
              onClick={() => setTheme("light")}
            >
              ☀️ Light
            </button>
            <button
              className={`resume-tab ${theme === "dark" ? "resume-tab-active" : ""}`}
              onClick={() => setTheme("dark")}
            >
              🌙 Dark
            </button>
          </div>
        </div>
      </div>
      <div className="settings-card">
        <h2>Data</h2>

        <div className="settings-row">
          <label>Job Tracker</label>
          <button className="btn-remove" onClick={clearJobs}>
            Clear All Jobs
          </button>
        </div>

        <div className="settings-row">
          <label>Resume</label>
          <button className="btn-remove" onClick={resetResume}>
            Reset Resume
          </button>
        </div>
      </div>
    </div>
  );
}
