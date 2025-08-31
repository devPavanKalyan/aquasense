import { Client } from "@stomp/stompjs";
import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";

interface SensorClientProps {
  sensorId: string;
}

const SensorClient: React.FC<SensorClientProps> = ({ sensorId }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:9097/ws-sensors");
    const stompClient = new Client({
      webSocketFactory: () => socket as any,
      reconnectDelay: 5000
    });

    stompClient.onConnect = () => {
      stompClient.subscribe(`/topic/sensors/${sensorId}`, (message) => {
        const payload = JSON.parse(message.body);
        setData(payload);
        console.log("Received metric:", payload);
      });
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [sensorId]);

  return (
    <div>
      <h2>Sensor {sensorId}</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default SensorClient;
