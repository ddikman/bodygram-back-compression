
export class ApiClient {
  constructor(email) {
    this.email = email
  }

  createScannerUrl = async () => {
    const json = await fetch(`/api/tokens`, {
      method: 'POST',
      headers: {
        'x-email': this.email
      }
    }).then((response) => response.json());
    return { scannerUrl: json.scannerUrl, customId: json.customId }
  }

  uploadScan = async (customId) => {
    await fetch(`/api/scans`, {
      method: 'POST',
      body: JSON.stringify({
        email: this.email,
        customId: customId
      })
    }).then((response) => response.json());
  }

  getRecentWeek = async () => {
    const json = await fetch(`/api/scans/recent`, {
    headers: {
        'x-email': this.email
      }
    }).then((response) => response.json());

    return {
      backHeight: json.backHeight,
      shoulder: json.shoulder,
      hip: json.hip,
      hasEntries: json.hasEntries
    }
  }

  getAverages = async () => {
    const response = await fetch('/api/scans/averages').then((response) => response.json());
    console.log('averages', response)
    return response
  }
}