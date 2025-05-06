import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

import HomeLayout from "../layouts/HomeLayout";

const AppRoutes = () => {
  const Home = lazy(() => import("../pages/Home"));
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
