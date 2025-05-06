import SidePanel from "./SidePanel";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <main>
      <SidePanel />
      <Outlet />
    </main>
  );
};

export default HomeLayout;
