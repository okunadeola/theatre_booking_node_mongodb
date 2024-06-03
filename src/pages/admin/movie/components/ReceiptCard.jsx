

import "./styles.css";
import QRCode from "react-qr-code";
import { FaDownload } from "react-icons/fa6";
import { useReactToPrint } from "react-to-print";
// eslint-disable-next-line no-unused-vars
import { useRef, useState } from "react";
import Currency from "react-currency-formatter";



import PropTypes from 'prop-types';
import { convertToAmPm, formatDateString2 } from "../../../../utils";


const ReceiptCard = ({data}) => {
    const [isPrinting, setIsPrinting] = useState(false);

    const componentRef = useRef();


    const time = convertToAmPm(data?.showTime?.time) 
    const date = formatDateString2(data?.showDate?.date)

    const print = () => {
        setIsPrinting(true);
        setTimeout(() => {
          handlePrint();
        }, 1000);
    
        setTimeout(() => {
          setIsPrinting(false);
        }, 2000);
      };
    
      const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: `@media print{
              @page {
                size: 170mm;
                margin: 0px !important;
                padding: 0px !important;
                font-size: 20px;
                margin-top: 0px !important;
                line-height: 1px;
              }
            }
            `,
      });




  return (
    <div className="flex flex-col items-center justify-center">
    <div
      className="bg-white min-h-[37rem] mx-auto w-full rounded-[3.1rem] max-w-[380px] relative  "
      ref={componentRef}
    >
      {!isPrinting && (
        <FaDownload
          onClick={print}
          size={20}
          className=" absolute right-10 top-6 animate-bounce duration-1000 hover:text-green-700 hover:animate-none cursor-pointer "
        />
      )}

      <div className="flex flex-col gap-4 p-5 md:pl-10 md:pt-8">
        <div className=" flex flex-col">
          <span className="text-gray-500">Movie</span>
          <span className="text-lg font-medium">
            {data?.movie?.title}
          </span>
        </div>
        <div className=" flex flex-col">
          <span className="text-gray-500">Date</span>
          <span className="text-lg font-medium">
            {/* Sat, 25-Dec 2024   */} {date}
          </span>
        </div>
        <div className=" flex flex-col">
          <span className="text-gray-500">Time</span>
          <span className="text-lg font-medium">{time}</span>
        </div>
        <div className=" flex flex-col">
          <span className="text-gray-500">Seat</span>
          <span className="text-lg font-medium">{data?.seat}</span>
        </div>
        <div className=" flex flex-col">
          <span className="text-gray-500">Total Cost</span>
          <span className="text-lg font-medium">
            <Currency
              quantity={data?.movie?.price || 0}
              currency="NGN"
            />
          </span>
        </div>
      </div>

      <div className="w-full border-b-2 border-dashed border-[#343435]/20 absolute bottom-[13rem]  text-gray-400/80 flex justify-center px-5 text-center">
        Show this ticket at the entrance
      </div>

      <div className="relative h-40 w-full  mt-10 flex items-center text-center ">
        <QRCode
          className=""
          size={300}
          style={{
            height: "auto",
            maxWidth: "120",
            alignSelf: "center",
            margin: "0 auto",
          }}
          value={data?.id}
          viewBox={`0 0 256 256`}
        />
      </div>

      {/* <div
        className={`w-10 h-10 rounded-full bg-[#343435] absolute bottom-[12rem] -left-5 ${
          !isPrinting ? "bg-[#343435]" : "bg-[#f3f4f6]"
        } `}
      ></div>

      <div
        className={`w-10 h-10 rounded-full bg-[#343435] absolute bottom-[12rem] -right-5 ${
          !isPrinting ? "bg-[#343435]" : "bg-[#f3f4f6]"
        }`}
      ></div> */}
    </div>
  </div>
  )
}
ReceiptCard.propTypes = {
    data: PropTypes.object,
}


export default ReceiptCard
