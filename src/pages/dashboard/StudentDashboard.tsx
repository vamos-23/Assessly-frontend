import DashboardLayout from "../../layouts/dashboard/DashboardLayout";

export default function StudentDashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-semibold">Student Dashboard</h1>
      <p className="text-gray-400 mt-2">Attempt exams and view results</p>
    </DashboardLayout>
  );
}
