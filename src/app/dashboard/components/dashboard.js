'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from '../../../utils/formatters';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Wallet, 
  Activity, 
  BarChart3, 
  Settings, 
  Users,
  CreditCard
} from 'lucide-react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const DashboardSkeleton = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="mb-8">
      <Skeleton height={40} width={300} />
      <Skeleton height={20} width={200} />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Skeleton circle width={40} height={40} />
              <div className="ml-4 flex-1">
                <Skeleton height={20} width={100} />
                <Skeleton height={24} width={150} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader>
          <Skeleton height={24} width={200} />
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Skeleton height="100%" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton height={24} width={200} />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white border rounded-lg">
                <div className="flex items-center">
                  <Skeleton circle width={24} height={24} />
                  <div className="ml-3">
                    <Skeleton width={100} />
                    <Skeleton width={80} />
                  </div>
                </div>
                <Skeleton width={60} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const business_name = Cookies.get('business_name');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [dashboardData, setDashboardData] = useState(null);
  const [paymentData, setPaymentData] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [usdtVal, setUsdtVal] = useState(0);

  const getEthToUsdt = () => {  
    axios.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USDT", { 
      timeout: 10000 
    })
    .then(response => {
      const data = response.data
      const usdtVal = data.USDT;
      setUsdtVal(usdtVal)
    })
    .catch(error => {
      throw error
    });
  }

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = Cookies.get("token");
        
        const response = await axios.get(`${API_URL}/dashboard`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        getEthToUsdt()
        setDashboardData(response.data);
        setPaymentData([
          { month: 'Jan', transactions: 65, volume: 89000 },
          { month: 'Feb', transactions: 78, volume: 95000 },
          { month: 'Mar', transactions: 90, volume: 110000 },
          { month: 'Apr', transactions: 81, volume: 102000 },
          { month: 'May', transactions: 86, volume: 108000 },
          { month: 'Jun', transactions: 95, volume: 120000 },
        ]);
        setRecentTransactions(
        //   [
        //   { id: 1, customer: 'Store A', amount: '2,500 NEO', status: 'Completed' },
        //   { id: 2, customer: 'Store B', amount: '1,800 NEO', status: 'Pending' },
        //   { id: 3, customer: 'Store C', amount: '3,200 NEO', status: 'Completed' },
        // ]
        response.data.transactions
      );
        
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payment Dashboard - {business_name}</h1>
        <p className="text-gray-600">Monitor your crypto payments and transactions</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Wallet className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Balance</p>
                <h3 className="text-2xl font-bold">
                  {dashboardData?.balances.ETH} ETH
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Transaction Volume</p>
                <h3 className="text-2xl font-bold">
                {dashboardData?.transaction_volume.toFixed(3)} ETH 
                {/* {formatCurrency((dashboardData?.transaction_volume * usdtVal).toFixed(2))} */}
                </h3>
                
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Number of Transactions</p>
                <h3 className="text-2xl font-bold">
                {dashboardData?.num_of_transactions}  
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Transaction Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={paymentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="volume" 
                    stroke="#4F46E5" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.length === 0 ? (
                <div className="flex items-center justify-center p-4 bg-gray-50 border rounded-lg">
                  <p className="text-gray-500">No recent transactions</p>
                </div>
              ) : (
                recentTransactions.map((transaction, index) => (
                  <a 
                    href={`/payment/${transaction.payment_id}`}
                    key={transaction.payment_id || index} 
                    className="flex items-center justify-between p-4 bg-white border rounded-lg"
                  >
                    <div className="flex items-center">
                      <CreditCard className="h-6 w-6 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-black">{transaction.data || 'John Doe'}</p>
                        <p className="text-sm text-gray-500">{transaction.amount} ETH</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      transaction.status === 'Successful' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </a>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <a href="/generate-payment-link" className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <span className="ml-3 font-medium text-black">Generate Payment Link</span>
          </div>
        </a>

        <a href="/generate-payment-link" className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <span className="ml-3 font-medium text-black">View Reports</span>
          </div>
        </a>

        <a href='/wallet' className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
            <Wallet className="h-6 w-6 text-blue-600" />
            </div>
            <span className="ml-3 font-medium text-black">Wallet</span>
          </div>
        </a>

        <a href='/settings' className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Settings className="h-6 w-6 text-gray-600" />
            </div>
            <span className="ml-3 font-medium text-black">Settings</span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Dashboard;