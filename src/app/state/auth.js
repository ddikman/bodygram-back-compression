'use client'

import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();
export const AuthProvider = ({ children}) => {

  const [email, setEmail] = useState(null)

  useEffect(() => {
    setEmail(sessionStorage.getItem('email'))
  }, [])

  useEffect(() => {
    console.log('email is updated to', email)
    if (!email || email === '') {
      sessionStorage.removeItem('email')
    } else {
      sessionStorage.setItem('email', email)
    }
  }, [email])

  const auth = {
    isLoggedIn: !!email,
    email,
    setEmail
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}