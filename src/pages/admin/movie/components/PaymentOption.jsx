/* eslint-disable react/prop-types */
import React from "react";
import {Checkbox} from "@nextui-org/react";

const PaymentOption = ({method}) => {
    const [selected, setSelected] = React.useState(true);



    const OnPaymentChange = (choice)=>{
        setSelected(choice)
        method(choice)
    }

  return (
    <div className="flex flex-col gap-2">
    <div className="text-gray-700">Payment Method</div>
    <div className="flex gap-3">
        <Checkbox  isSelected={selected} onValueChange={()=>OnPaymentChange(true)} color="default"  value="Wallet">Wallet</Checkbox>
        <Checkbox isSelected={!selected} onValueChange={()=>OnPaymentChange(false)} color="warning"  value="Bank">Bank</Checkbox>
    </div>
    </div>
  )
}

export default PaymentOption

