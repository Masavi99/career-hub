export const COLUMNS = ["Saved", "Applied", "Interview", "Offer", "Rejected"];
 
export const COLUMN_COLORS = {
  Saved:     "var(--col-saved)",
  Applied:   "var(--col-applied)",
  Interview: "var(--col-interview)",
  Offer:     "var(--col-offer)",
  Rejected:  "var(--col-rejected)",
};
 
export const INITIAL_JOBS = [
  { id: "j1",  company: "Airbnb",    role: "Frontend Developer", status: "Saved",     salary: "$130k", location: "Remote",     date: "2026-06-01", notes: "",                            logo: "🏠" },
  { id: "j2",  company: "Linear",    role: "UI Engineer",        status: "Saved",     salary: "$140k", location: "Remote",     date: "2026-05-28", notes: "",                            logo: "◈"  },
  { id: "j3",  company: "Google",    role: "Frontend Engineer",  status: "Applied",   salary: "$160k", location: "SF",         date: "2026-06-03", notes: "Applied via LinkedIn",        logo: "G"  },
  { id: "j4",  company: "Amazon",    role: "React Developer",    status: "Applied",   salary: "$150k", location: "Seattle",    date: "2026-06-01", notes: "",                            logo: "A"  },
  { id: "j5",  company: "Meta",      role: "Frontend Engineer",  status: "Interview", salary: "$170k", location: "Menlo Park", date: "2026-05-25", notes: "Technical screen on Jun 15", logo: "M"  },
  { id: "j6",  company: "Spotify",   role: "React Engineer",     status: "Interview", salary: "$155k", location: "Remote",     date: "2026-05-20", notes: "",                            logo: "♪"  },
  { id: "j7",  company: "Apple",     role: "UI Engineer",        status: "Offer",     salary: "$180k", location: "Cupertino",  date: "2026-05-15", notes: "Offer expires Jun 20",        logo: "🍎" },
  { id: "j8",  company: "Oracle",    role: "Frontend Developer", status: "Rejected",  salary: "$125k", location: "Remote",     date: "2026-05-10", notes: "Rejected after final round",  logo: "O"  },
];
 
export const NAV_PAGES = [
  { id: "tracker",   label: "Job Tracker",     icon: "📋", section: "main" },
  { id: "search",    label: "Job Search",       icon: "🔍", section: "main" },
  { id: "resume",    label: "Resume Builder",   icon: "📄", section: "main" },
  { id: "ai-tools",  label: "AI Tools",         icon: "✦",  section: "main" },
  { id: "interview", label: "Interview Coach",  icon: "🎙️", section: "main" },
  { id: "contacts",  label: "Contacts",         icon: "👥", section: "more" },
  { id: "settings",  label: "Settings",         icon: "⚙️", section: "more" },
];