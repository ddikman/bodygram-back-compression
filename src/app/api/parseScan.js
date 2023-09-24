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

function parseScan(rawScan) {
  return {
    id: rawScan.id,
    status: rawScan.data.status,
    createdAt: rawScan.created_at,
    backHeight: getMeasure(rawScan, 'backNeckPointToWaist'),
    posture: {
      shoulder: getDegrees(rawScan, 'shoulder'),
      hip: getDegrees(rawScan, 'topHip')
    }
  }
}

export {
  parseScan
}