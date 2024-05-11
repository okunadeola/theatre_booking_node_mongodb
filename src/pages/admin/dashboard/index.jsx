import CardFour from "./components/CardFour"
import CardOne from "./components/CardOne"
import CardThree from "./components/CardThree"
import CardTwo from "./components/CardTwo"
// import ChartOne from "../components/ChartOne"
import ChartThree from "./components/ChartThree"
import ChartTwo from "./components/ChartTwo"
import { DataTableDemo } from "./components/Table"
import TableOne from "./components/TableOne"


const Dashboard = () => {





  return (
    <div className="flex flex-col gap-y-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
      </div>


      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-10 2xl:mt-7.5 2xl:gap-10">
        {/* <ChartOne /> */}
        <div className="col-span-12 xl:col-span-7">
        <ChartTwo />

        </div>
        <ChartThree />
        <div className="col-span-12 ">
          <TableOne />
        </div>
        {/* <ChatCard /> */}
      </div>



      <div>
        <DataTableDemo/>
      </div>
    </div>
  )
}

export default Dashboard
