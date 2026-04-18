export default function Navbar() {
  return (
    <div className="w-full px-8 py-4 flex justify-between items-center bg-slate-900 border-b border-slate-800">
      <div className="flex items-center gap-2">
        <img src="/assessly_icon_192.png" alt="assessly" className="w-8 h-8" />
        <h1 className="text-xl font-semibold tracking-wide text-white">
          Assessly
        </h1>
      </div>
    </div>
  );
}
