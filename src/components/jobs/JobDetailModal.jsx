import Modal from "./Modal";
import { COLUMN_COLORS } from "../../utils/Constants";

export default function JobDetailModal({ job, onClose }) {
  return (
    <Modal onClose={onClose} className="job-detail-modal">
      <div className="job-detail-header">
        <span className="job-logo">{job.logo}</span>
        <div>
          <h3>{job.company}</h3>
          <p>{job.role}</p>
        </div>

        <span
          className="job-status-badge"
          style={{ background: COLUMN_COLORS[job.status] }}
        >
          {job.status}
        </span>
      </div>

      <dl className="job-detail-grid">
        <dt>Location</dt>
        <dd>{job.location || "N/A"}</dd>

        <dt>Salary</dt>
        <dd>{job.salary || "N/A"}</dd>

        <dt>Date</dt>
        <dd>{job.date || "N/A"}</dd>
      </dl>

      <h4>Notes</h4>
      <p className="job-detail-notes">{job.notes || "No notes yet."}</p>

      <div className="job-actions">
        <button className="btn-cancel" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
