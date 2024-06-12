/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */


import { 
  HiPaperAirplane, 
} from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { 
  useForm 
} from "react-hook-form";
import { createTicketAction, replyTicketAction } from "../../../../API/ticket";
import { useEffect, useState } from "react";
import PriorityOption from "./PriorityOption";
import { Button } from "@nextui-org/react";
import { Input } from "antd";
import { showSuccess } from "../../../../utils";




const { TextArea } = Input;



const Form = ({
  setInitialMessage,
  isInitial,
  initialMessage,
  addMessage
}) => {
// const [initial, setInitial] = useState(isInitial)

const [priority, setPriority] = useState('low')
const [message, setMessage] = useState('')
const [title, setTitle] = useState('')


// 'low', 'medium', 'high'
// 'pending', 'answered', 'closed', 'deleted'



  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
    }
  } = useForm({
    defaultValues: {
      message: '',  
    }
  });

  const onSubmit =  async  (data) => {
    setValue('message', '', { shouldValidate: true });

    try {
        const json = {
          message: data?.message,
          ticketId: initialMessage?.id,
        }
        const res = await replyTicketAction(json)
        if(res){
          addMessage(res)
        }
    } catch (error) {
      console.log(error)
    }
  }


  const onInitial = async (e)=>{
    e.preventDefault()

    const json = {
      message: message,
      priority: priority,
      title: title
    }
      const res = await createTicketAction(json) 
    if(res){
      showSuccess('Ticket created Successfully')
      setInitialMessage(res)
    }

  }


  


  return ( 
    <div 
      className="
        py-4 
        px-4 
        bg-white 
        border-t 
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-full
      "
    > 

    {
      isInitial  ?
        <form 
          onSubmit={onInitial} 
          className="flex flex-col items-start  gap-2 lg:gap-4 px-4 w-full"
        >

          <TextArea  placeholder="Title" onChange={(e)=>setTitle(e.target.value)}  />

          <TextArea  placeholder="Message"  onChange={(e)=>setMessage(e.target.value)}   />

          <PriorityOption method={setPriority}/>     

          <Button 
            type="submit"
            className="
              rounded-full  
              bg-sky-500 
              cursor-pointer 
              hover:bg-sky-600 
              transition
              text-white 
              mt-3 ml-auto
            "
          >
            <span className="font-semibold">CREATE</span>
            <HiPaperAirplane
              size={18}
              className="text-white"
            />
          </Button>


        </form>  : 
            <form 
              onSubmit={handleSubmit(onSubmit)} 
              className="flex items-center gap-2 lg:gap-4 w-full"
            >
              <MessageInput 
                id="message" 
                register={register} 
                errors={errors} 
                required 
                placeholder="Write a message"
              />
          
              <button 
                type="submit" 
                className="
                  rounded-full 
                  p-2 
                  bg-sky-500 
                  cursor-pointer 
                  hover:bg-sky-600 
                  transition
                "
              >
                <HiPaperAirplane
                  size={18}
                  className="text-white"
                />
              </button>
            </form>
    }



    </div>
  );
}
 
export default Form;