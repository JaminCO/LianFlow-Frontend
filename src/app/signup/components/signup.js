'use client'

import { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation'

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 6000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    password: '',
    confirmPassword: '',
    website: '',
    integrationType: '',
    monthlyVolume: '',
    businessType: '',
    country: '',
    terms: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Toast.fire({
        icon: "error",
        title: "Please enter a valid email address",
      });
      setIsLoading(false);
      return;
    }
    
    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      Toast.fire({
        icon: "error",
        title: "Passwords do not match",
      });
      return;
    }
  
    const signupData = {
      email: formData.email,
      business_name: formData.businessName,
      password: formData.password
    };

    axios.post(`${API_URL}/users/signup`, signupData).
      then((response) => {
        console.log(response);

        const { user_id } = response.data;
        console.log(user_id)

        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
        router.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.status);
        if (error.response.status === 450) {
          Toast.fire({
            icon: "error",
            title: "User with Email already exists!",
          });
          setIsLoading(false);
        } else {
          Toast.fire({
            icon: "error",
            title: "Failed to create account try again",
          });
          setIsLoading(false);
        }
      });
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return formData.businessName && formData.email && formData.password && formData.confirmPassword
      case 2:
        // return formData.website && formData.integrationType && formData.monthlyVolume
        return true
      case 3:
        // return formData.businessType && formData.country && formData.terms
        return true
      default:
        return false
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps && validateStep()) {
      setCurrentStep(prev => prev + 1)
    } else {
      const popup = document.createElement('div');
      popup.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 max-w-md w-full';
      popup.innerHTML = `
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-lg font-medium text-gray-900">Required Fields Missing</h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                Please complete all required fields marked with * before proceeding to the next step. Your information helps us provide you with the best service possible.
              </p>
            </div>
            <div class="mt-4">
              <button type="button" onclick="this.parentElement.parentElement.parentElement.parentElement.remove()" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500">
                Got it
              </button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(popup);
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Start Accepting Crypto Seamlessly.</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className={`text-sm ${currentStep >= 1 ? 'text-indigo-600 font-semibold' : 'text-gray-500'}`}>Business Info</span>
              <span className={`text-sm ${currentStep >= 2 ? 'text-indigo-600 font-semibold' : 'text-gray-500'}`}>Integration Details</span>
              <span className={`text-sm ${currentStep >= 3 ? 'text-indigo-600 font-semibold' : 'text-gray-500'}`}>Verification</span>
            </div>
            <div className="h-1 bg-gray-200 rounded">
              <div
                className="h-1 bg-indigo-600 rounded transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Step 1: Business Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Business Name *</label>
                  <input
                    type="text"
                    name="businessName"
                    id="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Business Email *</label>
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password *</label>
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
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password *</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Integration Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website URL *</label>
                  <input
                    type="url"
                    name="website"
                    id="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                  />
                </div>

                <div>
                  <label htmlFor="integrationType" className="block text-sm font-medium text-gray-700">Integration Type *</label>
                  <select
                    name="integrationType"
                    id="integrationType"
                    value={formData.integrationType}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                  >
                    <option value="">Select Integration Type</option>
                    <option value="api">Direct API Integration</option>
                    <option value="sdk">SDK Implementation</option>
                    <option value="plugin">Plugin/Widget</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="monthlyVolume" className="block text-sm font-medium text-gray-700">Expected Monthly Transaction Volume *</label>
                  <select
                    name="monthlyVolume"
                    id="monthlyVolume"
                    value={formData.monthlyVolume}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                  >
                    <option value="">Select Monthly Volume</option>
                    <option value="small">Less than $10,000</option>
                    <option value="medium">$10,000 - $100,000</option>
                    <option value="large">More than $100,000</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Verification */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">Business Type *</label>
                  <select
                    name="businessType"
                    id="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                  >
                    <option value="">Select Business Type</option>
                    <option value="corporation">Corporation</option>
                    <option value="llc">LLC</option>
                    <option value="partnership">Partnership</option>
                    <option value="soleProprietorship">Sole Proprietorship</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country of Operation *</label>
                  <select
                    name="country"
                    id="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black">
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="JP">Japan</option>
                    <option value="SG">Singapore</option>
                    <option value="HK">Hong Kong</option>
                    <option value="NZ">New Zealand</option>
                    <option value="CH">Switzerland</option>
                    <option value="SE">Sweden</option>
                    <option value="NO">Norway</option>
                    <option value="DK">Denmark</option>
                    <option value="NL">Netherlands</option>
                    <option value="IE">Ireland</option>
                    <option value="ES">Spain</option>
                    <option value="IT">Italy</option>
                    <option value="KR">South Korea</option>
                    <option value="AE">United Arab Emirates</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    checked={formData.terms}
                    onChange={handleInputChange}
                    required
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                    I agree to the <Link href="#" className="text-indigo-600 hover:text-indigo-500">Terms of Service</Link> and{' '}
                    <Link href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</Link> *
                  </label>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Previous
                </button>
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-auto bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Create Account
                </button>
              )}
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-indigo-600 hover:text-indigo-500">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};