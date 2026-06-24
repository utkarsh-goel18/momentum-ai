export default function TaskCard({
  title,
  time,
  category,
}) {
  return (
    <div
      className="
      bg-[#0B1730]
      border
      border-[#1E293B]
      rounded-[28px]
      p-7

      hover:-translate-y-1
      hover:border-purple-500/40
      hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]

      transition-all
      duration-300
      cursor-pointer
      "
    >
      <div className="flex justify-between items-center">

        <div>
          <h3 className="text-2xl font-bold">
            {title}
          </h3>

          <p className="text-slate-400 mt-2 text-lg">
            {time}
          </p>
        </div>

        <div
          className="
          px-5
          py-2
          rounded-full
          bg-purple-500/20
          text-purple-300
          "
        >
          {category}
        </div>

      </div>
    </div>
  );
}