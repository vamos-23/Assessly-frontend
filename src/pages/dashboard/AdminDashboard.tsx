import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import {
  getExams,
  createExam,
  deleteExam,
  getAdminStats,
} from "../../api/admin";
import type { Exam, CreateExamRequest } from "../../types/exam";
import type { AdminDashboardStats } from "../../types/dashboardStats";
import CreateExam from "../admin/CreateExam";
import ExamTable from "../admin/ExamTable";
import StatsCards from "../../components/dashboard/StatCard";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [examData, statsData] = await Promise.all([
          getExams(),
          getAdminStats(),
        ]);

        setExams(examData);
        setStats(statsData);
      } catch (error) {
        console.error("Fetch Error:", error);
        alert("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreate = async (payload: CreateExamRequest) => {
    try {
      const newExam = await createExam(payload);
      setExams((prev) => [newExam, ...prev]);
      const updatedStats = await getAdminStats();
      setStats(updatedStats);
    } catch (error) {
      console.error("Create Error:", error);
      alert("Failed to create exam. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this exam?")) return;

    try {
      await deleteExam(id);
      setExams((prev) => prev.filter((e) => e.id !== id));
      const updatedStats = await getAdminStats();
      setStats(updatedStats);
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete exam.");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-10 pb-20">
        <div className="relative flex items-start justify-between">
          <div className="absolute -left-4 top-0 w-24 h-24 bg-blue-500/10 blur-[80px] -z-10" />
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 mt-2 text-lg">
              Manage exams and monitor platform activity
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/submissions")}
            className="bg-white/10 hover:bg-green-500/20 transition cursor-pointer px-5 py-2.5 rounded-xl text-sm font-medium text-white border border-white/10"
          >
            View Submissions
          </button>
        </div>
        {!loading && stats ? (
          <StatsCards stats={stats} />
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 bg-white/5 animate-pulse rounded-2xl border border-white/10"
              />
            ))}
          </div>
        )}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-white/90">
              Quick Actions
            </h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <CreateExam onCreate={handleCreate} />
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-white/90">
              Active Exams
            </h2>
            <div className="h-1px flex-1 bg-white/10" />
          </div>
          {loading ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto" />
              <p className="text-gray-500 font-medium">Fetching records...</p>
            </div>
          ) : (
            <ExamTable exams={exams} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
