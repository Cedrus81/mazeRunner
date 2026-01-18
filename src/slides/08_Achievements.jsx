import './slides.css'
import './Achievements.css'

function AchievementsSlide() {
  return (
    <div className="slide achievements-slide">
      <header className="slide-header">
        <p className="slide-label">Exploration Feedback</p>
        <h1 className="slide-title">
          <span className="text-gradient">Achievements</span> as Learning Signals
        </h1>
        <p className="slide-subtitle">
          Structured feedback that reinforces exploration quality without automating decisions.
        </p>
      </header>

      <div className="achievements-visual">
        <div className="achievement-category">
          <h3 className="category-label">Discovery</h3>
          <div className="achievement-list">
            <div className="achievement-item">
              <span className="achievement-marker">◉</span>
              <div>
                <strong>First Contact</strong>
                <span>Discover the first unknown area</span>
              </div>
            </div>
            <div className="achievement-item">
              <span className="achievement-marker">◈</span>
              <div>
                <strong>Deep Explorer</strong>
                <span>Achieve high map coverage</span>
              </div>
            </div>
          </div>
        </div>

        <div className="achievement-category">
          <h3 className="category-label">Navigation</h3>
          <div className="achievement-list">
            <div className="achievement-item">
              <span className="achievement-marker">⋔</span>
              <div>
                <strong>Pathfinder</strong>
                <span>Reveal multiple branching paths</span>
              </div>
            </div>
            <div className="achievement-item">
              <span className="achievement-marker">◇</span>
              <div>
                <strong>Safe Navigator</strong>
                <span>Avoid high-risk zones</span>
              </div>
            </div>
          </div>
        </div>

        <div className="achievement-category">
          <h3 className="category-label">Analysis</h3>
          <div className="achievement-list">
            <div className="achievement-item">
              <span className="achievement-marker">⊘</span>
              <div>
                <strong>Obstacle Analyst</strong>
                <span>Document blocked routes</span>
              </div>
            </div>
            <div className="achievement-item achievement-item--highlight">
              <span className="achievement-marker">✓</span>
              <div>
                <strong>Mission Complete</strong>
                <span>Reach target with coverage</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="achievements-purpose">
        <span>📊 Performance feedback</span>
        <span className="purpose-divider">•</span>
        <span>📈 Progress tracking</span>
        <span className="purpose-divider">•</span>
        <span>🎯 Goal alignment</span>
      </div>
    </div>
  )
}

export default AchievementsSlide
