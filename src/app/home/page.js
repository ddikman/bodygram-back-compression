'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RequireLogin from "../components/requireLogin";
import useApi from "../hooks/useApi";
import CompressionView from "../components/compressionView";
import Loader from "../components/loader";

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
      <h1 class="pageTitle">Your back now</h1>
      { loading && <Loader /> }
      { recentWeek && recentWeek.hasEntries &&
        <CompressionView shoulderAngle={recentWeek.shoulder} backHeight={recentWeek.backHeight} hipAngle={recentWeek.hip} title="This recent week" />
      }
      { !loading && <div>
        <button className="w-full mt-4" onClick={() => router.push('/compare')}>Compare with before</button>
      </div>}
    </div>
  </RequireLogin>
}