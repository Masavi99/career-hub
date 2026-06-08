import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Careear Hub</h2>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>

          <li>
            <Link to="/jobs">Job Tracker</Link>
          </li>

          <li>
            <Link to="/resume">Resume Builder</Link>
          </li>

          <li>
            <Link to="/ai-tools">AI Tools</Link>
          </li>

          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
