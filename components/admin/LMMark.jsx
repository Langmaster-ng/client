export default function LMMark({ size = 36, className = "" }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`flex items-center justify-center rounded-xl bg-[#22C55E] text-white font-bold ${className}`}
      aria-label="LangMaster logo"
    >
      LM
    </div>
  );
}
