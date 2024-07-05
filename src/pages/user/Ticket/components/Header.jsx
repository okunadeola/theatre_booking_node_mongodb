/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { HiChevronLeft } from 'react-icons/hi'
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import { Avatar } from '@nextui-org/react';
import { Dropdown } from 'antd';
import useCurrentUser from '../../../../hooks/useCurrentUser';












const Header = ({ conversation , initialMessages, otherUser}) => {
  const {userData} = useCurrentUser()







const items = [
  {
    key: '1',
    label: (
      <a href='#'>
        Close Ticket
      </a>
    )
  }
]





  return (
  <>

    <div 
      className="
        bg-white 
        w-full 
        flex 
        border-b-[1px] 
        sm:px-4 
        py-3 
        px-4 
        lg:px-6 
        justify-between 
        items-center 
        shadow-sm
      "
    > 
      <div className="flex gap-3 items-center">
        <div
          className="
            lg:hidden 
            block 
            text-sky-500 
            hover:text-sky-600 
            transition 
            cursor-pointer
          "
        >
          <HiChevronLeft size={32} />
        </div>
        
          <Avatar user={'otherUser'} />
        
        <div className="flex flex-col justify-start">
          <div>{otherUser !==  null  ? otherUser :   userData?.data?.id === initialMessages?.userId ?   'Admin' : userData?.data?.name }</div>
          <div className="text-sm font-light text-neutral-500">
       
          </div>
        </div>
      </div>


    {
       userData?.data?.role === "ADMIN" &&
        <Dropdown menu={{items} }  >
        <HiEllipsisHorizontal
          size={32}
          className="
            text-sky-500
            cursor-pointer
            hover:text-sky-600
            transition
          "
        />
      </Dropdown>
    }



    </div>
    </>
  );
}
 
export default Header;
