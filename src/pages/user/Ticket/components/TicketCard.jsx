import { Avatar, Chip } from "@nextui-org/react"


const TicketCard = () => {
  return (
    <div className="flex flex-col bg-[#747779]  outline-gray-800 border-4 border-[#6a6f74] rounded-lg p-3 shadow-md shadow-[#3f4142]">
        <div className="flex flex-col gap-5">

                <div className="flex gap-2 items-center justify-between">
                    <div className="flex gap-2 items-center">
                        <Avatar size="sm"/>
                        <span className="text-sm font-medium">Dean Taylor</span>
                    </div>
                    <span className="text-gray-300 text-xs">
                        2 mins ago
                    </span>
                </div>

                <div>
                    <span className="text-gray-200 text-xs line-clamp-1">
                        Hi, I need help to process the payment via paystack
                    </span>
                </div>

                <div className="flex gap-3">
                    <Chip  color="warning" size="sm" >Pending</Chip>

                  

                    <div className="flex gap-1 items-center text-xs px-3 bg-red-400/10 rounded-full text-red-800 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-red-800"></div>
                        <span className=" tracking-wider">High</span>
                    </div>

                </div>

        </div>
    </div>
  )
}

export default TicketCard
