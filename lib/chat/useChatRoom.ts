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
import { GSP_NO_RETURNED_VALUE } from "next/dist/lib/constants";

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
    receiver,
    setReceiver,
  } = useChatStore();
  const clientRef = useRef<Client | null>(null);
  const {
    data: { data: userInfo },
  } = useLoginUserInfoQuery();

  const sendTextMessage = useCallback(
    (content: string) => {
      if (!clientRef.current) return;
      if (!roomId) return;

      clientRef.current.publish({
        destination: `/app/chat/${roomId}/text`,
        body: JSON.stringify({ content }),
      });
    },
    [roomId],
  );

  const sendImageMessage = useCallback(
    async (imgList: File[]) => {
      if (!roomId) return;
      try {
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

    clientRef.current.publish({
      destination: `/app/chat/${roomId}/read`,
      body: JSON.stringify({ readIdx }),
    });
  }, []);

  const sendRequestReservationMessage = useCallback(
    async (request: PostReservationRequest) => {
      if (!clientRef.current) return;
      if (!roomId) return;
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
      if (!clientRef.current) return;
      if (!roomId) return;
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
      if (!clientRef.current) return;
      if (!roomId) GSP_NO_RETURNED_VALUE;

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
      if (!clientRef.current) return;
      if (!roomId) return;

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
        addMessage(msg);
        sendReadMessage(roomId, msg.msgIdx);
      } else {
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

        const client = new Client({
          brokerURL: "wss://api.teutoo.site/chat-connection",
          connectHeaders: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
          debug: (str) => {
            console.log(str);
          },
          onConnect: async () => {
            const roomInfo = await getChatRoom({
              receiverId,
              activationType: "INFO",
            });

            if (!roomInfo) return;
            setReceiver({
              name: roomInfo.receiverName,
              img: roomInfo.receiverImg,
            });
            setRoomId(roomInfo.roomId);
            setUsers({
              sender: userInfo.memberId,
              receiver: receiverId,
            });
            updateMessageIndex({
              sender: roomInfo.senderIdx,
              receiver: roomInfo.receiverIdx,
            });
            const messages = roomInfo.messages.filter((msg) => msg !== null);
            messages.forEach((msg) => {
              addMessage(msg);
            });

            if (messages.length > 0)
              sendReadMessage(
                roomInfo.roomId,
                messages[messages.length - 1].msgIdx,
              );
            return client.subscribe(
              `/topic/message/${roomInfo.roomId}`,
              (message) => {
                const msg = JSON.parse(message.body);

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
    setReceiver,
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
    receiver,
  };
}
