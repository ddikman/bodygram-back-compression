'use client'

import './globals.css'
import { Poppins } from 'next/font/google'
import { AuthProvider } from './state/auth'
import NoSsr from './components/noSsr'
import Div100vh from 'react-div-100vh'
import Link from 'next/link'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body suppressHydrationWarning={true} className={poppins.className}>
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
