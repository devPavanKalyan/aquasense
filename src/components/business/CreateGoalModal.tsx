import axios from "axios";
import { X } from "lucide-react";
import React, { type FC, useState } from "react";
import Select from "react-select";

interface CreateGoalModalProps {
  onClose: () => void;
}

// Options for the select dropdown
const goalOptions = [
  { value: "fish_farming", label: "Fish Farming" },
  { value: "industrial_water", label: "Industrial Water Monitoring" },
  { value: "agriculture", label: "Agriculture" },
  { value: "other", label: "Other" }
];

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: "0.75rem",
    borderColor: "#cbd5e1",
    padding: "0.25rem",
    "&:hover": {
      borderColor: "#3b82f6"
    },
    boxShadow: "none"
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#3b82f6"
      : state.isFocused
      ? "#dbeafe"
      : "#ffffff",
    color: state.isSelected ? "#ffffff" : "#1e293b",
    padding: "0.5rem 1rem",
    cursor: "pointer"
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: "0.75rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#1e293b"
  })
};

const CreateGoalModal: FC<CreateGoalModalProps> = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<
    (typeof goalOptions)[0] | null
  >(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCategory) {
      alert("Please select a category");
      return;
    }

    const data = {
      userId: "suddalapavankalyan.sp@gmail.com",
      name: selectedCategory.label
    };

    axios
      .post(`http://localhost:9095/api/goals`, data)
      .then((result) => {
        if (result.status === 201) {
          alert("Added successfully");
        }
      })
      .catch((err) => {
        console.error(err);
      });

    setSelectedCategory(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-blue-50 rounded-2xl p-8 w-[400px] max-w-[95vw] relative shadow-xl border border-blue-200">
        {/* Close Button */}
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Create Goal
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Category Select */}
          <label className="text-gray-700 font-medium">
            Goal Name
            <Select
              options={goalOptions}
              value={selectedCategory}
              onChange={(option) => setSelectedCategory(option)}
              placeholder="Select category..."
              isSearchable
              styles={customStyles}
              className="mt-2"
            />
          </label>

          <button
            type="submit"
            className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGoalModal;
