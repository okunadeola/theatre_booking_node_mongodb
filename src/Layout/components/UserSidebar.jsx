
import  { useEffect, useState } from 'react'
import '../style.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import sidebarNav from '../../configs/sidebarNav'
import { LogOut, X } from 'lucide-react'
import logo from '../../assets/images/tmovie.png';
import useCurrentUser from '../../hooks/useCurrentUser'
import {  MdOutlineAdminPanelSettings } from 'react-icons/md'

const UserSidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const location = useLocation()
    const {removeCurrentUser, userData} = useCurrentUser()
    const navigate = useNavigate()

    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1]
        const activeItem = sidebarNav.findIndex(item => item.section === curPath)

        setActiveIndex(curPath.length === 0 ? 0 : activeItem)
    }, [location])

    const closeSidebar = () => {
        document.querySelector('.main__content').style.transform = 'scale(1) translateX(0)'
        setTimeout(() => {
            document.body.classList.remove('sidebar-open')
            document.querySelector('.main__content').style = ''
        }, 500);
    }


    const logout = ()=>{
        removeCurrentUser()
        navigate('/user')
    }



    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                    <img src={logo} alt="" />
                <div className="sidebar-close" onClick={closeSidebar}>
                    <X className='text-5xl text-white i' />
                </div>
            </div>
            <div className="sidebar__menu">
                {
                    sidebarNav.map((nav, index) => (
                        <Link to={nav.link} key={`nav-${index}`} className={`sidebar__menu__item ${activeIndex === index && 'active'}`} onClick={closeSidebar}>
                            <div className="sidebar__menu__item__icon">
                                {nav.icon}
                            </div>
                            <div className="sidebar__menu__item__txt text-lg">
                                {nav.text}
                            </div>
                        </Link>
                    ))
                }
                {
                    userData?.data?.role === "ADMIN" ?
                    <Link to="/admin/"  className={`sidebar__menu__item ${activeIndex === 4 && 'active'}`} onClick={closeSidebar}>
                            <div className="sidebar__menu__item__icon">
                                <MdOutlineAdminPanelSettings size={30}/>
                            </div>
                            <div className="sidebar__menu__item__txt text-lg">
                                Go to Dashboard
                            </div>
                        </Link> : null
                    
                    
                }
          
                
                <div className="sidebar__menu__item" onClick={logout}>
                    <div className="sidebar__menu__item__icon">
                        <LogOut/>
                    </div>
                    <div className="sidebar__menu__item__txt text-lg">
                        Logout
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSidebar
