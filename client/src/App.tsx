import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { socket } from "./socket";

function App() {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return <AppRoutes />;
}

export default App;
