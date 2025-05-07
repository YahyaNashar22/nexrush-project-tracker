import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import HomeLayout from "../layouts/HomeLayout";

const AppRoutes = () => {
  const Home = lazy(() => import("../pages/Home"));
  const AddNewProject = lazy(() => import("../pages/AddNewProject"));

  return (
    <Suspense fallback={<div className="text-white p-4">Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-new-project" element={<AddNewProject />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
