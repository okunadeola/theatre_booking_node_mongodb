/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars

import { Drawer } from "antd";
import "./styles.css";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { getBookingAction } from "../../../../API/booking";
import React from "react";
import ReceiptLoad from "./ReceiptSwiper2";
import useReceipt from "../../../../hooks/useReceipt";
import { createRatingAction, getRatingAction } from "../../../../API/rating";
import { showSuccess } from "../../../../utils";

const Receipt = () => {
    const {closeDrawer, isOpen, data, view} = useReceipt()
  const [rating, setRating] = useState(0); // Initial value
  const [hasRate, setHasRate] = useState(false); // Initial value
  const [myBooking, setMyBooking] = useState([]); // Initial value

  useEffect(() => {
    const getReserved = async () => {
      // view === "RECEIPT_VIEW" the zustand view is changeable to display different drawer
      if (data && data?.selectedDate?.id && data?.selectedDateTime?.id && isOpen && view === "RECEIPT_VIEW") {
        const json = {
          movieId: data?.id,
          showDateId: data?.selectedDate?.id,
          showTimeId: data?.selectedDateTime?.id,
        };
        const res = await getBookingAction(json);
        if (res) {
          setMyBooking(res);
        }
      }
    };

    getReserved();

  }, [data, isOpen, view]);








  useEffect(() => {
    const getReserved =  () => {
      if (data && isOpen && view === "RECEIPT_VIEW_SINGLE") {
          setMyBooking([data]);
      }

    };
    getReserved();

  }, [data, isOpen, view]);




  useEffect(() => {
    
    const getRating = async ()=>{
      if(data && isOpen &&  view){
        try {
          const movieId = view === "RECEIPT_VIEW_SINGLE" ? data?.movie?.id :  data[0]?.movie?.id 

          if(data && isOpen && movieId){
            const res = await getRatingAction(movieId)
            if(res){
              setRating(res[0]?.rating)
              setHasRate(res?.length > 0)
            }
          }
      } catch (error) {
        console.log('error')
      }
      }
    }
    

    getRating()

  }, [data, isOpen, view])
  


  const rateMovie =  async (number)=>{
      setRating(number)

      try {
        const movieId = view === "RECEIPT_VIEW_SINGLE" ? data?.movie?.id :  data[0]?.movie?.id 

          const json = {
            "rating":number,
            "movieId": movieId,
        }

        const res = await createRatingAction(json)
        if(res){
          setHasRate(true)
          showSuccess('Thank You for rating the movie. Enjoy the Show!')
        }
      } catch (error) {
        console.log(error)
      }
  }




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
            onChange={(e)=>rateMovie(e)}
            readOnly={hasRate}
          />
        </div>


        {myBooking.length !== 0 && (
          <div className="">
            <ReceiptLoad cards={myBooking}/>
          </div>
        )}

      </Drawer>
    </>
  );
};

export default Receipt;
