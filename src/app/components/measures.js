export default function Measures({ hip, shoulder, back, direction }) {
  const flexDir = direction === 'row' ? 'flex-row' : 'flex-col';
  return <div className={'flex gap-2 justify-between px-4 pt-2 ' + flexDir}>
    <SingleMeasure title="Hip angle" value={<span>{hip}°</span>} />
    <SingleMeasure title="Shoulder angle" value={<span>{shoulder}°</span>} />
    <SingleMeasure title="Back height" value={<span>{back / 10}<span style={{fontSize: '0.75em', marginLeft: '0.25em'}}>cm</span></span>} />
  </div>
}

function SingleMeasure({title, value}) {
  return <div className="flex flex-col justify-center">
    <div style={{ fontSize: '0.75em' }} className="text-center">{title}</div>
    <div className="text-center">{value}</div>
  </div>
}