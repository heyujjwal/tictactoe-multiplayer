const { createServer } = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3000;
const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: [process.env.VITE_CLIENT_URL],
    methods: ["GET", "POST"],
  },
});

const allUsers = {};
const allRooms = [];

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);
  allUsers[socket.id] = { socket, online: true, playing: false };

  io.emit("players_online", { count: Object.keys(allUsers).length });

  socket.on("request_to_play", (data) => {
    const currentUser = allUsers[socket.id];
    currentUser.playerName = data.playerName;

    let opponentPlayer;

    for (const key in allUsers) {
      const user = allUsers[key];
      if (user.online && !user.playing && socket.id !== key) {
        opponentPlayer = user;
        break;
      }
    }

    if (opponentPlayer) {
      currentUser.playing = true;
      opponentPlayer.playing = true;

      const roomData = {
        player1: opponentPlayer,
        player2: currentUser,
        player1RequestedPlayAgain: false,
        player2RequestedPlayAgain: false,
      };
      allRooms.push(roomData);

      currentUser.socket.emit("OpponentFound", {
        opponentName: opponentPlayer.playerName,
        playingAs: "circle",
      });

      opponentPlayer.socket.emit("OpponentFound", {
        opponentName: currentUser.playerName,
        playingAs: "cross",
      });

      currentUser.socket.on("playerMoveFromClient", (data) => {
        opponentPlayer.socket.emit("playerMoveFromServer", data);
      });

      opponentPlayer.socket.on("playerMoveFromClient", (data) => {
        currentUser.socket.emit("playerMoveFromServer", data);
      });

      // Handle play again request from currentUser
      currentUser.socket.on("playAgainRequest", () => {
        console.log(`${currentUser.playerName} requested play again`);
        
        const room = allRooms.find(
          (r) => (r.player1.socket.id === currentUser.socket.id || r.player2.socket.id === currentUser.socket.id)
        );

        if (room) {
          // Mark this player as requesting play again
          if (room.player1.socket.id === currentUser.socket.id) {
            room.player1RequestedPlayAgain = true;
          } else {
            room.player2RequestedPlayAgain = true;
          }

          // Notify the opponent
          opponentPlayer.socket.emit("opponentRequestedPlayAgain");
          console.log(`Notified ${opponentPlayer.playerName} about play again request`);

          // If both players requested, reset the game
          if (room.player1RequestedPlayAgain && room.player2RequestedPlayAgain) {
            console.log("Both players agreed - Resetting game");
            
            room.player1.socket.emit("gameReset");
            room.player2.socket.emit("gameReset");
            
            // Reset the request flags for next game
            room.player1RequestedPlayAgain = false;
            room.player2RequestedPlayAgain = false;
          }
        }
      });

      // Handle play again request from opponentPlayer
      opponentPlayer.socket.on("playAgainRequest", () => {
        console.log(`${opponentPlayer.playerName} requested play again`);
        
        const room = allRooms.find(
          (r) => (r.player1.socket.id === opponentPlayer.socket.id || r.player2.socket.id === opponentPlayer.socket.id)
        );

        if (room) {
          // Mark this player as requesting play again
          if (room.player1.socket.id === opponentPlayer.socket.id) {
            room.player1RequestedPlayAgain = true;
          } else {
            room.player2RequestedPlayAgain = true;
          }

          // Notify the opponent
          currentUser.socket.emit("opponentRequestedPlayAgain");
          console.log(`Notified ${currentUser.playerName} about play again request`);

          // If both players requested, reset the game
          if (room.player1RequestedPlayAgain && room.player2RequestedPlayAgain) {
            console.log("Both players agreed - Resetting game");
            
            room.player1.socket.emit("gameReset");
            room.player2.socket.emit("gameReset");
            
            // Reset the request flags for next game
            room.player1RequestedPlayAgain = false;
            room.player2RequestedPlayAgain = false;
          }
        }
      });
    } else {
      currentUser.socket.emit("OpponentNotFound");
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    const currentUser = allUsers[socket.id];
    if (currentUser) {
      currentUser.online = false;
      currentUser.playing = false;

      for (let i = 0; i < allRooms.length; i++) {
        const { player1, player2 } = allRooms[i];
        if (player1.socket.id === socket.id) {
          player2.socket.emit("opponentLeftMatch");
          allRooms.splice(i, 1);
          break;
        }
        if (player2.socket.id === socket.id) {
          player1.socket.emit("opponentLeftMatch");
          allRooms.splice(i, 1);
          break;
        }
      }

      delete allUsers[socket.id];
    }

    io.emit("players_online", { count: Object.keys(allUsers).length });
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});