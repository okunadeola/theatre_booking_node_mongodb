/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Avatar, Chip } from "@nextui-org/react"
import useCurrentUser from "../../../../hooks/useCurrentUser"
import { format } from "date-fns"


const TicketCard = ({value, onClick}) => {
    const {userData} = useCurrentUser()




    const click = ()=> {
        onClick()
    }

  return (
    <div className="flex flex-col bg-[#747779]  outline-gray-800 border-4 border-[#6a6f74] rounded-lg p-3 shadow-md shadow-[#3f4142] cursor-pointer"  onClick={click}>
        <div className="flex flex-col gap-5">

                <div className="flex gap-2 items-center justify-between">
                    <div className="flex gap-2 items-center">
                        <Avatar size="sm"/>
                        <span className="text-sm font-medium">{userData?.data?.user?.name}</span>
                    </div>
                    <span className="text-gray-300 text-xs">
                        {format(new Date(value?.createdAt), 'pa')}
                    </span>
                </div>

                <div>
                    <span className="text-gray-200 text-xs line-clamp-1">
                        {value?.message}
                    </span>
                </div>
                <div className="flex gap-3">
                      <Chip
                        color={
                          value?.status === "pending"
                            ? "warning"
                            : value?.status === "answered"
                            ? "success"
                            : value?.status === "closed"
                            ? "default"
                            : "secondary"
                        }
                        size="sm"
                        className="capitalize"
                      >
                        {value?.status}
                      </Chip>
                      <div
                        className={`flex gap-1 items-center text-xs px-3  rounded-full  shadow-sm
                      ${
                        value?.priority === "low"
                          ? "bg-gray-200/10 "
                          : value?.priority === "medium"
                          ? "bg-[#ffa70b]/30 text-black"
                          : value?.priority === "high"
                          ? "bg-red-50/10 text-red-600"
                          : "bg-red-50/10 text-red-600"
                      }
                      
                      `}
                      > 
                        <div
                          className={`w-2 h-2 rounded-full ${
                            value?.priority === "low"
                              ? "bg-gray-700"
                              : value?.priority === "medium"
                              ? "bg-white/50"
                              : value?.priority === "high"
                              ? "bg-red-700"
                              : "bg-gray-700"
                          } `}
                        ></div>
                        <span className=" tracking-wider capitalize">
                          {value?.priority}
                        </span>
                      </div>
                    </div>

              

        </div>
    </div>
  )
}

export default TicketCard
