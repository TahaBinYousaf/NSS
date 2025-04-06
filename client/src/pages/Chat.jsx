import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { nodeApi } from "../utils/nodeApi";
import { FaArrowLeft } from "react-icons/fa";
import PropTypes from "prop-types";

const Message = ({ message, isMine }) => (
  <div className={`flex ${isMine ? "justify-end" : "justify-start"} mb-4`}>
    <div
      className={`max-w-[70%] p-3 rounded-lg ${
        isMine ? "bg-blue-500 text-white" : "bg-gray-200"
      }`}
    >
      {message}
    </div>
  </div>
);

Message.propTypes = {
  message: PropTypes.string.isRequired,
  isMine: PropTypes.bool.isRequired,
};

const Chat = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        
        // Check if userId is defined
        if (!userId) {
          console.error("User ID is undefined");
          setError("Invalid user ID");
          setLoading(false);
          return;
        }
        
        const response = await nodeApi.get(`/messages/${userId}`);
        setMessages(response.data.messages);
        setUser(response.data.user);
        setError(null);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [userId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await nodeApi.post("/messages", {
        message: newMessage,
        to: userId,
      });
      setNewMessage("");
      const response = await nodeApi.get(`/messages/${userId}`);
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-100 p-4 flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              <FaArrowLeft />
            </button>
            <div className="flex items-center">
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center">
                  <span className="text-gray-600 text-lg">
                    {user?.name?.[0]?.toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <h2 className="text-lg font-semibold">{user?.name}</h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                No messages yet. Start a conversation!
              </div>
            ) : (
              messages.map((msg) => (
                <Message
                  key={msg._id}
                  message={msg.message}
                  isMine={msg.from === localStorage.getItem("userId")}
                />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form onSubmit={sendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                disabled={!newMessage.trim()}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
