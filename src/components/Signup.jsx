import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className={`mx-auto w-full max-w-lg bg-white rounded-2xl p-12 shadow-xl border border-emerald-200/50 backdrop-blur-sm`}>
            <div className="mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[120px] transform hover:scale-105 transition-transform duration-300">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">Create your account</h2>
                <p className="mt-3 mb-8 text-center text-lg text-gray-600">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-semibold text-teal-600 hover:text-emerald-500 transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mb-8 text-center font-medium bg-red-50 py-3 px-4 rounded-lg">{error}</p>}                <form onSubmit={handleSubmit(create)} className="mt-2">
                    <div className='space-y-6'>
                        <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        className="focus:ring-2 focus:ring-indigo-500"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        className="focus:ring-2 focus:ring-indigo-500"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password"
                        type="password"
                        placeholder="Atleast 8 characters"
                        className="focus:ring-2 focus:ring-indigo-500"
                        {...register("password", {
                            required: true,})}
                        />
                        <Button 
                            type="submit" 
                            className="w-full"
                        >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default Signup