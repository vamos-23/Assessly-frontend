export default function AuthCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden bg-[#0B1120]">
      <div
        className="absolute inset-0 
                  bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),
                       linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)]
                  bg-size-40px_40px"
      />
      <div
        className="absolute -top-25 -left-25 w-100 h-100
                  bg-blue-500/10 rounded-full blur-3xl"
      />
      <div
        className="absolute -bottom-25 -right-25 w-100 h-100
                  bg-indigo-500/10 rounded-full blur-3xl"
      />
      <div
        className="relative p-8 rounded-2xl 
                  bg-white/5 backdrop-blur-xl 
                  border border-white/10 
                  shadow-[0_20px_60px_rgba(0,0,0,0.6)] space-y-6"
        style={{ width: title == "Login to Assessly Exam Portal" ? 400 : 440 }}
      >
        <h1 className="text-2xl font-semibold text-center text-white">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}
