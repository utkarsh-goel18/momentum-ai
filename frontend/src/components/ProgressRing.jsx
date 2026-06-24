export default function ProgressRing({
  percentage = 0,
}) {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference -
    (percentage / 100) * circumference;

  return (
    <div className="relative">

      <div
        className="
        absolute
        inset-0
        rounded-full
        bg-purple-500/20
        blur-3xl
        animate-pulse
        "
      />

      <svg
        width="240"
        height="240"
        className="-rotate-90 relative z-10"
      >
        <circle
          cx="120"
          cy="120"
          r={radius}
          stroke="#1E293B"
          strokeWidth="14"
          fill="transparent"
        />

        <circle
          cx="120"
          cy="120"
          r={radius}
          stroke="url(#gradient)"
          strokeWidth="14"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />

        <defs>
          <linearGradient
            id="gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              stopColor="#A855F7"
            />

            <stop
              offset="100%"
              stopColor="#3B82F6"
            />
          </linearGradient>
        </defs>
      </svg>

      <div
        className="
        absolute
        inset-0
        flex
        flex-col
        items-center
        justify-center
        "
      >
        <h2 className="text-6xl font-bold">
          {percentage}%
        </h2>

        <p className="text-slate-400 text-xl">
          Complete
        </p>
      </div>

    </div>
  );
}