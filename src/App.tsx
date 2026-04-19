import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Registration";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import StudentDashboard from "./pages/dashboard/StudentDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RoleProtectedRoute role="ADMIN">
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/student"
          element={
            <RoleProtectedRoute role="STUDENT">
              <StudentDashboard />
            </RoleProtectedRoute>
          }
        />
        {/*Fallback*/}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
