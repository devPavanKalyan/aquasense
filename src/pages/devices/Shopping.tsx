import { useState } from "react";
import MainSectionShopping from "./MainSectionShopping";
import MainSectionTwo from "./MainSectionTwo";
import ScrollableCardWrapper from "./ScrollableCardHero";

const Shopping = () => {
  const [filters, setFilters] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  const categories = [
    "All",
    "Fish Farming",
    "Agriculture",
    "Irrigation",
    "Water Testing",
    "Smart Sensors",
    "Soil Monitoring",
    "Climate Control",
    "Crop Management",
    "Livestock Monitoring",
    "Pest Control",
    "Greenhouse Automation",
    "Drones & Imaging",
    "Weather Stations",
    "Nutrient Analysis",
    "Seedling Systems",
    "Aquaponics",
    "Hydroponics",
    "Water Quality",
    "Data Analytics",
    "Edge Devices"
  ];

  //   const productsData = [
  //     {
  //       product: {
  //         id: "68088428af4b52623c564434",
  //         productId: "SENSOR-X200",
  //         name: "Smart pH Sensor X200",
  //         model: "PH-X200",
  //         brand: "AquaSense",
  //         description:
  //           "High-accuracy pH sensor suitable for fish farming and aquaculture.",
  //         category: "Fish Farming",
  //         imageUrl: "/images/sensor-x200.png",
  //         price: 2599.0,
  //         warrantyPeriod: "1 Year",
  //         returnPolicy: "15-day return",
  //         shippingInfo: "Ships in 2-4 days"
  //       },
  //       details: {
  //         id: "680884d6af4b52623c564435",
  //         productRefId: "SENSOR-X200",
  //         supportedMetrics: ["pH", "TDS", "Temperature"],
  //         specifications: {
  //           Power: "5V DC",
  //           Accuracy: "±0.02 pH",
  //           BodyMaterial: "ABS Plastic",
  //           CableLength: "2 meters"
  //         },
  //         compatibleWith: ["hub-x100", "hub-x200"]
  //       }
  //     },
  //     {
  //       product: {
  //         id: "680884f0af4b52623c564436",
  //         productId: "HUB-X200",
  //         name: "IoT Data Sync Hub X200",
  //         model: "HUB-X200",
  //         brand: "AquaSense",
  //         description:
  //           "Multi-sensor hub with 4G/Wi-Fi support and cloud sync capabilities.",
  //         category: "Smart Sensors",
  //         imageUrl: "/images/hub-x200.png",
  //         price: 6799.0,
  //         warrantyPeriod: "2 Years",
  //         returnPolicy: "7-day return",
  //         shippingInfo: "Free delivery in 3-5 days"
  //       },
  //       details: {
  //         id: "6808854daf4b52623c564437",
  //         productRefId: "HUB-X200",
  //         firmwareVersion: "1.0.3",
  //         connectivityType: "Wi-Fi, 4G",
  //         supportedSensorTypes: ["pH", "TDS", "DO", "Temperature"],
  //         specifications: {
  //           MaxSensorsSupported: "16",
  //           Power: "12V DC",
  //           SyncInterval: "10s"
  //         }
  //       }
  //     }
  //   ];

  //   const filteredProducts = productsData.filter((item) => {
  //     const matchesCategory =
  //       filters.length === 0 ||
  //       filters.includes("All") ||
  //       filters.includes(item.product.category);
  //     const matchesSearch =
  //       search.trim() === "" ||
  //       item.product.name.toLowerCase().includes(search.toLowerCase()) ||
  //       item.product.description.toLowerCase().includes(search.toLowerCase()) ||
  //       item.product.model.toLowerCase().includes(search.toLowerCase());
  //     return matchesCategory && matchesSearch;
  //   });

  return (
    <div className="max-w-[95vw] mx-auto pt-[80px] pb-6 text-gray-800">
      {/* Top Header */}
      <div className="flex items-center justify-between w-full h-[70px] px-6 bg-white shadow-md fixed top-0 left-0 z-50">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold text-blue-600">Versewave</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-4 max-w-md relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Wishlist and Cart Icons */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-blue-600">❤️</button>
          <button className="p-2 text-gray-600 hover:text-blue-600">🛒</button>
          <button className="p-2 text-gray-600 hover:text-blue-600">
            👤 Account
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto py-2 mb-6 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilters(cat === "All" ? [] : [cat])}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border 
              ${
                filters.includes(cat) || (cat === "All" && filters.length === 0)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              } transition`}
          >
            {cat}
          </button>
        ))}
      </div>

      <ScrollableCardWrapper>
        {["red", "blue", "green", "yellow", "purple"].map((color, index) => (
          <div
            key={index}
            className={`flex-shrink-0 bg-${color}-400 rounded-md flex items-center justify-center text-white text-sm font-semibold`}
            style={{
              width: "100%", // Each card takes full width of the container
              height: "100%" // Each card takes full height of the parent (400px)
            }}
          >
            Card {index + 1}
          </div>
        ))}
      </ScrollableCardWrapper>

      <MainSectionShopping />

      <MainSectionTwo></MainSectionTwo>
    </div>
  );
};

export default Shopping;

//  {/* Product Grid */}
//  <div className="px-4">
//  {filteredProducts.length === 0 ? (
//    <div className="text-center py-20 text-gray-500">
//      <p className="text-lg font-semibold">No products found.</p>
//      <p className="text-sm mt-2">
//        Try adjusting your search or filters.
//      </p>
//    </div>
//  ) : (
//    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
//      {filteredProducts.map((item) => (
//        <div key={item.product.id}>
//          <ProductCard product={item.product} details={item.details} />
//        </div>
//      ))}
//    </div>
//  )}
// </div>
