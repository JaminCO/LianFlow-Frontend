'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import logoC from "../../public/logo.png"

const Navbar = () => {
    const router = useRouter()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const { isAuthenticated, logout } = useAuth()
    const name = Cookies.get('buisness_name')
    
    // Define navigation based on auth status
    const publicNavigation = [
        { name: 'Home', href: '/', current: false },
        { name: 'Product', href: '/product', current: false },
        { name: 'Pricing', href: '/#pricing', current: false },
        { name: 'Contact', href: '/contact', current: false },
    ]

    const privateNavigation = [
        { name: 'Home', href: '/', current: false },
        { name: 'Dashboard', href: '/dashboard', current: false },
        { name: 'Settings', href: '/settings', current: false },
    ]
    
    const navigation = isAuthenticated ? privateNavigation : publicNavigation

    return (
        <nav className="bg-white shadow" suppressHydrationWarning>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        
                    </div>

                    {/* Desktop Navigation */}
                    <div className="flex flex-shrink-0 items-center">
                            <Image
                                src={logoC}
                                alt="Company Logo"
                                width={80}
                                height={80}
                                className="h-20 w-auto"
                                priority
                            />
                        </div>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                                    item.current
                                        ? 'border-indigo-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right side buttons */}
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {!isAuthenticated ? (
                            <>
                                <Link
                                    href="/login"
                                    className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    href="/signup"
                                    className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                                >
                                    Get Started
                                </Link>
                            </>
                        ) : (
                            <>
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center text-gray-500 px-3 py-2 text-sm font-medium"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                                        <button
                                            onClick={() => router.push('/wallet')}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Wallet
                                        </button>
                                        <button
                                            onClick={() => router.push('https://github.com/JaminCO/LianFlow-API/blob/main/Documentation.md')}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Docs
                                        </button>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={logout}
                                className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                            >
                                Logout
                            </button>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isMobileMenuOpen ? (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="sm:hidden">
                    <div className="space-y-1 pb-3 pt-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                                    item.current
                                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="border-t border-gray-200 pt-4">
                            {!isAuthenticated ? (
                                <>
                                    <Link
                                        href="/login"
                                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100"
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            ) : (
                                <>
                                <div className="relative">
                                    <button onClick={() => router.push('/wallet')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Wallet
                                    </button>
                                    <button onClick={() => router.push('https://github.com/JaminCO/LianFlow-API/blob/main/Documentation.md')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Docs
                                    </button>
                                </div>
                                <button
                                    onClick={logout}
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar