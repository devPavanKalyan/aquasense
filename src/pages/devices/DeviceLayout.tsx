import { NavLink, Outlet } from "react-router-dom";

const DevicesLayout = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-grow p-6">
        <Outlet />
      </div>

      <aside className="w-64 border-l border-gray-200 bg-white p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Menu</h2>
        <nav className="flex flex-col gap-2">
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            Your Devices
          </NavLink>

          <a
            href="https://obuyverse.in"
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Shopping
          </a>

          <NavLink
            to="purchased"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            Purchased devices
          </NavLink>
        </nav>
      </aside>
    </div>
  );
};

export default DevicesLayout;
