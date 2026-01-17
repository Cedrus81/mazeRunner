import { useState, useEffect, useCallback } from 'react'
import './slides.css'
import './FullDemo.css'

const GRID_SIZE = 12
const VISION_RANGE = 2

// Generate a more complex map
function generateMap() {
  const map = Array(GRID_SIZE).fill(null).map(() => 
    Array(GRID_SIZE).fill('empty')
  )
  
  // Create walls that form a maze-like structure
  const walls = [
    // Vertical walls
    [1, 3], [2, 3], [3, 3], [4, 3],
    [7, 3], [8, 3], [9, 3], [10, 3],
    [1, 8], [2, 8], [3, 8],
    [8, 8], [9, 8], [10, 8],
    // Horizontal walls
    [5, 5], [5, 6], [5, 7],
    [6, 1], [6, 2],
    [6, 9], [6, 10],
  ]
  
  walls.forEach(([r, c]) => {
    if (r < GRID_SIZE && c < GRID_SIZE) {
      map[r][c] = 'wall'
    }
  })
  
  // Set goal
  map[10][10] = 'goal'
  
  return map
}

function FullDemoSlide() {
  const [map] = useState(generateMap)
  const [robotPos, setRobotPos] = useState({ row: 1, col: 1 })
  const [revealed, setRevealed] = useState(new Set())
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [blockedDetected, setBlockedDetected] = useState(0)
  
  // Sensor distances
  const [sensors, setSensors] = useState({ up: 0, down: 0, left: 0, right: 0 })
  
  const calculateSensors = useCallback((row, col) => {
    const dirs = {
      up: [-1, 0],
      down: [1, 0],
      left: [0, -1],
      right: [0, 1]
    }
    
    const newSensors = {}
    Object.entries(dirs).forEach(([dir, [dr, dc]]) => {
      let distance = 0
      let r = row + dr
      let c = col + dc
      while (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE && map[r][c] !== 'wall') {
        distance++
        r += dr
        c += dc
      }
      newSensors[dir] = distance
    })
    setSensors(newSensors)
  }, [map])
  
  const revealAround = useCallback((row, col) => {
    const newRevealed = new Set(revealed)
    let newBlocked = 0
    
    for (let dr = -VISION_RANGE; dr <= VISION_RANGE; dr++) {
      for (let dc = -VISION_RANGE; dc <= VISION_RANGE; dc++) {
        const nr = row + dr
        const nc = col + dc
        if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
          const key = `${nr},${nc}`
          if (!newRevealed.has(key)) {
            newRevealed.add(key)
            if (map[nr][nc] === 'wall') {
              newBlocked++
            }
          }
        }
      }
    }
    
    setRevealed(newRevealed)
    if (newBlocked > 0) {
      setBlockedDetected(prev => prev + newBlocked)
    }
  }, [revealed, map])
  
  // Initialize
  useEffect(() => {
    revealAround(robotPos.row, robotPos.col)
    calculateSensors(robotPos.row, robotPos.col)
  }, [])
  
  const moveRobot = useCallback((dr, dc) => {
    if (gameWon) return
    
    const newRow = robotPos.row + dr
    const newCol = robotPos.col + dc
    
    if (newRow >= 0 && newRow < GRID_SIZE && 
        newCol >= 0 && newCol < GRID_SIZE &&
        map[newRow][newCol] !== 'wall') {
      setRobotPos({ row: newRow, col: newCol })
      setMoves(m => m + 1)
      revealAround(newRow, newCol)
      calculateSensors(newRow, newCol)
      
      if (map[newRow][newCol] === 'goal') {
        setGameWon(true)
      }
    }
  }, [robotPos, map, gameWon, revealAround, calculateSensors])
  
  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'w' || e.key === 'W') moveRobot(-1, 0)
      if (e.key === 's' || e.key === 'S') moveRobot(1, 0)
      if (e.key === 'a' || e.key === 'A') moveRobot(0, -1)
      if (e.key === 'd' || e.key === 'D') moveRobot(0, 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [moveRobot])

  const exploredPercent = Math.round((revealed.size / (GRID_SIZE * GRID_SIZE)) * 100)

  const getSensorClass = (dist) => {
    if (dist === 0) return 'fulldemo__sensor--danger'
    if (dist <= 2) return 'fulldemo__sensor--warning'
    return 'fulldemo__sensor--safe'
  }

  return (
    <div className="slide slide--split interactive-demo">
      <div className="slide__left-panel">
        {gameWon && (
          <div className="fulldemo__win-banner glass-panel">
            🎉 Mission Complete! Moves: {moves}
          </div>
        )}
        
        <div className="fulldemo__grid">
          {map.map((row, r) => (
            row.map((cell, c) => {
              const isRevealed = revealed.has(`${r},${c}`)
              const isRobot = robotPos.row === r && robotPos.col === c
              const isWall = cell === 'wall'
              const isGoal = cell === 'goal'
              
              return (
                <div 
                  key={`${r},${c}`}
                  className={`fulldemo__cell 
                    ${isRevealed ? 'fulldemo__cell--revealed' : ''} 
                    ${isWall && isRevealed ? 'fulldemo__cell--wall' : ''} 
                    ${isGoal && isRevealed ? 'fulldemo__cell--goal' : ''}
                    ${isRobot ? 'fulldemo__cell--robot' : ''}`}
                >
                  {isRobot && <span>🤖</span>}
                  {isGoal && isRevealed && !isRobot && <span>🎯</span>}
                </div>
              )
            })
          ))}
        </div>
      </div>
      
      <div className="slide__right-panel">
        <div className="demo-panel glass-panel">
          <h3 className="demo-panel__title">🎯 Mission</h3>
          <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-2)' }}>
            Navigate to the target location
          </p>
          <div className="fulldemo__stat-row">
            <span>Progress</span>
            <span className="fulldemo__stat-value">{gameWon ? '100%' : `${Math.min(exploredPercent, 99)}%`}</span>
          </div>
        </div>
        
        <div className="demo-panel glass-panel">
          <h3 className="demo-panel__title">📡 Sensors</h3>
          <div className="fulldemo__sensors">
            <div className="fulldemo__sensor-row">
              <span className={`fulldemo__sensor ${getSensorClass(sensors.up)}`}>↑ {sensors.up}m</span>
            </div>
            <div className="fulldemo__sensor-row">
              <span className={`fulldemo__sensor ${getSensorClass(sensors.left)}`}>← {sensors.left}m</span>
              <span className={`fulldemo__sensor ${getSensorClass(sensors.right)}`}>{sensors.right}m →</span>
            </div>
            <div className="fulldemo__sensor-row">
              <span className={`fulldemo__sensor ${getSensorClass(sensors.down)}`}>↓ {sensors.down}m</span>
            </div>
          </div>
        </div>
        
        <div className="demo-panel glass-panel">
          <h3 className="demo-panel__title">📊 Stats</h3>
          <div className="fulldemo__stats">
            <div className="fulldemo__stat-item">
              <span className="fulldemo__stat-label">Moves</span>
              <span className="fulldemo__stat-number">{moves}</span>
            </div>
            <div className="fulldemo__stat-item">
              <span className="fulldemo__stat-label">Explored</span>
              <span className="fulldemo__stat-number">{exploredPercent}%</span>
            </div>
            <div className="fulldemo__stat-item">
              <span className="fulldemo__stat-label">Blocked Found</span>
              <span className="fulldemo__stat-number">{blockedDetected}</span>
            </div>
          </div>
        </div>
        
        <div className="demo-panel glass-panel">
          <h3 className="demo-panel__title">🎮 Controls</h3>
          <div className="fulldemo__controls">
            <kbd>W</kbd>
            <div><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullDemoSlide
