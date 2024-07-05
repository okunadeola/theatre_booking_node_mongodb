/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'



//*** this zustand state manager is use for updating/changing the user home page banner per slider clicked ***//
//*** (persist) wrapper is only need if you intend to store the state in local databases else the code should start (create(set()=>({}))) ***//
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
