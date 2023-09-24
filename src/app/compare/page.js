'use client'

import { useRouter } from "next/navigation"
import CompressionView from "../components/compressionView"
import RequireLogin from "../components/requireLogin"

export default function Compare() {
  const router = useRouter()

  return <RequireLogin>
    <h1>Compare</h1>

    <div className="flex flex-row gap-2">
      <PeriodView shoulderAngle={2.3} backHeight={4500} hipAngle={3.4} title="Last week" />
      <PeriodView shoulderAngle={0.2} backHeight={4600} hipAngle={0.5} title="This week" />
    </div>

    <div className="mt-4">
      Your back has straightened by 1.00cm, that is amazing, good job!
    </div>
    <div className="mt-4">
      The difference in shoulder angle has decreased by -2.1° and your hip angle has decreased by -2.9°.
    </div>

    <div className="mt-4">
      <div className="flex flex-row gap-2 justify-stretch">
        <button className="secondary w-full">
          Change period
        </button>
        <button onClick={() => router.push('/home')} className="w-full">
          To home
        </button>
      </div>
    </div>
  </RequireLogin>
}

function PeriodView({ title, shoulderAngle, hipAngle, backHeight }) {
  return <div className="flex flex-col gap-2">
    <CompressionView title={title} shoulderAngle={shoulderAngle} backHeight={backHeight} hipAngle={hipAngle} />
    <div className="flex flex-col">
      <span>Shoulder angle: {shoulderAngle}°</span>
      <span>Hip angle: {hipAngle}°</span>
      <span>Back height: {backHeight / 10.0}cm</span>
    </div>
  </div>
}