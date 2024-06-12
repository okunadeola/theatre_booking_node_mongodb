/* eslint-disable react/prop-types */

import { LongArrowRight } from "../../../../assets/icons/long-arrow-right";
import { LongArrowUp } from "../../../../assets/icons/long-arrow-up";
import { GasIcon } from "../../../../assets/icons/gas-icon";
import { QuestionIcon } from "../../../../assets/icons/question-icon";

import Currency from "react-currency-formatter";
import { formatDate } from "../../../../utils";



export default function WalletCard({ item }) {
  const {
    createdAt,
    prevBalance,
    paymentMethod,
    isInflow,
    amount,
    note,
    currentBalance
  } = item ?? {};
  const bgColor = isInflow ? "#D2D786" : "#F2C672";

  const date = formatDate(createdAt); 
  return (
    <div className="rounded-lg bg-[#171e2e] p-4 text-sm shadow-card dark:bg-light-dark sm:p-5 md:p-6">
      <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-3.5 dark:border-gray-700 sm:pb-5">
        <div className="flex items-center font-medium gap-1 ">
        
          {/* <img
            src={avatar}
            alt="wallet"
            width={24}
            height={24}
            className="rounded-full"
          /> */}
          <div className="truncate -tracking-wider  ltr:ml-2 rtl:mr-2 text-white">
            {'#user'}
          </div>
        </div>
        <div className="truncate text-xs -tracking-wide ltr:pl-2 rtl:pr-2 text-gray-400 xs:text-sm flex gap-1 ">
          <span>{date}</span>
          {/* <span className="text-xs text-gray-400">{time}</span> */}
        </div>
      </div>
      <div className="grid grid-cols-8 gap-x-5 pt-4 md:gap-x-12 md:pt-6 w-full ">
        <div className="col-span-4 flex flex-col gap-2.5 gap-y-6 sm:flex-row sm:gap-x-4 md:flex-col 2xl:flex-row w-full  ">
          <div className="flex items-center gap-1 w-full">
            <div
              className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white md:h-9 md:w-9 xl:h-10 xl:w-10"
              style={{ backgroundColor: bgColor }}
            >
              <LongArrowUp
                className={`h-5 w-5 xl:h-6 xl:w-6 ${
                  isInflow? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            <div className="flex flex-col truncate ltr:ml-2.5 rtl:mr-2.5 xl:ltr:ml-4 xl:rtl:mr-4">
              <strong className="mb-0.5 font-medium -tracking-wider text-white">
                {isInflow ? "Receive" : "Send"}
              </strong>
              <span className="text-xs text-gray-400">{paymentMethod}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-600/5 text-gray-600 dark:text-gray-400 md:h-9 md:w-9 xl:h-10 xl:w-10">
           
                <QuestionIcon className="h-5 w-5 xl:h-6 xl:w-6" />
   
            </div>
            <div className="flex flex-col truncate ltr:ml-2.5 rtl:mr-2.5 xl:ltr:ml-4 xl:rtl:mr-4">
              <span className="mb-0.5 text-xs text-gray-400">
                {isInflow && '+'}{amount ? amount : 'wallet'}
              </span>
              <strong className="font-medium -tracking-wider text-white">
                {note}
              </strong>
            </div>
          </div>
        </div>
       
        <div className="col-span-4  flex flex-col gap-2.5 sm:flex-row sm:gap-x-4 md:flex-col 2xl:flex-row w-full">
          <div className="flex items-center gap-1">
            <div className="flex h-8 w-8 shrink-0 items-center gap-1 justify-center rounded-full bg-gray-600/5 text-gray-600 dark:text-gray-400 md:h-9 md:w-9 xl:h-10 xl:w-10">
             
                <QuestionIcon className="h-5 w-5 lg:h-6 lg:w-6" />

            </div>
            <div className="flex flex-col truncate ltr:ml-2.5 rtl:mr-2.5 xl:ltr:ml-4 xl:rtl:mr-4">
              <span className="mb-0.5 text-xs text-gray-400">From</span>
              <strong className="truncate font-medium -tracking-wider flex gap-1 text-white">
              <Currency
              quantity={prevBalance || 0}
              currency="NGN"
            />
        
              </strong>
            </div>
          </div>
          <div className="col-span-1 flex items-center text-gray-600 dark:text-gray-400 ltr:sm:pl-4 rtl:sm:pr-4 ltr:md:pl-0 rtl:md:pr-0 ltr:lg:pl-4 rtl:lg:pr-4 w-full text-center justify-center">
            <LongArrowRight className="h-5 w-5 rtl:rotate-180 md:h-6 md:w-6 lg:h-5 lg:w-5 xl:h-7 xl:w-7   rotate-90 sm:rotate-0  md:rotate-90 lg:rotate-90 xl:rotate-0" />
          </div>
          <div className="flex items-center gap-1 ">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-600/5 text-gray-600 dark:text-gray-400 md:h-9 md:w-9 xl:h-10 xl:w-10">
              <GasIcon className="h-4 w-4" />
            </div>
            <div className="flex flex-col truncate ltr:ml-2.5 rtl:mr-2.5 xl:ltr:ml-4 xl:rtl:mr-4">
              <span className="mb-0.5 text-xs text-gray-400">To</span>
              <strong className="font-medium -tracking-wider text-white flex gap-1">
                <Currency
                quantity={currentBalance || 0}
                currency="NGN"
              />
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
