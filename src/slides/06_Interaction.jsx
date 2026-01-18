import './slides.css'
import './Interaction.css'

function InteractionSlide() {
  const pathOptions = [
    {
      direction: 'Left',
      sensor: '45cm',
      status: 'warning',
      note: 'Narrow passage detected'
    },
    {
      direction: 'Ahead',
      sensor: '180cm',
      status: 'safe',
      note: 'Clear path, slight incline'
    },
    {
      direction: 'Right',
      sensor: '25cm',
      status: 'danger',
      note: 'Blocked by debris'
    }
  ]

  return (
    <div className="slide interaction-slide">
      <div className="interaction-slide__content">
        <header className="slide-header slide-header--left">
          <p className="slide-label">Human-Robot Partnership</p>
          <h1 className="slide-title">
            When the Robot <span className="text-gradient">Needs You</span>
          </h1>
          <p className="slide-subtitle">
            Sensors inform. Humans decide. The robot executes.
          </p>
        </header>

        <div className="interaction-slide__principle glass-panel">
          <p>
            At decision points—junctions, obstacles, uncertain terrain—the robot 
            <strong> stops and presents options</strong>. It provides data, not answers.
          </p>
        </div>
      </div>

      <div className="interaction-slide__junction">
        <div className="junction-visual">
          <div className="junction-center">
            <span className="junction-robot">🤖</span>
            <span className="junction-label">Decision Point</span>
          </div>
          
          {pathOptions.map((path, i) => (
            <div 
              key={i} 
              className={`junction-path junction-path--${path.direction.toLowerCase()} junction-path--${path.status}`}
            >
              <div className="junction-path__arrow"></div>
              <div className="junction-path__info glass-panel">
                <span className="junction-path__direction">{path.direction}</span>
                <span className="junction-path__sensor">{path.sensor}</span>
                <span className="junction-path__note">{path.note}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="interaction-slide__callout">
          <div className="callout-item">
            <span className="callout-icon">📡</span>
            <span><strong>Sensor data</strong> shows what's there</span>
          </div>
          <div className="callout-divider">but</div>
          <div className="callout-item">
            <span className="callout-icon">🧠</span>
            <span><strong>Human judgment</strong> decides what to do</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractionSlide
