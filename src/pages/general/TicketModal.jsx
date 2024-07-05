/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { useState } from "react";
import { Drawer } from "antd";

import { Chip, Button, Checkbox } from "@nextui-org/react";
import Header from "../user/Ticket/components/Header";
import Body from "../user/Ticket/components/Body";
import Form from "../user/Ticket/components/Form";
import { IoClose } from "react-icons/io5";

import { createStyles } from "antd-style";
import { useEffect, useState } from "react";


// antd design style config
const useStyle = createStyles(({ token }) => ({
  "my-drawer-mask": {
    boxShadow: `inset 0 0 15px #000 `,
  },
}));

const TicketModal = ({ isOpen, onClose, data, isInitial, setInitial, otherUser }) => {
  const [messages, setMessages] = useState([]);
  const [initialMessage, setInitialMessage] = useState(null);


// antd design style config
  const { styles } = useStyle();
  const classNames = {
    mask: styles["my-drawer-mask"],
    colorSplit: "!bg-transparent !shadow-none !border-none",
  };
  const drawerStyles = {
    mask: {
      backdropFilter: "blur(10px) background(transparent)",
    },
  };
// antd design style config





  const setNewMessage = (msgObject) => {
    setMessages([...messages, msgObject]);
    setInitialMessage(msgObject);
    setInitial(false)
  };


  useEffect(() => {
      if(isOpen && data?.length !== 0){  

        setInitialMessage(data[0])

        const filterMessageData = [...data, ...data[0].replies]
        setMessages([...filterMessageData])
      }
  }, [isOpen, data])
  


const addMessage = (msg)=>{
    setMessages([...messages, msg])
}

  const closeTicket = () =>{
    setMessages([])
    setInitialMessage(null)
    onClose()
  }



  return (
    <>
      <Drawer
        placement="right"
        size={"large"}
        onClose={closeTicket}
        open={isOpen}
        title={"Support Ticket"}
        maskClosable={false}
        className={` ${
          data && "!bg-transparent !shadow-none w-full"
        } !bg-transparent !border-none !shadow-none `}
        classNames={classNames}
        styles={drawerStyles}
        closeIcon={
          <IoClose className="text-white/50 text-4xl hover:text-red-200" />
        }
      >
        <div className="flex flex-col gap-3 p-2 w-full h-full overflow-hidden bg-transparent border-none">
          {data ? (
            <div className=" w-full overflow-hidden">
              <div className="h-full flex flex-col w-full overflow-hidden rounded-xl">
                <div className="text-gray-500 bg-white p-3 text-md font-semibold px-7 border-b-[1px] flex flex-col gap-4 ">
                  <span>
                    {initialMessage?.title}
                    {/* I need help to process the payment via paystack */}
                  </span>
                  {initialMessage && (
                    <div className="flex gap-3">
                      <Chip
                        color={
                          initialMessage?.status === "pending"
                            ? "warning"
                            : initialMessage?.status === "answered"
                            ? "success"
                            : initialMessage?.status === "closed"
                            ? "default"
                            : "secondary"
                        }
                        size="sm"
                        className=" capitalize"
                      >
                        {initialMessage?.status}
                      </Chip>
                      <div
                        className={`flex gap-1 items-center text-xs px-3  rounded-full  shadow-sm
                      ${
                        initialMessage?.priority === "low"
                          ? "bg-gray-400/10 text-gray-600"
                          : initialMessage?.priority === "medium"
                          ? "bg-[#ffa70b] text-gray-900"
                          : initialMessage?.priority === "high"
                          ? "bg-red-400/10 text-red-600"
                          : "bg-red-400/10 text-red-600"
                      }
                      
                      `}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            initialMessage?.priority === "low"
                              ? "bg-gray-700"
                              : initialMessage?.priority === "medium"
                              ? "bg-white"
                              : initialMessage?.priority === "high"
                              ? "bg-red-700"
                              : "bg-gray-700"
                          } `}
                        ></div>
                        <span className=" tracking-wider capitalize font-normal">
                          {initialMessage?.priority}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                {
                  messages?.length !== 0 &&
                <Header initialMessages={messages} conversation={[]} otherUser={otherUser} />
                }
                
                <Body initialMessages={messages} otherUser={otherUser} />
                {
                  isInitial && <div className="bg-white flex items-center justify-center font-bold text-xl">Create A Ticket</div>
                }
                <Form setInitialMessage={setNewMessage} addMessage={addMessage}  isInitial={isInitial} initialMessage={initialMessage} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <input
                type="text"
                className=" border-b-2 border-dashed py-2  p-3 outline-none"
                placeholder="Add Title"
              />
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Add Description"
                className="border-2 border-dashed py-2 outline-none rounded-lg p-3"
              ></textarea>

              <div className="flex flex-col gap-2 py-4 ">
                <span className="text-md font-medium">Priority</span>
                <div className="flex   gap-10 flex-wrap">
                  <label className="flex gap-1">
                    <Checkbox name="priority" />
                    <div className="text-sm">Low</div>
                  </label>
                  <label className="flex gap-1">
                    <Checkbox name="priority" color="warning" />
                    <div className="text-sm">Medium</div>
                  </label>
                  <label className="flex gap-1">
                    <Checkbox name="priority" color="danger" />
                    <div className="text-sm">High</div>
                  </label>
                </div>
              </div>

              <Button className="font-medium">Create Ticket</Button>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default TicketModal;
