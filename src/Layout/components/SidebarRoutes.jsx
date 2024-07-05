/* eslint-disable react/prop-types */
import { Layout } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { TbBrandCinema4D } from "react-icons/tb";
import { GiCarSeat } from "react-icons/gi";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { FaUsersGear } from "react-icons/fa6";

const adminRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/admin/"
    },
    {
        icon: TbBrandCinema4D,
        label: "Movies",
        href: "/admin/movies"
    },
    {
        icon: FaUsersGear,
        label: "User",
        href: "/admin/user"
    },
    {
        icon: GiCarSeat,
        label: "Booking",
        href: "/admin/booking"
    },
    {
        icon: HiOutlineChatBubbleLeftRight,
        label: "Ticket",
        href: "/admin/ticket"
    },
]



const SidebarRoutes = ({closeBar}) => {
    
    return ( 
        <div className="flex flex-col w-full">
            {
                adminRoutes.map((route)=>(
                    <SidebarItem
                        key={route.href}
                        href={route.href}
                        icon={route.icon}
                        label={route.label}
                        closeBar={closeBar}
                        
                    />
                ))
            }
        </div>
     );
}
 
export default SidebarRoutes;