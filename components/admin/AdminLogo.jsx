export default function AdminLogo({ className = "" }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#22C55E] text-white font-bold">
        LM
      </div>
      <span className="text-lg font-semibold text-gray-900">LangMaster Admin</span>
    </div>
  );
}
