import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import JobForm from "../components/jobs/JobForm";
import JobBoard from "../components/jobs/JobBoard";
import StatsBar from "../components/jobs/StatsBar";
import FilterBar from "../components/jobs/FilterBar";

export default function JobTracker() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);

  const debouncedSearch = useDebounce(searchInput, 300);

  return (
    <div className="job-tracker">
      <div className="job-tracker-header">
        <h1>Job Tracker</h1>
        <button className="btn-add" onClick={() => setShowAddForm(true)}>
          + Add Job
        </button>
      </div>

      <StatsBar />

      <FilterBar
        searchInput={searchInput}
        onSearchChange={setSearchInput}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <JobBoard searchText={debouncedSearch} statusFilter={statusFilter} />

      {showAddForm && (
        <JobForm initialJob={null} onClose={() => setShowAddForm(false)} />
      )}
    </div>
  );
}
