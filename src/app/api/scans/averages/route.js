import { NextResponse } from "next/server";
import { getScansAverage } from "../../getScansAverage";
import { parseScan } from "../../parseScan";
import supabase from '../../supabase'

export async function GET(req) {
  const { data, error, status } = await supabase.from('scans')
    .select('*')
    .eq('data->>status', 'success')

  const userScans = {}
  data.forEach((scan) => {
    const email = scan.email
    if (!userScans[email]) {
      userScans[email] = []
    }
    userScans[email].push(parseScan(scan))
  })

  const userAverages = Object.values(userScans).map((scans) => {
    return getScansAverage(scans)
  })

  return NextResponse.json(userAverages)
}