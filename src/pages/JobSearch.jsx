import { useState, useMemo } from "react";
import { useApp } from "../context/AppContext";

const SAMPLE_LISTINGS = [
  { id: "l1", company: "Netflix", role: "Senior Frontend Engineer", location: "Remote", salary: "$180k", logo: "N", description: "Build streaming UI experiences used by millions." },
  { id: "l2", company: "Stripe", role: "Frontend Engineer", location: "Remote", salary: "$170k", logo: "S", description: "Work on payment dashboards and developer tools." },
  { id: "l3", company: "Notion", role: "Product Engineer", location: "San Francisco", salary: "$165k", logo: "N", description: "Full-stack product work across the Notion editor." },
  { id: "l4", company: "Figma", role: "UI Engineer", location: "Remote", salary: "$175k", logo: "F", description: "Build design tools used by millions of designers." },
  { id: "l5", company: "Shopify", role: "React Developer", location: "Remote", salary: "$150k", logo: "S", description: "Build merchant-facing commerce tools." },
  { id: "l6", company: "Discord", role: "Frontend Engineer", location: "Remote", salary: "$160k", logo: "D", description: "Build real-time chat experiences at scale." },
];

export default function JobSearch() {
  const { dispatch } = useApp();
  const [search, setSearch] = useState("");
  const [savedIds, setSavedIds] = useState([]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return SAMPLE_LISTINGS;
    return SAMPLE_LISTINGS.filter((job) =>
      [job.company, job.role, job.location].join(" ").toLowerCase().includes(term)
    );
  }, [search]);

  const saveToTracker = (listing) => {
    dispatch({
      type: "ADD",
      job: {
        company: listing.company,
        role: listing.role,
        location: listing.location,
        salary: listing.salary,
        logo: listing.logo,
        status: "Saved",
        date: new Date().toISOString().slice(0, 10),
        notes: "",
      },
    });
    setSavedIds([...savedIds, listing.id]);
  };

  return (
    <div className="job-search-page">
      <h1>Job Search</h1>

      <input
        className="job-search"
        placeholder="Search by company, role, or location…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="listing-grid">
        {filtered.map((listing) => (
          <div key={listing.id} className="listing-card">
            <div className="job-card-top">
              <span className="job-logo">{listing.logo}</span>
              <div>
                <h3>{listing.company}</h3>
                <p>{listing.role}</p>
              </div>
            </div>

            <p className="listing-meta">
              {listing.location} · {listing.salary}
            </p>
            <p className="listing-description">{listing.description}</p>

            <button
              className="btn-add"
              onClick={() => saveToTracker(listing)}
              disabled={savedIds.includes(listing.id)}
            >
              {savedIds.includes(listing.id) ? "Saved ✓" : "Save to Tracker"}
            </button>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="dashboard-empty">No listings match your search.</p>
        )}
      </div>
    </div>
  );
}
