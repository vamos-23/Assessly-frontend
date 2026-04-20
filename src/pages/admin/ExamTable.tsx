import type { Exam } from "../../types/exam";
import { useNavigate } from "react-router-dom";

interface Props {
  exams: Exam[];
  onDelete: (id: number) => void;
}

export default function ExamTable({ exams, onDelete }: Props) {
  const navigate = useNavigate();
  if (exams.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center text-gray-400">
        No exams created yet
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <table className="w-full text-sm text-left table-fixed">
        <colgroup>
          <col className="w-1/2" />
          <col className="w-1/6" />
          <col className="w-1/4" />
          <col className="w-1/6" />
        </colgroup>
        <thead className="bg-white/5 text-gray-400 uppercase text-xs tracking-wider">
          <tr>
            <th className="pl-4 font-semibold">Title</th>
            <th className="p-4 font-semibold text-center">Duration</th>
            <th className="p-4 font-semibold text-center">Created By</th>
            <th className="pr-6 font-semibold text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {exams.map((exam) => (
            <tr
              key={exam.id}
              className="hover:bg-white/5 transition-colors cursor-pointer"
              onClick={() =>
                navigate(`/admin/exams/${exam.id}`, {
                  state: { examTitle: exam.title },
                })
              }
            >
              <td
                className="p-4 font-medium text-white truncate"
                title={exam.title}
              >
                {exam.title}
              </td>
              <td className="p-4 text-gray-300 text-center">
                {exam.duration} min
              </td>
              <td className="p-4 text-gray-300 text-center truncate">
                {exam.createdBy}
              </td>
              <td className="p-4 text-right">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(exam.id);
                  }}
                  className="text-red-400 hover:text-red-400 hover:bg-red-400/20 px-3 py-1 rounded-md transition-all font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
