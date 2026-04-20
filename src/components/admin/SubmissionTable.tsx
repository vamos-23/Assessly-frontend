import type { Submission } from "../../types/submission";

interface Props {
  submissions: Submission[];
}

export default function SubmissionTable({ submissions }: Props) {
  if (submissions.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center text-gray-400">
        No submissions yet
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <table className="w-full text-sm text-left table-fixed">
        <colgroup>
          <col className="w-1/3" />
          <col className="w-1/3" />
          <col className="w-1/3" />
        </colgroup>

        <thead className="bg-white/5 text-gray-400 uppercase text-xs tracking-wider">
          <tr>
            <th className="p-4 font-semibold">Exam</th>
            <th className="p-4 font-semibold text-center">Student</th>
            <th className="p-4 font-semibold text-center">Score</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/10">
          {submissions.map((s) => (
            <tr key={s.id} className="hover:bg-white/5 transition-colors">
              <td className="p-4 text-white truncate">{s.exam.title}</td>

              <td className="p-4 text-center text-gray-300 truncate">
                {s.userEmail}
              </td>

              <td className="p-4 text-center font-semibold text-green-400">
                {s.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
