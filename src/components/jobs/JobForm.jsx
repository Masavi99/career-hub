import { useState } from "react";
import Modal from "./Modal";
import { useApp } from "../../context/AppContext";
import { COLUMNS } from "../../utils/Constants";

const EMPTY_JOB = {
  company: "",
  role: "",
  status: "Saved",
  location: "",
  salary: "",
  date: "",
  notes: "",
  logo: "",
};

export default function JobForm({ initialJob, onClose }) {
  const { dispatch } = useApp();
  const isEditing = Boolean(initialJob);

  const [formData, setFormData] = useState(
    initialJob ? { ...EMPTY_JOB, ...initialJob } : EMPTY_JOB
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const job = {
      ...formData,
      logo: formData.logo || formData.company.charAt(0).toUpperCase(),
    };

    if (isEditing) {
      dispatch({ type: "UPDATE", job: { ...job, id: initialJob.id } });
    } else {
      dispatch({ type: "ADD", job });
    }

    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h3>{isEditing ? "Edit Job" : "Add Job"}</h3>

      <form className="job-form" onSubmit={handleSubmit}>
        <input
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          required
        />

        <input
          name="role"
          placeholder="Job Role"
          value={formData.role}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <input
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
        />

        <select name="status" value={formData.status} onChange={handleChange}>
          {COLUMNS.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
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
            {isEditing ? "Save Changes" : "Add Job"}
          </button>

          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
