/* eslint-disable react/prop-types */
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useEffect } from "react";
import useCurrentUser from "../hooks/useCurrentUser";



const RootLayout = () => {
    const { userData } = useCurrentUser();
    const navigate = useNavigate();


  useEffect(() => {
    const isAdmin = userData?.data.role === "ADMIN";
    if (!isAdmin) {
      navigate("/user");
    }
  }, [userData, navigate]);



    return ( 
        <div className="h-full">
            <div className="h-[70px] md:pl-56 fixed inset-y-0 w-full z-50">
                    <Navbar/>
            </div>



            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
                    <Sidebar closeBar={()=>{}}/>
            </div>


            {/* pages */}
            <main className="md:pl-56 h-full pt-[115px] mx-8">
                <div>  <Outlet/></div>
            </main>

        </div>
     );
}
 
export default RootLayout;