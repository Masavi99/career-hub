import JobCard from "./JobCard";

export default function JobColumn({
  status,
  jobs,
  setJobs,
}) {
  const filteredJobs = jobs.filter(
    (job) => job.status === status
  );

  return (
    <div className="job-column">
      <h2>{status}</h2>

      {filteredJobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          jobs={jobs}
          setJobs={setJobs}
        />
      ))}
    </div>
  );
}