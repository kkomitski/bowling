import type { User } from '@/data/users';
import { create } from 'zustand';

interface GlobalState {
  state: Map<any, any>;
  users: User[];
  posts: any;

  getState: () => Map<any, any>;
  setState: (state: any) => void;

  preloadState: () => Promise<void>;
}

export const useGlobalStore = create<GlobalState>((set, get) => ({
  state: new Map(),
  users: [],
  posts: [],

  preloadState: async () => {
    try {
      const usersRes = await fetch(
        'https://jsonplaceholder.typicode.com/users',
      );
      const postsRes = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );

      const users = await usersRes.json();
      const posts = await postsRes.json();

      set({ users, posts });
    } catch (e) {
      console.error(e);
    }
  },

  getState: () => {
    return get().state;
  },

  setState: (state: any) => {
    set({ state });
  },
}));

// export const useState = useGlobalStore((state) => state.state);
