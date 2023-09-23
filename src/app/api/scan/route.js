import { createClient } from '@supabase/supabase-js'
import { NextResponse } from "next/server";
import BodygramClient from '../bodygramClient';

export async function POST(req) {
  const { email, customId } = await req.json()
  console.log(`Got request to upload scan for ${email} with customId ${customId}`)

  const bodygramClient = new BodygramClient()

  const scan = await bodygramClient.getScan(customId);

  const data = {
    'status': scan.status,
    bodyComposition: scan.bodyComposition,
    measurements: scan.measurements,
    posture: scan.posture,
  }
  console.log('scan data', data)

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  const { error, status } = await client.from('scans').update({
    email: email,
    data: data
  }).eq('id', customId)

  if (error) {
    return NextResponse.json({
      error: error
    }, { status })
  }

  return NextResponse.json({
    result: 'ok'
  })
}