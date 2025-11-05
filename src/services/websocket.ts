import { create } from 'zustand';

// Limit the message queue size
const MAX_MESSAGES_STORED = 100;

interface WebSocketStore {
  socket: WebSocket | null;
  isConnected: boolean;
  messages: string[];
  connect: (url: string) => void;
  disconnect: () => void;
  send: (data: string) => void;
}

export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  socket: null,
  isConnected: false,
  messages: [],

  connect: (url: string) => {
    const ws = new WebSocket(url);

    ws.onopen = () => set({ isConnected: true });
    ws.onclose = () => set({ socket: null, isConnected: false });
    ws.onmessage = (event) =>
      set((state) => ({
        messages: [...state.messages, event.data].slice(-MAX_MESSAGES_STORED),
      }));

    set({ socket: ws });
  },

  disconnect: () => {
    get().socket?.close();
  },

  send: (data: string) => {
    const { socket, isConnected } = get();
    if (socket && isConnected) {
      socket.send(data);
    }
  },
}));
