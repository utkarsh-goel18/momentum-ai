export default function InsightCard({
  title,
  message,
  color,
}) {
  return (
    <div
      className="
      bg-[#0B1730]
      rounded-[28px]
      p-7
      border

      hover:scale-[1.02]
      hover:shadow-[0_0_40px_rgba(168,85,247,0.08)]

      transition-all
      duration-300
      cursor-pointer
      "
      style={{
        borderColor: color,
      }}
    >
      <h3 className="font-bold text-2xl">
        {title}
      </h3>

      <p className="text-slate-400 mt-3 text-lg">
        {message}
      </p>
    </div>
  );
}