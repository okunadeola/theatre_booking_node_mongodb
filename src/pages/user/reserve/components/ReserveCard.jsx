import { cn } from "../../../../lib/utils";
import { MdQrCode2 } from "react-icons/md";

const ReserveCard = () => {
  return (
    <div className="rounded-lg  bg-[#25272a] shadow-2xl shadow-slate-950 font-Montserrat  ">
      <div className="p-3 pb-4 relative">
        <div className="mb-4 flex items-start justify-between">
          <div className="text-sm font-medium uppercase w-full">
            <div className="w-[70%]">
            <h2 className="mb-1 text-[#708fd2] dark:text-white truncate ">Movie Name</h2>
            </div>
            <p className="text-gray-400 dark:text-gray-400">#25.521</p>
          </div>
          
          <img src="https://image.tmdb.org/t/p/original/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg" className="absolute top-2 right-2 w-18 h-18 rounded-md" alt="ticket_img" />

          <img src="https://image.tmdb.org/t/p/original/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg" className="absolute top-24 right-12 w-6 h-6 rounded-full  filter grayscale blur-md contrast-200" alt="ticket_img" />



   
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="text-xs font-normal uppercase">
            <p className="text-gray-400">1 ticket</p>
            <p className="text-[#708fd2] dark:text-white">On 23rd May 2024</p>
          </div>
        </div>
      </div>
      <p
        className={cn(
          "flex items-center justify-center gap-2 border-t border-stone-700 p-3 text-sm font-normal dark:border-light-dark  ",
          "text-[#ffd33d] !font-Poppins "
        )}
      >
        <span className="bg-[#323336] px-4 py-1 rounded-large hover:animate-pulse cursor-pointer  flex items-center gap-1">
          <MdQrCode2/>
          
          View
          
          </span>
      </p>
    </div>
  );
};

export default ReserveCard;
