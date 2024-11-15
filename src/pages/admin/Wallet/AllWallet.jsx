import WalletCard from "./WalletCard"

import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import AdminWalletModal from "./AdminWalletModal";
import { transactionHistory } from "../../../components/others/data";



const AllWallet = () => {
    const { onOpen, isOpen, onClose } = useDisclosure();
    const [walletId, setWalletId] = useState(null)

    const openModal = (id)=>{
        setWalletId(id)
        onOpen()
    }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {
            transactionHistory?.map(card =>(
                <WalletCard key={card._id} item={card} onclick={openModal} />
            ))
        }
            <AdminWalletModal onClose={onClose} isOpen={isOpen} data={walletId} />
    </div>
  )
}

export default AllWallet
