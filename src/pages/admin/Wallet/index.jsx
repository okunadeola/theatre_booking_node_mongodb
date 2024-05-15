import { Pagination } from "@nextui-org/react"
import SwitchTab from "../../../components/others/SwitchTab"
import Search from "../../../components/others/Search"
import Title from "../../../components/others/Title"
import AllWallet from "./AllWallet"


const tabs = [
  {
    Key: "all", label: 'All'
  },
  {
    Key: "users", label: 'By User'
  },
]

const AdminWallet = () => {
  return (
    <div className="flex flex-col">
      <Title title={"All Wallets"}/>

      <div className="flex flex-col bg-stone-100 p-4 py-6  gap-4 rounded">
        <div className="flex gap-2 flex-wrap justify-between">
          <SwitchTab tabs={tabs}/> 
          <Search roundedSm={'sm'}/>
        </div>
        <AllWallet/>

        <Pagination showControls total={10} initialPage={1} className="mt-2" />
      </div>
    </div>
  )
}

export default AdminWallet
