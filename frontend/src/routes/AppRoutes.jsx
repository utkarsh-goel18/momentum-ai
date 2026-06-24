import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import CreateGoal from "../pages/CreateGoal";
import GoalDetails from "../pages/GoalDetails";
import DailyPlanner from "../pages/DailyPlanner";
import Analytics from "../pages/Analytics";
import AICoach from "../pages/AICoach";
import Settings from "../pages/Settings";
import Goals from "../pages/Goals";
import Notifications from "../pages/Notifications";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
return (
<BrowserRouter>
<Routes>

    <Route
      path="/"
      element={<Landing />}
    />

    <Route
      path="/login"
      element={<Login />}
    />

    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />

    <Route
      path="/goals"
      element={
        <ProtectedRoute>
          <Goals />
        </ProtectedRoute>
      }
    />

    <Route
      path="/goal/new"
      element={
        <ProtectedRoute>
          <CreateGoal />
        </ProtectedRoute>
      }
    />

    <Route
      path="/goal/:id"
      element={
        <ProtectedRoute>
          <GoalDetails />
        </ProtectedRoute>
      }
    />

    <Route
      path="/planner"
      element={
        <ProtectedRoute>
          <DailyPlanner />
        </ProtectedRoute>
      }
    />

    <Route
      path="/analytics"
      element={
        <ProtectedRoute>
          <Analytics />
        </ProtectedRoute>
      }
    />

    <Route
      path="/coach"
      element={
        <ProtectedRoute>
          <AICoach />
        </ProtectedRoute>
      }
    />

    <Route
      path="/settings"
      element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      }
    />

    <Route
      path="/notifications"
      element={<Notifications />}
    />

  </Routes>
</BrowserRouter>

);
}