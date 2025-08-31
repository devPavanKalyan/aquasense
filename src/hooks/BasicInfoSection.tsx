import { Person } from "@mui/icons-material";
import { Mail, MapPin, Phone, User } from "react-feather";
import InfoRow from "./InfoRow";

const BasicInfoSection = ({ userInfo }: { userInfo: any }) => {
  const handleEdit = (field: string) => {
    console.log(`Edit clicked for ${field}`);
    // Open modal or inline editing for that field
  };

  return (
    <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2 sm:gap-0">
        <h3 className="text-base sm:text-lg font-semibold text-blue-700 flex items-center gap-2">
          <User size={18} /> Basic Information
        </h3>
      </div>
      <div className="grid grid-row-1 sm:grid-row-2 gap-x-6 gap-y-4 text-gray-700">
        <InfoRow
          icon={<Person className="w-4 h-4 text-blue-500" />}
          value={userInfo?.name}
          fallback="N/A"
          onEdit={() => handleEdit("name")}
        />
        <InfoRow
          icon={<Mail className="w-4 h-4 text-blue-500" />}
          value={userInfo?.email}
          fallback="N/A"
          onEdit={() => handleEdit("email")}
        />
        <InfoRow
          icon={<Phone className="w-4 h-4 text-blue-500" />}
          value={userInfo?.phone}
          fallback="N/A"
          onEdit={() => handleEdit("phone")}
        />
        <InfoRow
          icon={<MapPin className="w-4 h-4 text-blue-500" />}
          value={userInfo?.address}
          fallback="Not Provided"
          onEdit={() => handleEdit("address")}
        />
      </div>
    </section>
  );
};

export default BasicInfoSection;
