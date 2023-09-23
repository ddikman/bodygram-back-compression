'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getScannerUrl } from './services/bodygram'


export default function Home() {
  const [scannerUrl, setScannerUrl] = useState(null)
  const [hasScan, setHasScan] = useState(false)

  const doScan = async () => {
    setScannerUrl(await getScannerUrl())
  }

  let step = 1
  if (hasScan) {
    step = 3
  }
  else if (scannerUrl) {
    step = 2
  }

  useEffect(() => {
    const handleCloseMessage = () => {
      const { type, payload } = event.data
      if(type === 0) {
        setHasScan(true)
      }
    }

    window.addEventListener('message', handleCloseMessage)

    return () => {
      window.removeEventListener('message', handleCloseMessage)
    }
  }, [])

  return (
    <main style={ {height: '100vh', width: '100vw' }}>
      { step === 1 && <div>
        Welcome to the scanner!
        <p>
          <button onClick={doScan}>Start</button>
        </p>
      </div>}
      {step === 2 && <Scanner url={scannerUrl} />}
      {step === 3 && <div>Ready to go</div>}
    </main>
  )
}

function Scanner({ url }) {
  return <iframe
  width='100%'
  height="100%"
    src={url}
    allow="camera; microphone; accelerometer; magnetometer; gyroscope"
  />
}
