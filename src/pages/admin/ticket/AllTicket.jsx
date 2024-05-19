/* eslint-disable no-unused-vars */
import { useDisclosure } from "@nextui-org/react";
import TicketCard from "./TicketCard"
import TicketModal from "../../../components/others/TicketModal";
import { useState } from "react";


const AllTicket = () => {
    const { onOpen, isOpen, onClose } = useDisclosure();
    const [data, setData] = useState([])


  return (

    <div className="flex flex-col">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            <TicketCard onClick={onOpen}/>
            <TicketCard onClick={onOpen}/>
            <TicketCard onClick={onOpen}/>
            <TicketCard onClick={onOpen}/>
        </div>


        <TicketModal onClose={onClose} isOpen={isOpen} data={data} />
    </div>

  )
}

export default AllTicket
