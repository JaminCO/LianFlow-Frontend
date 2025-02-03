'use client';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { FiCopy } from 'react-icons/fi';

export default function GeneratePayment() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [formData, setFormData] = useState({
    amount: '',
    notificationType: 'redirect', // or 'webhook'
    redirectUrl: '',
    webhookUrl: '',
    description: ''
  });
  const [generatedLink, setGeneratedLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);

    try {
      const response = await axios.post(`${API_URL}/checkout/create`, {
        amount: parseFloat(formData.amount),
        // notification_type: formData.notificationType,
        // redirect_url: formData.redirectUrl,
        // webhook_url: formData.webhookUrl,
        // description: formData.description
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });

      const data = response.data;
      console.log(data);

      if (response.status !== 200) {
        throw new Error(data.message || 'Failed to generate payment link');
      }

      // Construct the full checkout URL
      const checkoutUrl = `${window.location.origin}/checkout/${data.payment_id}`;
      setGeneratedLink(checkoutUrl);
      Swal.fire('Success', 'Payment link generated successfully!', 'success');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      Swal.fire('Success', 'Link copied to clipboard!', 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to copy link', 'error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Generate Payment Link</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (ETH)
          </label>
          <input
            type="number"
            step="0.01"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description (optional)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Payment description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notification Type
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="redirect"
                checked={formData.notificationType === 'redirect'}
                onChange={(e) => setFormData({ ...formData, notificationType: e.target.value })}
                className="mr-2"
              />
              Redirect URL
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="webhook"
                checked={formData.notificationType === 'webhook'}
                onChange={(e) => setFormData({ ...formData, notificationType: e.target.value })}
                className="mr-2"
              />
              Webhook URL
            </label>
          </div>
        </div>

        {formData.notificationType === 'redirect' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Redirect URL
            </label>
            <input
              type="url"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.redirectUrl}
              onChange={(e) => setFormData({ ...formData, redirectUrl: e.target.value })}
              placeholder="https://your-website.com/success"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Webhook URL
            </label>
            <input
              type="url"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.webhookUrl}
              onChange={(e) => setFormData({ ...formData, webhookUrl: e.target.value })}
              placeholder="https://your-website.com/api/webhook"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Payment Link'}
        </button>
      </form>

      {generatedLink && (
        <div className="mt-8 space-y-4">
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h2 className="text-lg font-medium mb-3">Generated Payment Link</h2>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={generatedLink}
                className="flex-1 p-2 bg-white border border-gray-300 rounded-md font-mono text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="p-2 text-gray-600 hover:text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                title="Copy to clipboard"
              >
                <FiCopy size={20} />
              </button>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-md font-medium text-blue-800 mb-2">Preview</h3>
            <div className="space-y-2">
              <a
                href={generatedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline break-all"
              >
                {generatedLink}
              </a>
              <p className="text-sm text-blue-600">
                Click the link above to see how your customers will view it
              </p>
            </div>
          </div>
          {/* Iframe Preview Section */}
          <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-md">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Preview in iframe:</h4>
              <iframe
                src={generatedLink}
                width="100%"
                height="400"
                frameBorder="0"
                title="Payment Link Preview"
                className="rounded-md"
              />
            </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-md font-medium text-green-800 mb-2">Share</h3>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(generatedLink)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Share via WhatsApp
              </a>
              <a
                href={`mailto:?subject=Payment Link&body=${encodeURIComponent(generatedLink)}`}
                className="flex items-center justify-center gap-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Share via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}