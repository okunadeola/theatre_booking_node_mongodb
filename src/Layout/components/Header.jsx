

import { Link } from 'react-router-dom';

import './style.css';
import logo from '../../assets/images/tmovie.png';
import { useEffect, useRef } from 'react';
import Button from '../../components/others/Button';
import { LogIn, Search } from 'lucide-react';
import { HiMenuAlt2 } from "react-icons/hi";
import DropdownUser from './DropdownUser';
import useCurrentUser from '../../hooks/useCurrentUser';


// const headerNav = [
//     {
//         display: 'Home',
//         path: '/user/'
//     },
//     {
//         display: 'Movies',
//         path: '#'
//     },
//     {
//         display: 'TV Series',
//         path: '#'
//     }
// ];

const Header = () => {
    // const { pathname } = useLocation();
    // const active = headerNav.findIndex(e => e.path === pathname);
    const headerRef = useRef(null);
    const { userData } = useCurrentUser();













    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        }
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);





    const openSidebar = () => {
        document.body.classList.add('sidebar-open')
    }




    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap">
                <div className="logo">
                    <img src={logo} alt="" />
                    <Link to="/user" className='md:text-default text-[1.875rem] '>Cinemation</Link>
                </div>



                <div className='flex gap-6 items-center '>
                    <div className=' gap-2 border border-stone-700 rounded px-1 py-2 items-center mr-8 lg:flex hidden '>
                        <Search size={15} className='text-gray-400' />
                        <div className='h-5 w-[0.1rem] bg-gray-400'></div>
                        <input type="text" placeholder='Search' className=' w-40 bg-transparent outline-none placeholder:text-xs placeholder:text-stone-500 text-xs text-stone-500 ' />
                    </div>
                    {/* <ul className="header__nav lg:flex hidden ">
                        {
                            headerNav.map((e, i) => (
                                <li key={i} className={`${i === active ? 'active' : ''}`}>
                                    <Link to={e.path}>
                                        {e.display}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul> */}


                    {
                        userData?.data ? 
                        <div className='sm:flex hidden'>
                            <DropdownUser user={userData?.data}/> 

                        </div>
                        : 
                        <Button className='items-center gap-2 px-4 py-1 bg-[#77b940] shadow-[0px_0px_7px_5px_#3d3f3c] hover:shadow-[0px_0px_7px_8px_#3d3f3c] sm:flex hidden '>
                            {/* //474a44   4f5649 */}
                            <LogIn size={20} />
                            <span className='text-sm'>SIGN IN</span>
                        </Button>

                    }

                    <div className="sidebar-toggle" onClick={openSidebar}>
                        <HiMenuAlt2 className='text-5xl text-white' />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Header;
