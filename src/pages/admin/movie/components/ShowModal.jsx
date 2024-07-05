/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
// import { useState } from "react";
import { Drawer, Modal } from "antd";
import {  Button, useDisclosure } from "@nextui-org/react";
import Seat from "./Seat";
import "./styles.css";

import { Fragment, useEffect, useRef, useState } from "react";
import Currency from "react-currency-formatter";
import toast from "react-hot-toast";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import Login from ".././../../../pages/general/login";
import RegisterModal from "../../../user/components/RegisterModal";
import { MultibookingAction, bookingAction, getAllReservedAction } from "../../../../API/booking";
import PaymentOption from "./PaymentOption";
import PaystackPayment from "../../../../pages/general/payment/PaystackPayment";
import FlutterwavePayment from "../../../../pages/general/payment/Fltterwave";
import useDrawer from "../../../../hooks/useDrawer";
import useReceipt from "../../../../hooks/useReceipt";


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

// const reservedSeat = [
//   {
//     id: "081195e8-ec7f-42a1-a979-1f3235e75580",
//     movieId: "5a9647e3-fdd2-4db6-ae50-44bbd63a281d",
//     showDateId: "fd03c1d9-e8a0-404e-b781-00f839dbf72e",
//     showTimeId: "0cf744ea-c473-4f60-acbf-6428350a08aa",
//     userId: "30ff3803-1a22-4f56-9865-94df14149c26",
//     seat: "B4",
//     paymentMethod: "wallet",
//     createdAt: "2024-04-27T12:33:14.000Z",
//     updatedAt: "2024-04-27T12:33:14.000Z",
//   },
//   {
//     id: "0a673e64-6313-4bee-99bb-c0ba99a94d4c",
//     movieId: "5a9647e3-fdd2-4db6-ae50-44bbd63a281d",
//     showDateId: "fd03c1d9-e8a0-404e-b781-00f839dbf72e",
//     showTimeId: "0cf744ea-c473-4f60-acbf-6428350a08aa",
//     userId: "30ff3803-1a22-4f56-9865-94df14149c26",
//     seat: "C3",
//     paymentMethod: "wallet",
//     createdAt: "2024-04-27T12:56:24.000Z",
//     updatedAt: "2024-04-27T12:56:24.000Z",
//   },
//   {
//     id: "11c81813-5fa7-4aee-803e-7102e1d67965",
//     movieId: "5a9647e3-fdd2-4db6-ae50-44bbd63a281d",
//     showDateId: "fd03c1d9-e8a0-404e-b781-00f839dbf72e",
//     showTimeId: "0cf744ea-c473-4f60-acbf-6428350a08aa",
//     userId: "30ff3803-1a22-4f56-9865-94df14149c26",
//     seat: "C1",
//     paymentMethod: "wallet",
//     createdAt: "2024-04-27T12:50:33.000Z",
//     updatedAt: "2024-04-27T12:50:33.000Z",
//   },
//   {
//     id: "4f36cd9a-fe23-4633-b6b7-d12b0220af10",
//     movieId: "5a9647e3-fdd2-4db6-ae50-44bbd63a281d",
//     showDateId: "fd03c1d9-e8a0-404e-b781-00f839dbf72e",
//     showTimeId: "0cf744ea-c473-4f60-acbf-6428350a08aa",
//     userId: "30ff3803-1a22-4f56-9865-94df14149c26",
//     seat: "C4",
//     paymentMethod: "wallet",
//     createdAt: "2024-04-27T13:00:32.000Z",
//     updatedAt: "2024-04-27T13:00:32.000Z",
//   },
//   {
//     id: "57a49060-538c-487e-a6ae-7d210ba509a0",
//     movieId: "5a9647e3-fdd2-4db6-ae50-44bbd63a281d",
//     showDateId: "fd03c1d9-e8a0-404e-b781-00f839dbf72e",
//     showTimeId: "0cf744ea-c473-4f60-acbf-6428350a08aa",
//     userId: "30ff3803-1a22-4f56-9865-94df14149c26",
//     seat: "A1",
//     paymentMethod: "wallet",
//     createdAt: "2024-04-27T12:01:12.000Z",
//     updatedAt: "2024-04-27T12:01:12.000Z",
//   },
//   {
//     id: "59634668-1c7c-46c4-87b2-ba6f7c2d7bad",
//     movieId: "5a9647e3-fdd2-4db6-ae50-44bbd63a281d",
//     showDateId: "fd03c1d9-e8a0-404e-b781-00f839dbf72e",
//     showTimeId: "0cf744ea-c473-4f60-acbf-6428350a08aa",
//     userId: "30ff3803-1a22-4f56-9865-94df14149c26",
//     seat: "A3",
//     paymentMethod: "wallet",
//     createdAt: "2024-04-27T12:33:14.000Z",
//     updatedAt: "2024-04-27T12:33:14.000Z",
//   },
//   {
//     id: "649bcf13-2c54-4374-8f4c-e68f824c6093",
//     movieId: "5a9647e3-fdd2-4db6-ae50-44bbd63a281d",
//     showDateId: "fd03c1d9-e8a0-404e-b781-00f839dbf72e",
//     showTimeId: "0cf744ea-c473-4f60-acbf-6428350a08aa",
//     userId: "30ff3803-1a22-4f56-9865-94df14149c26",
//     seat: "A5",
//     paymentMethod: "wallet",
//     createdAt: "2024-04-27T12:39:29.000Z",
//     updatedAt: "2024-04-27T12:39:29.000Z",
//   },
//   {
//     id: "70f8c196-32d3-4df5-ae83-002ae4e88a6b",
//     movieId: "5a9647e3-fdd2-4db6-ae50-44bbd63a281d",
//     showDateId: "fd03c1d9-e8a0-404e-b781-00f839dbf72e",
//     showTimeId: "0cf744ea-c473-4f60-acbf-6428350a08aa",
//     userId: "30ff3803-1a22-4f56-9865-94df14149c26",
//     seat: "B3",
//     paymentMethod: "wallet",
//     createdAt: "2024-04-27T12:45:55.000Z",
//     updatedAt: "2024-04-27T12:45:55.000Z",
//   },
//   {
//     id: "79ea3261-7659-4e57-a048-df473a31f5c3",
//     movieId: "5a9647e3-fdd2-4db6-ae50-44bbd63a281d",
//     showDateId: "fd03c1d9-e8a0-404e-b781-00f839dbf72e",
//     showTimeId: "0cf744ea-c473-4f60-acbf-6428350a08aa",
//     userId: "30ff3803-1a22-4f56-9865-94df14149c26",
//     seat: "C2",
//     paymentMethod: "wallet",
//     createdAt: "2024-04-27T12:56:24.000Z",
//     updatedAt: "2024-04-27T12:56:24.000Z",
//   },
//   {
//     id: "876cd0b8-989f-414b-97cd-b23da4ecb414",
//     movieId: "5a9647e3-fdd2-4db6-ae50-44bbd63a281d",
//     showDateId: "fd03c1d9-e8a0-404e-b781-00f839dbf72e",
//     showTimeId: "0cf744ea-c473-4f60-acbf-6428350a08aa",
//     userId: "30ff3803-1a22-4f56-9865-94df14149c26",
//     seat: "A7",
//     paymentMethod: "wallet",
//     createdAt: "2024-04-27T12:45:55.000Z",
//     updatedAt: "2024-04-27T12:45:55.000Z",
//   },
//   {
//     id: "c2ea11dd-d717-4a70-a89b-d2a9056e0cf2",
//     movieId: "5a9647e3-fdd2-4db6-ae50-44bbd63a281d",
//     showDateId: "fd03c1d9-e8a0-404e-b781-00f839dbf72e",
//     showTimeId: "0cf744ea-c473-4f60-acbf-6428350a08aa",
//     userId: "30ff3803-1a22-4f56-9865-94df14149c26",
//     seat: "A2",
//     paymentMethod: "flutterwave",
//     createdAt: "2024-04-27T12:09:16.000Z",
//     updatedAt: "2024-04-27T12:09:16.000Z",
//   },
//   {
//     id: "d34da5c4-2459-4521-89db-30706a2b1eb1",
//     movieId: "5a9647e3-fdd2-4db6-ae50-44bbd63a281d",
//     showDateId: "fd03c1d9-e8a0-404e-b781-00f839dbf72e",
//     showTimeId: "0cf744ea-c473-4f60-acbf-6428350a08aa",
//     userId: "30ff3803-1a22-4f56-9865-94df14149c26",
//     seat: "B2",
//     paymentMethod: "wallet",
//     createdAt: "2024-04-27T12:39:29.000Z",
//     updatedAt: "2024-04-27T12:39:29.000Z",
//   },
// ];



