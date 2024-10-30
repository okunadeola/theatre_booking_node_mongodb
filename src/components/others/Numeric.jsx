import { useState } from 'react';

const NumericInput = () => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = parseFloat(inputValue);
    
    // Check if the input value contains 'e' or is invalid
    if (!isNaN(numericValue) && !inputValue.includes('e')) {
      setValue(numericValue);
    } else if (inputValue === '' || inputValue === '-' || inputValue === '.') {
      // Handle cases where input might be empty, a single negative sign, or a single decimal point
    //   setValue(inputValue);
    } else {
      // If the input is invalid, you could reset the value or keep the current value
      setValue('');
    }
  };

//   const handleNumericChanger = ()=>{
//     <Input
//     type="number"
//     className="w-[60px]"
//     classNames={{ input: 'appearance-auto' }}
//     value={height}
//     onChange={(e) => setHeight(+e.target.value)} // the (+) means the String value be converted to   Number
//   />
//   }

  return (
    <input
      type="number"
      value={value}
      onChange={handleChange}
    />
  );
};

export default NumericInput;
