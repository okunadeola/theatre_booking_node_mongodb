/* eslint-disable no-unused-vars */

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, cn} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BounceLoader, PuffLoader, RingLoader } from "react-spinners";
import Camera from "./components/Camera";
import toast from "react-hot-toast";
import { claimBookingAction } from "../../../API/booking";
import QrScanner from "qr-scanner";

export default function ClaimModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [takePicture, setTakePicture] = useState(false);
  const [file, setFile] = useState(null);
  const [messgae, setMessgae] = useState({type: null, data: null});







  const getCapture =(captured)=>{
    console.log({file:captured?.capturedImageBlob});
    setFile(captured?.capturedImageBlob)
    setTimeout(() => {
        readQRCode(captured?.capturedImageBlob)
    }, 5000);
 }


  const close = () => {
  setTakePicture(false)
  setFile(null)
  setMessgae({type: null, data: null})
  };


  const claim = async (code)=>{
    try {
        if(!code){
            setFile(null)
            return
        } 
        const res = await claimBookingAction(code)
        if(res && res.success){
            toast.success('successfully claim booking')
            setMessgae({type: 'success', data: `Booking Claimed Successfully!`})
            setFile(null)
        }else{
            setFile(null)
            if(res && res.success === false){
                setMessgae({type: 'error', data: `Error claiming booking:  ${res?.data?.toString()}`})
            }
        }
    } catch (error) {
        setFile(null)
        setMessgae({type: 'error', data: `Error claiming booking: ${error?.toString()}`})
    }
  }


  useEffect(() => {
    return ()=>{
      setTakePicture(false)
      setFile(null)
      setMessgae({type: null, data: null})
    }
  }, []);


  const readQRCode = async (fileUrl) => {
    try {
      const imageUrl = URL.createObjectURL(fileUrl);
      const result = await QrScanner.scanImage(imageUrl, {returnDetailedScanResult: true});
      claim(result?.data)
      URL.revokeObjectURL(imageUrl); // Clean up the object URL
    } catch (error) {
      console.error('Error reading QR code:', error);
      setMessgae({type: 'error', data: `Error reading QR code:${error?.toString()}`})
      setFile(null)
    }
  };


const capture = ()=>{
    setTakePicture(true)
    setMessgae({type: null, data: null})
}

  return (
    <>
      <Button onPress={onOpen}>Claim Booking</Button>
      <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Claim</ModalHeader>
              <ModalBody>
                <div className="flex justify-between gap-2 mb-2">
                    <p> 
                        Display your booking ticket for capturing...
                    </p>

                    {
                        !takePicture &&
                    <Button onClick={capture}>Capture</Button>
                    }

                </div>
                <div className=" h-[20.5rem] relative">
                    <div className="h-full flex flex-col items-center justify-center">
                        {
                            takePicture ? 

                            <div className="relative h-full">
                                 <Camera  onSubmit={getCapture} showWebcam={takePicture} onClose={close} />


                                {
                                    file &&
                                <div className="absolute flex items-center justify-center top-2 right-0 bottom-[4rem] z-30 bg-[#ccc]/50 w-full">
                                    <BounceLoader 
                                        color={'#ddd'} 
                                        size={100}
                                        aria-label="Loading Spinner"
                                        data-testid="loader" 
                                    />
                                </div>
                                }
                            </div>
                            :
                            <PuffLoader 

                                color={'#2563eb'} 
                                size={150}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        }
                        {
                            messgae?.data && 
                             <p className={cn("mt-6", {'text-red-500': messgae?.type === 'error', 'text-green-500': messgae?.type === 'success'  })}>{messgae?.data}</p>
                        }
                    </div>
                </div>
              </ModalBody>
              <ModalFooter>
            
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      
    </>
  )
}