import { useEffect, useState } from "react";
import Label from "../components/Label";
import { useSelector } from "react-redux";
import { useLazyGetMessagesQuery, useSendMessageMutation } from "@/services/nodeApi";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "@/components/Loader";
import { LuArrowLeft } from "react-icons/lu";

export default function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [fetchData, { isLoading, isFetching }] = useLazyGetMessagesQuery();
  const [send, { isLoading: sendLoading }] = useSendMessageMutation();

  const [message, messageSet] = useState("");
  const [messages, messagesSet] = useState([]);

  async function init() {
    try {
      const res = await fetchData({
        userId: id,
      });
      if (res?.data) {
        messagesSet(res?.data?.messages ?? []);
      }
    } catch (e) {}
  }
  useEffect(() => {
    init();
  }, []);

  async function sendMessage() {
    if (!message) return;
    try {
      messageSet("");
      messagesSet(pre => [...pre, { message, from: user._id }]);
      await send({ message, to: id });
    } catch (err) {
      messagesSet(pre => pre.slice(0, -1));
    }
  }

  return (
    <div className="container max-w-screen-xl mx-auto py-10 ">
      <div className="flex flex-col justify-between rounded-lg bg-white border-2 border-gray-200 w-full max-h-full h-screen">
        <div className="flex flex-col lg:flex-row w-full justify-between gap-4 border-b-2 border-b-gray-200 p-8">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="relative z-10 cursor-pointer">
              <LuArrowLeft className="size-8" color="#1c398e" />
            </button>
            <Label name="Chat" className="!text-4xl" />
          </div>
        </div>
        {/** NAME */}
        {isLoading || isFetching ? (
          <div className="h-full flex-1 relative">
            <Loader />
          </div>
        ) : (
          <div className="flex flex-col w-full gap-3 p-8 overflow-auto">
            {messages?.length ? (
              messages.map((message, index) => {
                return <Message key={index} message={message} right={message?.from === user._id} />;
              })
            ) : (
              <div className="flex-1 mx-auto">Type message to start a chat</div>
            )}
          </div>
        )}

        <div className="flex w-full justify-end gap-8 p-8 border-t-2 border-t-gray-200">
          <div className="flex flex-col lg:flex-row gap-4 flex-1">
            <input
              value={message}
              onChange={e => messageSet(e.target.value)}
              className="flex-1 w-full border-2 border-gray-400 rounded-md p-4 text-lg"
              placeholder="Type a message"
            />
          </div>
          <button
            onClick={sendMessage}
            className="w-fit flex items-center gap-2 cursor-pointer px-4 md:px-6 py-2 md:py-3 font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-black transition-all duration-300 ease-in-out transform hover:scale-105 hover:brightness-110"
          >
            {sendLoading ? "Sending" : "Send Message"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Message({ right = false, message }) {
  return (
    <div className={`flex gap-4 flex-row flex-1 ${right && "justify-end"}`}>
      <div className={`flex flex-col gap-1 max-w-1/2 ${right && "justify-end"}`}>
        <div className={`${right ? "bg-blue-900 text-white" : " bg-gray-300 text-black"}  rounded-md p-4`}>{message.message}</div>
      </div>
    </div>
  );
}
