import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import { getExamQuestions, submitExam } from "../../api/student";
import type { StudentQuestion, SubmitExamRequest } from "../../types/student";
import {
  CheckCircle2,
  Circle,
  Send,
  List,
  ArrowLeft,
  Loader2,
  Clock,
  AlertCircle,
  FileQuestion,
} from "lucide-react";

export default function AttemptExam() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [questions, setQuestions] = useState<StudentQuestion[]>([]);
  const [examTitle, setExamTitle] = useState<string>(
    location.state?.examTitle || "Exam",
  );
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(
    (location.state?.duration || 30) * 60,
  );

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;

    const attemptedCount = Object.values(answers).filter(
      (a) => a.length > 0,
    ).length;

    if (attemptedCount < questions.length) {
      setError(
        `Please answer all questions before submitting. (${attemptedCount}/${questions.length} answered)`,
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: SubmitExamRequest = {
        examId: Number(examId),
        answers: Object.entries(answers)
          .filter(([opts]) => opts.length > 0)
          .map(([qId, opts]) => ({
            questionId: Number(qId),
            selectedOptions: opts,
          })),
      };
      await submitExam(payload);
      navigate("/student/results", { replace: true });
    } catch {
      setError("Failed to submit exam. Please try again.");
      setIsSubmitting(false);
    }
  }, [answers, examId, navigate, isSubmitting, questions.length]);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        if (examId) {
          const data = await getExamQuestions(Number(examId));
          setQuestions(data);
          if (data.length > 0 && data[0].exam?.title) {
            setExamTitle(data[0].exam.title);
          }
        }
      } catch {
        setError("Failed to load questions. Please refresh.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [examId]);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (!isSubmitting && questions.length > 0) {
        const autoSubmit = setTimeout(() => handleSubmit(), 0);
        return () => clearTimeout(autoSubmit);
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleSubmit, isSubmitting, questions.length]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSingle = (qId: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: [option] }));
    if (error) setError("");
  };

  const handleMulti = (qId: number, option: string) => {
    const current = answers[qId] || [];
    const updated = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];
    setAnswers((prev) => ({ ...prev, [qId]: updated }));
    if (error) setError("");
  };

  const answeredCount = Object.values(answers).filter(
    (a) => a.length > 0,
  ).length;
  const progressWidth =
    questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="max-w-6xl mx-auto p-20 text-center text-gray-500 animate-pulse">
          Loading exam questions...
        </div>
      </DashboardLayout>
    );
  }

  if (questions.length === 0) {
    return (
      <DashboardLayout>
        <div className="max-w-xl mx-auto mt-20 text-center">
          <div className="bg-white/5 border border-white/10 rounded-4xl p-12 backdrop-blur-xl">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileQuestion className="text-blue-400" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white">
              No Questions Found
            </h2>
            <p className="text-gray-400 mt-2">
              This exam doesn't have any questions yet.
            </p>
            <button
              onClick={() => navigate("/student/dashboard")}
              className="mt-8 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all"
            >
              Go Back
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 pb-20 relative px-6">
        <div className="flex-1 space-y-8">
          <div className="sticky top-0 z-20 backdrop-blur-xl py-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-2"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </button>
              <h1 className="text-3xl font-black text-white tracking-tight">
                {examTitle}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-bold ${timeLeft < 60 ? "bg-red-500/10 border-red-500/50 text-red-500 animate-pulse" : "bg-white/5 border-white/10 text-emerald-400"}`}
              >
                <Clock size={18} /> {formatTime(timeLeft)}
              </div>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <Send size={20} /> Submit
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden -mt-4">
            <div
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${progressWidth}%` }}
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3">
              <AlertCircle size={20} />
              <p className="text-sm font-semibold">{error}</p>
            </div>
          )}

          <div className="space-y-8">
            {questions.map((q, idx) => (
              <div
                key={q.id}
                id={`q-${q.id}`}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 transition-all hover:bg-white/[0.07]"
              >
                <div className="flex gap-5 mb-8">
                  <span className="shrink-0 w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <p className="text-xl text-gray-100 font-bold leading-relaxed">
                    {q.questionText}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(["A", "B", "C", "D"] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() =>
                        q.type === "SCQ"
                          ? handleSingle(q.id, opt)
                          : handleMulti(q.id, opt)
                      }
                      className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${answers[q.id]?.includes(opt) ? "bg-blue-600/10 border-blue-500/60 text-white" : "bg-white/5 border-transparent hover:border-white/10 text-gray-400"}`}
                    >
                      <div
                        className={
                          answers[q.id]?.includes(opt)
                            ? "text-blue-400"
                            : "text-gray-700"
                        }
                      >
                        {answers[q.id]?.includes(opt) ? (
                          <CheckCircle2 size={22} />
                        ) : (
                          <Circle size={22} />
                        )}
                      </div>
                      <span className="text-base font-medium">
                        {q[`option${opt}` as keyof StudentQuestion] as string}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-80 hidden lg:block">
          <div className="sticky top-32 bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6 backdrop-blur-md">
            <div className="text-white font-bold border-b border-white/5 pb-4 flex gap-2">
              <List size={20} className="text-blue-400" /> Question Map
            </div>
            <div className="grid grid-cols-4 gap-3">
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() =>
                    document
                      .getElementById(`q-${q.id}`)
                      ?.scrollIntoView({ behavior: "smooth", block: "center" })
                  }
                  className={`h-11 w-full rounded-xl flex items-center justify-center font-bold text-sm border transition-all ${answers[q.id]?.length ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/20" : "bg-white/5 border-white/10 text-gray-500 hover:border-white/30"}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
