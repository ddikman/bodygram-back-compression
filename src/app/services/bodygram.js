
export async function getScannerUrl(email) {
  const json = await fetch(`/api/token`, {
    headers: {
      'x-email': email
    }
  }).then((response) => response.json());
  return { scannerUrl: json.scannerUrl, customId: json.customId }
}

export async function uploadScan(customId, email) {
  await fetch(`/api/scan`, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      customId: customId
    })
  }).then((response) => response.json());
}