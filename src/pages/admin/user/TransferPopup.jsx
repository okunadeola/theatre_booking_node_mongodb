/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


import  { useState } from 'react';
import {Drawer, Input, Space } from 'antd';
import { Button } from '@nextui-org/react';
import CancelModal from './component/CancelWarningModal';
import toast from 'react-hot-toast';
import { useTransferFundMutation } from '../../../API/queryTransferApis';


const TransferPopup = ({user}) => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('');
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const {mutateAsync: transfer, isPending, error} = useTransferFundMutation() //react-query method of calling POST (mutate) related api

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


const onSend = ()=>{
    setOpenWarningModal(true)
}



const handleSend = async  ()=>{
    setOpenWarningModal(false)

    try {
      const json = {
        userId: user?._id,
        amount: amount,
        isInflow: true,
        note: note,
        paymentMethod: 'transfer',
        currency: "NGN",
        status: "successful",
      }

      const res = await transfer(json)
        if(res){
          toast.success('Fund successfully transfer to user account!')
          setOpen(false)
          setAmount('')
          setNote('')
        }
    } catch (error) {
        console.log(error)
    }
}


  return (
    <>
      <Space>
        <Button className="text-tiny text-black/80 bg-black/20" variant="flat" color="default" radius="lg" size="sm"  onClick={showDrawer}>
         Cash
        </Button>
      </Space>
      <Drawer
        placement="right"
        size="small"
        onClose={onClose}
        open={open}
        className='!z-[30]'
        style={{zIndex: '50'}}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
          <div className='flex flex-col gap-3 justify-end w-full'>
              <div className='uppercase font-bold'>Transfer Money</div>
              <div>Transfer money to {user?.username} wallet balance</div>
            <Input type="number" placeholder='transfer amount'  value={amount} onChange={(e)=>setAmount(e.target.value)}  />
            <Input placeholder='transfer note'  value={note} onChange={(e)=>setNote(e.target.value)}/>
            <Button className='ml-auto'  onClick={onSend}>Send</Button>
          </div>
      </Drawer>

      <CancelModal  onClose={()=>setOpenWarningModal(false)} onOk={handleSend}  isOpen={openWarningModal}/>
    </>
  );
};

export default TransferPopup;