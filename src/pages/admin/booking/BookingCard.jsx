import { Avatar } from "@nextui-org/react";
import { cn } from "../../../lib/utils";
import { MdQrCode2 } from "react-icons/md";

const BookingCard = () => {
  return (
    <div className="rounded-lg  bg-white shadow shadow-slate-300 font-Montserrat  ">
      <div className="p-3 pb-2 relative">
        <div className="mb-4 flex items-start justify-between">
          <div className="text-sm font-medium uppercase w-full">
            <div className="w-[70%]">
              <h2 className="mb-1 text-[#708fd2] dark:text-white truncate ">
                Movie Name
              </h2>
            </div>
            <p className="text-gray-400 dark:text-gray-400">#25.521</p>
          </div>

          <img
            src="https://image.tmdb.org/t/p/original/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg"
            className="absolute top-2 right-2 w-[4rem] h-[4rem] rounded-md opacity-70"
            alt="ticket_img"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="text-xs font-normal uppercase">
            <p className="text-gray-400">1 ticket</p>
            <p className="text-[#708fd2] dark:text-white">
              On 23rd May 2024 - 12:30AM
            </p>
          </div>
        </div>
        <div className="flex items-end mt-2 gap-1">
          <Avatar classNames={{
            icon: 'text-gray-100'
          }} size="sm" className=" w-5 h-5"/> <span className="text-gray-400 text-xs">@user1</span>
        </div>
      </div>
      <p
        className={cn(
          "flex items-center justify-center gap-2 border-t border-dashed border-gray-200   p-3 text-sm font-normal  ",
          "text-[#5a5853] !font-Poppins  "
        )}
      >
        <span className="bg-slate-200 backdrop-blur hover:animate-bounce px-4 py-1 rounded-large  cursor-pointer  flex items-center gap-1">
          <MdQrCode2 />

          <span>View</span>
        </span>
      </p>
    </div>
  );
};

export default BookingCard;
