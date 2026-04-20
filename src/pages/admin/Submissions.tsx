import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import {
  getAllSubmissions,
  getSubmissionsByExam,
  getExams,
} from "../../api/admin";
import type { Submission } from "../../types/submission";
import type { Exam } from "../../types/exam";
import SubmissionTable from "../../components/admin/SubmissionTable";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Submissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExam, setSelectedExam] = useState<number | "all">("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [subs, examsData] = await Promise.all([
          getAllSubmissions(),
          getExams(),
        ]);

        setSubmissions(subs);
        setExams(examsData);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const handleFilterChange = async (value: string) => {
    setSelectedExam(value === "all" ? "all" : Number(value));
    setLoading(true);

    try {
      if (value === "all") {
        const data = await getAllSubmissions();
        setSubmissions(data);
      } else {
        const data = await getSubmissionsByExam(Number(value));
        setSubmissions(data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Exams
          </button>
          <h1 className="text-3xl font-bold text-white tracking-tight">Submissions</h1>
          <p className="text-gray-400 mt-1">Track student performance</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <select
            value={selectedExam}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="p-3 rounded-lg bg-white/5 border border-white/10 outline-none focus:ring-1 focus:ring-blue-500 text-white"
          >
            <option value="all" className="text-black">
              All Exams
            </option>
            {exams.map((exam) => (
              <option
                key={exam.id}
                value={exam.id}
                className="text-black bg-white/5"
              >
                {exam.title}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <div className="flex justify-center py-10">
            <p className="text-gray-400 animate-pulse">
              Loading submissions...
            </p>
          </div>
        ) : (
          <SubmissionTable submissions={submissions} />
        )}
      </div>
    </DashboardLayout>
  );
}
