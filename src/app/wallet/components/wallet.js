import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import Swal from 'sweetalert2';
import { FiCopy, FiRefreshCw } from 'react-icons/fi';;
import { ClipLoader } from 'react-spinners';

const WalletPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [balances, setBalances] = useState({
    ETH: 0,
    USDT: 0
  });
  const [address, setAddress] = useState('....');
  const [loading, setLoading] = useState(true);

  const [num_transaction, setNumTransaction] = useState([])
  const [num_payments, setNumPayments] = useState([])
  
  const [transactions, setTransaction] = useState([])
  const [payments, setPayments] = useState([])

  let payments_type = null
  let transaction_type = null
  const [usdtVal, setUsdtVal] = useState(0);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  const [selectedCurrency, setSelectedCurrency] = useState('USDT');
  const [hideBalance, setHideBalance] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  

  const fetchBalances = () => {
    setRefreshing(true);
    axios.get(`${API_URL}/wallet/balance`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    })
    .then(response => {
      setBalances(response.data.balances);
      setAddress(response.data.wallet_address);
    })
    .catch(error => {
      console.error('Error fetching balances:', error);
    })
    .finally(() => {
      setRefreshing(false);
    });
  };

  const fetchNumTransactions = () => {
    axios.get(`${API_URL}/transactions/3`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    })
    .then(response => {
      setNumTransaction(response.data.transacts);
    })
    .catch(error => {
      console.error('Error fetching transactions:', error);
    })
    .finally(() => {
      setRefreshing(false);
    });
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${API_URL}/transactions`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      });
      
      setTransaction(response.data.transacts);
    } catch (error) {
      console.error('Error fetching balances:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchNumPayments = async () => {
    try {
      const response = await axios.get(`${API_URL}/payments/3`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      });
      
      setNumPayments(response.data.payments);
    } catch (error) {
      console.error('Error fetching balances:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await axios.get(`${API_URL}/payments`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      });
      
      setPayments(response.data.payments);
    } catch (error) {
      console.error('Error fetching balances:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const getEthToUsdt = () => {  
    axios.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USDT", { 
      timeout: 10000 
    })
    .then(response => {
      const data = response.data
      const usdtVal = data.USDT;
      console.log(usdtVal)
      setUsdtVal(usdtVal)
    })
    .catch(error => {
      throw error
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchBalances();
    fetchNumTransactions();
    fetchNumPayments();
    fetchTransactions();
    fetchPayments();
    getEthToUsdt();
    setLoading(false);
  }, []);

  const formatBalance = (balance) => {
    return hideBalance 
      ? '****' 
      : Number(balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="text-center">
            <ClipLoader color="#ffffff" size={50} />
            <p className="mt-4 text-white">Loading your wallet...</p>
          </div>
        </div>
      )}
    
      <div className={`container mx-auto px-4 py-8 ${loading ? 'pointer-events-none' : ''}`}>
      {/* Wallet Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Total Balance</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={fetchBalances}
                className={`text-gray-500 hover:text-gray-700 transition-transform ${
                  refreshing ? 'animate-spin' : ''
                }`}
                disabled={refreshing}
              >
                <FiRefreshCw size={20} />
              </button>
              <button
                onClick={() => setHideBalance(!hideBalance)}
                className="text-gray-500 hover:text-gray-700"
              >
                {hideBalance ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mb-4">
            {['USDT', 'ETH'].map((currency) => (
              <button
                key={currency}
                onClick={() => setSelectedCurrency(currency)}
                className={`px-4 py-2 rounded-full ${
                  selectedCurrency === currency
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {currency}
              </button>
            ))}
          </div>

          <div className="text-3xl font-bold text-blue-600">
            {selectedCurrency === 'USDT' ? '$' : ''}{formatBalance(balances[selectedCurrency])}
            {selectedCurrency === 'ETH' ? ' ETH' : ''}
          </div>
          
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <span className="text-green-500">↑ 2.4%</span>
            <span className="ml-2">Past 24h</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Wallet Details</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium text-gray-700">Network</span>
              <span className="text-green-500 font-semibold">Base Mainnet</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium text-gray-700">Address</span>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500 font-small truncate max-w-xs">
                    {address.slice(0, 12)}...{address.slice(-10)}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(address);
                      Swal.fire({
                        icon: 'success',
                        title: 'Address copied to clipboard!',
                      });
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FiCopy />
                  </button>
                </div>
            </div>
            <div className='flex items-center justify-between border-b pb-2'>
              <span className="font-medium text-gray-700">Token</span>
              <span className="text-green-500 font-semibold">ETH</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href='/settings?tab=withdraw' className="bg-blue-600 text-white rounded-lg px-4 py-2">
              Withdraw
            </a>
            <a href='/generate-payment-link' className="bg-green-600 text-white rounded-lg px-4 py-2">
              Receive
            </a>
          </div>
        </div>

      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'transactions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Transactions
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'payments'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Payments
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Asset Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Payments Activity</h3>
            <div className="space-y-4">
              {num_payments.length === 0 ? (
                <div className="text-center text-gray-500">No recent payments</div>
              ) : (
                num_payments.map((payments, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between border-b pb-4 cursor-pointer"
                    onClick={() => window.location.href = `/payments/${payments.id}`}
                  >
                    <div>
                      <div className="font-medium">
                        {payments.receiver_address === address ? 'Payment Received' : 'Payment Sent'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {payments.receiver_address === address ? `From: ${payments.sender_address}` : `To: ${payments.receiver_address}`}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-${payments.receiver_address === address ? 'green' : 'red'}-500`}>
                        {payments.receiver_address === address ? `+${payments.amount} ETH` : `-${payments.amount} ETH`}
                      </div>
                      <div className="text-sm text-gray-500">{formatDate(payments.created_at, "relative")}</div>
                      <strong className="text-sm text-gray-500">{payments.status}</strong>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {num_transaction.length === 0 ? (
                <div className="text-center text-gray-500">No recent transactions</div>
              ) : (
                num_transaction.map((transaction, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between border-b pb-4 cursor-pointer"
                    onClick={() => window.location.href = `/transaction/${transaction.id}`}
                  >
                    <div>
                      <div className="font-medium">
                        {transaction.to_address === address ? 'Payment Received' : 'Payment Sent'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {transaction.to_address === address ? `From: ${transaction.from_address}` : `To: ${transaction.to_address}`}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-${transaction.to_address === address ? 'green' : 'red'}-500`}>
                        {transaction.to_address === address ? `+${transaction.amount} ETH` : `-${transaction.amount} ETH`}
                      </div>
                      <div className="text-sm text-gray-500">{formatDate(transaction.created_at, "short")}</div>
                      <strong className="text-sm text-gray-500">{transaction.status}</strong>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Transaction History</h3>
              <div className="flex space-x-2">
                <span>Transactions</span>
              </div>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-gray-500 py-4">
                      No recent transactions
                    </td>
                  </tr>
                ) : (
                  transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {(() => {
                            const transaction_type = transaction.to_address === address ? "Received" : "Sent";
                            return (
                              <>
                                <span className={`text-${transaction_type === 'Received' ? 'green' : 'red'}-500`}>
                                  {transaction_type === 'Received' ? '↓' : '↑'}
                                </span>
                                <span className="ml-2">{transaction_type}</span>
                              </>
                            );
                          })()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{transaction.amount} ETH</div>
                        <div className="text-sm text-gray-500">{formatCurrency((transaction.amount * usdtVal).toFixed(2))}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.status === 'Successful' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(transaction.created_at, "long")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'payments' && (
        <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Payments History</h3>
            <div className="flex space-x-2">
              <span>Payments</span>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-4">
                    No recent payments
                  </td>
                </tr>
              ) : (
                payments.map((payment, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {(() => {
                          const payments_type = payment.receiver_address === address ? "Received" : "Sent";
                          return (
                            <>
                              <span className={`text-${payments_type === 'Received' ? 'green' : 'red'}-500`}>
                                {payments_type === 'Received' ? '↓' : '↑'}
                              </span>
                              <span className="ml-2">{payments_type}</span>
                            </>
                          );
                        })()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{payment.amount} ETH</div>
                      <div className="text-sm text-gray-500">{formatCurrency((payment.amount * usdtVal).toFixed(2))}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.status === 'Successful' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(payment.created_at, "relative")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    )}
    </div>
    </>
  );
};

export default WalletPage; 