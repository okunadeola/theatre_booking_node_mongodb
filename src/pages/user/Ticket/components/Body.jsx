/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";


import MessageBox from "./MessageBox";

const data = [
  {
    sender : "Tailer",
    createdAt: "12-05-2024",
    body: "Hello",
    id: 1
  },
  {
    sender : "Tailer",
    createdAt: "12-05-2024",
    body: "Hello",
    id: 2
  },
  {
    sender : "User 1",
    createdAt: "12-05-2024",
    body: "Hi Admin",
    id: 3
  },
  {
    sender : "User 1",
    createdAt: "12-05-2024",
    body: "Hi Admin",
    id: 4
  },
  {
    sender : "User 1",
    createdAt: "12-05-2024",
    body: "Hi Admin",
    id: 5
  },
  {
    sender : "User 1",
    createdAt: "12-05-2024",
    body: "Hi Admin",
    id: 6
  },
  {
    sender : "Tailer",
    createdAt: "12-05-2024",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis facere architecto debitis corrupti aut atque placeat aliquid autem quo, at quae hic, eligendi incidunt soluta iure ad, dolor similique ullam.",
    id: 7
  },
]


const Body = ({ initialMessages  }) => {
  const bottomRef = useRef(null);
  const [messages, setMessages] = useState([]);



  




  useEffect(() => {
    setMessages([...initialMessages])
  }, [initialMessages]);


  useEffect(() => {
    bottomRef?.current?.scrollIntoView();
  }, []);

  return ( 
    <div className="flex-1 overflow-y-auto bg-white ">
      {messages?.map((message, i) => (
        <MessageBox 
          isLast={i === messages.length - 1} 
          key={message?.id} 
          data={message}

        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
}
 
export default Body;