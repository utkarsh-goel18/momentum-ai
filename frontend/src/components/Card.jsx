export default function Card({
  children,
  className = "",
  ...props
}) {
  return (
    <div
      className={`
        bg-[#0F172A]/70
        backdrop-blur-xl
        border border-[#1E293B]
        rounded-[28px]
        shadow-[0_10px_50px_rgba(0,0,0,0.4)]
        transition-all duration-300
        hover:border-purple-500/30
        hover:shadow-[0_10px_60px_rgba(139,92,246,0.15)]
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}