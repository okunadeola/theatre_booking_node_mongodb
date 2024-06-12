

/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import UserCard from "./userCard";
import { getAllWalletByIDAction } from "../../../API/wallet";
import AdminWalletModal from "../Wallet/AdminWalletModal";
import { useGetUserData } from "../../../API/queryTransferApis";


const AllUser = () => {
    const { onOpen, isOpen, onClose } = useDisclosure();
    const [userWallet, setUserWallet] = useState([])
    const {data}= useGetUserData()

  const openWallet = (dt)=>{
    getUserWallet(dt)
  }

  const getUserWallet = async (value)=>{
    try {
        const res = await getAllWalletByIDAction(value?.id)
        if(res){
          setUserWallet([...res])

          onOpen()
        }
    } catch (error) {
      console.log(error)
    }
  }


  return (

    <div className="flex flex-col">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {
            data?.map(vl => (
              <UserCard key={vl?.id}  data={vl} onClick={()=>openWallet(vl)}/>
            ))
          }
        </div>

        <AdminWalletModal onClose={onClose} isOpen={isOpen} data={userWallet} />
    </div>

  )
}

export default AllUser