'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RequireLogin from "../components/requireLogin";
import useApi from "../hooks/useApi";
import CompressionView from "../components/compressionView";

export default function Home() {
  const [ loading, setLoading ] = useState(true)
  const api = useApi()
  const router = useRouter()
  const [recentWeek, setRecentWeek] = useState(null)

  useEffect(() => {
    console.log('fetching scans')
    api.getRecentWeek().then((recentWeek) => {
      setRecentWeek(recentWeek)
      setLoading(false)

      if (!recentWeek.hasEntries) {
        router.push('/first-scan')
      }
    })
  }, [api, router])

  return <RequireLogin>
    <div>
      Home
      { loading && <div>Loading...</div> }
      { recentWeek && recentWeek.hasEntries &&
        <CompressionView shoulderAngle={recentWeek.shoulder} backHeight={recentWeek.backHeight} hipAngle={recentWeek.hip} title="Recent Week" />
      }
      { !loading && <div>
        <button onClick={() => router.push('/compare')}>Compare with before</button>
      </div>}
    </div>
  </RequireLogin>
}