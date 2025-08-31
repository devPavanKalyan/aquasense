const ProductGrid = () => {
  return (
    <div className="p-6">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Products</h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* Product Card 1 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform">
          <img
            src="https://via.placeholder.com/150"
            alt="Product 1"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">Product 1</h3>
            <p className="text-gray-600 text-sm">
              A short description of the product.
            </p>
            <span className="text-xl font-bold text-blue-600 mt-2 block">
              ₹ 1,499
            </span>
            <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              View Details
            </button>
          </div>
        </div>

        {/* Product Card 2 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform">
          <img
            src="https://via.placeholder.com/150"
            alt="Product 2"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">Product 2</h3>
            <p className="text-gray-600 text-sm">
              A short description of the product.
            </p>
            <span className="text-xl font-bold text-blue-600 mt-2 block">
              ₹ 1,799
            </span>
            <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              View Details
            </button>
          </div>
        </div>

        {/* Product Card 3 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform">
          <img
            src="https://via.placeholder.com/150"
            alt="Product 3"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">Product 3</h3>
            <p className="text-gray-600 text-sm">
              A short description of the product.
            </p>
            <span className="text-xl font-bold text-blue-600 mt-2 block">
              ₹ 2,299
            </span>
            <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              View Details
            </button>
          </div>
        </div>

        {/* Product Card 4 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform">
          <img
            src="https://via.placeholder.com/150"
            alt="Product 4"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">Product 4</h3>
            <p className="text-gray-600 text-sm">
              A short description of the product.
            </p>
            <span className="text-xl font-bold text-blue-600 mt-2 block">
              ₹ 3,499
            </span>
            <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              View Details
            </button>
          </div>
        </div>

        {/* Product Card 5 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform">
          <img
            src="https://via.placeholder.com/150"
            alt="Product 5"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">Product 5</h3>
            <p className="text-gray-600 text-sm">
              A short description of the product.
            </p>
            <span className="text-xl font-bold text-blue-600 mt-2 block">
              ₹ 2,199
            </span>
            <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              View Details
            </button>
          </div>
        </div>

        {/* Product Card 6 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform">
          <img
            src="https://via.placeholder.com/150"
            alt="Product 6"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">Product 6</h3>
            <p className="text-gray-600 text-sm">
              A short description of the product.
            </p>
            <span className="text-xl font-bold text-blue-600 mt-2 block">
              ₹ 1,999
            </span>
            <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              View Details
            </button>
          </div>
        </div>

        {/* Product Card 7 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform">
          <img
            src="https://via.placeholder.com/150"
            alt="Product 7"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">Product 7</h3>
            <p className="text-gray-600 text-sm">
              A short description of the product.
            </p>
            <span className="text-xl font-bold text-blue-600 mt-2 block">
              ₹ 4,499
            </span>
            <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              View Details
            </button>
          </div>
        </div>

        {/* Product Card 8 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform">
          <img
            src="https://via.placeholder.com/150"
            alt="Product 8"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">Product 8</h3>
            <p className="text-gray-600 text-sm">
              A short description of the product.
            </p>
            <span className="text-xl font-bold text-blue-600 mt-2 block">
              ₹ 3,999
            </span>
            <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
