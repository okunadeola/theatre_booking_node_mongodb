/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import { TbBrandCinema4D } from "react-icons/tb";
import SidebarRoutes from "./SidebarRoutes";


const Sidebar = ({closeBar}) => {
    return ( 

        <div className="h-full border-r flex flex-col overflow-y-auto bg-white"> 
        {/* bg-side shadow-sm */}
            <div className="p-6">
                <div className="flex items-end gap-1">
                    <TbBrandCinema4D size={40} className=" animate-spin duration-1000"/> <span className="  font-bold animate-drip-expand">Cinemation</span>
                    {/* <img className="w-40" src="assets/images/sabi.png" alt="" /> */}
                </div>
                {/* <div>SabiLogo</div> */}
            </div>

           
            <div className='flex flex-col w-full'>
                <SidebarRoutes closeBar={closeBar}/>
            </div>

        </div>
     );
}
 
export default Sidebar;