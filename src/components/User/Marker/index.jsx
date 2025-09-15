function Marker({ className }) {
  return (
    <>
      <div className={`marker ${className}`}>
        <div className="load"></div>
        <div className="load"></div>
        <div className="load"></div>
        <div className="load"></div>
      </div>
    </>
  )
}

export default Marker;