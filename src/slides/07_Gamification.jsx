import './slides.css'

function GamificationSlide() {
  const levels = [
    {
      number: 1,
      title: 'Basic Exploration',
      desc: 'Navigate the environment. Reveal the map. Reach the goal.',
      features: ['Fog of War', 'Basic Movement', 'Goal Location']
    },
    {
      number: 2,
      title: 'Sensor Integration',
      desc: 'Use ultrasonic data to identify blocked paths before hitting them.',
      features: ['Distance Readings', 'Path Assessment', 'Danger Warnings']
    },
    {
      number: 3,
      title: 'Strategic Planning',
      desc: 'Optimize routes. Minimize moves. Complete missions efficiently.',
      features: ['Move Counter', 'Efficiency Score', 'Time Pressure']
    }
  ]

  return (
    <div className="slide">
      <h1 className="slide__title">
        <span className="text-gradient">Gamification Levels</span>
      </h1>
      
      <p className="slide__subtitle">
        Progressive complexity layers add new mechanics without changing the core loop
      </p>
      
      <div className="gamification-grid">
        {levels.map((level, i) => (
          <div 
            key={i} 
            className={`level-card glass-panel level-card--level-${level.number}`}
          >
            <div className="level-card__number text-gradient">{level.number}</div>
            <h3 className="level-card__title">{level.title}</h3>
            <p className="level-card__desc">{level.desc}</p>
            <ul className="level-card__features">
              {level.features.map((f, j) => (
                <li key={j}>{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GamificationSlide
