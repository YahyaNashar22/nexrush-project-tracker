import { useEffect, useState } from "react";
import useUserStore from "../context/userStore";
import axiosInstance from "../utils/axiosInstance";

const useAuth = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const { setUser } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await axiosInstance.get(`${backend}/user/refresh-token`, {
          withCredentials: true,
        });

        console.log("Refresh response", res.data);

        const { accessToken, user } = res.data;
        setUser(user, accessToken); // ✅ Will save to Zustand and localStorage
      } catch (error) {
        console.error("Refresh error", error);
      } finally {
        setLoading(false);
      }
    };

    refresh();
  }, [setUser, backend]);

  return { loading };
};

export default useAuth;
