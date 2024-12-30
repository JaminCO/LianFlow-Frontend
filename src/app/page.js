'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CreditCardIcon, ChartBarIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import heroImage from "../../public/hero-image.avif"
import testImage1 from "../../public/testimonial-1.jpg"
import testImage2 from "../../public/testimonial-2.jpg"
import testImage3 from "../../public/testimonial-3.jpg"
import testImage4 from "../../public/testimonial-4.jpg"


const features = [
  {
    name: 'Streamlined Integration',
    description: 'Easy-to-use APIs for quick deployment into existing systems or platforms.',
    icon: CreditCardIcon,
  },
  {
    name: 'Advanced Analytics',
    description: 'Insightful tools to track payments and optimize financial workflows.',
    icon: ChartBarIcon,
  },
  {
    name: 'Real-Time Processing',
    description: 'Fast, efficient, and secure transactions to enhance customer experience and boost sales.',
    icon: UserGroupIcon,
  },
]

const testimonials = [
  {
    content: "This product has transformed how we handle our business operations.",
    author: "Sarah Johnson",
    role: "CEO at TechCorp",
    image: testImage1,
  },
  {
    content: "The best solution we've found for our business needs.",
    author: "Michael Chen",
    role: "CTO at StartupX",
    image: testImage2,
  },
  {
    content: "Incredible support and fantastic features.",
    author: "Emily Brown",
    role: "Founder at TechStart",
    image: testImage3,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white" suppressHydrationWarning>
      <main suppressHydrationWarning>
        {/* Hero Section */}
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-7xl py-32 sm:py-48 lg:py-56">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  LianFlow
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                Simplifying Crypto Payments on the NEO X Chain for Businesses and SaaS with Seamless Integration
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="/dashboard"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                  >
                    Get started
                  </Link>
                  <Link href="https://github.com/JaminCO/LianFlow-API/blob/main/Documentation.md" className="text-sm font-semibold leading-6 text-gray-900">
                    Docs <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px]">
                <Image
                  src={heroImage} // Add your image to public folder
                  alt="Hero image"
                  fill
                  className="object-cover rounded-lg shadow-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Trusted by companies worldwide
                </h2>
              </div>
              <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col bg-gray-400/5 p-8">
                  <dt className="text-sm font-semibold leading-6 text-gray-600">Active users</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">8.9k+</dd>
                </div>
                <div className="flex flex-col bg-gray-400/5 p-8">
                  <dt className="text-sm font-semibold leading-6 text-gray-600">Companies using</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">300+</dd>
                </div>
                <div className="flex flex-col bg-gray-400/5 p-8">
                  <dt className="text-sm font-semibold leading-6 text-gray-600">Success rate</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">99.9%</dd>
                </div>
                <div className="flex flex-col bg-gray-400/5 p-8">
                  <dt className="text-sm font-semibold leading-6 text-gray-600">Support response</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">2h</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Features Section (Enhanced) */}
        <div id="features" className="bg-gray-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Features</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to manage your business
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {features.map((feature) => (
                  <div key={feature.name} className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                      <feature.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      {feature.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                What our customers say
              </h2>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div key={testimonial.author} className="flex flex-col justify-between bg-white p-6 shadow-lg ring-1 ring-gray-900/5 rounded-lg">
                  <div>
                    <p className="text-lg leading-6 text-gray-900">{testimonial.title}</p>
                    <p className="mt-4 text-gray-600">{testimonial.content}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-x-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="h-12 w-12 rounded-full bg-gray-50"
                      width={48}
                      height={48}
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="bg-gray-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Simple, transparent pricing</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Choose the plan that's right for you
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
              {/* Starter Plan */}
              <div className="rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10">
                <h3 className="text-lg font-semibold leading-8 text-indigo-600">Starter</h3>
                <p className="mt-4 text-sm leading-6 text-gray-600">Perfect for small businesses getting started</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">$29</span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                </p>
                <Link
                  href="/signup"
                  className="mt-6 block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  Get started
                </Link>
              </div>

              {/* Pro Plan */}
              <div className="rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10 relative bg-gray-900">
                <h3 className="text-lg font-semibold leading-8 text-white">Pro</h3>
                <p className="mt-4 text-sm leading-6 text-gray-300">For growing businesses needing more power</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-white">$99</span>
                  <span className="text-sm font-semibold leading-6 text-gray-300">/month</span>
                </p>
                <Link
                    href="/signup"
                  className="mt-6 block rounded-md bg-white px-3 py-2 text-center text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Get started in 3 simple steps
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-indigo-600 p-3 text-white text-xl font-bold">1</div>
                <h3 className="mt-4 text-lg font-semibold text-black">Sign Up</h3>
                <p className="mt-2 text-center text-gray-600">Create your account in minutes</p>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-indigo-600 p-3 text-white text-xl font-bold">2</div>
                <h3 className="mt-4 text-lg font-semibold text-black">Connect</h3>
                <p className="mt-2 text-center text-gray-600">Get API keys and Integrate with your platform</p>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-indigo-600 p-3 text-white text-xl font-bold">3</div>
                <h3 className="mt-4 text-lg font-semibold text-black">Start Processing</h3>
                <p className="mt-2 text-center text-gray-600">Begin accepting payments</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-indigo-600">
          <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-100">
                Join thousands of businesses already using our platform
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/signup"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50"
                >
                  Get started
                </Link>
                <Link href="mailto:pydevog@gmail.com" className="text-sm font-semibold leading-6 text-white">
                  Contact sales <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}