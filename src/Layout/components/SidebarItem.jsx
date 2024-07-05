/* eslint-disable react/prop-types */
import { cn } from "../../lib/utils";
import usePathname from "../../hooks/usePathname";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const SidebarItem = ({href, icon:Icon, label, closeBar}) => {
    
    const pathname = usePathname()
    const navigate = useNavigate()
    let isTablet = useMediaQuery({ query: "(max-width: 767px)" }); 

    // console.log(pathname, href)
    const isActive = (pathname ===  "/" && href === '/') || pathname === href || pathname?.startsWith(`${href}/`)


    const onClick = ()=>{
        navigate(href)
        isTablet && closeBar()
    }

    return ( 
        <button
            onClick={onClick}
            type="button"
            className={cn(
                "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-500 hover:bg-slate-500/20",
                isActive && " bg-slate-500/20"
            )

            }
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon size={22} className={cn(
                    "text-slate-400", isActive && ""
                )} />
                {label}
            </div>
            <div
              className={cn(
                "ml-auto opacity-0 border-2 border-gray-400 h-full   transition-all",
                isActive && "opacity-1"
              )}
            />
        </button>
     );
}
 
export default SidebarItem;