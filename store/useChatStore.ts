import { ImgResDto, SendMessage } from "@/types/api.type";
import { create } from "zustand";

interface ChatStore {
  roomId: string | null;
  users: {
    sender: number;
    receiver: number;
  } | null;
  messages: SendMessage[];
  messageIndex: {
    sender: number;
    receiver: number;
  };
  receiver: ImgResDto | null;
  addMessage: (message: SendMessage) => void;
  updateMessageIndex: ({
    sender,
    receiver,
  }: {
    sender: number;
    receiver: number;
  }) => void;
  setRoomId: (roomId: string) => void;
  setUsers: (users: { sender: number; receiver: number }) => void;
  clearChat: () => void;
  changeMessageByMsgIndex: (msgIndex: number, message: SendMessage) => void;
  setReceiver: (receiver: ImgResDto) => void;
}

const INIT_VALUES = {
  roomId: null,
  users: null,
  messages: [],
  messageIndex: {
    sender: 0,
    receiver: 0,
  },
  receiver: null,
};

const useChatStore = create<ChatStore>((set) => ({
  ...INIT_VALUES,
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  updateMessageIndex: ({ sender, receiver }) =>
    set((state) => ({
      messageIndex: {
        sender,
        receiver,
      },
    })),
  setRoomId: (roomId) =>
    set(() => ({
      roomId,
    })),
  setUsers: (users) =>
    set(() => ({
      users,
    })),
  clearChat: () =>
    set(() => ({
      ...INIT_VALUES,
    })),
  changeMessageByMsgIndex: (msgIndex, message) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.msgIdx === msgIndex ? message : msg,
      ),
    })),
  setReceiver: (receiver) =>
    set(() => ({
      receiver,
    })),
}));

export default useChatStore;
