import React, { useState } from 'react'
import Logo from '../Logo'
import { useNavigate } from 'react-router-dom'
import { adminLogin } from '../../sevices/adminApis'
import { toast } from 'react-toastify'

function LoginComponent({ role }) {
    const [values, setValues] = useState({ email: '', password: '' })
    const navigate = useNavigate()

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const onlogin = () => {
        const { email, password } = values
        if (!email || !password) {
            return toast.error("All fields are required")
        }
        adminLogin(values).then((res) => {
            toast.success(res.data.message)
            navigate("/admin")

        }).catch((err) => {
            toast.error(err.response.data.message)

        })

    }
    return (
        <div className='h-screen flex items-center w-full'>

            <div className="w-1/2 bg-[#FFF2AE] h-full hidden md:flex  items-center justify-center">
                <img src="/images/Logo.svg" alt="logimage" className='w-48' />
            </div>
            <div className="w-full md:w-1/2 flex justify-center p-3 md:p-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Welcome Back!
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input required type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" onChange={onChange} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input required type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={onChange} />
                            </div>
                            <div className="flex items-center justify-center">
                                <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>

                            <button type="button" class="text-white w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={onlogin}>Login</button>
                        </form>
                    </div>
                </div></div>

        </div>

    )
}

export default LoginComponent
