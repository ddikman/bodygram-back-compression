'use client'

import { useRouter } from "next/navigation"
import CompressionView from "../components/compressionView"
import RequireLogin from "../components/requireLogin"
import Measures from "../components/measures"

export default function Compare() {
  const router = useRouter()

  return <RequireLogin>
    <h1>Compare</h1>

    <div className="flex flex-row gap-2">
      <PeriodView shoulderAngle={2.3} backHeight={455} hipAngle={3.4} title="Last week" />
      <PeriodView shoulderAngle={0.2} backHeight={460} hipAngle={0.5} title="This week" />
    </div>

    <div className="mt-4">
      Your back has straightened by <em>1.00cm</em>, that is <em>amazing</em>, good job!
    </div>
    <div className="mt-4">
      The difference in shoulder angle has decreased by <em>-2.1°</em> and your hip angle has decreased by <em>-2.9°</em>.
    </div>

    <div className="mt-4">
      <div className="flex flex-col gap-4 justify-stretch">
        <button onClick={() => router.push('/home')} className="w-full">
          To home
        </button>
        <button className="secondary w-full">
          Change period (coming)
        </button>
      </div>
    </div>
  </RequireLogin>
}

function PeriodView({ title, shoulderAngle, hipAngle, backHeight }) {
  return <div className="flex flex-col gap-2">
    <CompressionView direction='row' title={title} shoulderAngle={shoulderAngle} backHeight={backHeight} hipAngle={hipAngle} />
    <Measures direction="col" style={{fontSize: '0.5rem'}} shoulder={shoulderAngle} hip={hipAngle} back={backHeight} />
  </div>
}