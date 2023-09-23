'use client'

import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();
export const AuthProvider = ({ children}) => {
  const [email, setEmail] = useState(localStorage ? localStorage.getItem('email') : null)

  useEffect(() => {
    console.log('email is updated to', email)
    if (!email || email === '') {
      localStorage.removeItem('email')
    } else {
      localStorage.setItem('email', email)
    }
  }, [email])

  const auth = {
    isLoggedIn: !!email,
    email,
    setEmail
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}