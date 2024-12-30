"use client"

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FiCopy, FiCheckCircle } from 'react-icons/fi';
import axios from 'axios';

export default function PaymentInstructions() {
  const searchParams = useSearchParams();
  const [paymentData, setPaymentData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('Pending');
  const [copied, setCopied] = useState(false);  
  const [timeLeft, setTimeLeft] = useState(600);  // 10 minutes = 600 seconds

  // Effect hook to start the countdown when the component mounts
  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // Format timeLeft to display in minutes:seconds format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Parse URL parameters
  useEffect(() => {
    try {
      const data = JSON.parse(decodeURIComponent(searchParams.get('data')));
      setPaymentData(data);
    } catch (error) {
      console.error('Error parsing payment data:', error);
      toast.error('Error loading payment details');
    }
  }, [searchParams]);

  // Polling implementation
  useEffect(() => {
    if (!paymentData?.payment_id || paymentStatus === 'Completed' || paymentStatus === 'Successful') {
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payment/status/${paymentData.payment_id}`);
        const data = response.data;

        if (data.status !== paymentStatus) {
          setPaymentStatus(data.status);
          if (data.status === 'Successful') {
            toast.success('Payment confirmed!');
          }
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        // Don't show error toast on every failed poll
        // Only show if it's a non-network error
        if (error.response && error.response.status !== 404) {
          toast.error('Error checking payment status');
        }
      }
    };

    // Initial check
    checkPaymentStatus();

    // Set up polling interval (10 seconds)
    const pollInterval = setInterval(checkPaymentStatus, 10000);

    // Cleanup function
    return () => clearInterval(pollInterval);
  }, [paymentData, paymentStatus]);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(paymentData.merchant_address);
      setCopied(true);
      toast.success('Address copied to clipboard!');
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      toast.error('Failed to copy address');
    }
  };

  if (!paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading payment instructions...</div>
      </div>
    );
  }

  if (paymentStatus === 'Completed' || paymentStatus === 'Successful') {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 text-center">
            <div className="mb-6">
              <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Payment Confirmed!</h1>
              <p className="text-gray-600">
                Your payment of {paymentData.gas_amount} GAS (${paymentData.total_amount} USD) has been received
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-2">Transaction Details:</p>
                <p>Payment ID: {paymentData.payment_id}</p>
                <p>Business: {paymentData.business_name}</p>
                <p>Date: {new Date().toLocaleString()}</p>
              </div>
            </div>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Complete Your Payment</h1>
            <p className="text-gray-600">Please send the exact amount to the following address</p>
            <p className="text-sm text-gray-500 mt-2">Time remaining: {formatTime(timeLeft)}</p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Amount to Send</label>
                <div className="text-2xl font-bold">{paymentData.gas_amount} GAS</div>
                <div className="text-sm text-gray-500">(${paymentData.total_amount} USD)</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Payment Address
                </label>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-gray-100 p-3 rounded font-mono text-sm break-all">
                    {paymentData.merchant_address}
                  </code>
                  <button
                    onClick={copyAddress}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Copy address"
                  >
                    {copied ? <FiCheckCircle className="text-green-500" /> : <FiCopy />}
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Important Notes:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Send only GAS to this address</li>
                <li>Payment must be completed within {Math.ceil(timeLeft / 60)} minutes</li>
                <li>Send the exact amount shown above</li>
                <li>Transaction confirmation may take a few minutes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}