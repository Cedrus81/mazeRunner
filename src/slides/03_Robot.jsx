import './slides.css'

function RobotSlide() {
  const features = [
    {
      icon: '📡',
      title: 'Ultrasonic Sensors',
      desc: 'Detects obstacles and measures distances in all directions'
    },
    {
      icon: '🎮',
      title: 'Remote Control',
      desc: 'Human operator makes decisions at junction points'
    },
    {
      icon: '📹',
      title: 'Live Feedback',
      desc: 'Real-time sensor data transmitted to operator'
    },
    {
      icon: '🔋',
      title: 'Compact Design',
      desc: 'Small form factor navigates tight spaces'
    }
  ]

  return (
    <div className="slide">
      <h1 className="slide__title">
        Meet <span className="text-gradient">Tonybot</span>
      </h1>
      
      <p className="slide__subtitle">
        A remotely operated robot designed for hazardous exploration
      </p>
      
      <div className="robot-slide__features">
        {features.map((feature, i) => (
          <div 
            key={i} 
            className="feature-card glass-panel animate-slide-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <span className="feature-card__icon">{feature.icon}</span>
            <div className="feature-card__content">
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RobotSlide
