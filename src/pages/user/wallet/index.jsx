/* eslint-disable no-unused-vars */
import { useState } from "react";
import bg from "../../../assets/images/footer-bg.jpg";
import User from "../../../assets/images/user/user-03.png"

import WalletCard from "./components/WalletCard";
import { Button } from "@nextui-org/react";







const transactionHistory = [
  {
    id: 1,
    name: 'Spy Thirtythree',
    avatar: User,
    date: 'February 7, 2022',
    time: '10:13 AM',
    transactionType: 'credited',
    transactionFrom: 'Flutterwave',
    transactionFromAvatar: User,
    transactionMethodLogo: '',
    transactionMethod: 'Verse',
    transactionAmount: 9.85,
    gasFee: 900,
    currencyType: 'NGN',
  },
  {
    id: 2,
    name: 'Spy Thirtythree',
    avatar: User,
    date: 'February 7, 2022',
    time: '10:13 AM',
    transactionType: 'debited',
    transactionFrom: 'Paystack',
    transactionFromAvatar: User,
    transactionMethodLogo: '',
    transactionMethod: 'Booking',
    transactionAmount: 3000,
    gasFee: 519,
    currencyType: 'USD',
  },
  {
    id: 3,
    name: 'Thirtythree',
    avatar: User,
    date: 'February 7, 2022',
    time: '10:13 AM',
    transactionType: 'credited',
    transactionFrom: 'Paystack',
    transactionFromAvatar: User,
    transactionMethodLogo: '',
    transactionMethod: 'Verse',
    transactionAmount: 9.85,
    gasFee: 900,
    currencyType: 'USD',
  },
];














const Wallet = () => {

  const [searchValue, setSearchValue] = useState('hello')
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])



  const handleUserFilter = (e) => {
      const value = e.target.value;
      let updatedData = [];
      setSearchValue(value);
  
      if (value.length) {
        updatedData = data?.filter((item) => {
          const startsWith =
            item?.name?.toLowerCase().startsWith(value.toLowerCase()) 
            
          const includes =
            item?.name?.toLowerCase().includes(value.toLowerCase()) 
        
          if (startsWith) {
            return startsWith;
          } else if (!startsWith && includes) {
            return includes;
          } else return null;
        });
        setFilteredData(updatedData);
        setSearchValue(value);
      }
    };

















  return (
    <div className="flex flex-col   ">
      <img src={bg} alt="" className="h-30 object-cover" />


      {/* bg-[#24262a]  */}
      <div className="min-h-[52.5rem]  bg-[#141618]   p-4 pb-40 shadow-card dark:bg-light-dark sm:px-6 2xl:px-8 2xl:pb-9   pt-20 w-full font-Montserrat ">
        <div className="text-white text-center mb-10 ">
          <span className="text-lg font-semibold !font-Roboto">Wallet</span>
        </div>


        <div className="flex gap-4 items-start justify-between w-full md:w-[95%] mx-auto">
          <input
            placeholder="Search..."
            autoComplete="off"
            className="mb-5 !bg-transparent border-1 border-[#626367] outline-none  appearance-none placeholder:!text-[#626367] !text-[#ccc] px-2 py-2 rounded-full w-[15rem]"
          />

          <Button className="">View Wallet History</Button>

        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2  bg-[#25272a] border-t-8 border-[#2d2f31] rounded-lg  px-5 md:px-10 py-12 w-full md:w-[95%] mx-auto ">
          {
            transactionHistory?.map(cd => (
              <WalletCard key={cd.id} item={cd} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Wallet;
