// SensorTrendChart.tsx
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

interface SensorMetric {
  timestamp: number; // epoch millis
  temperature: number;
  humidity: number;
  co2: number;
}

interface SensorTrendChartProps {
  data: SensorMetric[];
}

const SensorTrendChart: React.FC<SensorTrendChartProps> = ({ data }) => {
  // Format timestamp for X axis
  const formattedData = data.map((d) => ({
    ...d,
    time: new Date(d.timestamp).toLocaleTimeString()
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={formattedData}
        margin={{ top: 20, right: 30, bottom: 20, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#ff7300"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="humidity"
          stroke="#387908"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="co2"
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SensorTrendChart;
