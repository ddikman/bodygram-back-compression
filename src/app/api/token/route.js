import { NextResponse } from "next/server";

const orgId = process.env.ORG_ID;
const apiKey = process.env.API_KEY;

export async function GET(req) {
  const url = `https://platform.bodygram.com/api/orgs/${orgId}/scan-tokens`
  const json = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': apiKey
    },
    body: JSON.stringify({
      'scope': [
        'api.platform.bodygram.com/scans:create'
      ]
    })
  }).then((response) => response.json());

  return NextResponse.json({
    token: json.token,
    scannerUrl: `https://platform.bodygram.com/en/${orgId}/scan?token=${json.token}&system=metric`
  })
}