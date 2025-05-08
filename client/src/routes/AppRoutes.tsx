import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import HomeLayout from "../layouts/HomeLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import useUserStore from "../context/userStore";

const AppRoutes = () => {
  const { user } = useUserStore();
  const Home = lazy(() => import("../pages/Home"));
  const AddNewProject = lazy(() => import("../pages/AddNewProject"));
  const ProjectView = lazy(() => import("../pages/ProjectView"));
  const Signin = lazy(() => import("../pages/Signin"));

  return (
    <Suspense fallback={<div className="text-white p-4">Loading...</div>}>
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/" element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/add-new-project" element={<AddNewProject />} />
            <Route path="/project/:id" element={<ProjectView />} />
          </Route>
        </Route>
        {user && <Route path="/sign-in" element={<Signin />} />}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
