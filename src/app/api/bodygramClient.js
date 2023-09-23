const orgId = process.env.ORG_ID;
const apiKey = process.env.API_KEY;

const baseUrl = `https://platform.bodygram.com/api/orgs/${orgId}`

async function request(url, method, body) {
  return fetch(baseUrl + url, {
    method: method,
    headers: {
      'Authorization': apiKey
    },
    body: body ? JSON.stringify(body) : undefined
  }).then((response) => response.json());
}

export default class BodygramClient {
  getToken = async (customScanId) => {
    const response = await request('/scan-tokens', 'POST', {
      'customScanId': customScanId,
      'scope': [
        'api.platform.bodygram.com/scans:create'
      ]
    })

    return response.token
  }

  findScan = async (customScanId) => {
    const response = await request(`/scans?limit=30&customScanId=${customScanId}`, 'GET')
    if (response.results.length === 0) {
      throw new Error('Scan not found')
    }
    return response.results[0]
  }

  getScan = async (customScanId) => {
    const scan = await this.findScan(customScanId)
    const response = await request(`/scans/${scan.id}`, 'GET')
    return response.entry
  }

  getScanUrl = (scanToken) => {
    return `https://platform.bodygram.com/en/${orgId}/scan?token=${scanToken}&system=metric`
  }
}