import axios from "axios";
import { X } from "lucide-react";
import type React from "react";
import { useContext, useEffect, useState, type JSX } from "react";
import Select, { type SingleValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import { AuthContext } from "../../context/AuthContext";
import type {
  ActivityDTO,
  OneGoFullSetupDTO,
  Option,
  SensorDTO,
  Type
} from "../../utils/payloads";

interface ModalProps {
  isOpen: boolean;
  type: Type;
  onClose: () => void;
}

// Goal options
const goalOptions: Option[] = [
  { value: "fish_farming", label: "Fish Farming" },
  { value: "industrial_water", label: "Industrial Water" },
  { value: "agriculture", label: "Agriculture" },
  { value: "other", label: "Other" }
];

// Map of types
const goalTypesMap: Record<string, Option[]> = {
  fish_farming: [
    { value: "tilapia", label: "Tilapia" },
    { value: "catla", label: "Catla" },
    { value: "rohu", label: "Rohu" },
    { value: "carp", label: "Carp" }
  ],
  agriculture: [
    { value: "wheat", label: "Wheat" },
    { value: "rice", label: "Rice" },
    { value: "corn", label: "Corn" },
    { value: "soybean", label: "Soybean" }
  ],
  industrial_water: [
    { value: "pH", label: "pH" },
    { value: "DO", label: "Dissolved Oxygen" },
    { value: "temp", label: "Temperature" },
    { value: "turbidity", label: "Turbidity" }
  ],
  other: []
};

const CreateGoalSetupModal: React.FC<ModalProps> = ({
  isOpen,
  type,
  onClose
}) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [otherGoalName, setOtherGoalName] = useState<string>("");
  const { authState } = useContext(AuthContext);
  const [sensors, setSensors] = useState<SensorDTO[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<Option | null>(null);
  const [payload, setPayload] = useState<OneGoFullSetupDTO>({
    goal: { userId: "", name: "" },
    activities: []
  });
  useEffect(() => {
    axios
      .get(`http://localhost:9095/api/sensors/dto`)
      .then((result) => {
        setSensors(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [isOpen === true]);

  useEffect(() => {
    if (authState.user?.email) {
      setUserEmail(authState.user.email);
    }
  }, [authState.user]);

  const addActivity = () => {
    setPayload((prev) => ({
      ...prev,
      activities: [
        ...prev.activities,
        { name: "", location: "", strategy: "", sensors: [], types: [] }
      ]
    }));
  };

  const removeActivity = (index: number) => {
    setPayload((prev) => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index)
    }));
  };

  const updateActivityField = <K extends keyof ActivityDTO>(
    index: number,
    field: K,
    value: ActivityDTO[K]
  ) => {
    setPayload((prev) => {
      const newActivities = [...prev.activities];
      newActivities[index] = { ...newActivities[index], [field]: value };
      return { ...prev, activities: newActivities };
    });
  };

  const addSensor = (index: number, sensor: SensorDTO | null) => {
    if (!sensor) return;
    setPayload((prev) => {
      const newActivities = [...prev.activities];
      if (!newActivities[index].sensors.find((s) => s.name === sensor.name)) {
        newActivities[index].sensors.push({ id: sensor.id, name: sensor.name });
      }
      return { ...prev, activities: newActivities };
    });
  };

  const removeSensor = (activityIndex: number, sensorId: string) => {
    setPayload((prev) => {
      const newActivities = [...prev.activities];
      newActivities[activityIndex].sensors = newActivities[
        activityIndex
      ].sensors.filter((s) => s.id !== sensorId);
      return { ...prev, activities: newActivities };
    });
  };

  const removeType = (activityIndex: number, typeValue: string) => {
    setPayload((prev) => {
      const newActivities = [...prev.activities];
      newActivities[activityIndex].types = newActivities[
        activityIndex
      ].types.filter(
        (t) => t !== typeValue // fixed: types[] is string[], not { value: string }
      );
      return { ...prev, activities: newActivities };
    });
  };

  const handleSubmit = () => {
    if (!userEmail || !selectedGoal) {
      alert("Please enter your email and select a goal.");
      return;
    }

    // Safely build the request body from state
    const requestPayload: OneGoFullSetupDTO = {
      goal: {
        userId: userEmail,
        name:
          selectedGoal.value === "other" ? otherGoalName : selectedGoal.label
      },
      activities:
        payload?.activities.map((a) => ({
          ...a,
          types: a.types.map(
            (t) => (typeof t === "string" ? t : t) // handle both string[] and {label}[]
          )
        })) || []
    };

    console.log("Payload:", requestPayload);

    axios
      .post(`http://localhost:9095/api/goals/one/go`, requestPayload)
      .then((result) => {
        if (result.status === 201) {
          alert("Success");
          setPayload({
            goal: { userId: "", name: "" },
            activities: []
          });
          window.location.reload();
        } else {
          alert(`Unexpected status: ${result.status}`);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred while saving.");
      });
  };

  const renderJson = (obj: any): JSX.Element => {
    const isValidEmail = (email: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const renderValue = (key: string, value: any): JSX.Element => {
      let className = "";

      // Email check
      if (key === "userId" && (!value || !isValidEmail(value)))
        className = "text-red-600";
      // Required text fields
      else if (
        ["name", "location", "strategy"].includes(key) &&
        (!value || value === "")
      )
        className = "text-red-600";
      // sensors/types null or empty → orange
      else if (
        (key === "sensors" || key === "types") &&
        (!value || (Array.isArray(value) && value.length === 0))
      )
        className = "text-orange-500";

      if (Array.isArray(value)) {
        return (
          <span className={className}>
            <span className="text-gray-400">[</span>{" "}
            {value.map((v, i) => (
              <span key={i}>
                {typeof v === "object" ? (
                  renderJson(v)
                ) : (
                  <span className="text-yellow-500">"{v}"</span>
                )}
                {i < value.length - 1 ? (
                  <span className="text-gray-400">, </span>
                ) : (
                  ""
                )}
              </span>
            ))}{" "}
            <span className="text-gray-400">]</span>
          </span>
        );
      } else if (typeof value === "object" && value !== null) {
        return renderJson(value);
      } else if (typeof value === "string") {
        return (
          <span className={`text-yellow-500 ${className}`}>"{value}"</span>
        );
      } else if (typeof value === "number") {
        return <span className={`text-indigo-500 ${className}`}>{value}</span>;
      } else if (typeof value === "boolean") {
        return (
          <span className={`text-purple-500 ${className}`}>
            {String(value)}
          </span>
        );
      } else if (value === null) {
        return <span className={`text-orange-500 ${className}`}>null</span>;
      } else {
        return <span className={className}>{String(value)}</span>;
      }
    };

    return (
      <div className="font-mono text-md">
        <span className="text-gray-400">{`{`}</span>
        {Object.entries(obj).map(([key, value], idx, arr) => (
          <div key={key} className="ml-4">
            <span className="text-green-500">"{key}"</span>:{" "}
            {renderValue(key, value)}
            {idx < arr.length - 1 ? (
              <span className="text-gray-400">,</span>
            ) : (
              ""
            )}
          </div>
        ))}
        <span className="text-gray-400">{`}`}</span>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
        >
          <X size={24} />
        </button>
        {/* Left Side: Form */}
        <div className="flex-1 bg-white rounded-2xl p-8 flex flex-col gap-6">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center lg:text-left">
            Create Goal & Activities
          </h2>

          {/* Goal Section */}
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder={userEmail}
              disabled
              value={userEmail}
              className="flex-1 px-4 py-2 border border-gray-200 rounded bg-gray-100 text-gray-700 placeholder-gray-400 cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-blue-400 transition duration-200"
            />

            {type !== "activity" && type !== "sensor" && (
              <div className="flex-1 flex flex-col gap-2">
                <Select
                  options={goalOptions}
                  value={selectedGoal}
                  onChange={(option: SingleValue<Option>) => {
                    setSelectedGoal(option);

                    // reset payload activities when goal changes
                    setPayload((prev) => ({
                      ...prev!,
                      activities: []
                    }));

                    if (option?.value !== "other") {
                      setOtherGoalName("");
                    }
                  }}
                  placeholder="Select Goal..."
                  isSearchable
                  styles={{
                    control: (base) => ({
                      ...base,
                      boxShadow: "none",
                      borderColor: "#E5E7EB",
                      minHeight: "44px"
                    }),
                    menu: (base) => ({
                      ...base,
                      borderRadius: "12px",
                      boxShadow: "none",
                      border: "1px solid #E5E7EB"
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused ? "#F3F4F6" : "white",
                      color: "#111827",
                      cursor: "pointer"
                    }),
                    singleValue: (base) => ({ ...base, color: "#111827" })
                  }}
                />

                {selectedGoal?.value === "other" && (
                  <input
                    type="text"
                    placeholder="Specify your goal..."
                    value={otherGoalName}
                    onChange={(e) => setOtherGoalName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                )}
              </div>
            )}
          </div>

          {/* Activities Section */}

          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-medium text-gray-800 mb-2">
                Activities
              </h3>
              <button
                onClick={() => {
                  if (!selectedGoal) {
                    alert("Please select a goal");
                  } else {
                    addActivity();
                  }
                }}
                className="px-5 py-2 bg-green-100 text-green-800 rounded-xl hover:bg-green-200 transition duration-200"
              >
                + Add Activity
              </button>
            </div>

            {payload.activities.length > 0 ? (
              <>
                {payload.activities.map((activity, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-2xl p-6 relative bg-white flex flex-col gap-4"
                  >
                    <button
                      type="button"
                      onClick={() => removeActivity(index)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                    >
                      <X size={20} />
                    </button>
                    {/* Activity Fields */}
                    <div className="flex flex-col gap-4">
                      {["name", "location", "strategy"].map((field) => (
                        <div key={field}>
                          <label className="block font-medium text-gray-700 mb-1 capitalize">
                            {field}
                          </label>
                          <input
                            type="text"
                            placeholder={`Enter ${field}`}
                            value={
                              activity[field as keyof ActivityDTO] as string
                            }
                            onChange={(e) =>
                              updateActivityField(
                                index,
                                field as keyof ActivityDTO,
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        </div>
                      ))}

                      {/* Sensors */}
                      <div>
                        <label className="block font-medium text-gray-700 mb-1">
                          Sensors
                        </label>
                        <Select<SensorDTO>
                          options={sensors.filter(
                            (s) =>
                              !payload.activities.some((activity) =>
                                activity.sensors.some((as) => as.id === s.id)
                              )
                          )}
                          getOptionLabel={(s) => s.name}
                          getOptionValue={(s) => s.id}
                          value={null}
                          onChange={(option) => addSensor(index, option)}
                          placeholder="Select"
                          isSearchable
                        />

                        <div className="flex flex-wrap gap-2 mt-2">
                          {activity.sensors.map((sensor) => (
                            <div
                              key={sensor.id}
                              className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                            >
                              {sensor.name}
                              <button
                                onClick={() => removeSensor(index, sensor.id)}
                                className="text-gray-400 hover:text-blue-900"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Types */}
                      <div>
                        <label className="block font-medium text-gray-700 mb-1">
                          Types
                        </label>
                        <CreatableSelect<Option, true>
                          options={
                            selectedGoal
                              ? goalTypesMap[selectedGoal.value].filter(
                                  (option) =>
                                    !payload.activities[index].types.includes(
                                      option.value
                                    )
                                )
                              : []
                          }
                          controlShouldRenderValue={false}
                          isMulti
                          isSearchable
                          placeholder="Select/Add type"
                          value={payload.activities[index].types.map((t) => ({
                            value: t,
                            label: t
                          }))}
                          onChange={(selected) => {
                            setPayload((prev) => {
                              const newActivities = [...prev.activities];
                              newActivities[index].types = selected.map(
                                (item) => item.value
                              );
                              return { ...prev, activities: newActivities };
                            });
                          }}
                          onCreateOption={(inputValue) => {
                            setPayload((prev) => {
                              const newActivities = [...prev.activities];
                              if (
                                !newActivities[index].types.includes(inputValue)
                              ) {
                                newActivities[index].types.push(inputValue);
                              }
                              return { ...prev, activities: newActivities };
                            });
                          }}
                          hideSelectedOptions
                          onKeyDown={(e) => {
                            if (e.key === "Enter") e.preventDefault();
                          }}
                          styles={{
                            control: (base) => ({
                              ...base,
                              boxShadow: "none",
                              borderColor: "#E5E7EB",
                              minHeight: "44px"
                            }),
                            menu: (base) => ({
                              ...base,
                              borderRadius: "12px",
                              boxShadow: "none",
                              border: "1px solid #E5E7EB"
                            }),
                            option: (base, state) => ({
                              ...base,
                              backgroundColor: state.isFocused
                                ? "#F3F4F6"
                                : "white",
                              color: "#111827",
                              cursor: "pointer"
                            }),
                            singleValue: (base) => ({
                              ...base,
                              color: "#111827"
                            })
                          }}
                        />

                        <div className="flex flex-wrap gap-2 mt-2">
                          {activity.types.map((type) => (
                            <div
                              key={type}
                              className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full"
                            >
                              {type}
                              <button
                                onClick={() => removeType(index, type)}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="flex justify-center items-center py-10 text-gray-400 italic">
                No activities added yet. Click "+ Add Activity" to start.
              </div>
            )}
          </div>
        </div>

        {/* Right Side: JSON Preview & Submit */}
        <div className="flex-1 flex flex-col gap-3">
          <h3 className="text-xl font-semibold text-gray-800">JSON Preview</h3>
          <div className="bg-gray-100 p-4 rounded-xl overflow-x-auto min-h-[200px]">
            {renderJson({
              goal: {
                userId: userEmail,
                name:
                  selectedGoal?.value === "other"
                    ? otherGoalName
                    : selectedGoal?.label
              },
              activities: payload.activities.map((act) => ({
                name: act.name,
                location: act.location,
                strategy: act.strategy,
                sensors: act.sensors.map((s) => s.name),
                types: act.types.map((t) => t)
              }))
            })}
          </div>

          <button
            onClick={handleSubmit}
            className="self-end px-6 py-2 bg-blue-100 text-blue-800 rounded-xl hover:bg-blue-200 transition duration-200"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGoalSetupModal;
