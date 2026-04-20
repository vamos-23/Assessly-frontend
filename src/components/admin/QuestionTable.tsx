import type { Question } from "../../types/question";
import { Trash2, Edit3, ClipboardList } from "lucide-react";

interface Props {
  questions: Question[];
  onDelete: (id: number) => void;
  onEdit: (q: Question) => void;
}

export default function QuestionsTable({ questions, onDelete, onEdit }: Props) {
  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-white/10 rounded-2xl">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
          <ClipboardList className="text-gray-500" size={32} />
        </div>
        <h3 className="text-gray-200 font-semibold text-lg">
          No questions yet
        </h3>
        <p className="text-gray-500 text-sm max-w-62.5 mt-1">
          Start building your quiz by adding your first question above.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-white/5">
      {questions.map((q, index) => {
        const answersArray = Array.isArray(q.correctAnswers)
          ? q.correctAnswers
          : [];

        return (
          <div
            key={q.id}
            className="p-6 hover:bg-white/2 transition-colors group flex justify-between gap-4"
          >
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
                  {index + 1}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    q.type === "MCQ"
                      ? "border-purple-500/20 text-purple-400"
                      : "border-emerald-500/20 text-emerald-400"
                  }`}
                >
                  {q.type}
                </span>
              </div>

              <p className="text-gray-100 font-medium leading-relaxed">
                {q.questionText}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {[
                  { k: "A", t: q.optionA },
                  { k: "B", t: q.optionB },
                  { k: "C", t: q.optionC },
                  { k: "D", t: q.optionD },
                ].map((opt) => {
                  const isCorrect = answersArray.includes(opt.k.toUpperCase());
                  return (
                    <div
                      key={opt.k}
                      className={`p-2 rounded-lg border flex items-center gap-3 transition-colors ${
                        isCorrect
                          ? "bg-emerald-500/10 border-emerald-500/30"
                          : "bg-white/5 border-transparent"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold ${
                          isCorrect
                            ? "bg-emerald-500 text-white"
                            : "bg-white/10 text-gray-400"
                        }`}
                      >
                        {opt.k}
                      </span>
                      <span
                        className={`text-sm ${
                          isCorrect ? "text-emerald-400" : "text-gray-400"
                        }`}
                      >
                        {opt.t}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all">
              <button
                onClick={() => onEdit(q)}
                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
              >
                <Edit3 size={18} />
              </button>
              <button
                onClick={() => onDelete(q.id)}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
