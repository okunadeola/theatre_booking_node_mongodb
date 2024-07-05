/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

//*** this zustand state manager is use for managing authenticated user data ***//
const useCurrentUser = create(
  persist(
    (set) => ({
      userData: null,
      setCurrentUser: (data = {}) => set({ userData: data }),
      removeCurrentUser: () => set({ userData: null }),
    }),
    {
      name: 'cinema-auth-session',
      storage: createJSONStorage(() => localStorage), 
    },
  ),
)

export default useCurrentUser
