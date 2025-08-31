const MainSection = () => {
  return (
    <div className="px-6 py-12">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
        Featured Categories & Offers
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Category 1 */}
        <div className="bg-gradient-to-r rounded-lg shadow-lg p-4 flex flex-col justify-between hover:scale-105 transition-transform">
          <div className="w-full h-36 bg-gray-300 mb-4"></div>
          <h3 className="text-lg font-bold mb-2">Category Title</h3>
          <p className="text-sm mb-4">Description</p>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500 transition">
            Button Text
          </button>
        </div>

        {/* Category 2 */}
        <div className="bg-gradient-to-r rounded-lg shadow-lg p-4 flex flex-col justify-between hover:scale-105 transition-transform">
          <div className="w-full h-36 bg-gray-300 mb-4"></div>
          <h3 className="text-lg font-bold mb-2">Category Title</h3>
          <p className="text-sm mb-4">Description</p>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500 transition">
            Button Text
          </button>
        </div>

        {/* Category 3 */}
        <div className="bg-gradient-to-r rounded-lg shadow-lg p-4 flex flex-col justify-between hover:scale-105 transition-transform">
          <div className="w-full h-36 bg-gray-300 mb-4"></div>
          <h3 className="text-lg font-bold mb-2">Category Title</h3>
          <p className="text-sm mb-4">Description</p>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500 transition">
            Button Text
          </button>
        </div>

        {/* Category 4 */}
        <div className="bg-gradient-to-r rounded-lg shadow-lg p-4 flex flex-col justify-between hover:scale-105 transition-transform">
          <div className="w-full h-36 bg-gray-300 mb-4"></div>
          <h3 className="text-lg font-bold mb-2">Category Title</h3>
          <p className="text-sm mb-4">Description</p>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500 transition">
            Button Text
          </button>
        </div>

        {/* Category 5 */}
        <div className="bg-gradient-to-r rounded-lg shadow-lg p-4 flex flex-col justify-between hover:scale-105 transition-transform">
          <div className="w-full h-36 bg-gray-300 mb-4"></div>
          <h3 className="text-lg font-bold mb-2">Category Title</h3>
          <p className="text-sm mb-4">Description</p>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500 transition">
            Button Text
          </button>
        </div>

        {/* Category 6 */}
        <div className="bg-gradient-to-r rounded-lg shadow-lg p-4 flex flex-col justify-between hover:scale-105 transition-transform">
          <div className="w-full h-36 bg-gray-300 mb-4"></div>
          <h3 className="text-lg font-bold mb-2">Category Title</h3>
          <p className="text-sm mb-4">Description</p>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500 transition">
            Button Text
          </button>
        </div>

        {/* Category 7 */}
        <div className="bg-gradient-to-r rounded-lg shadow-lg p-4 flex flex-col justify-between hover:scale-105 transition-transform">
          <div className="w-full h-36 bg-gray-300 mb-4"></div>
          <h3 className="text-lg font-bold mb-2">Category Title</h3>
          <p className="text-sm mb-4">Description</p>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500 transition">
            Button Text
          </button>
        </div>

        {/* Category 8 */}
        <div className="bg-gradient-to-r rounded-lg shadow-lg p-4 flex flex-col justify-between hover:scale-105 transition-transform">
          <div className="w-full h-36 bg-gray-300 mb-4"></div>
          <h3 className="text-lg font-bold mb-2">Category Title</h3>
          <p className="text-sm mb-4">Description</p>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500 transition">
            Button Text
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
