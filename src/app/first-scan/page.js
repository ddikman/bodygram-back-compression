'use client'

import { useRouter } from "next/navigation"
import RequireLogin from "../components/requireLogin"

export default function FirstScan() {
  const router = useRouter()
  const start = () => {
    router.push('/add-scan')
  }
  return <RequireLogin>
    <div>
      <p>To get started, add your first scan.</p>
      <p>In the next pages, you will be taken through a step-by-step guide to get your scans.</p>

      <button onClick={start}>Start</button>
    </div>
  </RequireLogin>
}