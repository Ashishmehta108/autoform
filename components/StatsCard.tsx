import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <Card className="relative bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-600 cursor-pointer shadow-inner-sm">
      <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_2px_6px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_2px_6px_rgba(255,255,255,0.05)]" />

      <CardHeader className="pb-2 relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            {title}
          </CardTitle>
          <Icon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
        </div>
      </CardHeader>

      <CardContent className="relative z-10">
        <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          {value}
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
