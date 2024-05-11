/* eslint-disable react/prop-types */
import { BarChart,  Layout, List, } from "lucide-react";
import SidebarItem from "./SidebarItem";
import usePathname from "../../hooks/usePathname";
import { TbBrandCinema4D } from "react-icons/tb";

const guestRoutes = [
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
]


const artisanRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/dashboard/artisan/"
    },
    {
        icon: List,
        label: "Works",
        href: "/artisan/work"
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/artisan/analytics"
    },
]





const SidebarRoutes = ({closeBar}) => {
    const pathname = usePathname()

    const isArtisanPage = pathname?.includes("/artisan")
    const routes = isArtisanPage ? artisanRoutes : guestRoutes;
    
    return ( 
        <div className="flex flex-col w-full">
            {
                routes.map((route)=>(
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