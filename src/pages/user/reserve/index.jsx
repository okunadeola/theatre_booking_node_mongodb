/* eslint-disable no-unused-vars */
import { useState } from "react";
import bg from "../../../assets/images/footer-bg.jpg";
import ReserveCard from "./components/ReserveCard";
import { useEffect } from "react";
import { getUserBookingAction } from "../../../API/booking";

const Reserve = () => {

  const [searchValue, setSearchValue] = useState('hello')
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [allBooking, setAllBooking] = useState([])



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






    useEffect(() => {
      
      const getUserBooking = async ()=>{
          try {
               const res = await getUserBookingAction()
               if(res){
                console.log(res)
                setAllBooking(res)
               }
          } catch (error) {
            console.log(error)
          }
      }
    
      getUserBooking()

    }, [])
    












  return (
    <div className="flex flex-col   ">
      <img src={bg} alt="" className="h-30 object-cover" />


      {/* bg-[#24262a]  */}
      <div className="min-h-[52.5rem]  bg-[#141618]   p-4 pb-40 shadow-card dark:bg-light-dark sm:px-6 2xl:px-8 2xl:pb-9   pt-20 w-full font-Montserrat ">
        <div className="text-white text-center mb-10 ">
          <span className="text-lg font-semibold !font-Roboto">My Reserve</span>
        </div>

        <input
          placeholder="Search..."
          autoComplete="off"
          className="mb-5 !bg-transparent border-1 border-[#626367] outline-none  appearance-none placeholder:!text-[#626367] !text-[#ccc] px-2 py-2 rounded-full w-[15rem]"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {
            allBooking?.map(book =>(
              <ReserveCard key={book?.id} data={book}/>
            ))
          }
    
        </div>
      </div>
    </div>
  );
};

export default Reserve;
