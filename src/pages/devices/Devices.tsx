import axios from "axios";
import { LoaderCircle, Server, Thermometer, Wifi } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

interface ProductDTO {
  productId: string;
  name: string;
  model: string;
  brand: string;
  category: "Sensor" | "Hub";
  supportedMetrics?: string[];
  supportedSensorTypes?: string[];
  connectivityType?: string;
  compatibleWith?: string[];
}

const DevicesPage: React.FC = () => {
  const [devices, setDevices] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const user = authState.user;
  const CACHE_KEY = "versewave_devices_cache";
  const CACHE_DURATION = 5 * 60 * 1000;

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      try {
        const now = Date.now();
        const cache = localStorage.getItem(CACHE_KEY);
        if (cache) {
          const { timestamp, data } = JSON.parse(cache);
          if (now - timestamp < CACHE_DURATION) {
            setDevices(data);
            return;
          }
        }
        const { data } = await axios.get<ProductDTO[]>(
          `http://localhost:8082/api/bff.versewave.com/devices?userId=${user.email.toLowerCase()}`
        );
        setDevices(data);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ timestamp: now, data })
        );
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <LoaderCircle className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-12">
          Your Devices
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {devices.map((device) => (
            <div
              key={device.productId}
              className="group flex flex-col bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* HEADER */}
              <div className="flex items-center px-5 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
                <div className="p-2 rounded-full bg-white">
                  {device.category === "Sensor" ? (
                    <Thermometer className="w-6 h-6 text-blue-600" />
                  ) : (
                    <Server className="w-6 h-6 text-green-600" />
                  )}
                </div>
                <h2 className="ml-4 text-lg sm:text-xl font-semibold text-gray-700">
                  {device.name}
                </h2>
              </div>

              {/* BODY */}
              <div className="flex-1 px-5 py-4 space-y-2 text-gray-600 text-sm">
                <p>
                  <span className="font-medium">Model:</span> {device.model}
                </p>
                <p>
                  <span className="font-medium">Brand:</span> {device.brand}
                </p>
                <span className="inline-block text-xs bg-gray-200 text-gray-700 font-medium px-2 py-1 rounded-full uppercase tracking-wide">
                  {device.category}
                </span>
              </div>

              {/* FOOTER */}
              <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 space-y-2">
                {device.category === "Sensor" && (
                  <>
                    <div className="flex flex-wrap gap-1">
                      {device.supportedMetrics?.map((m, i) => (
                        <span
                          key={i}
                          className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {device.compatibleWith?.map((h, i) => (
                        <span
                          key={i}
                          className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
                        >
                          {h.toUpperCase()}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() =>
                        navigate(
                          `/devices/connect?sensorId=${device.productId}`
                        )
                      }
                      className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition"
                    >
                      Connect
                    </button>
                  </>
                )}

                {device.category === "Hub" && (
                  <>
                    <div className="flex flex-wrap gap-1">
                      {device.supportedSensorTypes?.map((s, i) => (
                        <span
                          key={i}
                          className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    {device.connectivityType && (
                      <div className="flex items-center text-sm text-gray-700">
                        <Wifi className="w-4 h-4 mr-1" />
                        {device.connectivityType}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DevicesPage;
