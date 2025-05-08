import { io } from "socket.io-client";

// Adjust URL if needed
const SOCKET_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;
