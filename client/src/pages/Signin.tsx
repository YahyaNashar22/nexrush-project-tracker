import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import useUserStore from "../context/userStore";
import axiosInstance from "../utils/axiosInstance";

const Signin = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axiosInstance.post(`${backend}/user/signin`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user, res.data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="bg-bg-btn p-8 rounded-xl shadow-md w-full max-w-md text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        {error && <div className="text-red text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 bg-bg border border-border rounded focus:outline-none focus:ring-2 focus:ring-blue"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              required
              className="w-full px-3 py-2 bg-bg border border-border rounded focus:outline-none focus:ring-2 focus:ring-blue"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue hover:bg-blue-hover py-2 rounded transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
