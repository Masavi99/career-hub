import { COLUMNS } from "../../utils/Constants";

export default function FilterBar({
  searchInput,
  onSearchChange,
  statusFilter,
  onStatusChange,
}) {
  return (
    <div className="filter-bar">
      <input
        className="job-search"
        placeholder="Search by company, role, or location..."
        value={searchInput}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className="filter-chips">
        <button
          className={`chip ${statusFilter === null ? "chip-active" : ""}`}
          onClick={() => onStatusChange(null)}
        >
          All
        </button>

        {COLUMNS.map((status) => (
          <button
            key={status}
            className={`chip ${statusFilter === status ? "chip-active" : ""}`}
            onClick={() => onStatusChange(status)}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}
