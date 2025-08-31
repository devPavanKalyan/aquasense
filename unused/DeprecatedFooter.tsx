const DFooter = () => {
  return (
    <footer className="w-full bg-gray-100 text-center text-sm text-gray-600 py-4 px-2 mt-10">
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <a
          href="#"
          className="text-gray-600 hover:text-blue-600 font-bold hover:underline transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-sm px-1"
        >
          Privacy Policy
        </a>

        <span className="hidden sm:inline">|</span>
        <a
          href="#"
          className="text-gray-600 hover:text-blue-600 font-bold hover:underline transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-sm px-1"
        >
          Terms of Use
        </a>
      </div>
      <p className="mt-2">AquaSense or its affiliates. All rights reserved.</p>
    </footer>
  );
};

export default DFooter;
