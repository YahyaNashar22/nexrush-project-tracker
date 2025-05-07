// src/socket.ts
import { io, Socket } from "socket.io-client";

const backendURL = import.meta.env.VITE_SOCKET_BACKEND || "http://localhost:5000";

export const socket: Socket = io(backendURL, {
  withCredentials: true,
  autoConnect: false, // optional: control connection manually
});
