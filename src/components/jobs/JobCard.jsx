import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { COLUMNS, COLUMN_COLORS } from "../../utils/Constants";
import JobForm from "./JobForm";
import ConfirmDialog from "./ConfirmDialog";
import JobDetailModal from "./JobDetailModal";

export default function JobCard({ job }) {
  const { dispatch } = useApp();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const currentIndex = COLUMNS.indexOf(job.status);
  const canMoveBack = currentIndex > 0;
  const canMoveForward = currentIndex < COLUMNS.length - 1;

  const moveJob = (direction) => {
    dispatch({ type: "MOVE", id: job.id, status: COLUMNS[currentIndex + direction] });
  };

  const confirmDelete = () => {
    dispatch({ type: "DELETE", id: job.id });
    setShowDelete(false);
  };

  return (
    <>
      <div
        className="job-card"
        style={{ borderLeft: `4px solid ${COLUMN_COLORS[job.status]}` }}
        onClick={() => setShowDetail(true)}
      >
        <div className="job-card-top">
          <span className="job-logo">{job.logo}</span>
          <div>
            <h3>{job.company}</h3>
            <p>{job.role}</p>
          </div>
        </div>

        <small>{job.date || "N/A"}</small>

        <div className="job-actions job-actions-hover">
          <button
            className="btn-move"
            disabled={!canMoveBack}
            title="Move back"
            onClick={(e) => {
              e.stopPropagation();
              moveJob(-1);
            }}
          >
            ←
          </button>

          <button
            className="btn-edit"
            onClick={(e) => {
              e.stopPropagation();
              setShowEdit(true);
            }}
          >
            Edit
          </button>

          <button
            className="btn-delete"
            onClick={(e) => {
              e.stopPropagation();
              setShowDelete(true);
            }}
          >
            Delete
          </button>

          <button
            className="btn-move"
            disabled={!canMoveForward}
            title="Move forward"
            onClick={(e) => {
              e.stopPropagation();
              moveJob(1);
            }}
          >
            →
          </button>
        </div>
      </div>

      {showEdit && (
        <JobForm initialJob={job} onClose={() => setShowEdit(false)} />
      )}

      {showDelete && (
        <ConfirmDialog
          title="Delete job?"
          message={`This will permanently remove ${job.company} — ${job.role}.`}
          confirmLabel="Delete"
          onConfirm={confirmDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}

      {showDetail && (
        <JobDetailModal job={job} onClose={() => setShowDetail(false)} />
      )}
    </>
  );
}
