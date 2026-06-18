import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useApp } from "../context/AppContext";
import { COLUMNS, COLUMN_COLORS } from "../utils/Constants";

export default function Dashboard() {
  const { jobs, theme } = useApp();

  const stats = useMemo(
    () => ({
      total: jobs.length,
      applied: jobs.filter((j) => j.status !== "Saved").length,
      interviews: jobs.filter((j) => j.status === "Interview").length,
      offers: jobs.filter((j) => j.status === "Offer").length,
    }),
    [jobs]
  );

  const pipelineData = useMemo(
    () =>
      COLUMNS.map((status) => ({
        status,
        count: jobs.filter((j) => j.status === status).length,
      })),
    [jobs]
  );

  const recentJobs = useMemo(
    () =>
      [...jobs]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5),
    [jobs]
  );

  const axisColor = theme === "dark" ? "#94a3b8" : "#6b7280";

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats-bar">
        <div className="stat-card">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total Jobs</span>
        </div>

        <div className="stat-card">
          <span className="stat-value">{stats.applied}</span>
          <span className="stat-label">Applied</span>
        </div>

        <div className="stat-card">
          <span className="stat-value">{stats.interviews}</span>
          <span className="stat-label">Interviews</span>
        </div>

        <div className="stat-card">
          <span className="stat-value">{stats.offers}</span>
          <span className="stat-label">Offers</span>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Pipeline Breakdown</h2>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={pipelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="status" stroke={axisColor} fontSize={12} />
              <YAxis allowDecimals={false} stroke={axisColor} fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {pipelineData.map((entry) => (
                  <Cell key={entry.status} fill={COLUMN_COLORS[entry.status]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-card">
          <h2>Recent Activity</h2>

          {recentJobs.length === 0 && (
            <p className="dashboard-empty">No jobs yet.</p>
          )}

          <ul className="activity-list">
            {recentJobs.map((job) => (
              <li key={job.id} className="activity-item">
                <span className="job-logo">{job.logo}</span>

                <div className="activity-info">
                  <strong>{job.company}</strong>
                  <span>{job.role}</span>
                </div>

                <span
                  className="job-status-badge"
                  style={{ background: COLUMN_COLORS[job.status] }}
                >
                  {job.status}
                </span>

                <span className="activity-date">{job.date || "N/A"}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
