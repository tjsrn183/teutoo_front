import getChatRoom from "@/api/getChatRoom";
import { useCallback, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { getCookie } from "cookies-next";
import {
  Message,
  SendReservationMessage,
  SendReservationMessageContent,
} from "@/types/api.type";
import { useLoginUserInfoQuery } from "@/api/getLoginUserInfo";
import postReservation, { PostReservationRequest } from "@/api/postReservation";
import postChatImage from "@/api/postChatImage";
import useChatStore from "@/store/useChatStore";
import postReservationAccept from "@/api/postReservationAccept";

interface useChatRoomProps {
  receiverId: number;
}

export default function useChatRoom({ receiverId }: useChatRoomProps) {
  const {
    roomId,
    messages,
    addMessage,
    updateMessageIndex,
    setRoomId,
    setUsers,
    clearChat,
    changeMessageByMsgIndex,
    messageIndex,
  } = useChatStore();
  const clientRef = useRef<Client | null>(null);
  const {
    data: { data: userInfo },
  } = useLoginUserInfoQuery();

  const sendTextMessage = useCallback(
    (content: string) => {
      if (!clientRef.current) return console.error("client is null");
      if (!roomId) return console.error("roomId is null");
      console.log("sendTextMessage", content, roomId);
      clientRef.current.publish({
        destination: `/app/chat/${roomId}/text`,
        body: JSON.stringify({ content }),
      });
    },
    [roomId],
  );

  const sendImageMessage = useCallback(
    async (imgList: File[]) => {
      if (!roomId) return console.error("roomId is null");
      try {
        console.log("sendImageMessage", imgList, roomId);
        await postChatImage({
          roomId: roomId,
          chatImgMsgList: imgList,
        });
      } catch (error) {
        console.log(error);
      }
    },
    [roomId],
  );

  const sendReadMessage = useCallback((roomId: string, readIdx: number) => {
    if (!clientRef.current) return console.error("client is null");
    console.log("sendReadMessage", readIdx, roomId);
    clientRef.current.publish({
      destination: `/app/chat/${roomId}/read`,
      body: JSON.stringify({ readIdx }),
    });
  }, []);

  const sendRequestReservationMessage = useCallback(
    async (request: PostReservationRequest) => {
      if (!clientRef.current) return console.error("client is null");
      if (!roomId) return console.error("roomId is null");
      try {
        const res = await postReservation(request);
        clientRef.current.publish({
          destination: `/app/chat/${roomId}/reservation`,
          body: JSON.stringify(res),
        });
      } catch (error) {
        console.log(error);
      }
    },
    [roomId],
  );

  const sendAcceptReservationMessage = useCallback(
    async (message: SendReservationMessage) => {
      if (!clientRef.current) return console.error("client is null");
      if (!roomId) return console.error("roomId is null");
      const reservationContent = JSON.parse(
        message.content,
      ) as SendReservationMessageContent;
      try {
        await postReservationAccept({
          reservationId: reservationContent.reservationId,
        });
        clientRef.current.publish({
          destination: `/app/chat/${roomId}/reservation/accept`,
          body: JSON.stringify({
            reservationId: reservationContent.reservationId,
          }),
        });
        changeMessageByMsgIndex(message.msgIdx, {
          ...message,
          content: JSON.stringify({
            ...reservationContent,
            status: "RESERVED",
          }),
        });
      } catch (error) {
        console.log(error);
      }
    },
    [roomId, changeMessageByMsgIndex],
  );

  const sendMemberRequestReservationMessage = useCallback(
    async (dto: { price: number; ptProgramId: number; address: string }) => {
      if (!clientRef.current) return console.error("client is null");
      if (!roomId) return console.error("roomId is null");

      try {
        clientRef.current.publish({
          destination: `/app/chat/${roomId}/reservation-request/member`,
          body: JSON.stringify(dto),
        });
      } catch (error) {
        console.log(error);
      }
    },

    [roomId],
  );

  const sendTrainerRequestReservationMessage = useCallback(
    async (dto: { price: number; address: string }) => {
      if (!clientRef.current) return console.error("client is null");
      if (!roomId) return console.error("roomId is null");

      try {
        clientRef.current.publish({
          destination: `/app/chat/${roomId}/reservation-request/trainer`,
          body: JSON.stringify(dto),
        });
      } catch (error) {
        console.log(error);
      }
    },

    [roomId],
  );

  useEffect(() => {
    function receiveMessage(roomId: string, msg: Message) {
      if (msg.msgAction === "SEND") {
        console.log("pushMessage", msg);
        addMessage(msg);
        sendReadMessage(roomId, msg.msgIdx);
      } else {
        console.log("setReadIdx", msg);
        updateMessageIndex({
          sender:
            userInfo.memberId === msg.senderId
              ? msg.senderIdx
              : msg.receiverIdx,
          receiver:
            userInfo.memberId === msg.senderId
              ? msg.receiverIdx
              : msg.senderIdx,
        });
      }
    }

    function connect() {
      try {
        clearChat();
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
            setRoomId(roomInfo.roomId);
            setUsers({
              sender: userInfo.memberId,
              receiver: receiverId,
            });
            updateMessageIndex({
              sender: roomInfo.senderIdx,
              receiver: roomInfo.receiverIdx,
            });
            roomInfo.messages.forEach((msg) => {
              addMessage(msg);
            });

            if (roomInfo.messages.length > 0)
              sendReadMessage(
                roomInfo.roomId,
                roomInfo.messages[roomInfo.messages.length - 1].msgIdx,
              );
            return client.subscribe(
              `/topic/message/${roomInfo.roomId}`,
              (message) => {
                const msg = JSON.parse(message.body);
                console.log("Received Message", msg);
                if (Array.isArray(msg)) {
                  msg.forEach((m) => {
                    receiveMessage(roomInfo.roomId, m);
                  });
                  return;
                } else {
                  receiveMessage(roomInfo.roomId, msg);
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
  }, [
    addMessage,
    receiverId,
    sendReadMessage,
    setRoomId,
    setUsers,
    updateMessageIndex,
    userInfo.memberId,
    clearChat,
  ]);

  return {
    receiverId,
    sendTextMessage,
    roomId,
    messages,
    sendRequestReservationMessage,
    sendImageMessage,
    sendAcceptReservationMessage,
    messageIndex,
    sendMemberRequestReservationMessage,
    sendTrainerRequestReservationMessage,
  };
}
