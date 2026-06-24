import Card from "./Card";

export default function StatCard({
  title,
  value,
  subtitle,
}) {
  return (
    <Card className="p-6">

      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h2 className="text-5xl font-bold mt-4">
        {value}
      </h2>

      <p className="text-slate-500 mt-3">
        {subtitle}
      </p>

    </Card>
  );
}