# Project 

This project is inspired by the tic-tac-toe game.\
Additionally i will make use of web sockets to allow player to create a custom game (to play with a friend) or join available games. 

--- 

## Custom Game Road Map
- Create rooms to represent a custom game
- A custom room can have at 2 players at max 
- A full room(2 players) means the clients can now play a game of tic-tac-toe against each other.


## Join Random Game Road Map
- A client can click on the play online button, and they should be able to join an available game room. The latter holds true, only if there is an available game room on the server. 
- If a client is able to join a random game room, they should be able to play the game with the other client on the same game room. 

--- 


## Client Events

start-custom-game - Emitted when a client wants to join a custom game.
custom-disconnect - custom disconnect to the server, to allow server to clean up resources
s
 

## Server Events
Connection - Emitted when a client successfully joins the IO server.
player-joined - Emitted when a second client joins a custom game room
waiting-for-player - tbd if needed but exists currently.

--- 

## > TODO
4. where should the other player wait for the second player to join?
1. Implement game logic between game room players. 
2. Add logic to check if a player is the winner of the game 
3. Both players should be notified which player won the game 
5. clear out room resources after both players leave the room


## Completed 
1. Create game room 
2. Add players to game room 
3. Enforce maximum limit of 2 per room
4. Do not allow duplicate game rooms? (validate if exists). 
