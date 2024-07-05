/* eslint-disable no-unused-vars */
import { useDisclosure } from "@nextui-org/react";
import TicketCard from "./TicketCard"
import TicketModal from "../../general/TicketModal";
import { useEffect, useState } from "react";
import { getAllUserTicketAction } from "../../../API/ticket";


const AllTicket = () => {
    const { onOpen, isOpen, onClose } = useDisclosure();
    const [data, setData] = useState([])
    const [ticket, setTicket] = useState([])
    const [otherUser, setOtherUser] = useState(null)





useEffect(() => {
    const getAll = async ()=>{
      const res = await getAllUserTicketAction()
      if(res){
        setData(res)
      }
    }

    getAll()

}, [])



const openTicket = (data)=>{
  setTicket([data])
  setOtherUser(data?.user?.username)
  onOpen()
}


  
const closedModal = ()=>{
  onClose()

  setTicket([])
  
}





  return (

    <div className="flex flex-col">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {
            (data)?.map(tk => (
              <TicketCard key={tk?.id} value={tk} onClick={()=>openTicket(tk)} />
            ))
          }
          
        </div>

        <TicketModal onClose={closedModal} isOpen={isOpen} data={ticket} otherUser={otherUser} />
    </div>

  )
}

export default AllTicket
