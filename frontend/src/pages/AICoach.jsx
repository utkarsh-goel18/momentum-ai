import { useState } from "react";
import { useAuth } from "../context/AuthContext";

import MainLayout from "../layouts/MainLayout";
import Card from "../components/Card";

export default function AIChat() {

  const { user } = useAuth();

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I'm your Momentum AI Coach. What would you like help with today?"
    }
  ]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message
    };

    setMessages(prev => [...prev, userMessage]);

    const currentMessage = message;

    setMessage("");

    try {

      setLoading(true);

      const response = await fetch(
        "${API_URL}ai-chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: user.uid,
            message: currentMessage
          })
        }
      );

      const data = await response.json();

      setMessages(prev => [
        ...prev,
        {
          sender: "ai",
          text: data.response
        }
      ]);

    } catch (error) {

      console.error(error);

      setMessages(prev => [
        ...prev,
        {
          sender: "ai",
          text: "Unable to reach AI Coach."
        }
      ]);

    } finally {

      setLoading(false);

    }

  };

  return (

    <MainLayout>

      <div className="max-w-7xl mx-auto h-[85vh] flex flex-col">

        <p className="uppercase tracking-[0.2em] text-purple-400 text-sm">
          AI COMMAND CENTER
        </p>

        <h1 className="text-7xl font-black mt-4">
          AI Coach
        </h1>

        <p className="text-slate-400 text-xl mt-4 mb-6">
          Ask anything about your missions.
        </p>

        <Card className="flex-1 p-6 flex flex-col overflow-hidden">

          {/* Messages */}

          <div className="flex-1 overflow-y-auto space-y-4 pr-2">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`
                    max-w-[75%]
                    p-4
                    rounded-2xl
                    whitespace-pre-wrap

                    ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-purple-500 to-blue-500"
                        : "bg-[#0B1730]"
                    }
                  `}
                >
                  {msg.text}
                </div>

              </div>

            ))}

            {loading && (

              <div className="flex justify-start">

                <div className="bg-[#0B1730] p-4 rounded-2xl">
                  Thinking...
                </div>

              </div>

            )}

          </div>

          {/* Input */}

          <div className="mt-6 flex gap-4">

            <input
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Ask AI Coach..."
              className="
                flex-1
                bg-[#0B1730]
                border
                border-[#1E293B]
                rounded-2xl
                p-4
                outline-none
              "
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="
                px-8
                rounded-2xl
                bg-gradient-to-r
                from-purple-500
                to-blue-500
                font-bold
                disabled:opacity-50
              "
            >
              Send
            </button>

          </div>

        </Card>

      </div>

    </MainLayout>

  );

}