import { useState, useEffect } from 'react'
import './slides.css'
import './Sensors.css'

function SensorsSlide() {
  const [distances, setDistances] = useState({
    up: 3,
    down: 5,
    left: 2,
    right: 4
  })
  
  // Simulate sensor readings changing
  useEffect(() => {
    const interval = setInterval(() => {
      setDistances({
        up: Math.floor(Math.random() * 5) + 1,
        down: Math.floor(Math.random() * 5) + 1,
        left: Math.floor(Math.random() * 5) + 1,
        right: Math.floor(Math.random() * 5) + 1,
      })
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])

  const getBarClass = (distance) => {
    if (distance <= 1) return 'sensors__bar--danger'
    if (distance <= 2) return 'sensors__bar--warning'
    return 'sensors__bar--safe'
  }

  return (
    <div className="slide">
      <h1 className="slide__title">
        <span className="text-gradient">Ultrasonic Sensing</span>
      </h1>
      
      <p className="slide__subtitle">
        Real-time distance measurements guide navigation decisions
      </p>
      
      <div className="sensors__display glass-panel">
        <div className="sensors__radar">
          <div className="sensors__center">🤖</div>
          
          {/* Up */}
          <div className="sensors__direction sensors__direction--up">
            <div className={`sensors__bar ${getBarClass(distances.up)}`} style={{ height: `${distances.up * 20}%` }}>
              <span className="sensors__value">{distances.up}m</span>
            </div>
          </div>
          
          {/* Down */}
          <div className="sensors__direction sensors__direction--down">
            <div className={`sensors__bar ${getBarClass(distances.down)}`} style={{ height: `${distances.down * 20}%` }}>
              <span className="sensors__value">{distances.down}m</span>
            </div>
          </div>
          
          {/* Left */}
          <div className="sensors__direction sensors__direction--left">
            <div className={`sensors__bar ${getBarClass(distances.left)}`} style={{ width: `${distances.left * 20}%` }}>
              <span className="sensors__value">{distances.left}m</span>
            </div>
          </div>
          
          {/* Right */}
          <div className="sensors__direction sensors__direction--right">
            <div className={`sensors__bar ${getBarClass(distances.right)}`} style={{ width: `${distances.right * 20}%` }}>
              <span className="sensors__value">{distances.right}m</span>
            </div>
          </div>
          
          {/* Ping animation */}
          <div className="sensors__ping animate-ping"></div>
        </div>
        
        <div className="sensors__legend">
          <div className="sensors__legend-item">
            <div className="sensors__legend-dot sensors__legend-dot--safe"></div>
            <span>Clear path (3m+)</span>
          </div>
          <div className="sensors__legend-item">
            <div className="sensors__legend-dot sensors__legend-dot--warning"></div>
            <span>Caution (2m)</span>
          </div>
          <div className="sensors__legend-item">
            <div className="sensors__legend-dot sensors__legend-dot--danger"></div>
            <span>Blocked (≤1m)</span>
          </div>
        </div>
      </div>
      
      <p className="sensors__note">
        Simulated sensor readings update every 2 seconds
      </p>
    </div>
  )
}

export default SensorsSlide
