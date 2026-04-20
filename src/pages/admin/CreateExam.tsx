import { useState } from "react";
import { type CreateExamRequest } from "../../types/exam";

interface Props {
  onCreate: (data: CreateExamRequest) => Promise<void>;
}

export default function CreateExam({ onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const durationNum = Number(duration);

    if (!title.trim() || !duration) {
      return setError("All fields are required");
    }
    if (durationNum <= 0) {
      return setError("Duration must be at least 1 minute");
    }

    setError("");
    try {
      setLoading(true);
      await onCreate({
        title: title.trim(),
        duration: durationNum,
      });
      setTitle("");
      setDuration("");
    } catch {
      setError("Failed to create exam");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-5">Create New Exam</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <input
          id="exam-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Exam title"
          className="p-3 rounded-lg bg-white/5 border border-white/10 outline-none focus:ring-1 focus:ring-blue-500 text-white"
        />
        <input
          id="duration"
          type="number"
          min="1"
          value={duration}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "" || Number(val) >= 0) {
              setDuration(val);
            }
          }}
          placeholder="Duration (minutes)"
          className="p-3 rounded-lg bg-white/5 border border-white/10 outline-none focus:ring-1 focus:ring-blue-500 text-white"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`transition p-3 rounded-lg font-medium cursor-pointer ${
            loading
              ? "bg-blue-800 cursor-not-allowed opacity-70"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
      {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
    </div>
  );
}
