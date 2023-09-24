'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex flex-col justify-center'>
      <Decoration />
      <h1>Straighten</h1>
      <div className='flex flex-col gap-4'>
        <span><em>Straighten</em> helps you monitor and manage your back curvature.</span>
        <ul>
          <li>Scan your body regularly</li>
          <li>Compare before/after stressful activities</li>
          <li>Track changes over time</li>
        </ul>
      </div>
      <div style={{paddingTop: '4rem'}}>
        <Link className="button" href="/sign-in">Start tracking!</Link>
      </div>
      <a className='link' style={{ display: 'block', marginTop: '3rem', fontSize: '0.75rem', textAlign: 'center' }} href="https://github.com/ddikman/straighten">Check this repo on GitHub</a>
    </div>
  )
}

function Decoration() {
  return <div style={{ zIndex: '-100', backgroundImage: 'url(/curve.png)', backgroundSize: 'cover', left: '0', right: '0', bottom: '-120px', mixBlendMode: 'multiply', display: 'block', height: '400px', position: 'absolute' }}></div>
}