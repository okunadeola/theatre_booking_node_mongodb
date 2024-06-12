import { Avatar, Chip } from "@nextui-org/react"
import PropTypes from 'prop-types';
import { format } from "date-fns"
import { cn } from "../../../lib/utils";


const TicketCard = ({value, onClick}) => {


  return (
    <div className="flex flex-col bg-white outline-gray-50 border-1 cursor-pointer rounded-2xl p-5 shadow-[#dbdee0]" onClick={onClick}>
        <div className="flex flex-col gap-5">

                <div className="flex gap-2 items-center justify-between">
                    <div className="flex gap-2 items-center">
                        <Avatar size="sm"/>
                        <span className="text-sm font-medium">{value?.user?.username}</span>
                    </div>
                    <span className="text-gray-400/70 text-xs">
                    {format(new Date(value?.createdAt), 'pa')}
              
                    </span>
                </div>

                <div>
                    <span className="text-gray-500 text-sm line-clamp-1">
                            {value?.message}
                    </span>
                </div>

                <div className="flex gap-3">
                    <Chip   size="sm" className="capitalize" 
                    color={
                        value?.status === "pending"
                          ? "warning"
                          : value?.status === "answered"
                          ? "success"
                          : value?.status === "closed"
                          ? "default"
                          : "secondary"
                      }
                    >{value?.status}</Chip>

                  

                    <div className={cn("flex gap-1 items-center text-xs px-3 rounded-full  shadow-sm",
                     value?.priority === "low"
                     ? "bg-gray-200/90 "
                     : value?.priority === "medium"
                     ? "bg-blue-500/20 text-black"
                     : value?.priority === "high"
                     ? "bg-red-200/20 text-red-800"
                     : "bg-red-50/10 text-red-600"
                
                )}>
                        <div className={ cn("w-2 h-2 rounded-full", 
                         value?.priority === "low"
                         ? "bg-gray-700"
                         : value?.priority === "medium"
                         ? "bg-white/90"
                         : value?.priority === "high"
                         ? "bg-red-800"
                         : "bg-gray-700"
                    )}></div>
                        <span className=" tracking-wider"> {value?.priority}</span>
                    </div>

                </div>

        </div>
    </div>
  )
}


TicketCard.propTypes = {
   onClick: PropTypes.func,
   value: PropTypes.any
}
export default TicketCard