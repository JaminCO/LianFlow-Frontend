import Image from 'next/image'

export default function Product() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Product Overview */}
        <div className="relative isolate overflow-hidden bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">
                Accept Crypto Payments on NEO X
              </h2>
              <p className="mt-6 text-lg leading-8 text-black">
                LianFlow simplifies crypto payment processing on the NEO X blockchain, enabling businesses to seamlessly accept and manage cryptocurrency transactions with minimal technical overhead.
              </p>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-gray-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-black">
                  Enterprise-Grade Features
                </h2>
                <p className="mt-4 text-lg text-black">
                  Comprehensive tools and features designed for businesses operating on the NEO X blockchain.
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="flex gap-x-3">
                    <span className="text-indigo-600">✓</span>
                    <span className="text-black">Instant confirmation and settlement mechanisms</span>
                  </li>
                  <li className="flex gap-x-3">
                    <span className="text-indigo-600">✓</span>
                    <span className="text-black">Plug-and-Play SDKs and comprehensive APIs</span>
                  </li>
                  <li className="flex gap-x-3">
                    <span className="text-indigo-600">✓</span>
                    <span className="text-black">User-friendly payment interfaces</span>
                  </li>
                  <li className="flex gap-x-3">
                    <span className="text-indigo-600">✓</span>
                    <span className="text-black">Advanced analytics dashboard</span>
                  </li>
                  <li className="flex gap-x-3">
                    <span className="text-indigo-600">✓</span>
                    <span className="text-black">End-to-end encryption and compliance tools</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/product-img.jpg"
                  alt="Product features"
                  width={450}
                  height={150}
                  className="rounded-xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Use Cases
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-black">E-commerce Integration</h3>
                <p className="mt-4 text-black">
                  Accept crypto payments directly in your online store without intermediaries.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-black">Service Providers</h3>
                <p className="mt-4 text-black">
                  Streamline invoicing and payment collection for freelancers and agencies.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-black">Subscription Services</h3>
                <p className="mt-4 text-black">
                  Implement recurring crypto payments for SaaS and membership platforms.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation */}
        <div className="bg-gray-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-black">
              Comprehensive Documentation
            </h2>
            <div className="mt-10">
              <p className="text-lg text-gray-600 mb-6">
                Our detailed documentation provides everything you need to integrate and use LianFlow effectively.
              </p>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h3 className="font-semibold text-black mb-2">Getting Started Guide</h3>
                  <p className="text-gray-600 mb-4">
                    Step-by-step tutorials and examples to help you integrate LianFlow into your application.
                  </p>
                  <a href="https://peaceful-rainforest-7cd.notion.site/API-Reference-for-Developers-1b6d8e83b03c46d7a57e643452536dd7#7ec7d0924b3a4728b44138b42472fe64" className="text-indigo-600 hover:text-indigo-500 font-medium">
                    View guide →
                  </a>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h3 className="font-semibold text-black mb-2">API Reference</h3>
                  <p className="text-gray-600 mb-4">
                    Complete API documentation with endpoints, parameters, and response examples.
                  </p>
                  <a href="https://github.com/JaminCO/LianFlow-API/blob/main/Documentation.md" className="text-indigo-600 hover:text-indigo-500 font-medium">
                    Explore API docs →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-indigo-600">
          <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to transform your business?
              </h2>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/signup"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50"
                >
                  Get started
                </a>
                <a href="/contact" className="text-sm font-semibold leading-6 text-white">
                  Contact sales <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}