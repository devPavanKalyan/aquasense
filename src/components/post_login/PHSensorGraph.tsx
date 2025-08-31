// src/components/PhSensorGraph.tsx
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

type PhData = {
  timestamp: string;
  ph: number;
};

const sampleData: PhData[] = [
  { timestamp: "10:00", ph: 6.8 },
  { timestamp: "10:05", ph: 7.1 },
  { timestamp: "10:10", ph: 7.3 },
  { timestamp: "10:15", ph: 7.0 },
  { timestamp: "10:20", ph: 6.9 },
  { timestamp: "10:25", ph: 6.8 },
  { timestamp: "10:30", ph: 7.1 },
  { timestamp: "10:35", ph: 7.3 },
  { timestamp: "10:40", ph: 7.0 },
  { timestamp: "10:45", ph: 6.9 }
];

const PhSensorGraph: React.FC = () => {
  return (
    <div className="w-full h-[400px]">
      <h2 className="text-xl font-semibold mb-4">pH Sensor Readings</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis
            domain={[5, 9]}
            label={{ value: "pH", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="ph"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PhSensorGraph;
