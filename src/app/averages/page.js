'use client'

import { useEffect, useState } from "react"
import CompressionView from "../components/compressionView"
import Loader from "../components/loader"
import useApi from "../hooks/useApi"
import Link from "next/link"

export default function Averages() {
  const [ averages, setAverages ] = useState([])
  const api = useApi()

  useEffect(() => {
    api.getAverages().then(setAverages)
  }, [api])

  return <div>
    <h1>All user averages</h1>
    <p>Below are the averages displayed for different users</p>
    { averages.length === 0 && <Loader /> }
    { averages.length > 0 && <div className="mt-4 flex flex-col gap-8">
      { averages.map((average, index) => <div key={index} className="flex flex-col gap-2">
        <CompressionView shoulderAngle={average.shoulder} backHeight={average.backHeight} hipAngle={average.hip} title={average.email} />
        <div className="flex flex-row justify-between">
          <span>Shoulder {average.shoulder}°</span>
          <span>Hip {average.hip}°</span>
        </div>
      </div>)}
    </div>}
    <div className="py-4">
      <Link href="/">Home</Link>
    </div>
  </div>
}