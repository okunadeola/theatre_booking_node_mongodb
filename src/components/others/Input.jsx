/* eslint-disable react/prop-types */
// import {Input} from 'antd'

import { Fragment } from "react"


const InputCustom = ({type, register, errors, id, required, placeholder,inputType}) => {

  return (


    <Fragment>
      {
        inputType === 'textarea' ?  (
          <div>
            <textarea name={id} id={id} cols="10" 
                rows="10"
                autoComplete={id}
              placeholder={placeholder}
              className={`w-full rounded-lg  p-4 pe-12 text-sm ${
                  errors[id]
                  ? "focus:outline-none focus:ring-1  ring-1  focus:ring-red-500 border-red-500"
                  : "border-slate-200 ring-1  focus:outline-none focus:ring-2"
              }`}
              {...register(id, { required: required })}
            ></textarea>
             <span className='text-red-400'>{errors[id] && `${id} is required`}</span>
          </div>
        ) : (
            <div>
                <input
                    type={type}
                    id={id}
                    name={id}
                    autoComplete={id}
                    placeholder={placeholder}
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

    </Fragment>
  )
}

export default InputCustom
