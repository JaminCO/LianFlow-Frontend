'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Swal from "sweetalert2"
import Cookies from 'js-cookie'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link' // Import Link from next/link

export default function Login() {
  const router = useRouter()
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { updateAuthState } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end", 
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Toast.fire({
        icon: "error",
        title: "Please enter a valid email address",
      });
      return;
    }

    const loginData = {
      email: formData.email,
      password: formData.password
    };

    axios.post(`${API_URL}/users/token`, loginData)
      .then((response) => {
        const { access_token } = response.data;
        
        // Set cookie using js-cookie
        // Cookies.set('token', access_token, {
        //   expires: 7, // 7 days
        //   secure: process.env.NODE_ENV === 'production',
        //   sameSite: 'Strict',
        //   path: '/'
        // });

        updateAuthState(access_token);
        
        Toast.fire({
          icon: "success",
          title: "Logged in successfully",
        });
        router.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = error.response && error.response.status === 401
          ? "Invalid email or password"
          : "An error occurred. Please try again.";
        Toast.fire({
          icon: "error",
          title: errorMessage,
        });
      });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="text-sm text-gray-600 mt-2">
            Don't have an account?{' '}
            <Link href="/signup" className="text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
