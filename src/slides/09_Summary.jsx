import './slides.css'

function SummarySlide() {
  const points = [
    {
      icon: '🔍',
      iconClass: 'discover',
      text: 'Explore environments too dangerous for humans'
    },
    {
      icon: '🤝',
      iconClass: 'robot',
      text: 'Human judgment + Robot capability = Safe navigation'
    },
    {
      icon: '🎮',
      iconClass: 'progress',
      text: 'Gamification makes complex tasks intuitive and engaging'
    }
  ]

  return (
    <div className="slide">
      <h1 className="slide__title">
        <span className="text-gradient">Key Takeaways</span>
      </h1>
      
      <div className="summary-points">
        {points.map((point, i) => (
          <div 
            key={i} 
            className="summary-point glass-panel animate-slide-up"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <div className={`summary-point__icon summary-point__icon--${point.iconClass}`}>
              {point.icon}
            </div>
            <p className="summary-point__text">{point.text}</p>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: 'var(--space-12)', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-lg)' }}>
          Thank you for exploring with us
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-2)' }}>
          Tonybot Explorer • Gamified Robotic Exploration
        </p>
      </div>
    </div>
  )
}

export default SummarySlide
