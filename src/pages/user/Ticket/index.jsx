/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import bg from "../../../assets/images/footer-bg.jpg";
import TicketCard from "./components/TicketCard";
import { Button, useDisclosure } from "@nextui-org/react";
import TicketModal from "../../../components/others/TicketModal";
import { filterTicketByPriorityAction, filterTicketByStatusAction, getUserTicketAction } from "../../../API/ticket";


const Ticket = () => {

  const [searchValue, setSearchValue] = useState('hello')
  const [data, setData] = useState([])
  const [ticket, setTicket] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [isInitial, setInitial] = useState(false)



  const handleUserFilter = (e) => {
      const value = e.target.value;
      let updatedData = [];
      setSearchValue(value);
  
      if (value.length) {
        updatedData = data?.filter((item) => {
          const startsWith =
            item?.title?.toLowerCase().startsWith(value.toLowerCase()) 
            item?.messgae?.toLowerCase().startsWith(value.toLowerCase()) 
            item?.status?.toLowerCase().startsWith(value.toLowerCase()) 
            item?.priority?.toLowerCase().startsWith(value.toLowerCase()) 
            
          const includes =
            item?.title?.toLowerCase().includes(value.toLowerCase()) 
            item?.message?.toLowerCase().includes(value.toLowerCase()) 
            item?.status?.toLowerCase().includes(value.toLowerCase()) 
            item?.priority?.toLowerCase().includes(value.toLowerCase()) 
        
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
    const getTicket = async ()=>{
        try {
              const res = await getUserTicketAction()
              if(res){
                setData(res)
              }
        } catch (error) {
          console.log(error);
        }
    }


    getTicket()
    
    
  }, [])
  


  const openTicket = (data)=>{
    console.log(data);
    setTicket([data])
    onOpen()
  }



  const openCreateTicket = ()=>{
    setInitial(true)
    onOpen()
  }
  
  
  
  const closedModal = ()=>{
    setInitial(false)
    onClose()

    setTicket([])
    
  }




  const filterStatus = async  (e)=>{
      e.preventDefault()
      if(e.target.value === 'default'){
        setFilteredData([])
        return
      }

      try {
        const res = await filterTicketByStatusAction(e.target.value)
        if(res){
          console.log(res)
          setFilteredData(res)
        }
      } catch (error) {
        console.log(error)
      }
  }


  const filterPriority = async (e)=>{
      e.preventDefault()

      if(e.target.value === 'default'){
        setFilteredData([])
        return
      } 
      try {
        const res = await filterTicketByPriorityAction(e.target.value)
          if(res){
            console.log(res)
            setFilteredData(res)

          }
      } catch (error) {
        console.log(error)
      }
  }





  return (
    <div className="flex flex-col   ">
      <img src={bg} alt="" className="h-30 object-cover" />


      {/* bg-[#24262a]  */}
      <div className="min-h-[52.5rem]  bg-[#141618]   p-4 pb-40 shadow-card dark:bg-light-dark sm:px-6 2xl:px-8 2xl:pb-9   pt-20 w-full font-Montserrat ">
        <div className="text-white text-center mb-10 ">
          <span className="text-lg font-semibold !font-Roboto">Support Ticket</span>
        </div>



        <div className="flex justify-between gap-2  w-full md:w-[95%] mx-auto items-end flex-wrap"> 
        <div className="flex gap-4 items-end ">
          <input
            placeholder="Search..."
            autoComplete="off"
            onChange={handleUserFilter}
            value={searchValue}
            className="mb-5 !bg-transparent border-1 border-[#626367] outline-none  appearance-none placeholder:!text-[#626367] !text-[#ccc] px-2 py-2 rounded-full w-[15rem]"
          />

          <div className="flex flex-col gap-2">
            <span className="text-[#626367]">Status</span>
            <select name="" onChange={filterStatus} className="mb-5 !bg-transparent border-1 border-[#626367] outline-none  appearance-none placeholder:!text-[#626367] !text-[#ccc] px-2 py-2 rounded-full w-[15rem]">
              <option value="default"></option>
              <option value="pending">PENDING</option>
              <option value="answered">ANSWERED</option>
              <option value="closed">CLOSED</option>
              <option value="deleted">DELETED</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[#626367]">Priority</span>
            <select name="" onChange={filterPriority} className="mb-5 !bg-transparent border-1 border-[#626367] outline-none  appearance-none placeholder:!text-[#626367] !text-[#ccc] px-2 py-2 rounded-full w-[15rem]">
              <option value="default"></option>
              <option value="low">LOW</option>
              <option value="medium">MEDIUM</option>
              <option value="high">HIGH</option>
            </select>
          </div>

        </div>



        <Button className="mb-5" onClick={openCreateTicket}>Create Ticket</Button>
        </div>


        

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-[#25272a] border-t-8 border-[#2d2f31] rounded-lg  px-5 md:px-10 py-12 w-full md:w-[95%] mx-auto ">
          {
            ((searchValue ||  filteredData?.length !== 0) ? filteredData : data)?.map(tk => (
              <TicketCard key={tk?.id} value={tk} onClick={()=>openTicket(tk)} />
            ))
          }
        </div>
      </div>

      <TicketModal isInitial={isInitial} setInitial={setInitial} onClose={closedModal} isOpen={isOpen} data={ticket}  />
    </div>
  );
};

export default Ticket;
