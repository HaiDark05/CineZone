import React, { useState, useRef, useEffect } from 'react';
import { useContext } from 'react';
import { IoSend } from 'react-icons/io5';
import { IoCloseCircleOutline } from 'react-icons/io5'; // Import X icon
import io from 'socket.io-client';
import { ContextAuth } from '../../../context/AuthProvider';
import { ROLES } from '../../../utils/Containts';
const socket = io('http://localhost:3003');

function ChatBot() {
  const { isLogin, setIsLogin } = useContext(ContextAuth);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [sender, setSender] = useState(ROLES.USER);
  const [isOpen, setIsOpen] = useState(false);
  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  const closeChat = () => {
    setIsOpen(false);
  };
  
  useEffect(() => {
    // Hàm xử lý tin nhắn cũ từ server
    const handlePreviousMessages = (msgs) => {
      if (msgs) {
        setMessages(Object.values(msgs));
      }
    };

    // Hàm xử lý tin nhắn mới gửi đến
    const handleNewMessage = (msg) => {
      setMessages(prev => [...prev, msg]);
    };

    // Đăng ký sự kiện
    socket.on("previousMessages", handlePreviousMessages);
    socket.on("newMessage", handleNewMessage);

    // ❗ Cleanup để tránh đăng ký lặp lại
    return () => {
      socket.off("previousMessages", handlePreviousMessages);
      socket.off("newMessage", handleNewMessage);
    };
  }, []);

  const sendMessage = () => {
    if (content.trim()) {
      socket.emit("sendMessage", { account : isLogin.id, sender : sender , text : content });
      setContent(""); // Clear input sau khi gửi
    }
  };

  return (
    <div>
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-40"
        >
          💬
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-xl shadow-xl flex flex-col overflow-hidden z-40">
          <div className="bg-blue-600 text-white p-3 font-semibold flex justify-between items-center">
            Virtual assistant
            <button onClick={closeChat} className="text-white">
              <IoCloseCircleOutline className='text-2xl' />
            </button>
          </div>
          <div className="p-3 h-64 overflow-y-auto space-y-2 bg-gray-50 text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`px-3 py-2 rounded-xl max-w-[80%] shadow
                  ${msg.sender === 'user'
                    ? 'bg-blue-100 self-end ml-auto'
                    : 'bg-gray-200 self-start'
                  }`}
              >
                {msg.text}
              </div>
            ))}
         
          </div>
          <div className="flex items-center border-t p-2 bg-white">
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 p-2 rounded-full border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter message..."
            />
            <button
              onClick={sendMessage}
              className="ml-2 p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full"
            >
              <IoSend size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
