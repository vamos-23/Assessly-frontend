import type { AdminDashboardStats } from "../../types/dashboardStats";
import { BookOpen, HelpCircle, Send, type LucideIcon } from "lucide-react";

interface StatItem {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export default function StatsCards({ stats }: { stats: AdminDashboardStats }) {
  const items: StatItem[] = [
    {
      label: "Total Exams",
      value: stats.totalExams,
      icon: BookOpen,
      color: "from-orange-700/20 to-transparent",
    },
    {
      label: "Total Questions",
      value: stats.totalQuestions,
      icon: HelpCircle,
      color: "from-purple-700/20 to-transparent",
    },
    {
      label: "Total Submissions",
      value: stats.totalSubmissions,
      icon: Send,
      color: "from-emerald-700/20 to-transparent",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item) => (
        <div
          key={item.label}
          className="group relative overflow-hidden bg-white/3 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/5 hover:-translate-y-1 hover:border-white/20"
        >
          <div
            className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity`}
          />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium tracking-wide uppercase">
                {item.label}
              </p>
              <p className="text-4xl font-bold mt-2 text-white tracking-tight">
                {item.value.toLocaleString()}
              </p>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:scale-110 transition-transform">
              <item.icon className="text-gray-300" size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
