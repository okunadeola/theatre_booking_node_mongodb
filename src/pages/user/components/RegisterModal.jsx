
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast'
import {  registerAction } from "../../../API/user";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import PropTypes from 'prop-types';

const RegisterModal = ({switchAuthPage}) => {
const [isShowPassword, setIsShowPassword] = useState(false)


    const { 
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();



      const submit = async (data)=>{
            try {
              const res = await registerAction(data)
                if(res){
                    switchAuthPage()
                    reset()
                }
            } catch (error) {
                toast.error(error?.toString())
            }

      }


  return (
    <section className='relative flex flex-wrap  lg:items-center h-fit'>
      <div className='w-full  px-4 py-12 sm:px-6  lg:px-8'>
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>
        </div>

        <form onSubmit={handleSubmit(submit)} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <div>
            <label htmlFor="name" className="text-gray-900">
              Name
            </label>

            <div className="relative">
              <input
                type="text"
                className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm  ${
                    errors?.name
                      ? "focus:outline-none focus:ring-1  focus:ring-red-500 border-red-500"
                      : "border-slate-200 focus:outline-none focus:ring-2"
                  }`}
                placeholder="Enter fullname"
                {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
              />
            </div>
          </div>
          <div>
            <label htmlFor="username" className="text-gray-900">
              Username
            </label>

            <div className="relative">
              <input
                type="text"
                className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm ${
                    errors?.username
                      ? "focus:outline-none focus:ring-1  focus:ring-red-500 border-red-500"
                      : "border-slate-200 focus:outline-none focus:ring-2"
                  }`}
                placeholder="Enter username"
                {...register("username", {
                    required: {
                      value: true,
                      message: "Username is required",
                    },
                  })}
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="text-gray-900">
              Phone Number
            </label>

            <div className="relative">
              <input
                type="text"
                className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm ${
                    errors?.phone
                      ? "focus:outline-none focus:ring-1  focus:ring-red-500 border-red-500"
                      : "border-slate-200 focus:outline-none focus:ring-2"
                  }`}
                placeholder="Enter username"
                {...register("phone", {
                    required: {
                      value: true,
                      message: "phone is required",
                    },
                  })}
              />
            </div>
          </div>





          <div>
            <label htmlFor="email" className="text-gray-900">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm  ${
                    errors?.email
                      ? "focus:outline-none focus:ring-1  focus:ring-red-500 border-red-500"
                      : "border-slate-200 focus:outline-none focus:ring-2"
                  }`}
                placeholder="Enter email"
                {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                  })}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password"  className="text-gray-900">
              Password
            </label>

            <div className="relative">
              <input
                 {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                  })}
                type={ isShowPassword ?  "text" : "password"}
                className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm ${
                    errors?.password
                      ? "focus:outline-none focus:ring-1  focus:ring-red-500 border-red-500"
                      : "border-slate-200 focus:outline-none focus:ring-2"
                  }`}
                placeholder="Enter password"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4" onClick={()=>setIsShowPassword(!isShowPassword)}>
                {
                    isShowPassword ?
                    <FaEyeSlash className="text-gray-500"/> : 
                <FaEye className="text-gray-500"/>
                }
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-900">
              Already have an account? 
                  <span className="underline hover:text-blue-300 cursor-pointer" onClick={switchAuthPage}>{' '} Sign In</span>
            </p>  

            <button
              type="submit"
              className='inline-block rounded-lg  px-5 py-3 text-sm font-medium text-white bg-slate-900'
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

RegisterModal.propTypes =  {
  switchAuthPage: PropTypes.func
}

export default RegisterModal;
