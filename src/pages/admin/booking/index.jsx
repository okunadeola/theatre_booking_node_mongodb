import { Pagination } from "@nextui-org/react"
import AllBooking from "./AllBooking"

import Search from "../../../components/others/Search"
import Title from "../../../components/others/Title"
import SwitchTab from "../../../components/others/SwitchTab"


const tabs = [
  {
    Key: "all", label: 'All'
  },
  {
    Key: "movies", label: 'By Movies'
  },
  {
    Key: "users", label: 'By User'
  },
]

const AdminBooking = () => {
  return (
    <div className="flex flex-col">
      <Title title={'All Booking'}/>

      <div className="flex flex-col bg-stone-100 p-4 py-6  gap-4 rounded">
        <div className="flex gap-2 flex-wrap justify-between">
          <SwitchTab tabs={tabs}/> 
          <Search/>
        </div>
        <AllBooking/>

        <Pagination showControls total={10} initialPage={1} className="mt-2" />
      </div>
    </div>
  )
}

export default AdminBooking
