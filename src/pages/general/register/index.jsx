import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import toast from 'react-hot-toast'
import {  registerAction } from "../../../API/user";
import { FaEye, FaEyeSlash } from "react-icons/fa6";




const Register = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const { 
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();



    const submit = async (data)=>{
      setLoading(true)
          try {
              const res = await registerAction(data)
              if(res){
                  reset()
                  toast.success('user register successfully. proceed to login', {duration: 5000})
                  navigate('/login')
              }
          } catch (error) {
            
              toast.error(error?.toString())
          } 

    }

















    return (
      <section className="relative flex flex-wrap lg:h-screen lg:items-center">

        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>


        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>
  
            <p className="mt-4 text-gray-500">
              Start by registering with us 
            </p>
          </div>
  
          <form onSubmit={handleSubmit(submit)} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            <div>
              <label htmlFor="name" className="">
                Name
              </label>
  
              <div className="relative">
                <input
                  type="text"
                  className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm ${
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
                placeholder="Enter phone number"
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
              <p className="text-sm text-gray-500">
               Already have an account?
                <Link className="underline" to="/login">
                 {' '}  Sign in
                </Link>
              </p>
  
              <button
                type="submit"
                disabled={loading}
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white disabled:cursor-not-allowed"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
  
       
      </section>
    );
  };
  
  export default Register;
  