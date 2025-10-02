"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function AreaChartZincGradient() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient
              id="zinc-desktop-stroke"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor="#52525b" /> {/* zinc-600 */}
              <stop offset="100%" stopColor="#a1a1aa" /> {/* zinc-400 */}
            </linearGradient>

            <linearGradient id="zinc-desktop-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#52525b" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#a1a1aa" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="month"
            stroke="#a1a1aa"
            tickLine={false}
            axisLine={false}
          />
          <YAxis stroke="#a1a1aa" tickLine={false} axisLine={false} />
          <Tooltip content={<ChartTooltipContent />} />

          <Area
            type="natural"
            dataKey="desktop"
            stroke="url(#zinc-desktop-stroke)"
            fill="url(#zinc-desktop-fill)"
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
