'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Swal from "sweetalert2"
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { motion } from 'framer-motion'
import { EyeIcon, EyeSlashIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export default function Login() {
  const router = useRouter()
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const { updateAuthState } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer
      toast.onmouseleave = Swal.resumeTimer
    },
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      Toast.fire({
        icon: "error",
        title: "Please enter a valid email address",
      })
      setIsLoading(false)
      return
    }

    const loginData = {
      email: formData.email,
      password: formData.password
    }

    try {
      const response = await axios.post(`${API_URL}/users/token`, loginData)
      const { access_token } = response.data
      
      updateAuthState(access_token)
      
      Toast.fire({
        icon: "success",
        title: "Logged in successfully",
      })
      
      router.push("/dashboard")
    } catch (error) {
      console.log(error)
      const errorMessage = error.response && error.response.status === 401
        ? error.response.data.detail
        : "An error occurred. Please try again."
      
      Toast.fire({
        icon: "error",
        title: errorMessage,
      })
      
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="text-center">
          <h2 className="text-3xl mt-10 font-extrabold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your LianFlow account
          </p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <EyeIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Sign in
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.86 16.79 15.68 17.57V20.12H19.04C21.09 18.21 22.56 15.49 22.56 12.25Z" fill="#4285F4" />
                  <path d="M12 23C14.97 23 17.46 22.02 19.04 20.12L15.68 17.57C14.71 18.21 13.49 18.58 12 18.58C9.19 18.58 6.8 16.64 5.95 14.04H2.47V16.67C4.04 20.3 7.7 23 12 23Z" fill="#34A853" />
                  <path d="M5.95 14.04C5.73 13.39 5.61 12.7 5.61 12C5.61 11.3 5.73 10.61 5.95 9.96V7.33H2.47C1.69 9.07 1.25 10.99 1.25 12C1.25 13.01 1.69 14.93 2.47 16.67L5.95 14.04Z" fill="#FBBC05" />
                  <path d="M12 5.42C13.62 5.42 15.06 5.97 16.21 7.07L19.16 4.12C17.45 2.52 14.97 1.5 12 1.5C7.7 1.5 4.04 4.2 2.47 7.83L5.95 10.46C6.8 7.86 9.19 5.42 12 5.42Z" fill="#EA4335" />
                </svg>
                Google
              </button>

              <button
                type="button"
                className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6725 1.93237H7.32752C4.27695 1.93237 1.80237 4.40695 1.80237 7.45752V16.8025C1.80237 19.8531 4.27695 22.3276 7.32752 22.3276H16.6725C19.7231 22.3276 22.1976 19.8531 22.1976 16.8025V7.45752C22.1976 4.40695 19.7231 1.93237 16.6725 1.93237Z" fill="url(#paint0_radial_5_9)" />
                  <path d="M16.6725 1.93237H7.32752C4.27695 1.93237 1.80237 4.40695 1.80237 7.45752V16.8025C1.80237 19.8531 4.27695 22.3276 7.32752 22.3276H16.6725C19.7231 22.3276 22.1976 19.8531 22.1976 16.8025V7.45752C22.1976 4.40695 19.7231 1.93237 16.6725 1.93237Z" fill="url(#paint1_radial_5_9)" />
                  <path d="M12.0003 6.12402C8.73215 6.12402 6.125 8.73117 6.125 12.0002C6.125 15.2693 8.73215 17.8765 12.0003 17.8765C15.2684 17.8765 17.8756 15.2693 17.8756 12.0002C17.8756 8.73117 15.2684 6.12402 12.0003 6.12402ZM12.0003 15.84C9.87246 15.84 8.16091 14.1294 8.16091 12.0002C8.16091 9.87294 9.87147 8.16139 12.0003 8.16139C14.1291 8.16139 15.8397 9.87294 15.8397 12.0002C15.8397 14.1294 14.1284 15.84 12.0003 15.84Z" fill="white" />
                  <path d="M17.8874 7.82184C18.593 7.82184 19.1656 7.24915 19.1656 6.54356C19.1656 5.83797 18.593 5.26529 17.8874 5.26529C17.1818 5.26529 16.6091 5.83797 16.6091 6.54356C16.6091 7.24915 17.1818 7.82184 17.8874 7.82184Z" fill="white" />
                  <defs>
                    <radialGradient id="paint0_radial_5_9" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(7.1139 22.3276) rotate(-90) scale(20.3953 18.9553)">
                      <stop stop-color="#FFDD55" />
                      <stop offset="0.1" stop-color="#FFDD55" />
                      <stop offset="0.5" stop-color="#FF543E" />
                      <stop offset="1" stop-color="#C837AB" />
                    </radialGradient>
                    <radialGradient id="paint1_radial_5_9" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-6.67398 2.71302) rotate(78.681) scale(9.1226 37.5871)">
                      <stop stop-color="#3771C8" />
                      <stop offset="0.128" stop-color="#3771C8" />
                      <stop offset="1" stop-color="#6600FF" stop-opacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
                Instagram
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
      
      <footer className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} LianFlow. All rights reserved.
        </p>
      </footer>
    </div>
  )
}