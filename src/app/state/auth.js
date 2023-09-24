'use client'

import { useRouter } from 'next/navigation';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();
export const AuthProvider = ({ children}) => {
  const [email, setEmail] = useState(null)
  const router = useRouter()

  useEffect(() => {
    setEmail(localStorage.getItem('email'))
  }, [])

  useEffect(() => {
    if (email) {
      localStorage.setItem('email', email)
    }
  }, [email])

  const logout = () => {
    setEmail(null)
    localStorage.removeItem('email')
    router.replace('/')
  }

  const auth = {
    isLoggedIn: !!email,
    logout,
    email,
    setEmail
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}