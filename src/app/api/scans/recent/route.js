import { NextResponse } from 'next/server';
import supabase from '../../supabase'
import { headers } from "next/headers";
import { parseScan } from '../../parseScan';
import { getScansAverage } from '../../getScansAverage';

export async function GET(req) {
  const email = headers(req).get('x-email')

  console.log(`Got request to get scans overview for ${email}`)

  const { data, error, status } = await supabase.from('scans').select('*')
    .eq('email', email)
    .eq('data->>status', 'success')

  if (error) {
    return NextResponse.json({
      error: error
    }, { status })
  }

  const scans = data.map(parseScan)

  if (scans.length === 0) {
    return NextResponse.json({
      hasEntries: false
    })
  }

  const averages = {
    ...getScansAverage(scans),
    hasEntries: true
  }

  return NextResponse.json(averages)
}