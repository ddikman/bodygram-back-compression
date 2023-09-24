'use client'

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import RequireLogin from "../components/requireLogin";
import useApi from "../hooks/useApi";
import CompressionView from "../components/compressionView";
import Loader from "../components/loader";
import Link from "next/link";
import { AuthContext } from "../state/auth";

export default function Home() {
  const { logout } = useContext(AuthContext);
  const [ loading, setLoading ] = useState(true)
  const api = useApi()
  const router = useRouter()
  const [recentWeek, setRecentWeek] = useState(null)

  useEffect(() => {
    console.log('fetching scans')
    api.getRecentWeek().then((recentWeek) => {
      setRecentWeek(recentWeek)
      setLoading(false)

      // if (!recentWeek.hasEntries) {
      //   router.push('/first-scan')
      // }
    })
  }, [api, router])

  return <RequireLogin>
    <div>
      <h1 class="pageTitle">Your back now</h1>
      { loading && <Loader /> }
      { recentWeek && recentWeek.hasEntries && <div>
          <CompressionView shoulderAngle={recentWeek.shoulder} backHeight={recentWeek.backHeight} hipAngle={recentWeek.hip} title="This recent week" />
          <div className="flex flex-col">
            <span>Shoulder angle: {recentWeek.shoulder}°</span>
            <span>Hip angle: {recentWeek.hip}°</span>
            <span>Back height: {recentWeek.backHeight / 10.0}cm</span>
          </div>
        </div>
      }
      { !loading && <div className="flex flex-col gap-4">
        <button className="w-full mt-4" onClick={() => router.push('/compare')}>Compare with before</button>
        <div className="flex flex-row gap-2 w-full justify-between">
        <Link href='/add-scan'>Add new scan</Link>
        <span class="link" onClick={logout}>Logout</span>
        </div>
      </div>}
    </div>
  </RequireLogin>
}