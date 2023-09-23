class ApiClient {
  getScannerUrl = async (email) => {
    const json = await fetch(`/api/token`, {
      headers: {
        'x-email': email
      }
    }).then((response) => response.json());
    return { scannerUrl: json.scannerUrl, customId: json.customId }
  }

  uploadScan = async (customId, email) => {
    await fetch(`/api/scan`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        customId: customId
      })
    }).then((response) => response.json());
  }
}

const apiClient = new ApiClient();

export default apiClient;