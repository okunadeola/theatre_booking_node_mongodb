import { Avatar, Chip } from "@nextui-org/react"
import PropTypes from 'prop-types';


const TicketCard = ({onClick}) => {
  return (
    <div className="flex flex-col bg-white outline-gray-50 border-1 cursor-pointer rounded-2xl p-5 shadow-[#dbdee0]" onClick={onClick}>
        <div className="flex flex-col gap-5">

                <div className="flex gap-2 items-center justify-between">
                    <div className="flex gap-2 items-center">
                        <Avatar size="sm"/>
                        <span className="text-sm font-medium">Dean Taylor</span>
                    </div>
                    <span className="text-gray-400/70 text-xs">
                        2 mins ago
                    </span>
                </div>

                <div>
                    <span className="text-gray-500 text-xs line-clamp-1">
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


TicketCard.propTypes = {
   onClick: PropTypes.func
}
export default TicketCard