import { SendMessage } from "@/types/api.type";
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
}

const INIT_VALUES = {
  roomId: null,
  users: null,
  messages: [],
  messageIndex: {
    sender: 0,
    receiver: 0,
  },
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
}));

export default useChatStore;
