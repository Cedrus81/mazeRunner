import { useState, useEffect, useRef, useCallback } from 'react'
import './slides.css'
import './Sensors.css'

function SensorsSlide() {
  const radarRef = useRef(null)
  const [readings, setReadings] = useState({
    front: 150,
    left: 150,
    right: 150,
    rear: 150
  })
  const [mouseInRadar, setMouseInRadar] = useState(false)

  const calculateDistances = useCallback((mouseX, mouseY) => {
    if (!radarRef.current) return
    
    const rect = radarRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    // Calculate relative position from center
    const dx = mouseX - centerX
    const dy = mouseY - centerY
    
    // Convert to cm (scale: 1px ≈ 2cm, max range ~300cm)
    const scale = 2
    const maxRange = 300
    
    // Based on CSS beam layout:
    // front beam -> extends RIGHT from robot (positive X)
    // rear beam -> extends LEFT from robot (negative X)  
    // left beam -> extends UP from robot (negative Y)
    // right beam -> extends DOWN from robot (positive Y)
    
    let front = maxRange, rear = maxRange, left = maxRange, right = maxRange
    
    // Determine primary direction based on which axis has greater magnitude
    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal primary
      if (dx > 0) {
        // Mouse is to the right -> front sensor
        front = Math.min(Math.abs(dx) * scale, maxRange)
      } else {
        // Mouse is to the left -> rear sensor
        rear = Math.min(Math.abs(dx) * scale, maxRange)
      }
    } else {
      // Vertical primary
      if (dy < 0) {
        // Mouse is above -> left sensor
        left = Math.min(Math.abs(dy) * scale, maxRange)
      } else {
        // Mouse is below -> right sensor
        right = Math.min(Math.abs(dy) * scale, maxRange)
      }
    }
    
    setReadings({
      front: Math.round(front),
      left: Math.round(left),
      right: Math.round(right),
      rear: Math.round(rear)
    })
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!radarRef.current) return
      
      const rect = radarRef.current.getBoundingClientRect()
      const isInside = e.clientX >= rect.left && e.clientX <= rect.right &&
                       e.clientY >= rect.top && e.clientY <= rect.bottom
      
      setMouseInRadar(isInside)
      
      if (isInside) {
        calculateDistances(e.clientX, e.clientY)
      } else {
        setReadings({ front: 300, left: 300, right: 300, rear: 300 })
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [calculateDistances])

  const getStatus = (distance) => {
    if (distance < 100) return { status: 'danger', label: 'Blocked' }
    if (distance < 200) return { status: 'warning', label: 'Close' }
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
        <header className="slide-header slide-header--left">
          <p className="slide-label">Real-Time Awareness</p>
          <h1 className="slide-title">
            <span className="text-gradient">Sensor Data</span> as Decision Support
          </h1>
          <p className="slide-subtitle">
            Four ultrasonic sensors transform uncertainty into actionable information.
          </p>
        </header>

        <div className="sensors-slide__explanation glass-panel">
          <h3>How sensors enable decisions</h3>
          <p>
            The robot doesn't just detect walls—it provides <strong>situational awareness</strong>. 
            Each reading tells the operator not just what's there, but what's possible.
          </p>
          <div className="sensors-slide__legend">
            <div className="legend-item legend-item--safe">
              <span className="legend-dot"></span>
              <span>&gt;200cm — Clear path ahead</span>
            </div>
            <div className="legend-item legend-item--warning">
              <span className="legend-dot"></span>
              <span>100-200cm — Obstacle nearby</span>
            </div>
            <div className="legend-item legend-item--danger">
              <span className="legend-dot"></span>
              <span>&lt;100cm — Path blocked</span>
            </div>
          </div>
        </div>
      </div>

      <div className="sensors-slide__visualization">
        <p className="sensors-slide__hint sensors-slide__hint--prominent">
          {mouseInRadar ? '🎯 Obstacle detected! Watch the beams react.' : '👆 Move your mouse over the radar to simulate an obstacle'}
        </p>
        
        <div className="sensors-display glass-panel" ref={radarRef}>
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
              const length = Math.min((value / 300) * 100, 100)
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
