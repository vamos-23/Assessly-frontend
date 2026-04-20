import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Registration";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import CreateQuestions from "./pages/admin/CreateQuestions";
import Submissions from "./pages/admin/Submissions";
import AttemptExam from "./pages/student/AttemptExam";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import StudentResults from "./pages/student/StudentResults";

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
          path="/admin/dashboard"
          element={
            <RoleProtectedRoute role="ADMIN">
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/student/dashboard"
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
        <Route
          path="/student/exam/:examId"
          element={
            <RoleProtectedRoute role="STUDENT">
              <AttemptExam />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/student/results"
          element={
            <RoleProtectedRoute role="STUDENT">
              <StudentResults />
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
