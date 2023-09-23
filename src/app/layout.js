'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from './state/auth'
import NoSsr from './components/noSsr'
import Div100vh from 'react-div-100vh'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body suppressHydrationWarning={true} className={inter.className}>
          <main>
            <NoSsr>
              <Div100vh>
                {children}
              </Div100vh>
            </NoSsr>
          </main>
        </body>
      </AuthProvider>
    </html>
  )
}
