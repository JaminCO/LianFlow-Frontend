'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import { 
  FiMail, 
  FiLock, 
  FiKey, 
  FiDollarSign, 
  FiTrash2,
  FiCopy,
  FiChevronRight,
  FiRefreshCw
} from 'react-icons/fi';
import CopyButton from '../../components/CopyButton';
import axios from 'axios';

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const Settings = () => {
  const menuItems = [
    { id: 'email', icon: FiMail, label: 'Email Settings' },
    { id: 'password', icon: FiLock, label: 'Password' },
    { id: 'api', icon: FiKey, label: 'API Key' },
    { id: 'withdraw', icon: FiDollarSign, label: 'Withdraw Funds' },
    { id: 'delete', icon: FiTrash2, label: 'Delete Account' },
  ];
  
  const {updateEmail, updatePassword, deleteAccount } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('email');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [apiKey, setApiKey] = useState('Loading...');
  const token = Cookies.get('token')

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  useEffect(() => {
    // Get tab from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    
    // Check if the tab parameter exists and is valid
    if (tabParam && menuItems.some(item => item.id === tabParam)) {
      setActiveTab(tabParam);
    }
    
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/me`, { 
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setEmail(response.data.email);
        setApiKey(response.data.api_key)
        setLoading(false)
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Failed to fetch user data",
        });
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Update URL with new tab
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('tab', tabId);
    window.history.pushState({}, '', newUrl);
  };

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // await updateEmail(email);
      Toast.fire({
        icon: "success",
        title: "Email updated successfully",
      });
      setEmail('');
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.message,
      });
    }
    setLoading(false);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return Toast.fire({
        icon: "error",
        title: "Passwords do not match",
      });
    }
    setLoading(true);
    try {
      await updatePassword(password);
      Toast.fire({
        icon: "success",
        title: "Password updated successfully",
      });
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.message,
      });
    }
    setLoading(false);
  };

  const handleWithdrawal = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/withdraw`, {
        receiver_address: walletAddress,
        amount: withdrawAmount
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response);
        Toast.fire({
          icon: "success",
          title: "Withdrawal initiated successfully",
        });
      })
      .catch(error => {
        throw error;
      });
      setWalletAddress('');
      setWithdrawAmount('');
    } catch (error) {
      if (error.response.status === 402) {
        Toast.fire({
          icon: "error",
          title: error.response.data.detail,
        });
      } else {
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      }
    }
    setLoading(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'email':
        return (
          <form onSubmit={handleEmailUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">New Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter new email"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Email
            </button>
          </form>
        );

      case 'password':
        return (
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Confirm new password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Update Password
            </button>
          </form>
        );

      case 'api':
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Your API Key</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={apiKey}
                readOnly
                className="block w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50"
              />
              <CopyButton textToCopy={apiKey} />
              <button
                type="button"
                onClick={async () => {
                  console.log(token)
                  try {
                    const response = await axios.get(`${API_URL}/regenerate-api-key`, { 
                      headers: {
                        'Authorization': `Bearer ${token}`
                      }
                    });
                    setApiKey(response.data.api_key)
                    Swal.fire({
                      icon: 'success',
                      title: 'API Key regenerated successfully!',
                    });
                  } catch (error) {
                    Swal.fire({
                      icon: 'error',
                      title: 'Failed to regenerate API Key',
                    });
                  }
                }}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                <FiRefreshCw className="mr-2" />
              </button>
            </div>
          </div>
        );

      case 'withdraw':
        return (
          <form onSubmit={handleWithdrawal} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Wallet Address</label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Enter wallet address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Enter amount"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Withdraw Funds
            </button>
          </form>
        );

      case 'delete':
        return (
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-md">
              <h3 className="text-red-800 font-medium">Warning: This action cannot be undone</h3>
              <p className="text-red-700 mt-2">
                Deleting your account will permanently remove all your data and settings.
              </p>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete your account?')) {
                  deleteAccount();
                }
              }}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              Delete Account
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-lg shadow">
          <div className="grid grid-cols-12 divide-x divide-gray-200">
            {/* Sidebar */}
            <div className="col-span-3 py-6">
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium ${
                      activeTab === item.id
                        ? 'text-indigo-700 bg-indigo-50 border-l-4 border-indigo-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className={`mr-3 flex-shrink-0 h-6 w-6 ${
                      activeTab === item.id ? 'text-indigo-700' : 'text-gray-400'
                    }`} />
                    <span className="flex-grow">{item.label}</span>
                    <FiChevronRight className={`ml-3 h-5 w-5 ${
                      activeTab === item.id ? 'text-indigo-700' : 'text-gray-400'
                    }`} />
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="col-span-9 p-6">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {menuItems.find(item => item.id === activeTab)?.label}
                </h2>
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;