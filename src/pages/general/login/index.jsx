import useCurrentUser from "../../../hooks/useCurrentUser";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast'
import { loginAction } from "../../../API/user";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const Login = ({fromModal, switchAuthPage, action}) => {
    const {setCurrentUser} = useCurrentUser()
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
                const res = await loginAction(data)
                if(res){
                    setCurrentUser(res)

                    if(!fromModal){
                      res.data.role === "ADMIN" ?
                      navigate('/admin/') :  navigate('/user')
                    }else{
                      action()

                    }

                    reset()

                }
            } catch (error) {
                toast.error(error?.toString())
            }finally {
              setLoading(false)
            }

      }


  return (
    <section className={`relative flex flex-wrap  lg:items-center ${fromModal ? 'h-fit' : 'lg:h-screen'}`}>
      <div className={`${fromModal ? 'w-full' : 'w-full lg:w-1/2 lg:px-8 sm:py-16 lg:py-24 ' }  px-4 py-12 sm:px-6  lg:px-8`}>
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

          <p className={`mt-4 text-gray-500 ${fromModal ? 'text-gray-900' : 'text-gray-500'}`}>
            Login into your amazing cinamation
          </p>
        </div>

        <form onSubmit={handleSubmit(submit)} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm ${fromModal && '!bg-slate-500'} ${
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
            <label htmlFor="password" className="sr-only">
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
            <p className={`"text-sm ${fromModal ? 'text-gray-900' : 'text-gray-500'}`}>
              No account? 

              {
                fromModal ? 

                  <span className="underline hover:text-blue-300 cursor-pointer" onClick={switchAuthPage}>{' '} Sign up</span>
                :  
                <Link className="underline" to={'/register'}>
                {' '} Sign up
                </Link> 
              }
            </p>  

            <button
              type="submit"
              disabled={loading}
              className={`inline-block rounded-lg  bg-blue-500 px-5 py-3 text-sm font-medium text-white ${fromModal   ?  'bg-slate-900 ' : 'bg-blue-500'}`}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      <div className={`relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2 ${fromModal && 'hidden'}`}>
        <img
          alt=""
          src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

Login.propTypes =  {
  fromModal : PropTypes.bool,
  switchAuthPage: PropTypes.func,
  action: PropTypes.func
}

export default Login;