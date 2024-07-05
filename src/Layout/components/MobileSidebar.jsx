import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { useRef } from "react";
import { Button } from "../../components/ui/button";


const MobileSidebar = () => {
    const closeRef  = useRef()


    const closeBar = ()=>{
        closeRef.current.click() 
    }

    return (     
        <Sheet>
                <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                    <Menu/>
                </SheetTrigger>

                <SheetContent side="left" className="p-0 bg-white">
                    <Sidebar closeBar={closeBar}/>
                </SheetContent>

                <div className=" hidden">
                    <SheetClose asChild ref={closeRef}>
                        <Button type="submit">close</Button>
                    </SheetClose>
                </div>

        </Sheet>
     );
}
 
export default MobileSidebar;