import { Server, RemoteSocket, DefaultEventsMap, Socket } from "socket.io";

import { PORT } from "./config";
import logger from "./logger";

logger.info({ PORT });

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

io.attach(PORT);

// Array to track connected sockets
const connectedSockets: Socket[] = [];

io.on("disconnecting", () => {
  console.log("IO disconnect");
});

io.on("connection", async (socket) => {
  connectedSockets.push(socket);

  console.log(
    "allSockets",
    connectedSockets.length,
    connectedSockets.map((s) => s.id)
  );

  reset();
});

connectedSockets.forEach((s) => {
  s.on("connect", () => {
    logger.info({ message: "Client Connected!", id: s.id });
  });

  s.on("disconnecting", () => {
    logger.info(`Socket ${s.id} will be disconnected`);
    logger.info({ message: "Client Disconnected!", id: s.id });
  });
});

function reset() {
  logger.info("resetting");
  connectedSockets.forEach((s) => {
    console.log("disconnecting", s.id);
    s.disconnect();
  });
}

// reset();
