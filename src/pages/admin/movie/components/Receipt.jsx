



/* eslint-disable react/prop-types */

import { Drawer, } from "antd";
import "./styles.css"
import QRCode from "react-qr-code";
import { FaDownload } from "react-icons/fa6";
import { useReactToPrint } from "react-to-print";
// eslint-disable-next-line no-unused-vars
import { useRef, useState } from "react";


import Currency from "react-currency-formatter"



const Receipt = ({isOpen, onClose, data}) => {
        const [isPrinting, setIsPrinting] = useState(false)
    const componentRef = useRef()

    // useEffect(() => {
    //     setIsPrinting(false)
    
     
    // }, [])
    

    const print = ()=>{
        setIsPrinting(true)
        setTimeout(() => {
            handlePrint()
        }, 1000);

        setTimeout(() => {
            setIsPrinting(false)
        }, 2000);
    }

    const handlePrint =  useReactToPrint({
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
        `
    
        // overflow-x: hidden;
        // size: 120mm ${dimension}mm;
    
    
    
        // height: ${dimension}
        // 366
        // size: 80mm ${componentRef?.current?.clientHeight}mm;
        // pageStyle: `{ size: 1in 1in }`
        // pageStyle: `{ size: 3in 4in }`
        // pageStyle: `{ size: 2.5in 4in }`
        // 80mm
      });









  return (
    <>
     
      <Drawer placement="right" size={'large'} onClose={onClose} open={isOpen}  maskClosable={false} style={{backgroundImage: "linear-gradient(to bottom,rgba(0,0,0,0.2), rgba(1,1,2,0.8), rgba(1,1,2,0.8), rgba(1,1,2,0.8),rgba(0,0,0,0.2)"}} className="bg-gray-500 overflow-hidden font-Poppins   bg-[linear-gradient(to_bottom,rgba(1,1,2,0.8),rgba(0,0,0,0.2))] " >
       <div className="flex flex-col  px-2  gap-2">

        



        <div className="flex flex-col items-center justify-center">
            <div className="bg-white min-h-[37rem] mx-auto w-full rounded-[3.1rem] max-w-[380px] relative  " ref={componentRef}>



            {
                !isPrinting && (
                    <FaDownload onClick={print} size={20} className=" absolute right-10 top-6 animate-bounce duration-1000 hover:text-green-700 hover:animate-none cursor-pointer "/>
                )
            }

            <div className="flex flex-col gap-4 p-5 md:pl-10 md:pt-8">
                <div className=" flex flex-col">
                    <span className="text-gray-500">Movie</span>
                    <span className="text-lg font-medium">{data?.title}</span>
                </div>
                <div className=" flex flex-col">
                    <span className="text-gray-500">Date</span>
                    <span className="text-lg font-medium">Sat, 25-Dec 2024</span>
                </div>
                <div className=" flex flex-col">
                    <span className="text-gray-500">Time</span>
                    <span className="text-lg font-medium">20:00</span>
                </div>
                <div className=" flex flex-col">
                    <span className="text-gray-500">Seat</span>
                    <span className="text-lg font-medium">F4</span>
                </div>
                <div className=" flex flex-col">
                    <span className="text-gray-500">Total Cost</span>
                    <span className="text-lg font-medium">
                        <Currency
                            quantity={data?.price || 0}
                            currency="NGN"
                        />
                    </span>
                </div>
            </div>



            <div className="w-full border-b-2 border-dashed border-[#343435]/20 absolute bottom-[13rem]  text-gray-400/80 flex justify-center px-5 text-center">
                    Show this ticket at the entrance
                </div>


            <div  className="relative h-40 w-full  mt-10 flex items-center text-center ">
                <QRCode
                className=""
                size={300}
                style={{ height: "auto", maxWidth: "120", alignSelf: 'center', margin:"0 auto" }}
                value={'hello world'}
                viewBox={`0 0 256 256`}
                />
            </div>

               





                <div className={`w-10 h-10 rounded-full bg-[#343435] absolute bottom-[12rem] -left-5 ${!isPrinting ? 'bg-[#343435]' : 'bg-[#f3f4f6]'} `}></div>

                <div className={`w-10 h-10 rounded-full bg-[#343435] absolute bottom-[12rem] -right-5 ${!isPrinting ? 'bg-[#343435]' : 'bg-[#f3f4f6]'}`}></div>
               
               

            </div>
        </div>

    




           



      


          



       </div>
      </Drawer>
    </>
  );
};

export default Receipt;
