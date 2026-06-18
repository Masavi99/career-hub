import { useMemo } from "react";
import JobColumn from "./JobColumn";
import { useApp } from "../../context/AppContext";
import { COLUMNS } from "../../utils/Constants";

export default function JobBoard({ searchText = "", statusFilter = null }) {
  const { jobs } = useApp();

  const filteredJobs = useMemo(() => {
    const term = searchText.trim().toLowerCase();
    if (!term) return jobs;

    return jobs.filter((job) =>
      [job.company, job.role, job.location]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [jobs, searchText]);

  const columns = statusFilter ? [statusFilter] : COLUMNS;

  return (
    <div className="job-board">
      {columns.map((status) => (
        <JobColumn key={status} status={status} jobs={filteredJobs} />
      ))}
    </div>
  );
}
