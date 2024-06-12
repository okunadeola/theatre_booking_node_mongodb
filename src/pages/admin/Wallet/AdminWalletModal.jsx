/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

// import { transactionHistory } from "../../../components/others/data"
import { Drawer } from "antd"
import WalletCard from "./WalletCard"



const AdminWalletModal = ({ onClose, isOpen, data}) => {
  return (
    <Drawer
    placement="right"
    size={"large"}
    onClose={onClose}
    open={isOpen}
    title={"User Wallet History"}
    className={` ${data && '!bg-stone-100 !shadow-none w-full !mb-10'} `}


  >
    <div className="flex flex-col gap-3 pb-5  w-full h-full">
    {
          data?.map(card =>(
                <WalletCard key={card.id} item={card}  />
            ))
        }
    </div>
  </Drawer>
  )
}

export default AdminWalletModal
