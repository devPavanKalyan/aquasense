import React from "react";

interface ProductCardProps {
  product: {
    id: string;
    productId: string;
    name: string;
    model: string;
    brand: string;
    description: string;
    category: string;
    imageUrl: string;
    price: number;
    warrantyPeriod: string;
    returnPolicy: string;
    shippingInfo: string;
  };
  details: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, details }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition flex flex-col overflow-hidden group p-2 w-fit min-w-[140px] max-w-[200px] mx-auto">
      {/* Image */}
      <div className="w-full h-28 bg-gray-50 flex items-center justify-center overflow-hidden rounded-md">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-contain h-full group-hover:scale-105 transition-transform"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center mt-2">
        {/* Title */}
        <h2 className="text-xs font-semibold text-gray-800 text-center line-clamp-2 leading-tight">
          {product.name}
        </h2>

        {/* Price */}
        <span className="text-sm font-bold text-blue-600 mt-1">
          ₹ {product.price.toLocaleString()}
        </span>

        {/* Button */}
        <div>
          <button className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] rounded-full transition">
            ❤️
          </button>
          <button className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] rounded-full transition">
            Add to cart.
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
