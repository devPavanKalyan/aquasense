import axios from "axios";
import { Edit, Lock } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import BasicInfoSection from "../../hooks/BasicInfoSection";

type UserInfo = {
  name: string;
  email: string;
  phone: string;
  address: string;
  mfaEnabled: boolean;
  lastPasswordChange: Date;
  backupEmail: string;
};

const ProfilePage = () => {
  const { authState } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<UserInfo>();

  if (!authState) {
    return;
  }

  const user = authState.user;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/info/${user?.email}`)
      .then((res) => setUserInfo(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, [authState]);

  return (
    <div className="max-w-5xl mx-auto p-5 space-y-12 text-[16px] font-inter text-gray-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 text-white flex items-center justify-center text-xl font-semibold shadow-md">
          {userInfo?.name?.[0] || "U"}
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
            {userInfo?.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            Profile & Account Settings
          </p>
        </div>
      </div>

      {/* Basic Info */}
      <BasicInfoSection userInfo={userInfo} />

      {/* Security Settings */}
      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2 sm:gap-0">
          <h3 className="text-base sm:text-lg font-semibold text-blue-700 flex items-center gap-2">
            <Lock size={18} /> Multi-Step Authentication
          </h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1">
            <Edit size={14} /> Edit
          </button>
        </div>
        <ul className="list-disc list-inside text-sm sm:text-base text-gray-800 space-y-2 pl-2 font-medium">
          {/* <li>
            Email Verification: {user?.emailVerified ? "Enabled" : "Disabled"}
          </li> */}
          <li>
            MFA via Authenticator App:{" "}
            {userInfo?.mfaEnabled ? "Enabled" : "Not Set Up"}
          </li>
          <li>
            Last Password Change:{" "}
            {userInfo?.lastPasswordChange
              ? userInfo?.lastPasswordChange.toLocaleString()
              : "N/A"}
          </li>
          <li>Backup Email: {userInfo?.backupEmail || "Not Provided"}</li>
        </ul>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow text-center">
            Manage Security Settings
          </button>
          <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50">
            Reset Password
          </button>
          <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50">
            Configure MFA
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;

{
  /* <p className="flex items-center gap-2 font-medium">
            <Briefcase className="w-4 h-4 text-blue-500" />{" "}
            {user?.organization || "Independent User"}
          </p>
          <p className="flex items-center gap-2 font-medium">
            <Lock className="w-4 h-4 text-blue-500" /> Role:{" "}
            {user?.role || "User"}
          </p> */
}
