import {
  CalendarDays,
  Mail,
  MapPin,
  Pencil,
  ShieldCheck,
  User
} from "lucide-react";

const UserProfile = () => {
  return (
    <div className="px-6 py-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Your Profile</h2>
        <p className="text-gray-600">
          Manage your account information and preferences.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow p-6 md:p-8">
        <div className="flex items-center gap-6 flex-wrap md:flex-nowrap">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 text-white text-3xl font-semibold flex items-center justify-center">
            R
          </div>

          {/* User Info */}
          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <User size={18} className="text-gray-500" /> Rasool Mohammad
            </h3>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <Mail size={16} className="text-gray-400" /> rasool@example.com
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <MapPin size={16} className="text-gray-400" /> Hyderabad, India
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <CalendarDays size={16} className="text-gray-400" /> Joined: Jan
              2024
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <ShieldCheck size={16} className="text-gray-400" /> Role: Admin
            </p>
          </div>

          {/* Edit Button */}
          <div>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 border border-blue-500 rounded-full hover:bg-blue-50">
              <Pencil size={16} /> Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
