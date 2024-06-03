/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import bg from "../../../assets/images/footer-bg.jpg";

import WalletCard from "./components/WalletCard";
import MoneyBalanceCard from "./components/UserBalanceCard";
import { getAllWalletAction, getAllWalletBalanceAction } from "../../../API/wallet";




const Wallet = () => {

  const [searchValue, setSearchValue] = useState('')
  
  const [accountBalance, setAccountBalance] = useState(null)
  const [allWallet, setAllWallet] = useState([])
  const [filteredData, setFilteredData] = useState([])




  const flowMap = {
    true : 'send',
    false : 'receive',
  } 

  const handleUserFilter = (e) => {
      const value = e.target.value;
      let updatedData = [];
      setSearchValue(value);
  
      if (value.length) {
        updatedData = allWallet?.filter((item) => {
          const startsWith =
            item?.note?.toLowerCase().startsWith(value.toLowerCase()) 
            // item?.paymentMethod?.toLowerCase()?.startsWith(value.toLowerCase()) 
            // item?.isInflow  ? 'send' : 'receive'?.toLowerCase().startsWith(value.toLowerCase()) 
            // item?.currentBalance?.toString()?.toLowerCase().startsWith(value.toLowerCase()) 
            // item?.prevBalance?.toString()?.toLowerCase().startsWith(value.toLowerCase()) 
            
          const includes =
            item?.note?.toLowerCase().includes(value.toLowerCase()) 
            // item?.paymentMethod?.toLowerCase().includes(value.toLowerCase()) 
            // item?.isInflow  ? 'send' : 'receive'?.toLowerCase().includes(value.toLowerCase()) 
            // item?.currentBalance?.toString()?.toLowerCase().includes(value.toLowerCase()) 
            // item?.prevBalance?.toString()?.toLowerCase().includes(value.toLowerCase()) 
        
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




    useEffect(() => {

      const getWalletReady = async ()=>{
        
        try {

          const res = await getAllWalletAction()
          const res2 = await getAllWalletBalanceAction()

          if(res || res2){
            setAllWallet(res)
            setAccountBalance(res2?.account_balance)
            
          }
          
        } catch (error) {
          console.log(error)
        }
      }
      
    
      getWalletReady()


    }, [])
    














  return (
    <div className="flex flex-col   ">
      <img src={bg} alt="" className="h-30 object-cover" />


      {/* bg-[#24262a]  */}
      <div className="min-h-[52.5rem]  bg-[#141618]   p-4 pb-40 shadow-card dark:bg-light-dark sm:px-6 2xl:px-8 2xl:pb-9   pt-20 w-full font-Montserrat ">
        <div className="text-white text-center mb-10 ">
          <span className="text-lg font-semibold !font-Roboto">Wallet</span>
        </div>


        <div className="flex gap-4 items-start justify-between w-full md:w-[95%] mx-auto  py-4">
          <MoneyBalanceCard balance={accountBalance} />
        </div>


        <div className="flex gap-4 items-start justify-between w-full md:w-[95%] mx-auto mt-15">
          <input
            placeholder="Search..."
            autoComplete="off"
            onChange={(e)=>handleUserFilter(e)}
            value={searchValue}
            className="mb-5 !bg-transparent border-1 border-[#626367] outline-none  appearance-none placeholder:!text-[#626367] !text-[#ccc] px-2 py-2 rounded-md w-[15rem]"
          />


        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2  bg-[#25272a] border-t-8 border-[#2d2f31] rounded-lg  px-5 md:px-10 py-12 w-full md:w-[95%] mx-auto ">
          {
            (searchValue ? filteredData : allWallet)?.map(cd => (
              <WalletCard key={cd.id} item={cd} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Wallet;
