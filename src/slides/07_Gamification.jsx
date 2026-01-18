import './slides.css'
import './Gamification.css'

function GamificationSlide() {
  return (
    <div className="slide gamification-slide">
      <header className="slide-header">
        <p className="slide-label">Progressive Learning</p>
        <h1 className="slide-title">
          From <span className="text-gradient">Training</span> to Deployment
        </h1>
        <p className="slide-subtitle">
          Structured progression ensures operators are ready before lives depend on their decisions.
        </p>
      </header>

      <div className="progression-visual">
        <div className="progression-track"></div>
        
        <div className="progression-stage progression-stage--training">
          <div className="progression-marker">
            <span className="progression-icon">🎯</span>
          </div>
          <div className="progression-content">
            <span className="progression-phase">Training</span>
            <strong className="progression-title">Learn the Basics</strong>
            <p>Simple environments, clear paths. Build confidence with controls and sensors.</p>
          </div>
        </div>

        <div className="progression-stage progression-stage--intermediate">
          <div className="progression-marker">
            <span className="progression-icon">📈</span>
          </div>
          <div className="progression-content">
            <span className="progression-phase">Intermediate</span>
            <strong className="progression-title">Handle Complexity</strong>
            <p>Obstacles and junctions. Practice decision-making under pressure.</p>
          </div>
        </div>

        <div className="progression-stage progression-stage--advanced">
          <div className="progression-marker">
            <span className="progression-icon">🚀</span>
          </div>
          <div className="progression-content">
            <span className="progression-phase">Advanced</span>
            <strong className="progression-title">Real-World Ready</strong>
            <p>Realistic scenarios with limited visibility and critical decisions.</p>
          </div>
        </div>
      </div>

      <p className="slide-takeaway">
        Operators who complete the full progression make <strong>40% fewer errors</strong> in deployment.
      </p>
    </div>
  )
}

export default GamificationSlide
