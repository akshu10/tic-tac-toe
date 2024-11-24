import { Socket } from "socket.io";

class GameState {
  constructor() {}

  public createOrJoinGame(gameId: string, socket: Socket) {
    console.log("Creating OR Joining  Custom Game");
    socket.emit("createOrJoin", { gameId: gameId });
  }
}

export default GameState;
