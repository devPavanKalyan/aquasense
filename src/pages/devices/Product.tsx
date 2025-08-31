const Product = () => {
  const product = {
    name: "Smart Aqua Sensor",
    type: "IoT Water Quality Device",
    price: "₹14,999",
    status: "In Stock",
    features: [
      "Real-time DO, pH, and Temperature monitoring",
      "Cloud connectivity with alert system",
      "Water-quality prediction with AI",
      "Durable & waterproof hardware"
    ],
    description:
      "Smart Aqua Sensor is an IoT-enabled device tailored for fish farming, irrigation, and industrial water monitoring. It ensures safe aquatic environments and operational efficiency by providing real-time metrics and insights."
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 text-white rounded-xl p-6 mb-6 shadow">
        <h1 className="text-3xl font-bold mb-1">{product.name}</h1>
        <p className="text-sm font-medium opacity-90">{product.type}</p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Info */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Product Description</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>

          <div className="mb-6">
            <span className="text-2xl font-bold text-blue-700">
              {product.price}
            </span>
            <span className="ml-3 text-sm text-green-600 font-medium">
              {product.status}
            </span>
          </div>

          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>

        {/* Features List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Key Features</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {product.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Future: Related Products */}
      {/* <section className="mt-12">
          <h3 className="text-lg font-semibold mb-4">You might also like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            // Related product cards
          </div>
        </section> */}
    </div>
  );
};

export default Product;
