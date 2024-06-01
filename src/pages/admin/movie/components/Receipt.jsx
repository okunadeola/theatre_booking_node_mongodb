/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */

import { Drawer } from "antd";
import "./styles.css";
// import QRCode from "react-qr-code";
// import { FaDownload } from "react-icons/fa6";
import { useReactToPrint } from "react-to-print";
// eslint-disable-next-line no-unused-vars
import { useEffect, useMemo, useRef, useState } from "react";
// import TinderCard from "react-tinder-card";

// import Currency from "react-currency-formatter";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { getBookingAction } from "../../../../API/booking";
import React from "react";
// import ReceiptCard from "./ReceiptCard";
import AppLoad from "./ReceiptSwiper2";
import useReceipt from "../../../../hooks/useReceipt";

const Receipt = () => {
    const {closeDrawer, isOpen, data} = useReceipt()

  const [rating, setRating] = useState(0); // Initial value
  const [myBooking, setMyBooking] = useState([]); // Initial value

  useEffect(() => {
    const getReserved = async () => {
      if (data && data?.selectedDate?.id && data?.selectedDateTime?.id && isOpen) {
        const json = {
          movieId: data?.id,
          showDateId: data?.selectedDate?.id,
          showTimeId: data?.selectedDateTime?.id,
        };
        const res = await getBookingAction(json);
        if (res) {
          console.log(res);
          setMyBooking(res);
        }
      }
    };

    getReserved();

    return () => {
      //   setFailedBooking([])
      //   setSuccessBooking([])
      //   setAllSeat([...defaultValue])
      //   setPickedSeat([])
    };
  }, [data, isOpen]);





//   AppLoad

  return (
    <>
      <Drawer
        placement="right"
        size={"large"}
        onClose={closeDrawer}
        open={isOpen}
        maskClosable={false}
        title={'Your Receipt'}
        style={{
          backgroundImage:
            "linear-gradient(to bottom,rgba(0,0,0,0.2), rgba(1,1,2,0.8), rgba(1,1,2,0.8), rgba(1,1,2,0.8),rgba(0,0,0,0.2)",
        }}
        className="bg-gray-500 overflow-hidden font-Poppins   bg-[linear-gradient(to_bottom,rgba(1,1,2,0.8),rgba(0,0,0,0.2))] "
      >
        <div className="flex gap-2 justify-end pb-4">
          <span className="text-stone-800">Rate Movie</span>

          <Rating
            style={{ maxWidth: 105 }}
            value={rating}
            onChange={setRating}
          />
        </div>


        {myBooking.length !== 0 && (
          <div className="">
            <AppLoad cards={myBooking}/>
          </div>
        )}

      </Drawer>
    </>
  );
};

export default Receipt;
