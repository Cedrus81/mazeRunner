import './slides.css'
import './Summary.css'

function SummarySlide() {
  return (
    <div className="slide summary-slide">
      <div className="summary-slide__content">
        <h1 className="summary-slide__title">
          This is How We Explore the Unknown—<span className="text-gradient">Together</span>
        </h1>
        
        <div className="summary-slide__pillars">
          <div className="summary-pillar glass-panel">
            <span className="summary-pillar__icon">👁️</span>
            <h3>Awareness</h3>
            <p>Real-time sensor data transforms uncertainty into navigable terrain.</p>
          </div>
          <div className="summary-pillar glass-panel">
            <span className="summary-pillar__icon">🤝</span>
            <h3>Collaboration</h3>
            <p>Human judgment meets robotic capability at every decision point.</p>
          </div>
          <div className="summary-pillar glass-panel">
            <span className="summary-pillar__icon">📈</span>
            <h3>Progression</h3>
            <p>Structured learning ensures operators are ready when it matters.</p>
          </div>
        </div>

        <div className="summary-slide__vision glass-panel">
          <h3>What's next?</h3>
          <p>
            Tonybot Explorer is a proof of concept for a new kind of human-robot partnership. 
            The same principles can extend to underwater exploration, aerial reconnaissance, 
            and any environment where human presence is dangerous but human judgment is essential.
          </p>
        </div>

        <div className="summary-slide__cta">
          <p className="summary-slide__closing">
            When humans can't go forward, exploration doesn't stop.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SummarySlide
