const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("move", (data) => {
        socket.broadcast.emit("move", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let rooms = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (room) => {
    socket.join(room);

    if (!rooms[room]) {
      rooms[room] = [];
    }

    rooms[room].push(socket.id);

    if (rooms[room].length === 2) {
      io.to(room).emit("startGame");
    }
  });

  socket.on("move", ({ room, index, player }) => {
    socket.to(room).emit("move", { index, player });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
const socket = io();

let room = prompt("Enter room name:");
socket.emit("joinRoom", room);

let player = "X";

socket.on("startGame", () => {
  alert("Game Started!");
});

function makeMove(index) {
  document.getElementById(index).innerText = player;

  socket.emit("move", { room, index, player });

  player = player === "X" ? "O" : "X";
}

socket.on("move", ({ index, player }) => {
  document.getElementById(index).innerText = player;
});
<!DOCTYPE html>
<html>
<head>
  <title>Tic Tac Toe</title>
</head>
<body>
  <h1>Tic Tac Toe</h1>

  <div id="board">
    <button onclick="makeMove(0)" id="0"></button>
    <button onclick="makeMove(1)" id="1"></button>
    <button onclick="makeMove(2)" id="2"></button>
    <br>
    <button onclick="makeMove(3)" id="3"></button>
    <button onclick="makeMove(4)" id="4"></button>
    <button onclick="makeMove(5)" id="5"></button>
    <br>
    <button onclick="makeMove(6)" id="6"></button>
    <button onclick="makeMove(7)" id="7"></button>
    <button onclick="makeMove(8)" id="8"></button>
  </div>

  <script src="/socket.io/socket.io.js"></script>
  <script src="client.js"></script>
</body>
</html>
{
  "name": "tic-tac-toe",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "socket.io": "^4.7.2"
  }
}
