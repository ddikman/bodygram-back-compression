'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RequireLogin from "../components/requireLogin";

export default function Home() {
  const [ loading, setLoading ] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
      router.push('/first-scan')
    }, 2500)
  }, [])

  return <RequireLogin>
    <div>
      Home
      { loading && <div>Loading...</div> }
    </div>
  </RequireLogin>
}