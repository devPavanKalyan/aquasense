import { Construction } from "lucide-react";

const Inventory: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-10 px-4">
      <Construction className="w-12 h-12 text-yellow-500 animate-bounce mb-4" />
      <h2 className="text-xl font-semibold text-gray-800">
        Inventory is Coming Soon
      </h2>
      <p className="text-gray-600 mt-2 max-w-md">
        We're working hard to bring you powerful Inventory features. Stay tuned
        for updates!
      </p>
    </div>
  );
};

export default Inventory;
