import { useState } from "react";

export default function JobForm({ jobs, setJobs }) {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    status: "Saved",
    notes: "",
    dateApplied: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      id: crypto.randomUUID(),
      ...formData,
    };

    setJobs([...jobs, newJob]);

    setFormData({
      company: "",
      title: "",
      status: "Saved",
      notes: "",
      dateApplied: "",
    });
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
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

      <button type="submit">Add Job</button>
    </form>
  );
}