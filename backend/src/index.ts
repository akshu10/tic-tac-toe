import { Server, RemoteSocket, DefaultEventsMap, Socket } from "socket.io";

import { exec } from "child_process";

import { PORT } from "./config";
import logger from "./logger";

logger.info({ PORT });

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

io.attach(PORT);

// Array to track connected sockets
const connectedSockets: Socket[] = [];
const gameRooms: Set<string> = new Set();

io.on("connection", async (socket) => {
  // Emit a connection event to the client
  socket.emit("connection", { id: socket.id });

  connectedSockets.push(socket);

  // Register event listeners for each socket here
  socket.on("disconnect", () => {
    console.log("Socket disconnected", socket.id);
  });

  socket.on("createOrJoin", (data) => {
    console.log("createOrJoin", data);

    socket.join(data.gameId);
    console.log(`Socket ${socket.id} joined room ${data.gameId}`);
    gameRooms.add(socket.data.gameId);

    // this will broadcast to all sockets in the room except the current
    // this is now working.
    socket
      .to(data.gameId)
      .emit("playerJoined", { secondPlayer: "Player 2", gameId: data.gameId });
  });
});

io.of("/default").adapter.on("create-room", (room) => {
  console.log(`room ${room} was created`);
});

io.of("/default").adapter.on("join-room", (room, id) => {
  console.log(`socket ${id} has joined room ${room}`);
});

function reset() {
  logger.info(`resetting  ${connectedSockets.length} sockets`);
  connectedSockets.forEach((s) => {
    console.log("disconnecting", s.id);
    s.disconnect();
  });
}

function killProcess(port: number) {
  return new Promise((resolve, reject) => {
    exec(`npx kill-port ${port}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) => {
  process.on(signal, async () => {
    console.log(`Received ${signal}, cleaning up...`);
    reset();
    // Perform cleanup operations here
    await killProcess(PORT);
    process.exit();
  });
});
