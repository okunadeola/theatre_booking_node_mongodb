/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserSidebar from "./components/UserSidebar";
import "./style.css";
import VoiceCommand from "../pages/general/ai/VoiceCommand";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserRootLayout = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const navigate = useNavigate()

  const handleCommand = (command) => {
    console.log(command, '...');

    if (command.includes("scroll down")) {
      window.scrollBy(0, window.innerHeight);
    } else if (command.includes("scroll up")) {
      window.scrollBy(0, -window.innerHeight);
    } else if (clickOption(command) && command.includes("book")) {
      Booking();
    } else if (clickOption(command) && command.includes("trailer")) {
      WatchTrailer();
    } else if (command.includes('close') || command.includes("cancel")) {
      CloseTrailer();
    } else if (navigateOption(command)) {
      Navigate(command);
    } else if ( command.includes("go back") ||  command.includes("back")) {
        navigate(-1)
    } else if (command.includes("search for")) {
      const query = command.replace("search for", "").trim();
      // Logic to filter movies based on query
    }
  };


  const clickOption = (command)=>{
    if(command.includes("click") || command.includes("open") || command.includes("press")  || command.includes("tap")){
        return true
    }else{
      return false
    }
  
  }

  const navigateOption = (command)=>{
    if(command.includes("go to") || command.includes("move") || command.includes("open") || command.includes("navigate") || command.includes("jump")){
        return true
    }else{
      return false
    }
  
  }

  const Booking = () => {
    document.querySelector("#home_booking_btn")?.click();
  };

  const Navigate = (command) => {
    console.log(command?.slice())

    if(command?.toLocaleLowerCase().includes("wallet")){
        return  navigate("/user/wallet")
    }else if (command?.toLocaleLowerCase().includes("home")){
        return  navigate("/user")
    }else if (command?.toLocaleLowerCase().includes("ticket")){
        return  navigate("/user/ticket")
    }else if (command?.toLocaleLowerCase().includes("reserve")){
        return   navigate("/user/reserve")
    }else {
      toast.error('Page does not exist')
    }

  };

  const WatchTrailer = () => {
    window.document.querySelector("#home_trailer_btn")?.click();
  };

  const CloseTrailer = () => {
    window.document.querySelector("#modal__content")?.parentNode.classList.remove('active');
    window.document.querySelector("#trailer_frame")?.setAttribute('src', '');
  };




















  return (
    <>
      <UserSidebar />

      <div className="main">
        <div className="main__content">
          <div className="h-full bg-[#0e1012]">
            <Header />
            <main className="h-full">
              <div>
                <Outlet />
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </div>

      <VoiceCommand onCommand={handleCommand} />
    </>
  );
};

export default UserRootLayout;
