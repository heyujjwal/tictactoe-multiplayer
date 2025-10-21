const { createServer } = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3000; // <-- use dynamic port
const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: ["https://tictactoe-multiplayer-1-q1k6.onrender.com"],
    methods: ["GET", "POST"],
  },
});


const allUsers = {};
const allRooms = [];

io.on("connection", (socket) => {
  console.log("a user connected");
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

      allRooms.push({ player1: opponentPlayer, player2: currentUser });

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
    } else {
      currentUser.socket.emit("OpponentNotFound");
    }
  });

  socket.on("disconnect", () => {
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
