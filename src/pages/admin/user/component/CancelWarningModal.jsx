/* eslint-disable react/prop-types */


import Modal from './popup-modal';
import { Button } from 'antd';




const CancelModal = ({ 
  isOpen, 
  onClose, 
  onOk
}) => {




const onYes = ()=>{
    onOk()
}




  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='flex flex-col' >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 
              className="
                text-base 
                font-semibold 
                leading-7 
                text-gray-900
              "
              >
                Transfer Warning
              </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Are you sure, you want to transfer fund to user?
            </p>
            
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button onClick={onClose} className='bg-red-500'  type='button'  >Cancel</Button>
          <Button
            onClick={onYes} 
            color='primary'
          >
            Send
          </Button>

                   
        </div>
      </div>
    </Modal>
  )
}

export default CancelModal;
