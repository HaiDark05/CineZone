const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const chatController = require("./controllers/chatController");

const app = express();
const server = http.createServer(app); // Tạo server từ Express

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // frontend React
    methods: ["GET", "POST"]
  }
});

// Xử lý Socket.io trong controller
chatController(io);

// Cổng 3003 cho backend
const PORT = 3003;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
