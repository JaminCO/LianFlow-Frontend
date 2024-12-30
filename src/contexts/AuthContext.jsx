'use client'
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthNew');
  }
  return context;
}

export function AuthNew({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateEmail = async (newEmail) => {
    setLoading(true);
    try {
      // Implement your email update logic here
      console.log('Updating email to:', newEmail);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (newPassword) => {
    setLoading(true);
    try {
      // Implement your password update logic here
      console.log('Updating password');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    setLoading(true);
    try {
      // Implement your account deletion logic here
      console.log('Deleting account');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    updateEmail,
    updatePassword,
    deleteAccount
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 