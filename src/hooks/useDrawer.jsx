/* eslint-disable no-unused-vars */
import { create } from 'zustand'





// interface ModalStore {
//     view: MODAL_VIEW | null;
//     isOpen: boolean;
//     data?: any 
//     openModal: (name: MODAL_VIEW,  data?: any) => void;
//     closeModal: () => void;
//   }

const initialArrangement = [
    [
      {
        number: "A0",
        status: "free",
      },
      {
        number: "A1",
        status: "free",
      },
      {
        number: "A2",
        status: "free",
      },
      {
        number: "A3",
        status: "free",
      },
      {
        number: "A4",
        status: "free",
      },
      {
        number: "A5",
        status: "free",
      },
      {
        number: "A6",
        status: "free",
      },
      {
        number: "A7",
        status: "free",
      },
      {
        number: "A8",
        status: "free",
      },
      {
        number: "A9",
        status: "free",
      },
      {
        number: "B0",
        status: "free",
      },
      {
        number: "B1",
        status: "free",
      },
      {
        number: "B2",
        status: "free",
      },
      {
        number: "B3",
        status: "free",
      },
      {
        number: "B4",
        status: "free",
      },
      {
        number: "B5",
        status: "free",
      },
      {
        number: "B6",
        status: "free",
      },
      {
        number: "B7",
        status: "free",
      },
      {
        number: "B8",
        status: "free",
      },
      {
        number: "B9",
        status: "free",
      },
    ],
    [
      {
        number: "C0",
        status: "free",
      },
      {
        number: "C1",
        status: "free",
      },
      {
        number: "C2",
        status: "free",
      },
      {
        number: "C3",
        status: "free",
      },
      {
        number: "C4",
        status: "free",
      },
      {
        number: "C5",
        status: "free",
      },
      {
        number: "C6",
        status: "free",
      },
      {
        number: "C7",
        status: "free",
      },
      {
        number: "C8",
        status: "free",
      },
      {
        number: "C9",
        status: "free",
      },
      {
        number: "D0",
        status: "free",
      },
      {
        number: "D1",
        status: "free",
      },
      {
        number: "D2",
        status: "free",
      },
      {
        number: "D3",
        status: "free",
      },
      {
        number: "D4",
        status: "free",
      },
      {
        number: "D5",
        status: "free",
      },
      {
        number: "D6",
        status: "free",
      },
      {
        number: "D7",
        status: "free",
      },
      {
        number: "D8",
        status: "free",
      },
      {
        number: "D9",
        status: "free",
      },
    ],
    [
      {
        number: "E0",
        status: "free",
      },
      {
        number: "E1",
        status: "free",
      },
      {
        number: "E2",
        status: "free",
      },
      {
        number: "E3",
        status: "free",
      },
      {
        number: "E4",
        status: "free",
      },
      {
        number: "E5",
        status: "free",
      },
      {
        number: "E6",
        status: "free",
      },
      {
        number: "E7",
        status: "free",
      },
      {
        number: "E8",
        status: "free",
      },
      {
        number: "E9",
        status: "free",
      },
      {
        number: "F0",
        status: "free",
      },
      {
        number: "F1",
        status: "free",
      },
      {
        number: "F2",
        status: "free",
      },
      {
        number: "F3",
        status: "free",
      },
      {
        number: "F4",
        status: "free",
      },
      {
        number: "F5",
        status: "free",
      },
      {
        number: "F6",
        status: "free",
      },
      {
        number: "F7",
        status: "free",
      },
      {
        number: "F8",
        status: "free",
      },
      {
        number: "F9",
        status: "free",
      },
    ],
    [
      {
        number: "G0",
        status: "free",
      },
      {
        number: "G1",
        status: "free",
      },
      {
        number: "G2",
        status: "free",
      },
      {
        number: "G3",
        status: "free",
      },
      {
        number: "G4",
        status: "free",
      },
      {
        number: "G5",
        status: "free",
      },
      {
        number: "G6",
        status: "free",
      },
      {
        number: "G7",
        status: "free",
      },
      {
        number: "G8",
        status: "free",
      },
      {
        number: "G9",
        status: "free",
      },
      {
        number: "H0",
        status: "free",
      },
      {
        number: "H1",
        status: "free",
      },
      {
        number: "H2",
        status: "free",
      },
      {
        number: "H3",
        status: "free",
      },
      {
        number: "H4",
        status: "free",
      },
      {
        number: "H5",
        status: "free",
      },
      {
        number: "H6",
        status: "free",
      },
      {
        number: "H7",
        status: "free",
      },
      {
        number: "H8",
        status: "free",
      },
      {
        number: "H9",
        status: "free",
      },
    ],
    [
      {
        number: "I0",
        status: "free",
      },
      {
        number: "I1",
        status: "free",
      },
      {
        number: "I2",
        status: "free",
      },
      {
        number: "I3",
        status: "free",
      },
      {
        number: "I4",
        status: "free",
      },
      {
        number: "I5",
        status: "free",
      },
      {
        number: "I6",
        status: "free",
      },
      {
        number: "I7",
        status: "free",
      },
      {
        number: "I8",
        status: "free",
      },
      {
        number: "I9",
        status: "free",
      },
      {
        number: "J0",
        status: "free",
      },
      {
        number: "J1",
        status: "free",
      },
      {
        number: "J2",
        status: "free",
      },
      {
        number: "J3",
        status: "free",
      },
      {
        number: "J4",
        status: "free",
      },
      {
        number: "J5",
        status: "free",
      },
      {
        number: "J6",
        status: "free",
      },
      {
        number: "J7",
        status: "free",
      },
      {
        number: "J8",
        status: "free",
      },
      {
        number: "J9",
        status: "free",
      },
    ],
  ];
