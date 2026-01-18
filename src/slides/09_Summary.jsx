import './slides.css'
import './Summary.css'

function SummarySlide() {
  return (
    <div className="slide summary-slide">
      <header className="slide-header">
        <p className="slide-label">The Vision</p>
        <h1 className="slide-title slide-title--large">
          Human-Robot <span className="text-gradient">Partnership</span>
        </h1>
      </header>

      <div className="summary-content">
        <div className="summary-section">
          <h3 className="summary-section__label">The Problem</h3>
          <p className="summary-section__text">
            Dangerous environments kill first responders. Robots can go where humans can't—but 
            <strong> autonomous systems alone can't make human decisions</strong>.
          </p>
        </div>

        <div className="summary-section">
          <h3 className="summary-section__label">Our Approach</h3>
          <div className="summary-points">
            <div className="summary-point">
              <span className="summary-point__marker">→</span>
              <span><strong>Fog of War</strong> reflects real exploration uncertainty</span>
            </div>
            <div className="summary-point">
              <span className="summary-point__marker">→</span>
              <span><strong>Sensor data</strong> informs but doesn't decide</span>
            </div>
            <div className="summary-point">
              <span className="summary-point__marker">→</span>
              <span><strong>Human-in-the-loop</strong> at every critical moment</span>
            </div>
            <div className="summary-point">
              <span className="summary-point__marker">→</span>
              <span><strong>Progressive training</strong> builds real competence</span>
            </div>
          </div>
        </div>

        <div className="summary-section summary-section--highlight">
          <h3 className="summary-section__label">What Makes This Different</h3>
          <p className="summary-section__text">
            This isn't a robot demo. It's a <strong>training system for human operators</strong>. 
            Gamification doesn't make it fun—it makes operators ready for real missions.
          </p>
        </div>
      </div>

      <div className="summary-footer">
        <p className="summary-closing">
          When humans can't go forward, exploration doesn't stop.
        </p>
      </div>
    </div>
  )
}

export default SummarySlide
