/* eslint-disable react/prop-types */


import { Avatar } from "@nextui-org/react";
import clsx from "clsx";
import { format } from "date-fns";



const MessageBox = ({ data }) => {




  const isOwn = data?.sender === 'Tailer'

  const tooMany  = data.body.length > 50
  const container = clsx('flex gap-3 p-4 px-7', isOwn && 'justify-end');
  const avatar = clsx(isOwn && 'order-2');
  const body = clsx('flex flex-col gap-2', isOwn && 'items-end');
  const message = clsx(
    'text-sm overflow-hidden', 
    isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100', 
    'py-2 px-3',
    tooMany ? 'w-[80%] rounded-2xl' : 'w-fit rounded-full'
  );

  return ( 
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">
            {data.sender}
          </div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>
        <div className={message}>
            <div>{data.body}</div>
        </div>
      </div>
    </div>
   );
}
 
export default MessageBox;

