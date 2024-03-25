import getChatRoom from "@/api/getChatRoom";
import { useCallback, useEffect, useRef, useState } from "react";
import { Client, StompSubscription } from "@stomp/stompjs";
import { getCookie } from "cookies-next";
import { Message, SendMessage } from "@/types/api.type";
import { useLoginUserInfoQuery } from "@/api/getLoginUserInfo";
import postReservation, { PostReservationRequest } from "@/api/postReservation";
import postChatImage from "@/api/postChatImage";

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
  const {
    data: { data: userInfo },
  } = useLoginUserInfoQuery();

  const sendTextMessage = useCallback(
    (content: string) => {
      if (!clientRef.current) return console.error("client is null");
      if (!roomInfo?.roomId) return console.error("roomId is null");
      console.log("sendTextMessage", content, roomInfo.roomId);
      clientRef.current.publish({
        destination: `/app/chat/${roomInfo.roomId}/text`,
        body: JSON.stringify({ content }),
      });
    },
    [roomInfo],
  );

  const sendImageMessage = useCallback(
    async (imgList: File[]) => {
      if (!roomInfo?.roomId) return console.error("roomId is null");
      try {
        await postChatImage({
          roomId: roomInfo.roomId,
          chatImgMsgList: imgList,
        });
      } catch (error) {
        console.log(error);
      }
    },
    [roomInfo],
  );

  const sendReadMessage = useCallback((roomId: string, readIdx: number) => {
    if (!clientRef.current) return console.error("client is null");
    console.log("sendReadMessage", readIdx, roomId);
    clientRef.current.publish({
      destination: `/app/chat/${roomId}/read`,
      body: JSON.stringify({ readIdx }),
    });
  }, []);

  const requestReservation = useCallback(
    async (request: PostReservationRequest) => {
      if (!clientRef.current) return console.error("client is null");
      if (!roomInfo?.roomId) return console.error("roomId is null");
      try {
        const res = await postReservation(request);
        clientRef.current.publish({
          destination: `/app/chat/${roomInfo.roomId}/reservation`,
          body: JSON.stringify(res),
        });
      } catch (error) {
        console.log(error);
      }
    },
    [roomInfo],
  );

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
            const reverseMessages = [...roomInfo.messages].reverse();
            console.log("reverseMessages", reverseMessages);
            setMessages(reverseMessages);
            if (roomInfo.messages.length > 0)
              sendReadMessage(roomInfo.roomId, roomInfo.messages[0].msgIdx);
            return client.subscribe(
              `/topic/message/${roomInfo.roomId}`,
              (message) => {
                const msg = JSON.parse(message.body) as Message;
                console.log(msg);
                if (msg.msgAction === "SEND") {
                  console.log("pushMessage", msg);
                  setMessages((prev) => [...prev, msg]);
                  sendReadMessage(roomInfo.roomId, msg.msgIdx);
                } else {
                  console.log("setReadIdx", msg);
                  setRoomInfo((prev) => {
                    if (prev) {
                      return {
                        ...prev,
                        senderIdx:
                          userInfo.memberId === msg.senderId
                            ? msg.senderIdx
                            : msg.receiverIdx,
                        receiverIdx:
                          userInfo.memberId === msg.senderId
                            ? msg.receiverIdx
                            : msg.senderIdx,
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
  }, [receiverId, userInfo.memberId, sendReadMessage]);

  return {
    sendTextMessage,
    roomInfo,
    messages,
    requestReservation,
    sendImageMessage,
  };
}
