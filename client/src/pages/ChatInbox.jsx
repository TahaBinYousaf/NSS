import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetConversationsQuery } from "@/services/nodeApi";
import Loader from "@/components/Loader";
import { LuArrowLeft } from "react-icons/lu";
import { IoChatbubbleOutline } from "react-icons/io5";
import DefaultAvatar from "@/assets/default-avatar.jpg";
import getImagePath from "@/utils/getImagePath";
import dayjs from "dayjs";

export default function ChatInbox() {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { data, isLoading, isFetching } = useGetConversationsQuery();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (data?.conversations) {
      setConversations(data.conversations);
    }
  }, [data]);

  const handleChatClick = (userId) => {
    navigate(`/chat/${userId}`);
  };

  return (
    <div className="container max-w-screen-xl mx-auto py-10">
      <div className="flex flex-col rounded-lg bg-white border-2 border-gray-200 w-full max-h-full h-screen">
        <div className="flex flex-col lg:flex-row w-full justify-between gap-4 border-b-2 border-b-gray-200 p-8">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="relative z-10 cursor-pointer">
              <LuArrowLeft className="size-8" color="#1c398e" />
            </button>
            <h1 className="text-4xl font-bold">Messages</h1>
          </div>
        </div>

        {isLoading || isFetching ? (
          <div className="h-full flex-1 relative">
            <Loader />
          </div>
        ) : (
          <div className="flex flex-col w-full overflow-auto">
            {conversations.length > 0 ? (
              conversations.map((conversation, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleChatClick(conversation.user._id)}
                >
                  <div className="relative">
                    <img 
                      src={conversation.user.profileImage ? getImagePath(conversation.user.profileImage) : DefaultAvatar} 
                      alt={conversation.user.name} 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {conversation.unreadCount > 0 && (
                      <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                        {conversation.unreadCount}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h2 className="text-lg font-semibold">{conversation.user.name}</h2>
                      <span className="text-sm text-gray-500">
                        {dayjs(conversation.lastMessage.createdAt).format('MMM D, h:mm A')}
                      </span>
                    </div>
                    <p className="text-gray-600 truncate">
                      {conversation.lastMessage.message}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <IoChatbubbleOutline className="text-6xl text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Messages Yet</h2>
                <p className="text-gray-500">
                  Your messages will appear here when you start chatting with other users.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 