const seatArrangement = [
    [
      {
        number: "A0",
        status: "free",
      },
      {
        number: "A1",
        status: "free",
      },
      {
        number: "A2",
        status: "free",
      },
      {
        number: "A3",
        status: "free",
      },
      {
        number: "A4",
        status: "free",
      },
      {
        number: "A5",
        status: "free",
      },
      {
        number: "A6",
        status: "free",
      },
      {
        number: "A7",
        status: "free",
      },
      {
        number: "A8",
        status: "free",
      },
      {
        number: "A9",
        status: "free",
      },
      {
        number: "B0",
        status: "free",
      },
      {
        number: "B1",
        status: "free",
      },
      {
        number: "B2",
        status: "free",
      },
      {
        number: "B3",
        status: "free",
      },
      {
        number: "B4",
        status: "free",
      },
      {
        number: "B5",
        status: "free",
      },
      {
        number: "B6",
        status: "free",
      },
      {
        number: "B7",
        status: "free",
      },
      {
        number: "B8",
        status: "free",
      },
      {
        number: "B9",
        status: "free",
      },
    ],
    [
      {
        number: "C0",
        status: "free",
      },
      {
        number: "C1",
        status: "free",
      },
      {
        number: "C2",
        status: "free",
      },
      {
        number: "C3",
        status: "free",
      },
      {
        number: "C4",
        status: "free",
      },
      {
        number: "C5",
        status: "free",
      },
      {
        number: "C6",
        status: "free",
      },
      {
        number: "C7",
        status: "free",
      },
      {
        number: "C8",
        status: "free",
      },
      {
        number: "C9",
        status: "free",
      },
      {
        number: "D0",
        status: "free",
      },
      {
        number: "D1",
        status: "free",
      },
      {
        number: "D2",
        status: "free",
      },
      {
        number: "D3",
        status: "free",
      },
      {
        number: "D4",
        status: "free",
      },
      {
        number: "D5",
        status: "free",
      },
      {
        number: "D6",
        status: "free",
      },
      {
        number: "D7",
        status: "free",
      },
      {
        number: "D8",
        status: "free",
      },
      {
        number: "D9",
        status: "free",
      },
    ],
    [
      {
        number: "E0",
        status: "free",
      },
      {
        number: "E1",
        status: "free",
      },
      {
        number: "E2",
        status: "free",
      },
      {
        number: "E3",
        status: "free",
      },
      {
        number: "E4",
        status: "free",
      },
      {
        number: "E5",
        status: "free",
      },
      {
        number: "E6",
        status: "free",
      },
      {
        number: "E7",
        status: "free",
      },
      {
        number: "E8",
        status: "free",
      },
      {
        number: "E9",
        status: "free",
      },
      {
        number: "F0",
        status: "free",
      },
      {
        number: "F1",
        status: "free",
      },
      {
        number: "F2",
        status: "free",
      },
      {
        number: "F3",
        status: "free",
      },
      {
        number: "F4",
        status: "free",
      },
      {
        number: "F5",
        status: "free",
      },
      {
        number: "F6",
        status: "free",
      },
      {
        number: "F7",
        status: "free",
      },
      {
        number: "F8",
        status: "free",
      },
      {
        number: "F9",
        status: "free",
      },
    ],
    [
      {
        number: "G0",
        status: "free",
      },
      {
        number: "G1",
        status: "free",
      },
      {
        number: "G2",
        status: "free",
      },
      {
        number: "G3",
        status: "free",
      },
      {
        number: "G4",
        status: "free",
      },
      {
        number: "G5",
        status: "free",
      },
      {
        number: "G6",
        status: "free",
      },
      {
        number: "G7",
        status: "free",
      },
      {
        number: "G8",
        status: "free",
      },
      {
        number: "G9",
        status: "free",
      },
      {
        number: "H0",
        status: "free",
      },
      {
        number: "H1",
        status: "free",
      },
      {
        number: "H2",
        status: "free",
      },
      {
        number: "H3",
        status: "free",
      },
      {
        number: "H4",
        status: "free",
      },
      {
        number: "H5",
        status: "free",
      },
      {
        number: "H6",
        status: "free",
      },
      {
        number: "H7",
        status: "free",
      },
      {
        number: "H8",
        status: "free",
      },
      {
        number: "H9",
        status: "free",
      },
    ],
    [
      {
        number: "I0",
        status: "free",
      },
      {
        number: "I1",
        status: "free",
      },
      {
        number: "I2",
        status: "free",
      },
      {
        number: "I3",
        status: "free",
      },
      {
        number: "I4",
        status: "free",
      },
      {
        number: "I5",
        status: "free",
      },
      {
        number: "I6",
        status: "free",
      },
      {
        number: "I7",
        status: "free",
      },
      {
        number: "I8",
        status: "free",
      },
      {
        number: "I9",
        status: "free",
      },
      {
        number: "J0",
        status: "free",
      },
      {
        number: "J1",
        status: "free",
      },
      {
        number: "J2",
        status: "free",
      },
      {
        number: "J3",
        status: "free",
      },
      {
        number: "J4",
        status: "free",
      },
      {
        number: "J5",
        status: "free",
      },
      {
        number: "J6",
        status: "free",
      },
      {
        number: "J7",
        status: "free",
      },
      {
        number: "J8",
        status: "free",
      },
      {
        number: "J9",
        status: "free",
      },
    ],
  ];


const useDrawer = create(
    (set) => ({
      isOpen: false,
      view : "DRAWER_VIEW",
      data: null,
      defaultValue: initialArrangement,
      all: seatArrangement,
      openDrawer: (name, data) => set({ isOpen: true, view: name, data: data }),
      closeDrawer: () => set({ isOpen: false, all: [...seatArrangement] }),
    }),
)

export default useDrawer