import { ChatRoomRes, SendMessage } from "@/types/api.type";
import { create } from "zustand";

interface ChatRoomStore {
  chatRoom: ChatRoomRes | null;
  setChatRoom: (chatRoom: ChatRoomRes) => void;
  resetChatRoom: () => void;
  pushMessage: (message: SendMessage) => void;
  setReadIdx: ({
    senderIdx,
    receiverIdx,
  }: {
    senderIdx: number;
    receiverIdx: number;
  }) => void;
}

const useChatRoomStore = create<ChatRoomStore>((set) => ({
  chatRoom: null,
  setChatRoom: (chatRoom) => set({ chatRoom }),
  resetChatRoom: () => set({ chatRoom: null }),
  pushMessage: (message) => {
    set((state) => {
      if (state.chatRoom) {
        return {
          chatRoom: {
            ...state.chatRoom,
            messages: [...state.chatRoom.messages, message],
          },
        };
      }
      return state;
    });
  },
  setReadIdx: ({ senderIdx, receiverIdx }) => {
    set((state) => {
      if (state.chatRoom) {
        return {
          chatRoom: {
            ...state.chatRoom,
            senderIdx,
            receiverIdx,
          },
        };
      }
      return state;
    });
  },
}));

export default useChatRoomStore;
