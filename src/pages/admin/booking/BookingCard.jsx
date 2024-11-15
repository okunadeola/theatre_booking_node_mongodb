/* eslint-disable react/prop-types */
import { Avatar, Button, Tooltip } from "@nextui-org/react";
import { cn } from "../../../lib/utils";
import { MdQrCode2 } from "react-icons/md";
import useReceipt from "../../../hooks/useReceipt";
import { convertToAmPm, formatDateString2 } from "../../../utils";
import Currency from "react-currency-formatter";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const BookingCard = ({data}) => {
  const {openDrawer} = useReceipt()

  const time = convertToAmPm(data?.showTime?.time)
  const date = formatDateString2(data?.showDate?.date)



  return (
    <div className="rounded-2xl  bg-white border shadow shadow-slate-100 font-Montserrat  ">
      <div className="p-4 pb-2 relative ">
        <div className="mb-4 flex items-start justify-between">
          <div className="text-sm font-medium uppercase w-full">
            <div className="w-[70%]">
              <h2 className="mb-1 text-[#708fd2] dark:text-white truncate ">
                  {data?.movie?.title}
              </h2>
            </div>
            <p className="text-gray-400 dark:text-gray-400">
              <Currency
                quantity={data?.movie?.price || 0}
                currency="NGN"
              />
            </p>
          </div>

          {/* <img
            src="https://image.tmdb.org/t/p/original/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg"
            className="absolute top-3 right-3 w-[4rem] h-[4rem] rounded-xl opacity-70"
            alt="ticket_img"
          /> */}
          <img
            src={data?.movie?.img}
            className="absolute top-3 right-3 w-[4rem] h-[4rem] rounded-xl opacity-70"
            alt="ticket_img"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="text-xs font-normal uppercase">
            <p className="text-gray-400">{data?.seat}</p>
            <p className="text-[#708fd2] dark:text-white">
            {date} - {time}
            </p>
          </div>
        </div>
        <div className="flex items-end mt-2 gap-1">
          <Avatar classNames={{
            icon: 'text-gray-100'
          }} size="sm" className=" w-5 h-5"/> <span className="text-gray-400 text-xs">@user{data?.userId?.slice(0, 5)}</span>

        <Tooltip showArrow content={data?.isClaimed ? "CLAIMED" : !data.isClaimed && data?.showDate?.isExpired ? "EXPIRED" :  "NOT CLAIMED"}>
           <div className="ml-auto cursor-pointer">
            <IoMdCheckmarkCircleOutline strokeWidth={3} size={22} className={cn("ml-auto cursor-pointer", data?.isClaimed ? "text-green-600" : !data.isClaimed && data?.showDate?.isExpired ? "text-red-600" :  "text-gray-400")}/>
           </div>
        </Tooltip>
        </div>
      </div>
      <p
        className={cn(
          "flex items-center justify-center gap-2 border-t border-dashed border-gray-200   p-3 text-sm font-normal  ",
          "text-[#5a5853] !font-Poppins  "
        )}
      >
     
        <Button onClick={()=>openDrawer("RECEIPT_VIEW_SINGLE", data)} size="sm"  className="rounded-full gap-1 px-5"> <MdQrCode2 /> <span>View</span> </Button>
      </p>
    </div>
  );
};

export default BookingCard;
