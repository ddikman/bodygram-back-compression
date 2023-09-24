export function getScansAverage(scans) {
  const getAverage = (values) => {
    const total = values.reduce((acc, value) => acc + value, 0) / values.length
    return Math.round(total * 100) / 100;
  }


  return {
    backHeight: getAverage(scans.map((scan) => scan.backHeight)),
    shoulder: getAverage(scans.map((scan) => scan.posture.shoulder)),
    hip: getAverage(scans.map((scan) => scan.posture.hip))
  }
}