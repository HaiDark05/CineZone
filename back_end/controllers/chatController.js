const { chat } = require('../config/firebase');
const Message = require('../models/Chat');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('🔌 Client connected:', socket.id);

    // Gửi tin nhắn cũ từ Firebase
    const messagesRef = chat.ref("messages");
    messagesRef.limitToLast(20).once("value", snapshot => {
      const messages = snapshot.val();
      socket.emit("previousMessages", messages || {});
    });

    // Nhận và lưu tin nhắn mới
    socket.on("sendMessage", ({account, sender, text }) => {
      const newMessage = new Message(account, sender, text);
      const newRef = messagesRef.push();
      newRef.set(newMessage);

      io.emit("newMessage", newMessage); // Gửi cho tất cả client
    });

    socket.on("disconnect", () => {
      console.log('❌ Client disconnected:', socket.id);
    });
  });
};