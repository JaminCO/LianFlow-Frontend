'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function Checkout() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const params = useParams();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    wallet: '',
    email: ''
  });

  useEffect(() => {
    const fetchPaymentData = async () => {
      if (!params.paymentId) return;
      
      try {
        const response = await axios.get(`${API_URL}/get/${params.paymentId}`);
        setPaymentData(response.data);
      } catch (error) {
        toast.error('Error fetching payment details');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, [params.paymentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post_data = {
      sender_address: formData.wallet.trim(),
      data: formData.email.trim(),
      payment_id: params.paymentId.trim(),
    }
    try {
      const response = await axios.post(`${API_URL}/checkout/initiate`, post_data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      router.push(`/payment/instructions?data=${encodeURIComponent(JSON.stringify(response.data))}`);
    } catch (error) {
      toast.error('Error processing payment');
      console.error('Error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-0 min-h-screen flex items-center justify-center">
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 bg-gray-50">
          <h2 className="text-2xl font-bold mb-6">{paymentData?.business_name}</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Amount</p>
              <p className="text-2xl font-bold">${paymentData?.total_amount}</p>
            </div>
            <div>
              <p className="text-gray-600">Amount in GAS</p>
              <p className="font-semibold">{paymentData?.gas_amount} GAS</p>
            </div>
            <div>
              <p className="text-gray-600">Payment ID</p>
              <p className="font-mono">{paymentData?.payment_id}</p>
            </div>
            <div>
              <p className="text-gray-600">Duration</p>
              <p>30 minutes</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-6">Payment Details</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sender's Wallet Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.wallet}
                  onChange={(e) => setFormData({ ...formData, wallet: e.target.value })}
                  required
                  placeholder="Enter your wallet address"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <i className="fas fa-wallet"></i>
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="Enter your email"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Pay ${paymentData?.total_amount}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}