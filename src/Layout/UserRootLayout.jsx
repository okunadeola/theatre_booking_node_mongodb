/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserSidebar from "./components/UserSidebar";
import "./style.css"

const UserRootLayout = () => {
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
    </>
  );
};

export default UserRootLayout;
