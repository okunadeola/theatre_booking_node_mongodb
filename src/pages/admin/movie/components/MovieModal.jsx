/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { useState } from "react";
// import InputCustom from "../../../../components/others/Input";
// import { TbSend } from "react-icons/tb";
import { DatePicker, Drawer } from "antd";

import { Chip, Button, useDisclosure } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { createMovieAction, createShowDateAction, createShowDateTimeAction, getMovieShowDateAction, getMovieShowDateTimesAction } from "../../../../API/movies";
import { convertToAmPm, formatDateString, showSuccess } from "../../../../utils";
import { PlusIcon } from "./PlusIcon";
import ShowModal from "./ShowModal";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Currency from "react-currency-formatter"

const lvRating = {
  0: "⭐️",
  1: "⭐️",
  2: "⭐️⭐️",
  3: "⭐️⭐️⭐️",
  4: "⭐️⭐️⭐️⭐️",
  5: "⭐️⭐️⭐️⭐️⭐️",
};

const MovieModal = ({ isOpen, onClose, data }) => {
  const { onOpen, isOpen: hasOpen, onClose: isClose } = useDisclosure();
  const [showDate, setshowDate] = useState(false)
  const [showTime, setshowTime] = useState(false)
  const [cinemaDate, setCinemaDate] = useState(null)
  const [cinemaDateTime, setCinemaDateTime] = useState(null)
  const [movieDate, setMovieDate] = useState([])
  const [movieDateTime, setMovieDateTime] = useState([])
  const [selectedmovieDate, setSelectedMovieDate] = useState(null)
  // console.log(selectedmovieDate)

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    try {
      const res = await createMovieAction(data);
      if (res) {
        showSuccess("movie created successfully");
        // reset();
        // onClose();
      }
    } catch (error) {
      toast.error(error?.toString());
    }
  };

  // const create = async () => {
  //   toast.loading("sending create request...", { duration: "1000" });

  //   onClose();
  // };

  const openShow = () => {
    onOpen();
  };






  const handleDate = (date2)=>{
    if(date2){
      const date = new Date(date2?.$d)
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const year = date.getFullYear();
      const fordate =  `${year}-${month}-${day}`
    
      // console.log(fordate)
      setCinemaDate(fordate)
    }
  }





  const getDate = async () => {
      if(data){
        const res = await getMovieShowDateAction({movieId:data?.id})
        if(res){
          console.log(res)
          const formatted = res?.map(dd => {
            dd.formattedDate = formatDateString(dd?.date)
            return dd
          })
          setMovieDate([...formatted])
  
        }
      }
  }


  const getDateTimes = async (dateObject) => {
      if(dateObject){
        const res = await getMovieShowDateTimesAction({dateId:dateObject?.id})
        if(res){
          const formatted = res?.map(dd => {
            dd.formattedDateTime = convertToAmPm(dd?.time)
            return dd
          })
          setMovieDateTime([...formatted])
        }
      }
  }

  useEffect(() => {

    const getDate = async ()=> {
    if(data){
      const res = await getMovieShowDateAction({movieId:data?.id})
     
      if(res){
        const formatted = res?.map(dd => {
          dd.formattedDate = formatDateString(dd?.date)
          return dd
        })
        setMovieDate([...formatted])

      }
    }

  }

  getDate()

  return ()=> setSelectedMovieDate(null)

  }, [data])




  const createDate = async ()=>{
    if(data && cinemaDate){
      const res = await createShowDateAction({movieId:data.id , date:cinemaDate})
      if(res){
        showSuccess('date created successfully')
        setCinemaDate(null)
        getDate()
      }
    }
  }

  const handleTime = (tm)=>{
    if(tm){
      const dateTime = new Date(tm?.$d)
      const hours = String(dateTime.getHours()).padStart(2, '0'); // Months are 0-based
      const minutes = String(dateTime.getMinutes()).padStart(2, '0');
      const seconds = String(dateTime.getSeconds()).padStart(2, '0');

      const fortime =  `${hours}:${minutes}:${seconds}`
    
      // console.log(fortime )
      setCinemaDateTime(fortime)
    }
  }








  const createDateTime = async ()=>{
    if(data && cinemaDateTime && selectedmovieDate ){
      // console.log(selectedmovieDate, cinemaDateTime)

      const json = {
        movieId:selectedmovieDate?.movieId,
        showDateId:selectedmovieDate?.id,
        time:cinemaDateTime,
        dateString:selectedmovieDate?.date,
      }

      const res = await createShowDateTimeAction(json)
      if(res){
        showSuccess('cinema date time created successfully')
        setCinemaDateTime(null)
      }
    }
  }








  const onSelectDate = (dateObject)=>{
    setSelectedMovieDate(dateObject)
    getDateTimes(dateObject)
  } 


  





  return (
    <>
      <Drawer
        placement="right"
        size={"large"}
        onClose={onClose}
        open={isOpen}
        maskClosable={false}
      >
        <div className="flex flex-col gap-3 p-2">
          <div className="flex gap-6 flex-wrap">
            <div className="h-[18rem] md:w-[42%] w-full  rounded-3xl inline-flex relative">
              <img
                src={data?.img}
                alt=""
                className=" rounded-3xl w-full max-h-full inline-flex object-cover object-top"
              />
              <div className=" h-full w-full rounded-3xl absolute bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(1,1,2,0.8))] "></div>
            </div>

            <div className="flex flex-col gap-5  flex-1">
              <div className="flex gap-4 flex-wrap">
                <span className="text-xl font-bold text-gray-700 font-Roboto capitalize tracking-widest">
                  {data?.title}
                </span>
                <span className="text-lg font-bold text-gray-700 font-Roboto capitalize">
                  {lvRating[data?.averageRating]}{" "}
                </span>
              </div>

              <div className="">
                <div className=" w-fit   text-xl rounded-lg font-Poppins  font-semibold text-gray-600 tracking-wider">
                  <Currency
                            quantity={data?.price || 0}
                            currency="NGN"
                        />
                </div>
              </div>

              <div className="w-fit flex gap-2 rounded-md font-Poppins flex-wrap">
                {data?.genre?.split(",")?.map((gn, i) => (
                  <Chip key={i}>{gn}</Chip>
                ))}
              </div>
            </div>
          </div>

          <div className=" bg-stone-500/10 min-h-10 rounded-md p-5 font-Roboto mb-6">
            <span className="text-gray-600 font-Poppins">{data?.description}</span>
          </div>

          <div className="flex flex-col gap-5 bg-slate-50 w-full rounded-md mb-6 font-Poppins transition-all duration-700">
            <div className="flex justify-between items-center p-2  gap-2 flex-wrap">
              <span className="text-lg text-gray-600">Show Date</span>
              <Button onClick={()=>setshowDate(!showDate)} className="transition-all duration-500">
                <PlusIcon className={`${showDate ? 'rotate-45' : 'rotate-0'} duration-500`}  /> {showDate ? 'Close' : 'Add Show Date' } 
              </Button>
            </div>

            
              <AnimatePresence>
                {
                  showDate && 
                    <motion.div  initial={{x: -450}} animate={{ x: 0}} transition={{duration: 0.5}} exit={{x: -700}}>
                      <div className="flex justify-end items-end p-2 pr-15  gap-2 flex-wrap">
                        <DatePicker onChange={handleDate} />
                        <Button size="sm"  onClick={createDate}>
                          Add
                        </Button>
                      </div>
                    </motion.div>
                }
              </AnimatePresence>
            

            <div className="flex gap-3 overflow-x-auto w-full scrollbar-hide p-2 transition-all duration-700">
              { movieDate?.length > 0 ? movieDate?.map((mv) => (
                 <motion.div  key={mv.id}  initial={{x: 0}} animate={{ y: 0}} transition={{duration: 0.5}} onClick={()=>onSelectDate(mv)} className="cursor-pointer">
                  <div
                    className="rounded-3xl min-w-[4.8rem] h-26 bg-gray-500/90 p-1 items-center text-xl flex flex-col gap-4 transition-all duration-500"
                  >
                    <div className={`w-2 h-2 rounded-full ${selectedmovieDate?.id === mv?.id ? 'bg-green-400' : 'bg-gray-700'} `}></div>
                    <div className="text-white">
                      {mv?.formattedDate?.dayOfWeek}
                    </div>
                    <div className="text-white text-2xl">{mv?.formattedDate?.dayOfMonth}</div>
                  </div>
                 </motion.div>
              )) : <div className="text-center w-full text-stone-400/50"> <span>Empty Data. Please add</span></div>
            }
            </div>
          </div>

          {
            selectedmovieDate ?
              <div className="flex flex-col gap-5 bg-slate-50 w-full rounded-md font-Poppins transition-all duration-500">
                <div className="flex justify-between items-center p-2 gap-2 flex-wrap">
                  <span className="text-lg text-gray-600">Show Time For {selectedmovieDate?.formattedDate?.month} {selectedmovieDate?.formattedDate?.dayOfWeek} {selectedmovieDate?.formattedDate?.dayOfMonth}</span>
                  <Button onClick={()=>setshowTime(!showTime)} className="transition-all duration-500">
                  <PlusIcon className={`${showTime ? 'rotate-45' : 'rotate-0'} duration-500`} /> {showTime ? 'Close' : 'Add Show Time' } 
                  </Button>
                </div>

                <AnimatePresence>
                    {
                      showTime && 
                        <motion.div  initial={{x: -450}} animate={{ x: 0}} transition={{duration: 0.5}} exit={{x: -700}} className="cursor-pointer">
                          <div className="flex justify-end items-end p-2 pr-15  gap-2 flex-wrap">
                            {/* <input type="text" className="outile-none rounded-lg bg-transparent border-2 border-stone-500/90 p-3 px-5" placeholder="20:00" /> */}
                            <DatePicker picker="time" onChange={handleTime} />
                            <Button size="sm" onClick={createDateTime}>
                              Add
                            </Button>
                          </div> 
                        </motion.div>
                    }
                </AnimatePresence>
              


                <div className="flex gap-3 overflow-x-auto w-full scrollbar-hide p-2">
                  { movieDateTime?.length > 0 ? movieDateTime?.map((mv) => (
                    <div
                      key={mv}
                      onClick={openShow}
                      className="rounded-xl min-w-36 h-12 bg-gray-600/90 p-2 px-4 items-center text-lg flex flex-col gap-4 cursor-pointer"
                    >
                      <div className="text-white">
                        {mv?.formattedDateTime}
                      </div>
                    </div>
                  )) : <div className="text-center w-full text-stone-400/50"> <span>Empty Data. Please add</span></div>
                  
                  
                  }
                </div>
              </div> : null
          }
        </div>
      </Drawer>

      <ShowModal onClose={isClose} isOpen={hasOpen} data={data} />
    </>
  );
};

export default MovieModal;
