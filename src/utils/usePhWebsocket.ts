// src/hooks/usePhWebSocket.ts
import { useEffect, useState } from "react";

export type PhData = {
  timestamp: string;
  ph: number;
};

export const usePhWebSocket = (url: string) => {
  const [data, setData] = useState<PhData[]>([]);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      try {
        const newReading: PhData = JSON.parse(event.data);
        setData((prev) => [...prev.slice(-19), newReading]); // Keep last 20 readings
      } catch (err) {
        console.error("Error parsing WebSocket data:", err);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, [url]);

  return data;
};
