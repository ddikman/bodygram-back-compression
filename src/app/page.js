'use client'

import Image from 'next/image'
import { useState } from 'react'
import { getScannerUrl } from './services/bodygram'


export default function Home() {
  const [scannerUrl, setScannerUrl] = useState(null)

  const doScan = async () => {
    setScannerUrl(await getScannerUrl())
  }

  let step = 1
  if (scannerUrl) {
    step = 2
  }

  return (
    <main style={ {height: '100vh', width: '100vw' }}>
      { step === 1 && <div>
        Welcome to the scanner!
        <p>
          <button onClick={doScan}>Start</button>
        </p>
      </div>}
      {step === 2 && <Scanner url={scannerUrl} />}
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
