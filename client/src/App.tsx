import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { socket } from "./socket";
import useAuth from "./hooks/useAuth";
import Loading from "./components/Loading";

function App() {
  const { loading } = useAuth();

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) return <Loading />;

  return <AppRoutes />;
}

export default App;
