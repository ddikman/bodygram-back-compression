export default function PageContainer({children, title}) {
  return <div className="flex flex-col pb-2" style={{ minHeight: '100%' }}>
    <h1>{title}</h1>
    {children}
  </div>
}