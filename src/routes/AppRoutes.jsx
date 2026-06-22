import { Routes, Route, Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

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
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  const { user, authLoading } = useApp();

  if (authLoading) {
    return <div className="auth-loading">Loading…</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" replace /> : <Login />}
      />

      <Route element={<ProtectedRoute />}>
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
      </Route>
    </Routes>
  );
}
