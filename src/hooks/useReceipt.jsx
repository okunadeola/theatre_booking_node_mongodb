/* eslint-disable no-unused-vars */
import { create } from 'zustand'





const useReceipt = create(
    (set) => ({
      isOpen: false,
      view : "RECEIPT_VIEW",
      data: null,
      openDrawer: (name, data) => set({ isOpen: true, view: name, data: data }),
      closeDrawer: () => set({ isOpen: false,  }),
    }),
)

export default useReceipt