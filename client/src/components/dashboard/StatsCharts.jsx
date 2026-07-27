import { useTheme } from "../../context/ThemeContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = ["#3B82F6", "#F59E0B", "#10B981", "#EF4444"];

export default function StatsCharts({ stats }) {
  const { darkMode } = useTheme();

  const data = [
    { name: "Applied", value: stats.applied },
    { name: "Interview", value: stats.interview },
    { name: "Offer", value: stats.offer },
    { name: "Rejected", value: stats.rejected },
  ];

  const axisColor = darkMode ? "#CBD5E1" : "#475569";
  const gridColor = darkMode ? "#334155" : "#E2E8F0";

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-2">
      {/* Pie Chart */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
          Applications Distribution
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={110}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1E293B" : "#FFFFFF",
                border: "1px solid #475569",
                borderRadius: "10px",
                color: darkMode ? "#FFFFFF" : "#000000",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
          Applications by Status
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid
              stroke={gridColor}
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="name"
              stroke={axisColor}
              tick={{ fill: axisColor }}
            />

            <YAxis
              stroke={axisColor}
              tick={{ fill: axisColor }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1E293B" : "#FFFFFF",
                border: "1px solid #475569",
                borderRadius: "10px",
                color: darkMode ? "#FFFFFF" : "#000000",
              }}
            />

            <Legend
              wrapperStyle={{
                color: darkMode ? "#FFFFFF" : "#000000",
              }}
            />

            <Bar
              dataKey="value"
              fill="#3B82F6"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}