import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import {
  getQuestions,
  createQuestion,
  deleteQuestion,
  updateQuestion,
} from "../../api/admin";
import type { Question, CreateQuestionRequest } from "../../types/question";
import QuestionForm from "../../components/admin/QuestionForm";
import QuestionsTable from "../../components/admin/QuestionTable";
import { ArrowLeft, BookOpen, PlusCircle } from "lucide-react";

export default function CreateQuestions() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const examTitle = location.state?.examTitle || "Exam Details";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const data = await getQuestions(Number(examId));
        setQuestions(data);
      } catch (err) {
        console.error("Failed to fetch questions", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [examId]);

  const handleCreateOrUpdate = async (payload: CreateQuestionRequest) => {
    try {
      if (editingQuestion) {
        const updated = await updateQuestion(editingQuestion.id, payload);
        setQuestions((prev) =>
          prev.map((q) => (q.id === updated.id ? updated : q)),
        );
        setEditingQuestion(null);
      } else {
        const newQ = await createQuestion(Number(examId), payload);
        setQuestions((prev) => [...prev, newQ]);
      }
    } catch {
      alert("Failed to save question. Check console for details.");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await deleteQuestion(id);
        setQuestions((prev) => prev.filter((q) => q.id !== id));
      } catch {
        alert("Failed to delete question.");
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Exams
            </button>
            <h1 className="text-3xl font-bold tracking-tight">{examTitle}</h1>
            <p className="text-gray-400 mt-1">
              Questions: <span className="text-blue-400 font-mono">{questions.length}</span>
            </p>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-2 hidden md:block">
            <div className="flex items-center gap-2 text-blue-400">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">Question Editor</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 sticky top-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-blue-400" />
                  <h2 className="text-lg font-medium">
                    {editingQuestion ? "Edit Question" : "Add New Question"}
                  </h2>
                </div>
                {editingQuestion && (
                  <button
                    onClick={() => setEditingQuestion(null)}
                    className="text-xs text-red-400 hover:underline"
                  >
                    Cancel
                  </button>
                )}
              </div>
              <QuestionForm
                key={editingQuestion?.id || "new"}
                onCreate={handleCreateOrUpdate}
                initialData={editingQuestion || undefined}
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
              <div className="p-4 border-b border-white/10 bg-white/5 font-medium">
                Question Bank
              </div>
              {loading ? (
                <div className="p-12 text-center text-gray-400">
                  Loading questions...
                </div>
              ) : (
                <QuestionsTable
                  questions={questions}
                  onDelete={handleDelete}
                  onEdit={setEditingQuestion}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
