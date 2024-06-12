
import { Pagination } from "@nextui-org/react"
import SwitchTab from "../../../components/others/SwitchTab"
import Search from "../../../components/others/Search"
import Title from "../../../components/others/Title"
import AllUser from "./AllUser"
import MoneyBalanceCard from "../../../pages/user/wallet/components/UserBalanceCard"
import { useGetTotalWalletBalance } from "../../../API/queryTransferApis"



const tabs = [
  {
    Key: "active", label: 'Active'
  },
  {
    Key: "restricted", label: 'Restricted'
  },
]

const AdminUser = () => {
  const {data:balance} = useGetTotalWalletBalance()


  return (
    <div className="flex flex-col">
      <Title title={"All Users"}/>
      <MoneyBalanceCard balance={balance} fromAdmin={true} />

      <div className="flex flex-col bg-stone-100 p-4 py-6  gap-4 rounded">
        <div className="flex gap-2 flex-wrap justify-between">
          <SwitchTab tabs={tabs}/> 
          <Search roundedSm={'sm'}/>
        </div>
        <AllUser/>

        <Pagination showControls total={10} initialPage={1} className="mt-2" />
      </div>
    </div>
  )
}

export default AdminUser
