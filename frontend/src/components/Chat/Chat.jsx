import React, { useState } from "react";
import chatIcon from "../../assets/bb1.png";

function Chat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there! How can I help you?", sender: "other" },
    { id: 2, text: "Hi. I have a quick question about your services — can you guide me through the process?", sender: "me" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), text: newMessage, sender: "me" }]);
    setNewMessage("");
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-20 right-10 z-50">
        <button
          className="rounded-full shadow-lg p-2 bg-none"
          onClick={() => setOpen(!open)}
        >
          <img src={chatIcon} alt="Chat Icon" className="w-16 h-16" />
        </button>
      </div>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-0 right-4 w-80 h-[28rem] bg-white shadow-lg rounded-lg flex flex-col transition-transform duration-500 z-40 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Header */}
        <div className="bg-yellow-800 text-white px-4 py-3 rounded-t-lg flex flex-row justify-between">
          <h2 className="text-lg font-semibold">Chat with Us</h2>
          <img className="w-6 h-6 cursor-pointer rounded-sm m-1 p-1 hover:bg-orange-700" onClick={() => setOpen((open)=>(!open))} src="src/assets/cross.png" alt="" />
        </div>

        {/* Messages */}
        <div className="flex-1 px-4 py-8 space-y-3 overflow-y-auto bg-gray-100">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-xs ${
                  msg.sender === "me"
                    ? "bg-yellow-800 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="flex items-center p-3 border-t bg-white">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded-md px-3 py-2 mr-2 focus:outline-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-yellow-800 text-white px-4 py-2 rounded-md"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default Chat;