const ShowModal = () => {
  const {closeDrawer, isOpen, data,  defaultValue} = useDrawer()
  const {openDrawer} = useReceipt()
  const { userData } = useCurrentUser();

  const {
    onOpen: onModalOpen,
    isOpen: hasModalOpen,
    onClose: ModalClose,
  } = useDisclosure();
  const [isLogin, setIsLogin] = useState(true);
  const [allSeat, setAllSeat] = useState([...seatArrangement]);

  const [pickedSeat, setPickedSeat] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(true);
  const [failedBooking, setFailedBooking] = useState([]);
  const [successBooking, setSuccessBooking] = useState([]);


  
  
  
  const itemRef = useRef(null);
  const containerRef = useRef(null);
  const allSeatRef = useRef([]);

  // scroll effect
  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(true);
  const [showRightButton, setShowRightButton] = useState(true);




  const paystackButtonRef = useRef(null);
  const flutterWaveButtonRef = useRef(null);








  
      //start payment
  const handleTriggerPayment = () => {

    if( !paymentMethod){
      // if (paystackButtonRef.current) {
      //     paystackButtonRef.current?.click();
      // } 

      if (flutterWaveButtonRef.current) {
        flutterWaveButtonRef.current?.click(); // pay with card
      }

    }else{
      //book with wallet
      // console.log('booking with wallet')
      submitWalletPayment()
    }
};


// booking with wallet payment
const submitWalletPayment = async ()=>{
  const getSeats = pickedSeat?.map(s=> s.number)

  const json = {
    movieId: data?.id,
    showDateId: data?.selectedDate?.id,
    showTimeId: data?.selectedDateTime?.id,
    seat: pickedSeat.length > 1 ? getSeats : pickedSeat[0]?.number,
    paymentMethod: "wallet",
    paymentReference: "wallet",
  }

  try {
     const res = pickedSeat.length > 1 ?  await MultibookingAction(json) : await bookingAction(json)
     if(res){
      openDrawer('RECEIPT_VIEW', data)  // once successful, show receipt drawer
     }
  } catch (error) {
    console.log(error)
  }
}

















  // function for scrolling
  const handleScroll = () => {
    const container = scrollContainerRef?.current;
    const maxScrollLeft = container?.scrollWidth - container?.clientWidth;

    setShowLeftButton(container?.scrollLeft > 0);
    setShowRightButton(container?.scrollLeft < maxScrollLeft);
  };

  const scrollLeft = () => {
    scrollContainerRef?.current?.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef?.current?.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  // listen for scroll event
  useEffect(() => {
    const container = scrollContainerRef?.current;

    if (container) {
      handleScroll(); // Initial check
    }

    container?.addEventListener("scroll", handleScroll);
    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // scroll effect end

  // check login status
  useEffect(() => {
    if (!userData) {
      onModalOpen();
    }
  }, [userData]);
  // check login status







  


// initial page load method to check for any reserved seat
  useEffect(() => {
    const getReserved = async () => {
      const allS = [...defaultValue.map(each => {
          each?.map(lv2=> {
            lv2.status = "free" 

            return lv2
          })

        return each 
      })]

      setAllSeat(allS)

      if (data && data?.selectedDate?.id && data?.selectedDateTime?.id && isOpen) {
        const json = {
          movieId: data?.id,
          showDateId: data?.selectedDate?.id,
          showTimeId: data?.selectedDateTime?.id,
        };
        const res = await getAllReservedAction(json);
        if (res) {
          const reserve = res?.map((each) => each.seat);

        if(data?.reserve?.length > 0 || reserve?.length > 0){
          reserveSeatHandler(data?.reserve)
        }
  
        }
        
      }
    };

    getReserved();

    return () => {
      setFailedBooking([])
      setSuccessBooking([])
      setAllSeat([...defaultValue])
      setPickedSeat([])
    };
  }, [isOpen, data, defaultValue]);








// when a free or pick seet is clicked
  const onseatPicked = (number) => {
    for (let i = 0; i < allSeat.length; i++) {
      const seatBatch = allSeat[i];
      const theSeat = seatBatch?.find((each) => each.number === number);
      const theseatIndex = seatBatch.findIndex(
        (each) => each.number === number
      );
      if (theSeat) {
        setPickedSeat(
          theSeat.status === "free"
            ? [...pickedSeat, theSeat]
            : pickedSeat?.filter((s) => s.number !== number)
        );

        theSeat.status = theSeat.status === "free" ? "pick" : "free";
        seatBatch[theseatIndex] = theSeat;
        setAllSeat([...allSeat]);
        allSeatRef.current = [...allSeat]
        break;
      }
    }
  };


  // reserve organizer
  const reserveSeatHandler = (allReserved) => {

    for (let i = 0; i < allReserved?.length; i++) {
      const reservedseat = allReserved[i];

      const newSeat = [...defaultValue]

      for (let i = 0; i < newSeat.length; i++) {
        const seatBatch = newSeat[i];
        const theSeat = seatBatch?.find((each) => each.number === reservedseat);
        const theseatIndex = seatBatch.findIndex(
          (each) => each.number === reservedseat
        );

        if (theSeat) {
          theSeat.status = "reserved";
          seatBatch[theseatIndex] = theSeat;
          setAllSeat([...newSeat]);
          allSeatRef.current = [...newSeat]

        }
      }
    }
  };


    // get reserve
  const confirmReserved = async ()=>{

    if(data?.id && data?.selectedDate?.id && data?.selectedDateTime?.id ){
      const json = {
          movieId: data?.id,
          showDateId: data?.selectedDate?.id,
          showTimeId: data?.selectedDateTime?.id,
        };
        const res = await getAllReservedAction(json);
  
        if(res) return res
        else return []

    }
  }




const updateReserved = async ()=>{
      //confirm availability
      const unavailableSeat = [];
      const openSeat = [];
      const picked = [];
  
      const result = await confirmReserved()
  
      const reserve = result?.map((each) => each.seat);
  
      pickedSeat.forEach((each) => {
        const check = reserve.includes(each.number);
        if (check) {
          unavailableSeat.push(each.number);
          picked.push(each);
        } else {
          openSeat.push(each);
        }
      });
  
      setPickedSeat([...openSeat]);
  
      if (unavailableSeat.length) {
        reserveSeatHandler(unavailableSeat);
      }
}








// booking function / button manager
  const startBooking = async  () => {
    setFailedBooking([])//clearing initial failed booking
    setSuccessBooking([])//clearing initial success booking
    //confirm availability
    const unavailableSeat = [];
    const openSeat = [];
    const picked = [];

    const result = await confirmReserved()
    // console.log(result)

    const reserve = result?.map((each) => each.seat);

    pickedSeat.forEach((each) => {
      const check = reserve.includes(each.number);
      if (check) {
        unavailableSeat.push(each.number);
        picked.push(each);
      } else {
        openSeat.push(each);
      }
    });

    setPickedSeat([...openSeat]);

    if (unavailableSeat.length) {
      toast.error(`seats: already reserved: ${unavailableSeat.join(", ")} `, {
        duration: 4000,
        position: "bottom-right",
      });
      reserveSeatHandler(unavailableSeat);
    } else {
      handleTriggerPayment()
    }
  };




  // for controlling the TV animation
  useEffect(() => {
    const item = itemRef.current;
    const container = containerRef.current;
    // console.log(item, container)

    const handleAnimationIteration = () => {
      if (container && item) {
        const containerWidth = container?.clientWidth || 400;
        const containerHeight = container?.clientHeight || 300;
        const itemWidth = item?.offsetWidth || 50;
        const itemHeight = item?.offsetHeight || 50;

        const currentTop = parseFloat(item.style.top);
        const currentLeft = parseFloat(item.style.left);

        // Determine next direction
        let nextTop, nextLeft;
        if (currentLeft >= containerWidth - itemWidth && currentTop === 0) {
          // Top right corner reached, move diagonally down
          nextTop = containerHeight - itemHeight;
          nextLeft = containerWidth - itemWidth;
        } else if (
          currentTop >= containerHeight - itemHeight &&
          currentLeft === containerWidth - itemWidth
        ) {
          // Bottom right corner reached, move diagonally up
          nextTop = 0;
          nextLeft = 0;
        }

        // Apply next direction
        item.style.top = `${nextTop}px`;
        item.style.left = `${nextLeft}px`;
      }
    };

    item?.addEventListener("animationiteration", handleAnimationIteration);

    return () => {
      item?.removeEventListener("animationiteration", handleAnimationIteration);
    };
  }, []);




  // card paymant method
  const submitCardPayment = async (reference)=>{

    const getSeats = pickedSeat?.map(s=> s.number)

    const json = {
      movieId: data?.id,
      showDateId: data?.selectedDate?.id,
      showTimeId: data?.selectedDateTime?.id,
      seat: pickedSeat.length > 1 ? getSeats : pickedSeat[0]?.number,
      paymentMethod: 'flutterwave',
      paymentReference: reference?.flw_ref,
    }

    try {
       const res = pickedSeat.length > 1 ?  await MultibookingAction(json) : await bookingAction(json)
       if(res){
          if(pickedSeat?.length > 1 && res?.unavailableSeat?.length !== 0){
            if(res?.bookedSeat?.length !== 0){

              const getSeat = res?.bookedSeat?.map(each => each?.seat)
              toast.success(`successfully book seat for: ${getSeat?.join(", ")}, You can find your seat receipt on the booking tab`, {
                duration: 80000,
              });
              setSuccessBooking(getSeat)
            }
            toast.error(`sorry! seats already reserved for: ${res?.unavailableSeat?.join(", ")}, Your equivalent balance has been reverted to your  wallet account. Kindly pick other empty seat `, {
              duration: 90000,
              position: "bottom-right",
            });
            setFailedBooking(res?.unavailableSeat)
            updateReserved()
          }else{
            // onOpen()
            openDrawer('RECEIPT_VIEW', data)
          }
       }
    } catch (error) {
      console.log(error)
    }
  }




  const handlePaymentSuccess = (reference) => {
    console.log('Payment successful!', reference);
    submitCardPayment(reference)

    // Handle successful payment here (e.g., update database, notify user, etc.)
};

const handlePaymentClose = () => {
    console.log('Payment was closed');
    // Handle payment closure here (e.g., notify user, clean up, etc.)
};













const exitApp = ()=>{
  closeDrawer()
}




  return (


    <Fragment>
     {/* {
        isOpen && */}
        <Drawer
          placement="right"
          size={"large"}
          title={"Book Movie"}
          onClose={exitApp}
          open={isOpen}
          maskClosable={false}
          className="bg-gray-500 overflow-hidden font-Poppins"
        >
          <div className="flex flex-col  px-2 ">
            <div className="flex gap-2 justify-between flex-wrap">
              <div className="flex flex-col overflow-hidden  border border-slate-200 p-2 w-36 md:w-40 rounded-lg">
                <span className="text-gray-600">Cinema</span>
                <span className="font-medium truncate w-full">{data?.title}</span>
              </div>
              <div className="flex flex-col overflow-hidden  border border-slate-200 p-2 w-36 md:w-40 rounded-lg items-end">
                <span className="text-gray-600">Date, Time</span>

                <span className=" font-medium truncate w-full">
                  {" "}
                  {data?.selectedDate?.minimal || "25-Dec 2021,"}{" "}
                  {data?.selectedDateTime?.formattedDateTime || "20:00"}
                </span>
              </div>
            </div>

            <div className="w-full flex h-[150px]  justify-center overflow-hidden wrapper mb-3">
              <div
                className="screen relative border-1 border-slate-400/70 rounded-t"
                ref={containerRef}
              >
                <img
                  src={data?.img}
                  ref={itemRef}
                  alt=""
                  className="absolute screen-img item-paper "
                />
                <div
                  className=" overflow-hidden 
                      h-[100%] 
                      w-[100%] 
                      absolute 
                      
                      bg-[linear-gradient(to_bottom,rgba(1,1,2,0.8),rgba(0,0,0,0.2))] 
                      z-[2]"
                ></div>
              </div>
            </div>

            <div className="flex bg-slate-300/50 shadow rounded h-[410px] w-full p-2 py-4 mb-2 group   relative">
              {/* scrollbar-thin scrollbar-track-slate-400 scrollbar-thumb-black  seatScrollBar  */}
              <div
                className="w-full flex gap-5 h-full overflow-x-auto scroll-container "
                ref={scrollContainerRef}
                style={{ scrollBehavior: "smooth" }}
              >
                {allSeat?.map((seatBatch, i) => (
                  <div
                    key={i}
                    className="flex min-w-[300px] gap-4 flex-wrap items-center justify-center mr-5  bg-stone-300 rounded-xl p-3  "
                  >
                    {seatBatch?.map((seat) => (
                      <Seat
                        key={seat.number}
                        status={seat.status}
                        tag={seat.number}
                        onClick={onseatPicked}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {showLeftButton && (
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-r-md"
                >
                  &lt;
                </button>
              )}
              {showRightButton && (
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-l-md"
                >
                  &gt;
                </button>
              )}
            </div>


            <div className="flex justify-between gap-1  sm:flex-wrap md:flex-nowrap mb-4">
              {/* failed booking */}
                {pickedSeat?.length === 0 && failedBooking?.length !== 0 && (
                <div>
                    <div className="flex flex-col flex-1">
                      <div className="flex flex-col py-2">
                        <span className="text-red-600">Unavailable Seats. Equivalent amount has been added to your wallet balance. Kindly pick other seat</span>
                        <span className="text-lg italic pl-5">
                          {" "}
                          {failedBooking?.map((each, i) => (
                            <span key={each} className="text-gray-600">
                              {each}
                              {i + 1 < failedBooking?.length && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    </div>
                </div>
                )}





              <div>
                {pickedSeat?.length > 0 && (
                  <div className="flex flex-col flex-1">
                    <div className="flex flex-col py-2">
                      <span className="text-gray-600">Your Seats</span>
                      <span className="text-lg italic pl-5">
                        {" "}
                        {pickedSeat?.map((each, i) => (
                          <span key={each.number}>
                            {each.number}
                            {i + 1 < pickedSeat.length && ", "}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:flex hidden flex-col bg-stone-400 p-2 h-fit rounded-lg w-fit ">
                <div className="flex gap-4 font-Roboto">
                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                    <span className="text-white font-bold">Free</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                    <span className="text-gray-600 font-bold">Reserved</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-700"></div>
                    <span className="text-yellow-700 font-bold">Selected</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="flex justify-between gap-6 flex-wrap ">
                          {/* success booking */}
                {pickedSeat?.length === 0 && successBooking?.length !== 0 && (
                <div>
                    <div className="flex flex-col flex-1">
                      <div className="flex flex-col py-2">
                        <span className="text-green-600">Successfully Booked Seats.</span>
                        <span className="text-lg italic pl-5">
                          {" "}
                          {successBooking?.map((each, i) => (
                            <span key={each} className="text-gray-600">
                              {each}
                              {i + 1 < successBooking?.length && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    </div>
                </div>
                )}

              {
                pickedSeat.length > 0 && (
                  <PaymentOption method={setPaymentMethod}/>
                )
              }

              {pickedSeat.length > 0 && (
                <div className="flex justify-center">
                  <Button
                    variant="solid"
                    color="success"
                    onClick={startBooking}
                    className="text-white text-lg"
                    size="lg"
                  >
                    <span>Buy Ticket</span>
                    <Currency
                      quantity={data?.price * pickedSeat.length || 0}
                      currency="NGN"
                    />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Drawer>

      {/* } */}



      {
          isOpen &&
      <Modal
        maskClosable={false}
        closeIcon={null}
        footer={null}
        title="Authentication"
        open={hasModalOpen}
        onCancel={ModalClose}
        classNames={{
          body: "bg-transparent",
          header: "!bg-transparent",
          content: "!bg-gray-500/90",
          footer: "!bg-gray-500/90",
        }}
      >
        {isLogin ? (
          <Login
            fromModal={true}
            switchAuthPage={() => setIsLogin(!isLogin)}
            action={ModalClose}
          />
        ) : (
          <RegisterModal switchAuthPage={() => setIsLogin(!isLogin)} />
        )}
      </Modal>
      }

        {
              isOpen &&
        
            <PaystackPayment
                ref={paystackButtonRef}
                email={userData?.data?.email}  // Replace with customer's email
                amount={(pickedSeat.length * data?.price) * 100}  // Amount in kobo (2000 kobo = 20 NGN)
                onSuccess={handlePaymentSuccess}
                onClose={handlePaymentClose}           
            />
        }

        {
            isOpen &&
            <FlutterwavePayment
                ref={flutterWaveButtonRef}
                email={userData?.data?.email}  // Replace with customer's email
                amount={(pickedSeat.length * data?.price)}  
                onSuccess={handlePaymentSuccess}
                onClose={handlePaymentClose}           
            />
        }
      

    </Fragment>
  );
};

export default ShowModal;
