import { NextResponse } from 'next/server';
import supabase from '../../supabase'
import { headers } from "next/headers";

function getDegrees(scan, name) {
  const angle = scan.data.posture.front.angles.find((angle) => angle.name === name)
  if (angle) {
    return angle.value
  }
  throw new Error(`Angle ${name} not found`)
}

function getMeasure(scan, name) {
  const measure = scan.data.measurements.find((measure) => measure.name === name)
  if (measure) {
    return measure.value
  }
  throw new Error(`Measure ${name} not found`)
}

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

  const scans = data.map((scan) => ({
    id: scan.id,
    status: scan.data.status,
    createdAt: scan.created_at,
    backHeight: getMeasure(scan, 'backNeckPointToWaist'),
    posture: {
      shoulder: getDegrees(scan, 'shoulder'),
      hip: getDegrees(scan, 'topHip')
    }
  }))

  if (scans.length === 0) {
    return NextResponse.json({
      hasEntries: false
    })
  }

  const averages = {
    backHeight: scans.reduce((acc, scan) => acc + scan.backHeight, 0) / scans.length,
    shoulder: scans.reduce((acc, scan) => acc + scan.posture.shoulder, 0) / scans.length,
    hip: scans.reduce((acc, scan) => acc + scan.posture.hip, 0) / scans.length,
    hasEntries: true
  }

  return NextResponse.json(averages)
}