import { useState } from "react";

export default function JobCard({
  job,
  jobs,
  setJobs,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    company: job.company,
    title: job.title,
    status: job.status,
    notes: job.notes,
    dateApplied: job.dateApplied,
  });

  const deleteJob = () => {
    setJobs(
      jobs.filter((item) => item.id !== job.id)
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const startEdit = () => {
    setFormData({
      company: job.company,
      title: job.title,
      status: job.status,
      notes: job.notes,
      dateApplied: job.dateApplied,
    });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const saveJob = (e) => {
    e.preventDefault();

    setJobs(
      jobs.map((item) =>
        item.id === job.id
          ? { ...item, ...formData }
          : item
      )
    );

    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form className="job-card job-card-editing" onSubmit={saveJob}>
        <input
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          required
        />

        <input
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option>Saved</option>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

        <input
          type="date"
          name="dateApplied"
          value={formData.dateApplied}
          onChange={handleChange}
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
        />

        <div className="job-actions">
          <button type="submit" className="btn-save">
            Save
          </button>

          <button type="button" className="btn-cancel" onClick={cancelEdit}>
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="job-card">
      <h3>{job.company}</h3>

      <p>{job.title}</p>

      <small>
        Applied: {job.dateApplied || "N/A"}
      </small>

      <p>{job.notes}</p>

      <div className="job-actions">
        <button className="btn-edit" onClick={startEdit}>
          Edit
        </button>

        <button className="btn-delete" onClick={deleteJob}>
          Delete
        </button>
      </div>
    </div>
  );
}