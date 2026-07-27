import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Layout
import DashboardLayout from "./components/layout/DashboardLayout";

// Dashboard Pages
import Dashboard from "./pages/dashboard/Dashboard";
import AllJobs from "./pages/AllJobs";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

// Other Pages
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard Home */}
        <Route index element={<Dashboard />} />

        {/* Jobs */}
        <Route path="jobs" element={<AllJobs />} />
        <Route path="jobs/new" element={<AddJob />} />
        <Route path="jobs/edit/:id" element={<EditJob />} />

        {/* Analytics */}
        <Route path="analytics" element={<Analytics />} />

        {/* Settings */}
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;