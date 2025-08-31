import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="mt-10 mb-2 w-full">
      <footer className="bg-gray-100 text-center text-sm text-gray-600 py-4 px-2">
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <a
            href="#"
            className="text-gray-600 hover:text-blue-600 font-bold hover:underline"
          >
            Privacy Policy
          </a>
          <span className="hidden sm:inline">|</span>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-600 font-bold hover:underline"
          >
            Terms of Use
          </a>
        </div>
        <p className="mt-2">
          AquaSense or its affiliates. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
