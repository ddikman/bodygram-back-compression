'use client'

import { useCallback, useContext, useRef } from "react"
import { AuthContext } from "../state/auth"
import RequireLogin from "../components/requireLogin"

import React, { useState, useEffect } from 'react'
import { getScannerUrl, uploadScan } from '@/app/services/bodygram';
import { useRouter } from "next/navigation"


export default function AddScan() {
  const { email } = useContext(AuthContext)
  const [state, setState] = useState('loadToken')

  const [scannerUrl, setScannerUrl] = useState(null)
  const [customId, setCustomId] = useState(null)

  // const [frameRef, setFrameRef] = useState(null)

  const router = useRouter()

  const loadToken = useCallback(async () => {
    const { scannerUrl, customId } = await getScannerUrl(email)
    setScannerUrl(scannerUrl)
    setCustomId(customId)
    setState('runScan')
  }, [email])

  useEffect(() => {
    loadToken()
  }, [loadToken])


  const saveScan = useCallback(async () => {
    setState('saveScan')
    await uploadScan(customId, email);
    router.push('/home')
  }, [customId, email, router])

  const handleCloseMessage = useCallback((event) => {
    const { type } = event.data
    console.log('got message, type = ' + type)
    console.log('state is ' + state)
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

  // useEffect(() => {
  //   console.log('iframeref updated', frameRef)
  //   if (frameRef) {
  //     const observer = new MutationObserver((mutations) => {
  //       const detect = frameRef.contentWindow.document.querySelector('#detect')
  //       if (detect) {
  //         console.log('detect found')
  //       }
  //     })

  //     // hack to allow the iframe to load before we start observing
  //     setTimeout(() => {
  //       observer.observe(frameRef.contentWindow.document, { childList: true, subtree: true })
  //     }, 1500)

  //     return () => {
  //       observer.disconnect()
  //     }
  //   }
  // }, [frameRef])

  return <RequireLogin>
    { state === 'loadToken' && <div>Loading..</div>}
    { state === 'runScan' && <iframe
            ref={setFrameRef}
            width='100%'
            height="100%"
            src={scannerUrl}
            // src="/mock-page.html"
            allow="camera; microphone; accelerometer; magnetometer; gyroscope"
    />}
    { state === 'saveScan' && <div>Saving scan..</div> }
  </RequireLogin>
}