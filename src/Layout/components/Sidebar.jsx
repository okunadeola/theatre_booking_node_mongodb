/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import { TbBrandCinema4D } from "react-icons/tb";
import SidebarRoutes from "./SidebarRoutes";

import './style.css'
import { Link } from "react-router-dom";

//*** admin  sidebar ***//
const Sidebar = ({closeBar}) => {
    return ( 
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white"> 
            <div className="p-6">
                <div className="flex items-end gap-1">
                {/* <Link to="#">Cinemation</Link> */}
                    <TbBrandCinema4D size={40} className=" animate-spin  duration-4000"/> <Link to="#"><span className="  font-bold animate-blink">Cinemation</span>
                    </Link> 
                </div>
            </div>
            <div className='flex flex-col w-full'>
                <SidebarRoutes closeBar={closeBar}/>
            </div>

        </div>
     );
}
 
export default Sidebar;