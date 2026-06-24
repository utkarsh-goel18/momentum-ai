export default function GoalCard({
  title,
  daysLeft,
  progress,
  successRate,
  status,
}) {
  return (
    <div
      className="
      bg-[#0B1730]
      border
      border-[#1E293B]
      rounded-[32px]
      p-8

      hover:scale-[1.01]
      hover:border-blue-500/40
      hover:shadow-[0_0_50px_rgba(59,130,246,0.12)]

      transition-all
      duration-300
      cursor-pointer
      "
    >
      <div className="flex justify-between items-start">

        <div>

          <h3 className="text-3xl font-bold">
            {title}
          </h3>

          <p className="text-slate-400 text-xl">
            {daysLeft} days remaining
          </p>

        </div>

        <div className="flex flex-col items-end gap-2">

          <div className="text-green-400 text-4xl font-bold">
            {successRate}%
          </div>

          {status === "completed" && (

            <span
              className="
                px-3
                py-1
                rounded-full
                bg-green-500/20
                text-green-400
                text-sm
              "
            >
              Completed
            </span>

          )}

        </div>

      </div>

      <div className="mt-8">

        <div className="h-4 rounded-full bg-slate-700 overflow-hidden">

          <div
            className="
            h-full
            rounded-full
            bg-gradient-to-r
            from-purple-500
            via-violet-500
            to-blue-500
            "
            style={{ width: `${progress}%` }}
          />

        </div>

        <p className="text-right text-slate-400 mt-4 text-xl">
          {progress}% complete
        </p>

      </div>

    </div>
  );
}