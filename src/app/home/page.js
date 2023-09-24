'use client'

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import RequireLogin from "../components/requireLogin";
import useApi from "../hooks/useApi";
import CompressionView from "../components/compressionView";
import Loader from "../components/loader";
import Link from "next/link";
import { AuthContext } from "../state/auth";
import Measures from "../components/measures";

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
    })
  }, [api, router])

  return <RequireLogin>
    <div>
      <h1 class="pageTitle">Your Curve</h1>
      { loading && <Loader /> }
      { recentWeek && recentWeek.hasEntries && <div>
          <CompressionView shoulderAngle={recentWeek.shoulder} backHeight={recentWeek.backHeight} hipAngle={recentWeek.hip} title="The past seven days" />
          <Measures direction="row" shoulder={recentWeek.shoulder} hip={recentWeek.hip} back={recentWeek.backHeight} />
        </div>
      }
      { recentWeek && recentWeek.hasEntries === false && <div>
        <p>
          Welcome to <em>Straighten</em>.
        </p>
        <p className="mt-2">
          To get started, add your first scan by clicking the button below.
        </p>
      </div>}
      { !loading && <div className="flex flex-col gap-4 justify-center mt-4">
        <button className="w-full" onClick={() => router.push('/add-scan')}>Add scan</button>
        { recentWeek.hasEntries && <button className="w-full secondary" onClick={() => router.push('/compare')}>Compare dates</button> }
        <span className="link w-full text-center" onClick={logout}>Logout</span>
      </div>}
    </div>
  </RequireLogin>
}