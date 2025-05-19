// AttendancePieChart.js
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Light colors for better text visibility
const COLORS = [
  "#4ade80", // green
  "#facc15", // yellow
  "#f87171", // red
  "#60a5fa", // blue
  "#a78bfa", // purple
];

const AttendancePieChart = ({ attendance }) => {
  if (!attendance || attendance.length === 0) return null;

  const data = attendance.map((subject) => ({
    name: subject.subjectName,
    value: Number(subject.percentage) || 0,
  }));

  return (
    // Reduce height for smaller chart (e.g. 300px height)
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}  // reduced from 130 to 90
          label={({ name, value }) => `${name}: ${value}%`}
          labelLine={false}
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              stroke="#fff"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => `${value}%`}
          contentStyle={{ backgroundColor: "#f3f4f6", borderRadius: 8 }}
        />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AttendancePieChart;
