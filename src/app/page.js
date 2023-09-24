'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex flex-col justify-center'>
      <h1>Straighten</h1>
      <div className='flex flex-col gap-4'>
        <span><em>Straighten</em> helps you monitor and manage your back curvature.</span>
        <ul>
          <li>Scan your body regularly</li>
          <li>Compare before/after stressful activities</li>
          <li>Track changes over time</li>
        </ul>
      </div>
      <div className='py-4'>
        <Link className="button" href="/sign-in">Start tracking!</Link>
      </div>
    </div>
  )
}