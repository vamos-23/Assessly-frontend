import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Registration";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import CreateQuestions from "./pages/admin/CreateQuestions";
import Submissions from "./pages/admin/Submissions";

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
        <Route
          path="/admin/exams/:examId"
          element={
            <RoleProtectedRoute role="ADMIN">
              <CreateQuestions />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin/submissions"
          element={
            <RoleProtectedRoute role="ADMIN">
              <Submissions />
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
