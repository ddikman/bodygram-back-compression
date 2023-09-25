'use client'
import Link from 'next/link'
import PageContainer from './components/pageContainer'

export default function Home() {
  return <PageContainer title="Straighten">
      <Decoration />
      <div className='flex flex-col gap-4'>
        <span className='large'><em>Straighten</em> helps you monitor and manage your back curvature.</span>
        <ul>
          <li>Scan your body regularly</li>
          <li>Compare before/after stressful activities</li>
          <li>Track changes over time</li>
        </ul>
      </div>
      <div className='flex flex-1 flex-col justify-end'>
        <Link className="button" href="/sign-in">Start tracking!</Link>
      </div>
      <div className='meta pt-4 text-center'>
        <p>You can find the source code for this app on <a target='_blank' href="https://github.com/ddikman/straighten">GitHub</a>.</p>
        <p>It is made using the APIs provided by <a target='_blank' href="">Bodygram</a>.</p>
        <p>Made by <a href="https://greycastle.se" target='_blank'>David</a>.</p>
      </div>
    </PageContainer>
}

function Decoration() {
  return <div style={{ backgroundImage: 'url(/flare.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', position: 'absolute', backgroundPosition: 'top right', zIndex: '-10', left: 0, right: 0, top: 0, bottom: 0 }}></div>
}