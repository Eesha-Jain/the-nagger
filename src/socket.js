import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "https://mom-tasker-server.vercel.app:3030";

export const socket = io(URL);
