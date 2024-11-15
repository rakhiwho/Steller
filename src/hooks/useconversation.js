// src/hooks/useconversation.js

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useConversation = create(
  persist(
    (set) => ({
      selectedConversation: null,
      setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
      
      messages: [],
      setMessages: (messages) => set({ messages }),
      
      localStream: null,
      setLocalStream: (localStream) => set({ localStream }),
    }),
    {
      name: 'conversation-storage', // Unique name for storage
      storage: localStorage,        // Replace getStorage with storage
    }
  )
);

export default useConversation;
