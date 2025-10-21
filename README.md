# 🎮 Tic Tac Toe - Multiplayer Online Game

A real-time multiplayer Tic Tac Toe game built with React, Node.js, and Socket.IO. Play against friends online with smooth gameplay and real-time synchronization!

![Tic Tac Toe Game](https://img.shields.io/badge/Game-Tic%20Tac%20Toe-blue)
![React](https://img.shields.io/badge/React-18.x-61dafb)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--time-black)

## ✨ Features

- 🌐 **Real-time Multiplayer** - Play against opponents online in real-time
- 🔄 **Play Again Feature** - Continue playing with the same opponent without reconnecting
- 🎯 **Turn-based Gameplay** - Clear indication of whose turn it is
- 👥 **Player Names** - Personalized gaming experience with custom usernames
- 🏆 **Win Detection** - Automatic detection of wins and draws
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ⚡ **Fast Matchmaking** - Quick opponent finding system
- 🔌 **Auto-reconnect** - Handles disconnections gracefully

## 🎬 Demo

### Game Flow:
1. Enter your name to join the game
2. Wait for an opponent to connect
3. Play Tic Tac Toe in real-time
4. After the game ends, request to play again
5. Both players agree → New game starts instantly!

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/tic-tac-toe-multiplayer.git
cd tic-tac-toe-multiplayer
```

2. **Install server dependencies**
```bash
cd backend
npm install
```

3. **Install client dependencies**
```bash
cd ../client
npm install
```

4. **Configure environment variables**

Create a `.env` file in the server directory:
```env
PORT=3000
```

Create a `.env` file in the client directory:
```env
VITE_SERVER_URL=http://localhost:3000
```

### Running the Application

1. **Start the server**
```bash
cd backend
npm start
```

2. **Start the client** (in a new terminal)
```bash
cd client
npm run dev
```

3. **Open your browser**
Navigate to `http://localhost:5173`

## 📁 Project Structure

```
tic-tac-toe-multiplayer/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.jsx        # Main application component
│   │   ├── Square/
│   │   │   ├── Square.jsx # Square component
│   │   │   └── Square.css # Square styles
│   │   ├── App.css        # Main styles
│   │   └── main.jsx       # Entry point
│   ├── .env               # Environment variables
│   └── package.json
│
└── backend/                # Node.js backend
    ├── server.js          # Socket.IO server
    ├── .env               # Environment variables
    └── package.json
```

## 🛠️ Technologies Used

### Frontend
- **React** - UI library
- **Socket.IO Client** - Real-time communication
- **SweetAlert2** - Beautiful alerts and modals
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework (via http.createServer)
- **Socket.IO** - WebSocket library for real-time communication
- **dotenv** - Environment variable management

## 🎯 Game Rules

1. The game is played on a 3x3 grid
2. Player 1 is **Circle (O)** and Player 2 is **Cross (X)**
3. Players take turns placing their marks
4. First player to get 3 marks in a row (horizontally, vertically, or diagonally) wins
5. If all 9 squares are filled without a winner, the game is a draw

## 🔄 Play Again Feature

The play again feature allows players to continue playing without reconnecting:

1. After a game ends (win/loss/draw), both players see a "Play Again" button
2. When a player clicks it, they see "Waiting for opponent..."
3. The other player sees "Opponent wants to play again - Click to start!"
4. When both players click, the game board resets instantly
5. Player names are preserved, and a new game begins

## 🐛 Known Issues & Troubleshooting

### Connection Issues
- Make sure both client and server are running
- Check that the `VITE_SERVER_URL` points to the correct server address
- Verify firewall settings aren't blocking the connection

### Game Not Resetting
- Ensure both players click the "Play Again" button
- Check browser console for any errors
- Refresh the page if issues persist

## 📝 Future Enhancements

- [ ] Add game rooms for private matches
- [ ] Implement player rankings and leaderboards
- [ ] Add chat functionality between players
- [ ] Create game history and statistics
- [ ] Add different board sizes (4x4, 5x5)
- [ ] Implement AI opponent for single-player mode
- [ ] Add sound effects and animations
- [ ] Mobile app version

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@heyujjwal](https://github.com/heyujjwal)
- LinkedIn: [Ujjwal Gupta](https://linkedin.com/in/ujjwalgupta259)

## 🙏 Acknowledgments

- Inspired by the classic Tic Tac Toe game
- Socket.IO documentation and community
- React community for excellent resources
- SweetAlert2 for beautiful UI alerts

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact me at your.email@example.com

---

⭐ Star this repository if you found it helpful!

Made with ❤️ and React
