import getChatRoom from "@/api/getChatRoom";
import useChatRoomStore from "@/store/useChatRoomStore";
import { useCallback, useEffect, useRef, useState } from "react";
import { Client, StompSubscription } from "@stomp/stompjs";
import { getCookie } from "cookies-next";
import { Message, SendMessage } from "@/types/api.type";
import { useChatListQuery } from "@/api/getChatList";

interface useChatRoomProps {
  receiverId: number;
}

interface RoomInfo {
  roomId: string;
  receiverIdx: number;
  senderIdx: number;
}

export default function useChatRoom({ receiverId }: useChatRoomProps) {
  const clientRef = useRef<Client | null>(null);
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);
  const [messages, setMessages] = useState<SendMessage[]>([]);

  const [subscription, setSubscription] = useState<StompSubscription | null>(
    null,
  );

  const sendTextMessage = (content: string) => {
    if (!clientRef.current) return console.error("client is null");
    if (!roomInfo?.roomId) return console.error("roomId is null");
    console.log("sendTextMessage", content, roomInfo.roomId);
    clientRef.current.publish({
      destination: `/app/chat/${roomInfo.roomId}/text`,
      body: JSON.stringify({ content }),
    });
  };

  useEffect(() => {
    function connect() {
      try {
        console.log("connecting");
        const client = new Client({
          brokerURL: "ws://43.201.184.37/chat-connection",
          connectHeaders: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
          debug: (str) => {
            console.log(str);
          },
          onConnect: async () => {
            console.log("connected");
            const roomInfo = await getChatRoom({ receiverId });
            console.log(roomInfo);
            if (!roomInfo) return;
            setRoomInfo({
              roomId: roomInfo.roomId,
              receiverIdx: roomInfo.receiverIdx,
              senderIdx: roomInfo.senderIdx,
            });
            setMessages(roomInfo.messages);
            return client.subscribe(
              `/topic/message/${roomInfo.roomId}`,
              (message) => {
                const msg = JSON.parse(message.body) as Message;
                console.log(msg);
                if (msg.msgAction === "SEND") {
                  console.log("pushMessage", msg);
                  setMessages((prev) => [...prev, msg]);
                } else if (msg.msgAction === "READ") {
                  console.log("setReadIdx", msg);
                  setRoomInfo((prev) => {
                    if (prev) {
                      return {
                        ...prev,
                        senderIdx: msg.senderIdx,
                        receiverIdx: msg.receiverIdx,
                      };
                    }
                    return prev;
                  });
                }
              },
            );
          },
          reconnectDelay: 5000,
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000,
        });
        client.activate();
        console.log(client);
        clientRef.current = client;
      } catch (error) {
        console.log(error);
      }
    }

    function disconnect() {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    }

    connect();
    return () => {
      disconnect();
    };
  }, []);

  return { sendTextMessage, roomInfo, messages };
}
