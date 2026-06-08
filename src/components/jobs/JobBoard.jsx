import JobColumn from "./JobColumn";

export default function JobBoard({ jobs, setJobs }) {
  const statuses = [
    "Saved",
    "Applied",
    "Interview",
    "Offer",
    "Rejected",
  ];

  return (
    <div className="job-board">
      {statuses.map((status) => (
        <JobColumn
          key={status}
          status={status}
          jobs={jobs}
          setJobs={setJobs}
        />
      ))}
    </div>
  );
}