import { Routes, Route } from "react-router-dom";

import { Login } from "../pages/Login";
import JobSearch from "../pages/JobSearch";
import InterviewCoach from "../pages/InterviewCoach";
import Contacts from "../pages/Contacts";

import Dashboard from "../pages/Dashboard";
import JobTracker from "../pages/JobTracker";
import ResumeBuilder from "../pages/ResumeBuilder";
import AiTools from "../pages/AiTools";
import Settings from "../pages/Settings";

import DashboardLayout from "../layoutes/DashboardLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<JobSearch />} />
        <Route path="/interview" element={<InterviewCoach />} />
        <Route path="/contacts" element={<Contacts />} />

        <Route path="/jobs" element={<JobTracker />} />

        <Route path="/resume" element={<ResumeBuilder />} />

        <Route path="/ai-tools" element={<AiTools />} />

        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
