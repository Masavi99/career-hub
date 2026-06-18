import { useMemo } from "react";
import { useApp } from "../../context/AppContext";

export default function StatsBar() {
  const { jobs } = useApp();

  const stats = useMemo(
    () => ({
      total: jobs.length,
      interviews: jobs.filter((j) => j.status === "Interview").length,
      offers: jobs.filter((j) => j.status === "Offer").length,
    }),
    [jobs]
  );

  return (
    <div className="stats-bar">
      <div className="stat-card">
        <span className="stat-value">{stats.total}</span>
        <span className="stat-label">Total</span>
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
  );
}
