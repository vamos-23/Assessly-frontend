import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import { getStudentExams, getStudentResults } from "../../api/student";
import { getStoredUser } from "../../utils/auth"; // Import your helper
import { useNavigate } from "react-router-dom";
import { Clock, ArrowRight, Trophy, Sparkles } from "lucide-react";
import type { StudentExam } from "../../types/student";

export default function StudentDashboard() {
  const [exams, setExams] = useState<StudentExam[]>([]);
  const [attemptedIds, setAttemptedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Clean initialization using your helper
  const [userName] = useState<string>(() => {
    const user = getStoredUser();
    return user?.name || "Student";
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [examsData, resultsData] = await Promise.all([
          getStudentExams(),
          getStudentResults(),
        ]);
        setExams(examsData);
        const ids = resultsData
          .map((r) => r.exam?.id)
          .filter((id): id is number => id !== undefined);
        setAttemptedIds(ids);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="relative p-8 rounded-4xl bg-white/5 border border-white/10 overflow-hidden shadow-2xl">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 blur-[80px]" />
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest">
              <Sparkles size={14} /> Personal Portal
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">
              Hey, {userName}! 👋
            </h1>
            <p className="text-gray-400 max-w-md text-lg">
              Ready to crush your exams today?
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Available Exams
          </h2>
          <button
            onClick={() => navigate("/student/results")}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all shadow-lg"
          >
            <Trophy size={18} className="text-yellow-500" /> View My Results
          </button>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 w-full bg-white/5 border border-white/10 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {exams.map((exam) => {
              const isAttempted = attemptedIds.includes(exam.id);
              return (
                <div
                  key={exam.id}
                  onClick={() =>
                    !isAttempted &&
                    navigate(`/student/exam/${exam.id}`, {
                      state: { examTitle: exam.title, duration: exam.duration },
                    })
                  }
                  className={`group relative bg-white/5 border border-white/10 rounded-2xl p-6 transition-all overflow-hidden ${isAttempted ? "opacity-60 cursor-default" : "cursor-pointer hover:bg-white/10 hover:border-white/20"}`}
                >
                  <div className="flex justify-between items-center relative z-10">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {exam.title}
                        </h3>
                        {isAttempted && (
                          <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
                            ATTEMPTED
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                        <Clock size={14} className="text-blue-500" />{" "}
                        <span>{exam.duration} Minutes</span>
                      </div>
                    </div>
                    {isAttempted ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/student/results");
                        }}
                        className="text-xs font-bold text-gray-500 hover:text-white underline underline-offset-4"
                      >
                        View Report
                      </button>
                    ) : (
                      <button className="bg-blue-600/10 text-blue-400 px-5 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2">
                        Start <ArrowRight size={16} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
