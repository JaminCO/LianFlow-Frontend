'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  CreditCardIcon, 
  CodeBracketIcon, 
  ShieldCheckIcon, 
  ArrowRightIcon,
  ChevronRightIcon

} from '@heroicons/react/24/outline'

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      name: 'Sui-Native Payments',
      description: 'Accept SUI and Sui-native tokens with real-time confirmation and low latency finality.',
      icon: CreditCardIcon,
      bgColor: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    },
    {
      name: 'Developer-First Integration',
      description: 'Plug-and-play SDKs, RESTful APIs, and ready-made plugins for quick integration into any platform.',
      icon: CodeBracketIcon,
      bgColor: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    },
    {
      name: 'Smart Contract Security',
      description: 'Built on secure Sui smart contracts with wallet integrations and programmable payment flows.',
      icon: ShieldCheckIcon,
      bgColor: 'bg-gradient-to-br from-purple-500 to-pink-600',
    },
  ]

  const testimonials = [
    {
      content: "LianFlow made accepting Sui payments a breeze for our e-commerce platform. The speed and reliability exceeded our expectations.",
      author: "Sarah Johnson",
      role: "CTO at CryptoMart",
    },
    {
      content: "The developer experience and documentation are outstanding. We had our payment system up in minutes, not days.",
      author: "Michael Chen",
      role: "Lead Developer at Web3Shop",
    },
    {
      content: "Best-in-class Sui payment infrastructure for our SaaS business. Their enterprise support is second to none.",
      author: "Emily Brown",
      role: "Founder at DeFiPay",
    },
  ]

  const plans = [
    {
      name: "Developer",
      price: "Free",
      description: "Perfect for startups and small projects",
      features: [
        "Process up to $10,000/month",
        "1% transaction fee",
        "Basic dashboard",
        "Standard support",
        "Single currency support"
      ],
      cta: "Start Building",
      href: "/signup",
      highlighted: false
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For high-volume businesses and special requirements",
      features: [
        "Unlimited processing volume",
        "Custom transaction fees",
        "Advanced analytics dashboard",
        "Priority 24/7 support",
        "Multi-currency support"
      ],
      cta: "Contact Sales",
      href: "/contact",
      highlighted: true
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main>
        {/* Hero Section */}
        <section className="pt-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 z-0"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  <span className="block text-gray-900">Web3 Payments</span>
                  <span className="block text-indigo-600 mt-2">Made Simple</span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-lg">
                  LianFlow is a B2B SaaS platform enabling seamless crypto payments on the Sui blockchain, designed for developers.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-lg hover:bg-indigo-700 transition-all hover:shadow-xl"
                  >
                    Start Building
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    href="/docs"
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-medium text-indigo-600 border border-indigo-100 hover:border-indigo-300 shadow-sm transition-all hover:shadow-md"
                  >
                    Documentation
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-90 z-10"></div>
                <div className="absolute inset-0 z-20 flex items-center justify-center p-8">
                  <div className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-xl border border-white/20">
                    <div className="flex items-center justify-between mb-6">
                      <div className="h-3 w-3 rounded-full bg-white/30"></div>
                      <div className="h-3 w-3 rounded-full bg-white/30"></div>
                      <div className="h-3 w-3 rounded-full bg-white/30"></div>
                    </div>
                    <div className="space-y-6">
                      <div className="h-12 bg-white/20 rounded-lg"></div>
                      <div className="h-24 bg-white/20 rounded-lg"></div>
                      <div className="h-8 bg-white/20 rounded-lg w-1/2"></div>
                      <div className="flex justify-end">
                        <div className="h-10 w-32 bg-white/30 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                <div className="rounded-2xl bg-white p-6 text-center shadow-lg border border-gray-100">
                  <dt className="text-sm font-semibold text-gray-500">Transaction Speed</dt>
                  <dd className="mt-2 text-4xl font-bold text-indigo-600">2s</dd>
                </div>
                <div className="rounded-2xl bg-white p-6 text-center shadow-lg border border-gray-100">
                  <dt className="text-sm font-semibold text-gray-500">Integration Time</dt>
                  <dd className="mt-2 text-4xl font-bold text-indigo-600">15min</dd>
                </div>
                <div className="rounded-2xl bg-white p-6 text-center shadow-lg border border-gray-100">
                  <dt className="text-sm font-semibold text-gray-500">Success Rate</dt>
                  <dd className="mt-2 text-4xl font-bold text-indigo-600">99.9%</dd>
                </div>
                <div className="rounded-2xl bg-white p-6 text-center shadow-lg border border-gray-100">
                  <dt className="text-sm font-semibold text-gray-500">Developer Support</dt>
                  <dd className="mt-2 text-4xl font-bold text-indigo-600">24/7</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base font-semibold text-indigo-600 uppercase tracking-wide">Features</h2>
              <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                Engineered for Web3 Developers
              </p>
              <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
                Everything you need to integrate Sui-powered payments into your application
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative rounded-2xl bg-white p-8 shadow-lg border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300"
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className={`absolute h-1 left-0 right-0 top-0 ${feature.bgColor}`}></div>
                  <div className="mb-5">
                    <div className={`inline-flex items-center justify-center rounded-xl p-3 ${feature.bgColor} text-white shadow-lg`}>
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{feature.name}</h3>
                  <p className="mt-4 text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base font-semibold text-indigo-600 uppercase tracking-wide">How It Works</h2>
              <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                Start Processing Payments in Minutes
              </p>
              <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
                Our simple three-step integration process
              </p>
            </div>
            
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-indigo-100 hidden md:block"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Step 1 */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center relative"
                >
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-white border-2 border-indigo-500 mb-6">
                    <span className="text-xl font-bold text-indigo-600">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Create Account</h3>
                  <p className="text-center text-gray-600">
                    Sign up in seconds with your email and set up your business profile
                  </p>
                </motion.div>
                
                {/* Step 2 */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col items-center relative"
                >
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-white border-2 border-indigo-500 mb-6">
                    <span className="text-xl font-bold text-indigo-600">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Integrate SDK</h3>
                  <p className="text-center text-gray-600">
                    Get your API keys and implement our SDK with just a few lines of code
                  </p>
                </motion.div>
                
                {/* Step 3 */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col items-center relative"
                >
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-white border-2 border-indigo-500 mb-6">
                    <span className="text-xl font-bold text-indigo-600">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Accept Payments</h3>
                  <p className="text-center text-gray-600">
                    Start processing Sui payments and managing transactions in your dashboard
                  </p>
                </motion.div>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="mt-16 text-center">
              <Link
                href="/docs"
                className="inline-flex items-center justify-center rounded-full bg-indigo-50 px-6 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-100 transition"
              >
                View Integration Guide
                <ChevronRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base font-semibold text-indigo-600 uppercase tracking-wide">Testimonials</h2>
              <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                Loved by Developers
              </p>
              <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
                Hear from our customers who've transformed their payment experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.author}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 flex flex-col h-full"
                >
                  <div className="mb-6 flex-grow">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 italic">"{testimonial.content}"</p>
                  </div>
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600"></div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base font-semibold text-indigo-600 uppercase tracking-wide">Pricing</h2>
              <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                Simple, Transparent Pricing
              </p>
              <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
                Choose the plan that works best for your business
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {plans.map((plan) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`rounded-2xl overflow-hidden ${
                    plan.highlighted 
                      ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-xl border border-indigo-500' 
                      : 'bg-white text-gray-900 shadow-lg border border-gray-100'
                  }`}
                >
                  <div className="p-8">
                    <h3 className={`text-xl font-semibold ${plan.highlighted ? 'text-white' : 'text-indigo-600'}`}>
                      {plan.name}
                    </h3>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.name === "Developer" && (
                        <span className={`ml-1 text-lg ${plan.highlighted ? 'text-indigo-200' : 'text-gray-500'}`}>
                          + 1% per tx
                        </span>
                      )}
                    </div>
                    <p className={`mt-2 ${plan.highlighted ? 'text-indigo-100' : 'text-gray-500'}`}>
                      {plan.description}
                    </p>
                    
                    <ul className="mt-8 space-y-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <svg 
                            className={`flex-shrink-0 h-5 w-5 ${plan.highlighted ? 'text-indigo-200' : 'text-indigo-500'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className={`ml-3 ${plan.highlighted ? 'text-white' : 'text-gray-600'}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-8">
                      <Link
                        href={plan.href}
                        className={`block w-full rounded-full py-3 px-6 text-center font-medium ${
                          plan.highlighted
                            ? 'bg-white text-indigo-700 hover:bg-gray-50'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        } transition`}
                      >
                        {plan.cta}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-indigo-600 to-purple-700 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Ready to transform your payment experience?
              </h2>
              <p className="mt-6 text-lg text-indigo-100">
                Join thousands of businesses already using our platform to accept Sui payments
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="rounded-full bg-white px-6 py-3 text-base font-medium text-indigo-700 shadow-lg hover:bg-gray-50"
                >
                  Start Building Now
                </Link>
                <Link 
                  href="/contact" 
                  className="rounded-full bg-indigo-500/30 backdrop-blur-sm border border-white/20 px-6 py-3 text-base font-medium text-white hover:bg-indigo-500/50"
                >
                  Talk to Sales
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}