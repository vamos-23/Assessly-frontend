import { useState, type ChangeEvent } from "react";
import type {
  CreateQuestionRequest,
  QuestionType,
  Question,
} from "../../types/question";
import { Plus, Save } from "lucide-react";

interface Props {
  onCreate: (data: CreateQuestionRequest) => Promise<void>;
  initialData?: Question;
}

export default function QuestionForm({ onCreate, initialData }: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  // Initialize state directly from initialData
  const [form, setForm] = useState<CreateQuestionRequest>({
    questionText: initialData?.questionText || "",
    optionA: initialData?.optionA || "",
    optionB: initialData?.optionB || "",
    optionC: initialData?.optionC || "",
    optionD: initialData?.optionD || "",
    correctAnswers: initialData?.correctAnswers || [],
    type: initialData?.type || "SCQ",
  });

  const [answerInput, setAnswerInput] = useState<string>(
    initialData?.correctAnswers.join(", ") || "",
  );

  const optionKeys = ["optionA", "optionB", "optionC", "optionD"] as const;

  const handleSubmit = async () => {
    if (!form.questionText || !answerInput) return;

    const formattedAnswers = answerInput
      .toUpperCase()
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    setLoading(true);
    try {
      await onCreate({ ...form, correctAnswers: formattedAnswers });
      if (!initialData) {
        setForm({
          questionText: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctAnswers: [],
          type: "SCQ",
        });
        setAnswerInput("");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all";

  return (
    <div className="space-y-4">
      <textarea
        placeholder="Question Content"
        rows={1}
        className={inputClasses}
        value={form.questionText}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setForm({ ...form, questionText: e.target.value })
        }
      />

      <div className="grid grid-cols-2 gap-4">
        {optionKeys.map((key) => (
          <input
            key={key}
            placeholder={key.replace("option", "Option ")}
            className={inputClasses}
            value={form[key]}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, [key]: e.target.value })
            }
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <select
          className={inputClasses + " bg-[#0B1120] cursor-pointer"}
          value={form.type}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setForm({ ...form, type: e.target.value as QuestionType })
          }
        >
          <option value="SCQ" className="text-black">
            SCQ (Single Choice)
          </option>
          <option value="MCQ" className="text-black">
            MCQ (Multiple Choice)
          </option>
        </select>
        <input
          placeholder="Keys (e.g. A, B)"
          className={inputClasses + " font-mono uppercase"}
          value={answerInput}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAnswerInput(e.target.value)
          }
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${initialData ? "bg-amber-600 hover:bg-amber-500" : "bg-blue-600 hover:bg-blue-500"}`}
      >
        {loading ? (
          "Processing..."
        ) : initialData ? (
          <>
            <Save size={18} /> Update Question
          </>
        ) : (
          <>
            <Plus size={18} /> Add Question
          </>
        )}
      </button>
    </div>
  );
}
