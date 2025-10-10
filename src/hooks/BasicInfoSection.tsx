import { Person } from "@mui/icons-material";
import { Mail, MapPin, Phone, User } from "react-feather";
import InfoRow from "./InfoRow";

const BasicInfoSection = ({ userInfo }: { userInfo: any }) => {
  const handleEdit = (field: string) => {
    console.log(`Edit clicked for ${field}`);
  };

  return (
    <section className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 lg:p-7">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
          <User size={18} /> Basic Information
        </h3>
        <button
          onClick={() => console.log("Edit section clicked")}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
        >
          Edit
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-gray-800">
        <InfoRow
          icon={<Person className="w-4 h-4 text-blue-500" />}
          label="Name"
          value={userInfo?.name}
          fallback="N/A"
          onEdit={() => handleEdit("name")}
        />
        <InfoRow
          icon={<Mail className="w-4 h-4 text-blue-500" />}
          label="Email"
          value={userInfo?.email}
          fallback="N/A"
          onEdit={() => handleEdit("email")}
        />
        <InfoRow
          icon={<Phone className="w-4 h-4 text-blue-500" />}
          label="Phone"
          value={userInfo?.phone}
          fallback="N/A"
          onEdit={() => handleEdit("phone")}
        />
        <InfoRow
          icon={<MapPin className="w-4 h-4 text-blue-500" />}
          label="Address"
          value={userInfo?.address}
          fallback="Not Provided"
          onEdit={() => handleEdit("address")}
        />
      </div>
    </section>
  );
};

export default BasicInfoSection;
