import { Outlet } from "react-router-dom";
import { MidNavBar } from "../components/home/MidNavBar";
import TopNavBar from "../components/home/TopNavBar";

export default function AppShellLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopNavBar />
      <MidNavBar />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}
