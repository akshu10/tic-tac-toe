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

io.on("connection", async (socket: Socket) => {
  // Emit a connection event to the client
  socket.emit("connection", { id: socket.id });

  // Register event listeners for each socket here
  socket.on("custom-disconnect", async (data) => {
    console.log("custom-disconnect", data);

    const socketsInRoom = await io.in(data.gameRoomId).fetchSockets();
    const socketIds = socketsInRoom.map((s) => s.id);

    console.log("Sockets in room CustomDisconnect: ", socketIds);

    // disconnect all sockets in the room
    socketsInRoom.forEach((s) => {
      s.leave(data.gameRoomId);
      s.disconnect();
    });
  });

  socket.on("start-custom-game", async (data) => {
    console.log("startCustomGame", data);

    let socketsInRoom = await io.in(data.gameId).fetchSockets();
    let socketIds = socketsInRoom.map((s) => s.id);

    if (socketsInRoom.length === 2) {
      console.log("Game room is full");
      io.emit("game-room-full", { gameId: data.gameId });

      return;
    }

    socket.join(data.gameId);

    socketsInRoom = await io.in(data.gameId).fetchSockets();
    socketIds = socketsInRoom.map((s) => s.id);

    // Randomly select a player that will start the game, in the game room\
    console.log(`players in room ${data.gameId}`, socketIds);

    if (socketIds.length === 2) {
      const startingPlayer = socketIds[getRandomNumber()];

      console.log(`Starting player ${startingPlayer}`);

      // this will broadcast to all sockets in the room except the current
      // this is now working.
      socket.to(data.gameId).emit("player:joined", {
        secondPlayer: "Player 2",
        gameId: data.gameId,
      });
    } else if (socketIds.length === 1) {
      io.to(socket.id).emit("waiting-for-player", { gameId: data.gameId });
    }
  });

  // move event
  socket.on("move", (data) => {
    console.log("Move event", data);

    socket.to(data.gameId).emit("board:refresh", {
      board: data.board,
    });
  });
});

/**
 *
 * @returns 0 or 1
 *
 * This function returns a random number between 0 and 1
 */
function getRandomNumber() {
  const randomIndex = Math.floor(Math.random() * 2);
  return randomIndex;
}

async function reset() {
  const connectedSockets = await io.fetchSockets();
  const socketIds = connectedSockets.map((s) => s.id);

  logger.info(`resetting  ${socketIds.length} sockets`);

  if (connectedSockets.length) {
    connectedSockets.forEach((s) => {
      console.log("disconnecting", s.id);
      s.disconnect();
    });
  }
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
    reset();
    // Perform cleanup operations here
    await killProcess(PORT);
    process.exit();
  });
});
