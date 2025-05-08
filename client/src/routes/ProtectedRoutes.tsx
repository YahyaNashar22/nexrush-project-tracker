import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import useUserStore from "../context/userStore";

const ProtectedRoutes = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/sign-in", { replace: true });
    }
  }, [user, navigate]);

  // Render children only if user exists
  return user ? <Outlet /> : null;
};

export default ProtectedRoutes;
