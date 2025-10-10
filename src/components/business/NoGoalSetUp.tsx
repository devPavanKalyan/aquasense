import React, { useState } from "react";
import CreateGoalSetupModal from "./CreateGoalSetup";

const NoGoalSetUp: React.FC = ({}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 md:px-6 py-6 space-y-4">
      <h1 className="text-3xl font-bold text-gray-800">
        Start connecting your devices and monitor here.
      </h1>
      <p className="text-xl text-gray-600">
        Add your IoT sensors, view real-time data, and manage everything from
        one place.
      </p>
      <button
        className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
        onClick={() => setShowModal(true)}
      >
        Connect Device
      </button>

      <CreateGoalSetupModal
        isOpen={showModal}
        type=""
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default NoGoalSetUp;
