'use client'

import { useCallback } from "react"
import RequireLogin from "../components/requireLogin"

import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import Link from "next/link"
import useApi from "../hooks/useApi"
import Loader from "../components/loader"


export default function AddScan() {
  const api = useApi()
  const [state, setState] = useState('loadToken')

  const [scannerUrl, setScannerUrl] = useState(null)
  const [customId, setCustomId] = useState(null)


  const router = useRouter()

  const loadToken = useCallback(async () => {
    const { scannerUrl, customId } = await api.createScannerUrl()
    setScannerUrl(scannerUrl)
    setCustomId(customId)
    setState('runScan')
  }, [api])

  useEffect(() => {
    loadToken()
  }, [loadToken])


  const saveScan = useCallback(async () => {
    setState('saveScan')
    try {
      await api.uploadScan(customId);
      router.push('/home')
    } catch (e) {
      console.error(e)
      setState('error')
    }

  }, [customId, api, router])

  const handleCloseMessage = useCallback((event) => {
    const { type } = event.data
    console.log('got message', event.data)
    if(type === 0) {
      if (state === 'runScan') {
        saveScan()
      }
    }
  }, [saveScan, state])

  useEffect(() => {
    window.addEventListener('message', handleCloseMessage)
    return () => {
      window.removeEventListener('message', handleCloseMessage)
    }
  }, [handleCloseMessage])

  return <RequireLogin>
    { state === 'loadToken' && <div>
      <h1>Hold on</h1>
      <Loader />
      </div>}
    { state === 'runScan' && <iframe
            style={{ height: '80vh', width: '100%' }}
            src={scannerUrl}
            allow="camera; microphone; accelerometer; magnetometer; gyroscope"
    />}
    { state === 'saveScan' && <div>
      <h1>Hold on</h1>
      <p>Saving scan..</p>
      <Loader />
    </div> }
    { state === 'error' && <div className="flex flex-col gap-4 justify-center">
      <h1>Error</h1>
      <p className="mb-4">
        There was an error saving your scan. Please try again.
      </p>
      <button className="w-full" onClick={() => window.location.reload()}>Retry</button>
      <Link className="w-full text-center" href="/home">Return to main screen</Link>
    </div> }
  </RequireLogin>
}