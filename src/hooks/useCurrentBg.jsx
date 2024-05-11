/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useCurrentBg = create(
  persist(
    (set) => ({
      currentBg: null,
      setCurrentBg: (data = '') => set({ currentBg: data }),
    }),
    {
      name: 'cinema-currentbg',
      storage: createJSONStorage(() => localStorage), 
    },
  ),
)

export default useCurrentBg
