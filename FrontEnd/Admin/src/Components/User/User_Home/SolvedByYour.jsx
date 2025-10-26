import axios from "axios";
import React from "react";
import { useState, useEffect, useRef } from "react";
import api from "../../../../Utils/axios";
function SolvedByYour() {
  const [data, setData] = useState([
    {
      sender: "bot",
      text: "how can i help you",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  const sendquery = async () => {
    setData((prev) => [...prev, { sender: "user", text: input }]);
    setInput(""); // Clear input immediately for better UX

    setIsLoading(true);

    try {
      const res = await api.post("/home/chat", {
        data: input,
      });

      const botReply = res.data.text;
      setData((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error(error);
      setData((prev) => [
        ...prev,
        { sender: "bot", text: "Something went wrong" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 p-6 border-b border-white/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                AI Chat Assistant
              </h2>
              <p className="text-blue-100 text-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Online - Ready to help
              </p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="h-[500px] overflow-y-auto p-6 bg-gradient-to-b from-slate-50 to-blue-50">
          <div className="flex flex-col gap-4">
            {data.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${
                  msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                } animate-[slideIn_0.3s_ease-out]`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.sender === "user"
                      ? "bg-gradient-to-br from-blue-500 to-blue-700"
                      : "bg-gradient-to-br from-purple-500 to-indigo-600"
                  }`}
                >
                  {msg.sender === "user" ? (
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                    </svg>
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-md lg:max-w-lg group relative ${
                    msg.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-4 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                    }`}
                  >
                    <p className="text-sm leading-relaxed break-words">
                      {msg.text}
                    </p>
                    <div
                      className={`text-xs mt-2 ${
                        msg.sender === "user"
                          ? "text-blue-200"
                          : "text-gray-500"
                      }`}
                    >
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {isLoading && (
            <div className="message bot flex items-start gap-3 p-2 w-100 bg-gray-50 rounded-lg animate-pulse">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">B</span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-gray-700 italic">Bot is typing</p>
                <div className="flex gap-1">
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-6">
          <div className="flex gap-3 items-end">
            <label htmlFor="input" className="flex-1">
              <input
                type="text"
                name="input"
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendquery()}
                placeholder="Type your message here..."
                className="w-full px-6 py-4 rounded-2xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-sm bg-gray-50 hover:bg-white"
              />
            </label>
            <button
              onClick={sendquery}
              disabled={!input.trim()}
              className="px-6 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
            >
              <svg
                className="w-5 h-5 transform group-hover:rotate-45 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 mt-4 flex-wrap">
            <button
              onClick={() => setInput("How can you help me?")}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-all duration-200 border border-gray-300 hover:border-gray-400"
            >
              💡 How can you help?
            </button>
            <button
              onClick={() => setInput("What are your features?")}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-all duration-200 border border-gray-300 hover:border-gray-400"
            >
              ⚡ Features
            </button>
            <button
              onClick={() => setInput("Tell me more")}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-all duration-200 border border-gray-300 hover:border-gray-400"
            >
              📚 Learn more
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default SolvedByYour;
