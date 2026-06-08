import { useState, useEffect } from "react";
import JobForm from "../components/jobs/JobForm";
import JobBoard from "../components/jobs/JobBoard";

export default function JobTracker() {
  const [jobs, setJobs] = useState(() => {
    try {
      const storedJobs = localStorage.getItem("jobs");
      return storedJobs ? JSON.parse(storedJobs) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  return (
    <div className="job-tracker">
      <h1>Job Tracker</h1>

      <JobForm jobs={jobs} setJobs={setJobs} />

      <JobBoard jobs={jobs} setJobs={setJobs} />
    </div>
  );
}
