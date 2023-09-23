import { NextResponse } from "next/server";
import BodygramClient from "../bodygramClient";
import supabase from "../supabase";
import { headers } from "next/headers";

export async function POST(req) {

  const email = headers().get('x-email')
  console.log(`Got request to create scanner url for ${email}`)
  const { data } = await supabase.from('scans').insert({
    email: email,
    data: {
      'status': 'pending'
    }
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