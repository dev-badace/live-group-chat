import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "../liveblocks.config";
import { useSearchParams } from "next/navigation";
import { ChatBox } from "../components/ChatBox";

export default function Room() {
  const params = useSearchParams();

  if (!params.has("roomId")) return <>Roomid is required</>;
  if (!params.has("name")) return <>Name is required</>;

  return (
    <RoomProvider
      id={params.get("roomId")!}
      initialPresence={{ isTyping: false }}
    >
      <ClientSideSuspense fallback={<div>Loading...</div>}>
        {() => <ChatBox />}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
