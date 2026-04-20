import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import { getStudentResults } from "../../api/student";
import type { Submission } from "../../types/submission";
import { Trophy, Calendar, CheckCircle, ArrowLeft, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StudentResults() {
  const [results, setResults] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getStudentResults()
      .then(setResults)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="max-w-5xl mx-auto p-10 text-center animate-pulse text-gray-500">
          Fetching your performance records...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-10 pb-20">
        <div className="relative">
          <button
            onClick={() => navigate("/student/dashboard")}
            className="flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>

          <div className="absolute -left-4 top-0 w-24 h-24 bg-emerald-500/10 blur-[80px] -z-10" />
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            My Results
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Your historical performance at a glance
          </p>
        </div>

        {results.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-20 text-center">
            <Trophy className="text-gray-600 mx-auto mb-4" size={48} />
            <p className="text-gray-400 font-medium text-lg">
              No exams attempted yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((r) => (
              <div
                key={r.id}
                className="group relative bg-white/5 border border-white/10 rounded-3xl p-8 transition-all"
              >
                <div className="absolute top-6 right-6">
                  <div className="bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full border border-emerald-500/20 text-sm font-bold">
                    Score: {r.score.toFixed(2)}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-500 text-xs font-bold uppercase tracking-widest">
                    <CheckCircle size={14} className="text-emerald-500" />
                    Completed
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {r.exam.title}
                  </h3>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                      <Calendar size={16} className="text-blue-500" />
                      {new Date().toLocaleDateString()}
                    </div>
                    {/* Placeholder for future detailed reports */}
                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-600 uppercase tracking-tighter">
                      <Info size={12} /> Detailed Report Pending
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
