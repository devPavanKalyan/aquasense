import React from "react";
import {
  Brush,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

type SensorReading = {
  readings: { name: string; value: number }[];
  sensorId: string;
  status: string;
  timestamp: string;
};

interface Props {
  data: SensorReading[];
}

const SensorChart: React.FC<Props> = ({ data }) => {
  // Transform into recharts-friendly format
  const chartData = data
    .map((item) => {
      const value = item.readings?.find((r) => r.name === "pH")?.value ?? null;
      return {
        time: item.timestamp ? new Date(item.timestamp).getTime() : null,
        pH: value
      };
    })
    .filter((d) => d.time !== null && d.pH !== null); // remove empty points

  return (
    <div className="w-full h-[450px] p-4 bg-white shadow rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">pH Level Trend</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          {/* Time on X-axis */}
          <XAxis
            dataKey="time"
            type="number"
            domain={["auto", "auto"]}
            tickFormatter={(unixTime) =>
              new Date(unixTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
              })
            }
            tick={{ fontSize: 12 }}
            minTickGap={20}
          />

          {/* pH on Y-axis */}
          <YAxis
            domain={[0, 14]}
            tickCount={8} // step ~2
            tick={{ fontSize: 12 }}
            label={{
              value: "pH",
              angle: -90,
              position: "insideLeft",
              offset: -5
            }}
          />

          <Tooltip
            labelFormatter={(unixTime) =>
              new Date(unixTime).toLocaleTimeString()
            }
            contentStyle={{
              borderRadius: "12px",
              backgroundColor: "#f9fafb"
            }}
          />

          <Line
            type="monotone"
            dataKey="pH"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3, stroke: "#2563eb", strokeWidth: 1, fill: "#3b82f6" }}
            activeDot={{ r: 6 }}
          />

          {/* Brush for scroll/zoom */}
          <Brush
            dataKey="time"
            height={30}
            stroke="#3b82f6"
            travellerWidth={10}
            tickFormatter={(unixTime) =>
              new Date(unixTime).toLocaleTimeString([], {
                minute: "2-digit",
                second: "2-digit"
              })
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SensorChart;
