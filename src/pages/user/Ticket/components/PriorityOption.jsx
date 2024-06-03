/* eslint-disable react/prop-types */
import React from "react";
import {Checkbox} from "@nextui-org/react";

const PriorityOption = ({method}) => {
    const [selectedOption, setSelectedOption] = React.useState('low');

    // 'low', 'medium', 'high'

    const OnOptionChange = (choice)=>{
        setSelectedOption(choice)
        method(choice)
    }

  return (
    <div className="flex flex-col gap-2">
        <div className="text-gray-700">Priority</div>
        <div className="flex gap-3">

            <Checkbox  isSelected={selectedOption === 'low'} onValueChange={()=>OnOptionChange('low')} color="default"  value="low">Low</Checkbox>

            <Checkbox isSelected={selectedOption === 'medium'} onValueChange={()=>OnOptionChange('medium')} color="warning"  value="medium">Medium</Checkbox>

            <Checkbox isSelected={selectedOption === 'high'} onValueChange={()=>OnOptionChange('high')} color="danger"  value="high">High</Checkbox>
            
        </div>
    </div>
  )
}

export default PriorityOption