import { BaseUserMeta, createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import { SERVER_URL } from "./constants";

//just randomly adding id to localStorage, to avoid extra MAUs
if (typeof localStorage !== "undefined") {
  if (!localStorage.getItem("id")) {
    localStorage.setItem("id", (Math.random() * Math.random()).toString());
  }
}

const client = createClient({
  authEndpoint: async (roomId) => {
    const currentUrl = window.location.href;
    const urlSearchParams = new URLSearchParams(new URL(currentUrl).search);

    const res = await fetch(
      `${SERVER_URL}/?roomId=${roomId}&userId=${localStorage.getItem(
        "id"
      )}&username=${urlSearchParams.get("name")}`
    );
    const AuthData = await res.text();
    return JSON.parse(AuthData);
  },
});

export type ChatMessage = {
  text: string;
  username: string;
};

export type Presence = {
  isTyping: boolean;
};

type Storage = {};
export type UserMeta = { username: string; bot?: boolean } & BaseUserMeta;

type BroadcastEvent = {
  type: "message";
  data: ChatMessage;
};

export const {
  RoomProvider,
  useOthers,
  useSelf,
  useUpdateMyPresence,
  useBroadcastEvent,
  useRoom,
  useEventListener,
} = createRoomContext<Presence, Storage, UserMeta, BroadcastEvent>(client);
