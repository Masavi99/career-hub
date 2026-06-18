import { useMemo } from "react";
import JobCard from "./JobCard";

export default function JobColumn({ status, jobs }) {
  const filteredJobs = useMemo(
    () => jobs.filter((job) => job.status === status),
    [jobs, status]
  );

  return (
    <div className="job-column">
      <h2>
        {status} <span className="job-count">{filteredJobs.length}</span>
      </h2>

      {filteredJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}

      {filteredJobs.length === 0 && <p className="job-column-empty">No jobs</p>}
    </div>
  );
}
