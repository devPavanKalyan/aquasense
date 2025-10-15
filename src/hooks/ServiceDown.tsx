import { AlertTriangle, RefreshCcw } from "lucide-react";

const ServiceDown = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800 md:max-w-7xl mx-auto p-5">
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4 animate-pulse drop-shadow-sm" />

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Oops! Something went wrong.
      </h2>

      <p className="text-gray-600 max-w-md leading-relaxed">
        We couldn’t connect to the server right now. Please check your
        connection or try again in a moment.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl shadow-sm hover:bg-gray-800 transition-all duration-200"
      >
        <RefreshCcw className="w-4 h-4" />
        Retry
      </button>
    </div>
  );
};

export default ServiceDown;
