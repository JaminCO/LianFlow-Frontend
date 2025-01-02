'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios'
import Cookies from 'js-cookie';

const AuthContext = createContext({});

export function useTokenValidation() {
  const router = useRouter();
  const publicPaths = ['/login', '/signup', '/', '/product', '/contact'];

  useEffect(() => {
    const validateToken = async () => {
      // Check if we're on the client side
      if (typeof window === 'undefined') return;

      const token = Cookies.get('token');
      const currentPath = window.location.pathname;

      if (currentPath.includes('/checkout/')) {
        return;
      } else {

        // Don't validate on public paths
        if (publicPaths.includes(currentPath)) {
          return;
        }

        if (!token) {
          router.push('/login');
          return;
        }

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error('Token validation failed');
          }
        } catch (error) {
          Cookies.remove('token');
          Cookies.remove('business_name');
          router.push('/login');
        }
      }
    };

    validateToken();
  }, [router]);
} 

export function AuthProvider({ children }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useTokenValidation();

  useEffect(() => {
    // Check if there's a token in cookies on initial load
    const token = Cookies.get('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const updateAuthState = async (token) => {
    try {
      // Set the token in cookies
      if (token) {
        Cookies.set('token', token, {
          expires: 7, // Token expires in 7 days
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict'
        });
        axios.get(`${API_URL}/me`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then((response) => {
            console.log(response.data);
            const { business_name } = response.data;
            Cookies.set('business_name', business_name, {
              expires: 7, // Token expires in 7 days
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'Strict'
            });
          })
          .catch((error) => {
            console.error('Error updating business name:', error);
          });
        setIsAuthenticated(true);
      }
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error updating auth state:', error);
      throw error;
    }
  };


  const logout = () => {
    // Clear the token from cookies
    Cookies.remove('token');
    Cookies.remove('business_name');
    // Reset the auth state
    setIsAuthenticated(false);
    // Redirect to home page
    router.push('/');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated,
        updateAuthState,
        logout, 
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);