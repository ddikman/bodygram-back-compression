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
      <h1 class="pageTitle">Your Curve</h1>
      { loading && <Loader /> }
      { recentWeek && recentWeek.hasEntries && <div>
          <CompressionView shoulderAngle={recentWeek.shoulder} backHeight={recentWeek.backHeight} hipAngle={recentWeek.hip} title="The past seven days" />
          <div className="flex flex-col">
            <span>Shoulder angle: {recentWeek.shoulder}°</span>
            <span>Hip angle: {recentWeek.hip}°</span>
            <span>Back height: {recentWeek.backHeight / 10.0}cm</span>
          </div>
        </div>
      }
      { !loading && <div className="flex flex-col gap-4 justify-center mt-4">
        <button className="w-full" onClick={() => router.push('/add-scan')}>Add scan</button>
        <button className="w-full secondary" onClick={() => router.push('/compare')}>Compare dates</button>
        <span className="link w-full text-center" onClick={logout}>Logout</span>
      </div>}
    </div>
  </RequireLogin>
}