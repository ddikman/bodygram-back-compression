
export async function getScannerUrl() {
  const json = await fetch(`/api/token`).then((response) => response.json());
  return json.scannerUrl
}