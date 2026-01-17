import { useState, useCallback } from 'react'
import './slides.css'
import './Interaction.css'

function InteractionSlide() {
  const [decision, setDecision] = useState(null)
  const [history, setHistory] = useState([])
  
  const handleChoice = useCallback((direction) => {
    setDecision(direction)
    setHistory(prev => [...prev.slice(-4), direction])
  }, [])
  
  const directions = [
    { id: 'up', label: '↑ Forward', status: 'safe', desc: 'Clear path detected' },
    { id: 'left', label: '← Left', status: 'warning', desc: 'Narrow passage' },
    { id: 'right', label: '→ Right', status: 'blocked', desc: 'Obstacle detected' },
  ]

  return (
    <div className="slide slide--split interactive-demo">
      <div className="slide__left-panel">
        <h2 className="slide__title" style={{ fontSize: 'var(--font-size-2xl)' }}>
          <span className="text-gradient">Decision Points</span>
        </h2>
        <p className="slide__content" style={{ marginBottom: 'var(--space-6)' }}>
          At junctions, the robot stops and presents available paths. 
          The human operator evaluates sensor data and chooses the direction.
        </p>
        
        <div className="interaction__junction glass-panel">
          <div className="interaction__robot">🤖</div>
          
          <div className="interaction__paths">
            {directions.map((dir) => (
              <button
                key={dir.id}
                className={`interaction__path interaction__path--${dir.status} ${decision === dir.id ? 'interaction__path--selected' : ''}`}
                onClick={() => handleChoice(dir.id)}
                disabled={dir.status === 'blocked'}
              >
                <span className="interaction__path-label">{dir.label}</span>
                <span className="interaction__path-desc">{dir.desc}</span>
                {dir.status === 'blocked' && <span className="interaction__path-icon">🚫</span>}
                {dir.status === 'warning' && <span className="interaction__path-icon">⚠️</span>}
                {dir.status === 'safe' && <span className="interaction__path-icon">✓</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="slide__right-panel">
        <div className="demo-panel glass-panel">
          <h3 className="demo-panel__title">🎯 Current Decision</h3>
          {decision ? (
            <div className="interaction__decision">
              <span className="interaction__decision-label">Moving:</span>
              <span className="interaction__decision-value">
                {directions.find(d => d.id === decision)?.label}
              </span>
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>
              Select a direction to proceed
            </p>
          )}
        </div>
        
        <div className="demo-panel glass-panel">
          <h3 className="demo-panel__title">📜 Decision History</h3>
          {history.length > 0 ? (
            <div className="interaction__history">
              {history.map((h, i) => (
                <span key={i} className="interaction__history-item">
                  {h === 'up' ? '↑' : h === 'left' ? '←' : '→'}
                </span>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>
              No decisions made yet
            </p>
          )}
        </div>
        
        <div className="demo-panel glass-panel">
          <h3 className="demo-panel__title">💡 Key Insight</h3>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            The robot provides data. The human provides judgment. 
            Together they navigate safely.
          </p>
        </div>
      </div>
    </div>
  )
}

export default InteractionSlide
