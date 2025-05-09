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
    
    const publicNavigation = [
        { name: 'Features', href: '/#features', current: false },
        { name: 'How It Works', href: '/#how-it-works', current: false },
        { name: 'Pricing', href: '/#pricing', current: false },
        { name: 'Testimonials', href: '/#testimonials', current: false },
    ]

    const privateNavigation = [
        { name: 'Dashboard', href: '/dashboard', current: false },
        { name: 'Settings', href: '/settings', current: false },
        { name: 'Wallet', href: '/wallet', current: false },
    ]
    
    const navigation = isAuthenticated ? privateNavigation : publicNavigation

    return (
        <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                <div className="flex items-center">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                        LianFlow
                    </span>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-gray-600 hover:text-indigo-600 transition"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:block">
                    {!isAuthenticated ? (
                        <div className="flex items-center space-x-4">
                            <Link href="/login" className="text-gray-600 hover:text-indigo-600 transition">
                                Sign in
                            </Link>
                            <Link
                                href="/signup"
                                className="inline-flex items-center rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 transition"
                            >
                                Get Started
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="text-gray-600 hover:text-indigo-600 transition"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg top-16">
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
                            <button
                                onClick={logout}
                                className="inline-flex items-center rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 transition"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-gray-600 hover:text-indigo-600 transition"
                    >
                        <span className="sr-only">Open main menu</span>
                        {!isMobileMenuOpen ? (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition"
                            >
                                {item.name}
                            </Link>
                        ))}
                        {!isAuthenticated ? (
                            <>
                                <Link href="/login" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition">
                                    Sign in
                                </Link>
                                <Link href="/signup" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition">
                                    Get Started
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={logout}
                                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition w-full text-left"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}

export default Navbar
