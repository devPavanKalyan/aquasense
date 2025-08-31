import axios from "axios";
import { LoaderCircle, Server } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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

const CACHE_KEY = "versewave_devices_cache";

const ConnectSensorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sensorId = searchParams.get("sensorId");

  const [sensor, setSensor] = useState<ProductDTO | null>(null);
  const [purchasedHubs, setPurchasedHubs] = useState<ProductDTO[]>([]);
  const [availableHubs, setAvailableHubs] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sensorId) return;

    const fetchFromCache = () => {
      const cache = localStorage.getItem(CACHE_KEY);
      if (!cache) return;
      const { data: devices }: { data: ProductDTO[] } = JSON.parse(cache);
      const found = devices.find(
        (d) =>
          d.productId.toLowerCase() === sensorId.toLowerCase() &&
          d.category === "Sensor"
      );
      if (!found) return;
      setSensor(found);

      const hubs = devices.filter((d) => d.category === "Hub");
      const purchased = hubs.filter((hub) =>
        found.compatibleWith?.some(
          (comp) => comp.toLowerCase() === hub.productId.toLowerCase()
        )
      );
      setPurchasedHubs(purchased);
    };

    const fetchAvailable = async () => {
      try {
        const res = await axios.get<ProductDTO[]>(
          `http://localhost:8082/api/bff.versewave.com/hubs/available?compatibleWith=${sensorId}`
        );
        setAvailableHubs(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFromCache();
    fetchAvailable().finally(() => setLoading(false));
  }, [sensorId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <LoaderCircle className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!sensor) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <h2 className="text-2xl font-semibold text-red-500">
          Sensor Not Found!
        </h2>
      </div>
    );
  }

  const Card: React.FC<{
    title: string;
    iconColor: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
  }> = ({ title, iconColor, children, footer }) => (
    <div className="flex flex-col justify-between bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
      {/* header */}
      <div className="flex items-center mb-4">
        <div className={`p-2 rounded-full bg-${iconColor}-50`}>
          <Server className={`w-6 h-6 text-${iconColor}-600`} />
        </div>
        <h3 className="ml-3 text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      {/* body */}
      <div className="flex-1 space-y-1 text-gray-600 text-sm">{children}</div>
      {/* footer */}
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );

  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        {/* Back + Title */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/devices/purchased")}
            className="text-blue-600 hover:underline text-sm"
          >
            ← Back
          </button>
          <h1 className="flex-1 text-center text-3xl font-bold text-gray-800">
            Connect Sensor
          </h1>
        </div>

        {/* Sensor Info */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {sensor.name}
            </h2>
            <p className="text-gray-600">Model: {sensor.model}</p>
            <p className="text-gray-600 mb-4">Brand: {sensor.brand}</p>
            {sensor.supportedMetrics && (
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Supported Metrics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {sensor.supportedMetrics.map((m, i) => (
                    <span
                      key={i}
                      className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Purchased Hubs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Your Compatible Hubs
          </h2>
          {purchasedHubs.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchasedHubs.map((hub) => (
                <Card
                  key={hub.productId}
                  title={hub.name}
                  iconColor="green"
                  footer={
                    <button
                      onClick={() =>
                        // your connect logic here, e.g.
                        navigate(
                          `/devices/connect?sensorId=${sensorId}&hubId=${hub.productId}`
                        )
                      }
                      className="w-full py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition"
                    >
                      Connect to This
                    </button>
                  }
                >
                  <p>
                    <span className="font-medium">Model:</span> {hub.model}
                  </p>
                  <p>
                    <span className="font-medium">Connectivity:</span>{" "}
                    {hub.connectivityType}
                  </p>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You haven’t purchased any hubs yet.</p>
          )}
        </section>

        {/* Available to Buy */}
        <section>
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            Available Hubs
          </h2>
          {availableHubs.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableHubs.map((hub) => (
                <Card
                  title={hub.name}
                  iconColor="blue"
                  footer={
                    <button
                      onClick={() => {
                        /* your buy logic */
                      }}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition"
                    >
                      Buy Now
                    </button>
                  }
                >
                  <p>
                    <span className="font-medium">Model:</span> {hub.model}
                  </p>
                  <p>
                    <span className="font-medium">Connectivity:</span>{" "}
                    {hub.connectivityType}
                  </p>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No hubs available for purchase.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ConnectSensorPage;
