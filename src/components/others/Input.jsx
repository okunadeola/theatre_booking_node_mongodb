/* eslint-disable react/prop-types */
// import {Input} from 'antd'


const InputCustom = ({type, register, errors, id, required}) => {

  return (
    <div>
        <input
            type={type}
            id={id}
            name={id}
            autoComplete={id}
            className={`w-full rounded-lg  p-4 pe-12 text-sm ${
                errors[id]
                ? "focus:outline-none focus:ring-1  ring-1  focus:ring-red-500 border-red-500"
                : "border-slate-200 ring-1  focus:outline-none focus:ring-2"
            }`}
            {...register(id, { required: required })}
            

        />
            <span className='text-red-400'>{errors[id] && `${id} is required`}</span>
        
    </div>
  )
}

export default InputCustom
