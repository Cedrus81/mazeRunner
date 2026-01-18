import './slides.css'
import './Robot.css'

function RobotSlide() {
  const capabilities = [
    {
      icon: '👁️',
      title: 'See',
      subtitle: 'what we can\'t',
      detail: 'Sensors capture data in complete darkness',
      image: './capability_see.png'
    },
    {
      icon: '🦿',
      title: 'Go',
      subtitle: 'where we shouldn\'t',
      detail: 'Bipedal design navigates hazardous terrain',
      image: './capability_go.png'
    },
    {
      icon: '🔗',
      title: 'Stay',
      subtitle: 'connected',
      detail: 'Continuous data stream to operators',
      image: './capability_stay.png'
    }
  ]

  return (
    <div className="slide robot-slide">
      <div className="robot-slide__hero">
        <img 
          src="./tonybot_real.png" 
          alt="Tonybot bipedal robot by Hiwonder"
          className="robot-slide__image"
        />
      </div>

      <div className="robot-slide__content">
        <header className="slide-header slide-header--left">
          <p className="slide-label">The Solution</p>
          <h1 className="slide-title">
            Meet <span className="text-gradient">Tonybot</span> Explorer
          </h1>
          <p className="slide-subtitle">
            Your eyes and hands where humans can't safely reach.
          </p>
        </header>

        <div className="robot-capabilities">
          {capabilities.map((cap, i) => (
            <div key={i} className="capability-item">
              <div className="capability-text">
                <span className="capability-icon">{cap.icon}</span>
                <div className="capability-content">
                  <strong>{cap.title}</strong> {cap.subtitle}
                  <span className="capability-detail">{cap.detail}</span>
                </div>
              </div>
              <div className="capability-image-wrapper">
                <img src={cap.image} alt="" className="capability-image" />
              </div>
            </div>
          ))}
        </div>

        <p className="slide-takeaway">
          Extends human capability without replacing human judgment.
        </p>
      </div>
    </div>
  )
}

export default RobotSlide
