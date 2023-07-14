import { useState } from "react";
import { SERVER_URL } from "../constants";
import {
  ChatMessage,
  useBroadcastEvent,
  useEventListener,
  useRoom,
} from "../liveblocks.config";
import { ChatInput } from "./ChatInput";
import { Chats } from "./Chats";
import { Participants } from "./Participants";
import { TypingIndicator } from "./TypingIndicator";

export const ChatBox = () => {
  const room = useRoom();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const broadcast = useBroadcastEvent();

  // console.log(others);

  room.subscribe("status", async (status) => {
    //use this to invoke the chat gpt worker
    if (status === "connected") {
      try {
        await fetch(`${SERVER_URL}/?roomId=${room.id}`);
      } catch (error) {
        console.log(error);
      }
    }
  });

  //listen for new messages
  useEventListener(({ connectionId, event }) => {
    switch (event.type) {
      case "message": {
        setMessages([...messages, event.data]);
        break;
      }

      default: {
        console.warn(`[${connectionId}] unknown event `, event);
      }
    }
  });

  const sendMessage = (message: ChatMessage) => {
    setMessages([...messages, message]);
    broadcast({
      type: "message",
      data: message,
    });
  };

  return (
    <div className="chatBoxContainer">
      <div className="chatAndParticipantsContainer">
        <div className="chatsDisplayContainer">
          <h2 className="roomTitle">Room - {room.id}</h2>
          <Chats messages={messages} />
        </div>

        <Participants />
      </div>

      <TypingIndicator />
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
};
