import React, { useState } from 'react';
import { FaRegCommentDots } from 'react-icons/fa';
import { IoClose, IoRemove } from 'react-icons/io5'; // Icon đóng và thu nhỏ
import { FaUserCircle } from 'react-icons/fa';
import { FaSearch, FaArrowCircleRight } from 'react-icons/fa';

function AdminChatBot() {
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const users = [
        { id: 1, name: 'HaiDark', lastMessage: 'Xin chao' },
        { id: 2, name: 'Mylai1995', lastMessage: 'Toi mat chuyen khoan' },
    ];

    const messages = [
        { id: 1, text: 'bfdcbdc', time: '7 days ago', sender: 'them' },
        { id: 2, text: 'vfdxv xd', time: '7 days ago', sender: 'me' },
        { id: 3, text: 'bcvb c', time: '7 days ago', sender: 'me' },
    ];

    return (
        <div>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white p-4 rounded-full shadow-lg hover:scale-105 transition z-50"
                >
                    <FaRegCommentDots className="text-2xl" />
                </button>
            )}

            {isOpen && (
                <div className="fixed bottom-4 right-4 w-[600px] h-[400px] rounded-xl shadow-xl overflow-hidden flex flex-col bg-gradient-to-r from-violet-500 to-fuchsia-500 z-50">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-2 bg-transparent text-white font-semibold border-b">
                        <div className="flex items-center gap-2">
                            <FaUserCircle className="text-2xl text-white" />
                            <span className="text-md font-semibold">Admin</span>
                        </div>
                        <div className="flex items-center">
                            <IoClose className="cursor-pointer text-xl" onClick={() => setIsOpen(false)} />
                        </div>
                    </div>

                    {/* Nội dung */}
                    <div className="flex flex-1 overflow-hidden">
                        <div className="w-1/3 bg-white/20 p-2 overflow-y-auto">
                            <div className="relative mb-2">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-full pl-9 pr-3 py-1 rounded-full text-sm bg-white shadow-inner"
                                />
                            </div>
                            {users.map((user) => (
                                <div key={user.id} className="flex gap-2 items-center bg-white p-2 my-1 rounded-lg shadow text-sm">
                                    <FaUserCircle className="text-lg text-blue-500" /> {/* anh cua user */}
                                    <div>
                                        <div className="font-bold">{user.name}</div>
                                        <div className="text-gray-500">{user.lastMessage}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-2/3 flex flex-col">
                            <div className="flex-1 p-3 overflow-y-auto space-y-2">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex items-end gap-1 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                        {msg.sender !== 'me' && <FaUserCircle className="text-lg text-white" />} {/* anh nguoi nhan tin */}
                                        <div className={`rounded-xl px-3 py-2 text-sm max-w-[70%] ${msg.sender === 'me'
                                            ? 'bg-violet-400 text-right text-white'
                                            : 'bg-pink-200 text-black'
                                            }`}>
                                            <div>{msg.text}</div>
                                            <div className="text-xs text-gray-700">{msg.time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-2 flex items-center gap-2 border-t bg-gradient-to-r from-violet-500 to-fuchsia-500">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="flex-1 px-4 py-2 rounded-full text-sm border bg-gray-100"
                                />
                                <button className="text-white text-xl">
                                    <FaArrowCircleRight />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminChatBot;
