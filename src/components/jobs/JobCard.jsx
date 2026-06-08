export default function JobCard({
  job,
  jobs,
  setJobs,
}) {
  const deleteJob = () => {
    setJobs(
      jobs.filter((item) => item.id !== job.id)
    );
  };

  const editJob = () => {
    const company = prompt(
      "Company",
      job.company
    );

    if (!company) return;

    const title = prompt(
      "Job Title",
      job.title
    );

    if (!title) return;

    const updatedJobs = jobs.map((item) =>
      item.id === job.id
        ? {
            ...item,
            company,
            title,
          }
        : item
    );

    setJobs(updatedJobs);
  };

  return (
    <div className="job-card">
      <h3>{job.company}</h3>

      <p>{job.title}</p>

      <small>
        Applied: {job.dateApplied || "N/A"}
      </small>

      <p>{job.notes}</p>

      <div className="job-actions">
        <button onClick={editJob}>
          Edit
        </button>

        <button onClick={deleteJob}>
          Delete
        </button>
      </div>
    </div>
  );
}