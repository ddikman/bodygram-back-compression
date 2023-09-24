'use client'

import { useRouter } from "next/navigation"
import RequireLogin from "../components/requireLogin"

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', hip: 1.6, shoulder: 0.7, back: 45.8 },
  { month: 'Feb', hip: 1.8, shoulder: 1.0, back: 45.2 },
  { month: 'Mar', hip: 1.3, shoulder: 1.3, back: 45.5 },
  { month: 'Apr', hip: 1.5, shoulder: 1.7, back: 45.8 },
  { month: 'May', hip: 1.7, shoulder: 1.9, back: 45.0 },
  { month: 'Jun', hip: 2.0, shoulder: 1.7, back: 46.2 },
  { month: 'Jul', hip: 2.2, shoulder: 1.8, back: 45.5 },
  { month: 'Aug', hip: 2.5, shoulder: 1.9, back: 44.8 },
  { month: 'Sep', hip: 2.8, shoulder: 2.1, back: 45.0 },
  { month: 'Oct', hip: 3.1, shoulder: 2.3, back: 45.3 },
  { month: 'Nov', hip: 3.1, shoulder: 2.8, back: 45.7 },
  { month: 'Dec', hip: 3.2, shoulder: 2.6, back: 44.0 },
];

export default function Trend() {
  const router = useRouter()
  return <RequireLogin>
    <div>
      <h1>Trend</h1>
      <h2 className="mb-2">Angles (degrees)</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={ { left: -32 } }>
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 4]} tick={{ fontSize: 12 }} />
          <Line type="monotone" dataKey='hip' stroke='#8884d8' />
          <Line type="monotone" dataKey='shoulder' stroke='#84d696' />
        </LineChart>
      </ResponsiveContainer>
      <div style={{ fontSize: '0.75rem' }} className="flex flex-row justify-between">
        <span style={{ background: '#8884d8', color: 'white', padding: '0.5rem', borderRadius: '0.25rem' }}>Shoulder</span>
        <span style={{ background: '#84d696', color: 'white', padding: '0.5rem', borderRadius: '0.25rem' }}>Hip</span>
      </div>
      <h2 className="mt-4 mb-2">Back height (cm)</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={ { left: -32 } }>
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis domain={[40, 50]} tick={{ fontSize: 12 }} />
          <Line type="monotone" dataKey='back' stroke='#18478e' />
        </LineChart>
      </ResponsiveContainer>
      <button className="w-full mt-8" onClick={() => router.push('/home')}>Back</button>
    </div>
  </RequireLogin>
}