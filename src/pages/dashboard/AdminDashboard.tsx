import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import { getExams, createExam, deleteExam } from "../../api/admin";
import { type Exam, type CreateExamRequest } from "../../types/exam";
import CreateExam from "../admin/CreateExam";
import ExamTable from "../admin/ExamTable";

export default function AdminDashboard() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      try {
        const data = await getExams();
        setExams(data);
      } catch (error) {
        console.error("Fetch Error:", error);
        alert("Failed to load exams");
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  const handleCreate = async (payload: CreateExamRequest) => {
    try {
      const newExam = await createExam(payload);
      setExams((prev) => [newExam, ...prev]);
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
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete exam.");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <p className="text-gray-400 mt-1">Manage exams efficiently</p>
        </div>
        <CreateExam onCreate={handleCreate} />
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <p className="text-gray-400 animate-pulse">Loading exams...</p>
          </div>
        ) : (
          <ExamTable exams={exams} onDelete={handleDelete} />
        )}
      </div>
    </DashboardLayout>
  );
}
