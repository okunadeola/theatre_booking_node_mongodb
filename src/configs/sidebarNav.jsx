import { CiHome } from "react-icons/ci";
import { IoReceiptOutline, IoWalletOutline } from "react-icons/io5";


import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";


//*** user background sidebar data ***//

const sidebarNav = [
    {
        link: '/user',
        section: 'user',
        icon: <CiHome size={27}/>,
        text: 'Home'
    },
    {
        link: '/user/reserve',
        section: 'reserve',
        icon: <IoReceiptOutline size={25}/>,
        text: 'Reserve'
    },
    {
        link: '/user/wallet',
        section: 'wallet',
        icon: <IoWalletOutline size={25} />,
        text: 'Wallet'
    },
    {
        link: '/user/ticket',
        section: 'ticket',
        icon: <HiOutlineChatBubbleLeftRight size={25} />,
        text: 'Ticket'
    },
    // {
    //     link: '/user/profile',
    //     section: 'profile',
    //     icon: <BiUser size={25} />,
    //     text: 'Profile'
    // }

]

export default sidebarNav