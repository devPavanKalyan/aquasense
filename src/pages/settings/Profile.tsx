import { Person } from "@mui/icons-material";
import axios from "axios";
import { Edit, Lock } from "lucide-react";
import { useContext, useEffect, useState, type ReactNode } from "react";
import { Mail, MapPin, Phone, User } from "react-feather";
import { AuthContext } from "../../context/AuthContext";

type InfoRowProps = {
  icon: ReactNode;
  label: string;
  value: string | undefined | null;
  fallback?: string;
  onEdit: () => void;
};

const InfoRow = ({
  icon,
  value,
  fallback = "Not Provided",
  onEdit
}: InfoRowProps) => {
  return (
    <div className="flex items-center justify-between text-sm text-gray-800">
      <span className="flex items-center gap-2 truncate">
        {icon}
        <span className="truncate">{value || fallback}</span>
      </span>
      <button
        onClick={onEdit}
        className="text-gray-600 hover:text-black text-xs flex items-center gap-1"
        type="button"
      >
        <Edit size={13} /> Edit
      </button>
    </div>
  );
};

type UserInfo = {
  name: string;
  email: string;
  phone: string;
  address: string;
  mfaEnabled: boolean;
  lastPasswordChange: Date;
  backupEmail: string;
};

const Profile = () => {
  const { authState } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<UserInfo>();

  if (!authState) return null;

  const user = authState.user;

  useEffect(() => {
    axios
      .get(`http://localhost:9090/user/info/${user?.email}`)
      .then((res) => setUserInfo(res.data))
      .catch((error) => console.log(error));
  }, [authState]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8 text-[14px] text-gray-900">
      <p className="text-lg text-gray-900 font-medium border-b border-gray-300">
        Profile & Account Settings
      </p>

      <BasicInfoSection userInfo={userInfo} />

      <section className="border border-gray-300 rounded-lg p-5 space-y-3">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base font-semibold flex items-center gap-2 text-gray-900">
            <Lock size={16} /> Multi-Step Authentication
          </h3>
          <button className="text-gray-700 hover:text-black text-xs flex items-center gap-1">
            <Edit size={13} /> Edit
          </button>
        </div>

        <ul className="text-sm text-gray-800 space-y-1">
          <li>
            MFA via Authenticator App:{" "}
            <span className="font-medium">
              {userInfo?.mfaEnabled ? "Enabled" : "Not Set Up"}
            </span>
          </li>
          <li>
            Last Password Change:{" "}
            <span className="font-medium">
              {userInfo?.lastPasswordChange
                ? new Date(userInfo.lastPasswordChange).toLocaleString()
                : "N/A"}
            </span>
          </li>
          <li>
            Backup Email:{" "}
            <span className="font-medium">
              {userInfo?.backupEmail || "Not Provided"}
            </span>
          </li>
        </ul>

        <div className="flex flex-wrap gap-2 mt-4">
          <button className="px-3 py-1.5 border border-gray-400 text-xs font-medium rounded text-gray-800 hover:bg-gray-100">
            Manage Security
          </button>
          <button className="px-3 py-1.5 border border-gray-400 text-xs font-medium rounded text-gray-800 hover:bg-gray-100">
            Reset Password
          </button>
          <button className="px-3 py-1.5 border border-gray-400 text-xs font-medium rounded text-gray-800 hover:bg-gray-100">
            Configure MFA
          </button>
        </div>
      </section>
    </div>
  );
};

export default Profile;

const BasicInfoSection = ({ userInfo }: { userInfo: any }) => {
  const handleEdit = (field: string) => {
    console.log(`Edit clicked for ${field}`);
  };

  return (
    <section className="border border-gray-300 rounded-lg p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-semibold flex items-center gap-2 text-gray-900">
          <User size={16} /> Basic Information
        </h3>
        <button
          onClick={() => console.log("Edit section clicked")}
          className="text-gray-700 hover:text-black text-xs flex items-center gap-1"
        >
          <Edit size={13} /> Edit
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
        <InfoRow
          icon={<Person className="w-4 h-4 text-gray-600" />}
          label="Name"
          value={userInfo?.name}
          fallback="N/A"
          onEdit={() => handleEdit("name")}
        />
        <InfoRow
          icon={<Mail className="w-4 h-4 text-gray-600" />}
          label="Email"
          value={userInfo?.email}
          fallback="N/A"
          onEdit={() => handleEdit("email")}
        />
        <InfoRow
          icon={<Phone className="w-4 h-4 text-gray-600" />}
          label="Phone"
          value={userInfo?.phone}
          fallback="N/A"
          onEdit={() => handleEdit("phone")}
        />
        <InfoRow
          icon={<MapPin className="w-4 h-4 text-gray-600" />}
          label="Address"
          value={userInfo?.address}
          fallback="Not Provided"
          onEdit={() => handleEdit("address")}
        />
      </div>
    </section>
  );
};
