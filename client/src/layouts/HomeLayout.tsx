import SidePanel from "./SidePanel";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <main className="flex min-h-screen bg-gray-900 text-white">
      <SidePanel />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </main>
  );
};

export default HomeLayout;
