
import { Button } from "../../components/ui/button";
import usePathname from "../../hooks/usePathname";
import { Users, User } from "lucide-react";
import { Link } from "react-router-dom";
import DropdownUser from "./DropdownUser";


//*** admin  user page switcher ***//
const NavbarRoutes = () => {
    const pathname = usePathname()

    const isUserPage = pathname?.includes("/user")

    return ( 
        <div className="flex gap-x-2 ml-auto  ">
            <DropdownUser/>
            {
                isUserPage  ? (
                    <Link  to="/admin/">
                        <Button size="sm" variant="ghost">
                            <User className="h-4 w-4 mr-2"/> Admin Mode
                        </Button>
                    
                    </Link>
                ) :
                    <Link  to="/user/">
                        <Button size="sm" variant="ghost">
                        <Users className="h-4 w-4 mr-2"/>
                         User Mode
                        </Button>
                    
                    </Link>
            }
        </div>
     );
}
 
export default NavbarRoutes;