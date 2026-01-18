import { useState, useEffect } from 'react'
import './slides.css'
import './Sensors.css'

function SensorsSlide() {
  const [readings, setReadings] = useState({
    front: 42,
    left: 25,
    right: 248,
    rear: 201
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setReadings({
        front: Math.floor(Math.random() * 280) + 20,
        left: Math.floor(Math.random() * 280) + 20,
        right: Math.floor(Math.random() * 280) + 20,
        rear: Math.floor(Math.random() * 280) + 20
      })
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const getStatus = (distance) => {
    if (distance < 50) return { status: 'danger', label: 'Blocked' }
    if (distance < 120) return { status: 'warning', label: 'Close' }
    return { status: 'safe', label: 'Clear' }
  }

  const directions = [
    { key: 'front', label: 'Front', angle: 0 },
    { key: 'right', label: 'Right', angle: 90 },
    { key: 'rear', label: 'Rear', angle: 180 },
    { key: 'left', label: 'Left', angle: 270 }
  ]

  return (
    <div className="slide sensors-slide">
      <div className="sensors-slide__content">
        <div className="sensors-slide__header">
          <h2 className="sensors-slide__label">Real-Time Awareness</h2>
          <h1 className="sensors-slide__title">
            <span className="text-gradient">Sensor Data</span> as Decision Support
          </h1>
          <p className="sensors-slide__desc">
            Four ultrasonic sensors continuously measure distances to nearby obstacles. 
            This data transforms uncertainty into actionable information.
          </p>
        </div>

        <div className="sensors-slide__explanation glass-panel">
          <h3>How sensors enable decisions</h3>
          <p>
            The robot doesn't just detect walls—it provides <strong>situational awareness</strong>. 
            Each reading tells the operator not just what's there, but what's possible.
          </p>
          <div className="sensors-slide__legend">
            <div className="legend-item legend-item--safe">
              <span className="legend-dot"></span>
              <span>&gt;120cm — Clear path ahead</span>
            </div>
            <div className="legend-item legend-item--warning">
              <span className="legend-dot"></span>
              <span>50-120cm — Obstacle nearby</span>
            </div>
            <div className="legend-item legend-item--danger">
              <span className="legend-dot"></span>
              <span>&lt;50cm — Path blocked</span>
            </div>
          </div>
        </div>
      </div>

      <div className="sensors-slide__visualization">
        <div className="sensors-display glass-panel">
          <div className="sensors-radar">
            <div className="sensors-radar__rings">
              <div className="sensors-radar__ring"></div>
              <div className="sensors-radar__ring"></div>
              <div className="sensors-radar__ring"></div>
            </div>
            <div className="sensors-radar__robot">🤖</div>
            {directions.map(dir => {
              const value = readings[dir.key]
              const info = getStatus(value)
              const length = Math.min((value / 300) * 80, 80)
              return (
                <div 
                  key={dir.key}
                  className={`sensors-radar__beam sensors-radar__beam--${dir.key} sensors-radar__beam--${info.status}`}
                  style={{ '--beam-length': `${length}px` }}
                >
                  <span className="sensors-radar__reading">{value}cm</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="sensors-slide__readings">
          {directions.map(dir => {
            const value = readings[dir.key]
            const info = getStatus(value)
            return (
              <div key={dir.key} className={`reading-card glass-panel reading-card--${info.status}`}>
                <span className="reading-card__direction">{dir.label}</span>
                <span className="reading-card__value">{value}cm</span>
                <div className="reading-card__bar">
                  <div 
                    className="reading-card__fill"
                    style={{ width: `${Math.min((value / 300) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SensorsSlide
