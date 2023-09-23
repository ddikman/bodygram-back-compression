'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex flex-col justify-center'>
      <h1>Welcome</h1>
      <p>
        Straighten is an app to help you track your back compression over time.
      </p>
      <p>
        By scanning your body on a regular basis, you can see how your posture changes over time.
      </p>
      <p>
        You can also use it before and after shorter periods of time to see how your back reacts to stressful activities.
      </p>
      <Link className="button" href="/sign-in">Start tracking!</Link>
    </div>
  )
}