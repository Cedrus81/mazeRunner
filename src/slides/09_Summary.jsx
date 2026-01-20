import './slides.css'
import './Summary.css'

function SummarySlide() {
  return (
    <div className="slide poc-slide">
      <header className="slide-header">
        <p className="slide-label">Proof of Concept</p>
        <h1 className="slide-title slide-title--large">
          Live Exploration <span className="text-gradient">Demo</span>
        </h1>
        <p className="slide-subtitle">
          A real robot navigating an unknown environment using sensor data and human decisions.
        </p>
      </header>

      <div className="poc-video-container">
        <video 
          className="poc-video"
          controls
          poster=""
        >
          <source src="./mazerunner-poc.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="poc-callouts">
        <div className="poc-callout">
          <span className="poc-callout__icon">🤖</span>
          <span className="poc-callout__text">Physical robot in action</span>
        </div>
        <div className="poc-callout">
          <span className="poc-callout__icon">📡</span>
          <span className="poc-callout__text">Real sensor feedback</span>
        </div>
      </div>
    </div>
  )
}

export default SummarySlide
