import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js'
import BodygramClient from "../bodygramClient";

export async function GET(req) {

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  const email = req.headers['x-email']
  const { data } = await client.from('scans').insert({
    email: email,
    data: JSON.stringify({
      'status': 'pending'
    })
  }).select()


  const customId = data[0].id

  const bodyGramClient = new BodygramClient()
  const token = await bodyGramClient.getToken(customId)
  const scanUrl = bodyGramClient.getScanUrl(token)

  return NextResponse.json({
    token: token,
    customId: customId,
    scannerUrl: scanUrl
  })
}