

/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import TicketModal from "../../../components/others/TicketModal";
import UserCard from "./userCard";


const AllUser = () => {
    const { onOpen, isOpen, onClose } = useDisclosure();
    const [data, setData] = useState([])


  return (

    <div className="flex flex-col">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <UserCard onClick={onOpen}/>
        </div>


        <TicketModal onClose={onClose} isOpen={isOpen} data={data} />
    </div>

  )
}

export default AllUser