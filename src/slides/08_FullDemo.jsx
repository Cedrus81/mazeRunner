import { useState, useEffect, useCallback, useRef } from 'react'
import './slides.css'
import './FullDemo.css'

const GRID_SIZE = 12
const GOAL = { row: 10, col: 10 }

function generateMap() {
  const map = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill('empty'))
  const walls = [[1, 3], [2, 3], [3, 3], [1, 7], [2, 7], [3, 7], [4, 5], [5, 5], [6, 5],
    [7, 2], [7, 3], [8, 7], [8, 8], [9, 4], [10, 4], [5, 9], [6, 9]]
  walls.forEach(([r, c]) => { if (r < GRID_SIZE && c < GRID_SIZE) map[r][c] = 'wall' })
  map[GOAL.row][GOAL.col] = 'goal'
  return map
}

function FullDemoSlide() {
  const [map] = useState(generateMap)
  const [robotPos, setRobotPos] = useState({ row: 1, col: 1 })
  const [revealed, setRevealed] = useState(new Set())
  const [moves, setMoves] = useState(0)
  const [won, setWon] = useState(false)
  const [sensorData, setSensorData] = useState({ front: 0, left: 0, right: 0, rear: 0 })

  const calculateSensors = useCallback((row, col) => {
    const checkDistance = (dr, dc) => {
      let dist = 0
      let r = row + dr, c = col + dc
      while (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE && map[r][c] !== 'wall') {
        dist++
        r += dr
        c += dc
      }
      return dist * 30 // Each cell is ~30cm
    }
    return {
      front: checkDistance(-1, 0),
      rear: checkDistance(1, 0),
      left: checkDistance(0, -1),
      right: checkDistance(0, 1)
    }
  }, [map])

  const revealAround = useCallback((row, col, current) => {
    const newRevealed = new Set(current)
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const nr = row + dr, nc = col + dc
        if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
          newRevealed.add(`${nr},${nc}`)
        }
      }
    }
    return newRevealed
  }, [])

  useEffect(() => {
    setRevealed(revealAround(robotPos.row, robotPos.col, new Set()))
    setSensorData(calculateSensors(robotPos.row, robotPos.col))
  }, [])

  const moveRobot = useCallback((dr, dc) => {
    if (won) return
    const newRow = robotPos.row + dr
    const newCol = robotPos.col + dc
    if (newRow >= 0 && newRow < GRID_SIZE && newCol >= 0 && newCol < GRID_SIZE && map[newRow][newCol] !== 'wall') {
      setRobotPos({ row: newRow, col: newCol })
      setRevealed(prev => revealAround(newRow, newCol, prev))
      setSensorData(calculateSensors(newRow, newCol))
      setMoves(m => m + 1)
      if (newRow === GOAL.row && newCol === GOAL.col) setWon(true)
    }
  }, [robotPos, map, won, revealAround, calculateSensors])

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
  
  const getStatus = (dist) => {
    if (dist < 30) return 'danger'
    if (dist < 90) return 'warning'
    return 'safe'
  }

  return (
    <div className="slide fulldemo-slide">
      <div className="fulldemo-slide__header">
        <h2 className="fulldemo-slide__label">Try It Yourself</h2>
        <h1 className="fulldemo-slide__title">
          The Complete <span className="text-gradient">Experience</span>
        </h1>
        <p className="fulldemo-slide__desc">Navigate to the goal using WASD. Watch your sensors!</p>
      </div>

      <div className="fulldemo-slide__content">
        <div className="fulldemo-slide__map-area">
          <div className="fulldemo-grid">
            {map.map((row, r) => (
              row.map((cell, c) => {
                const key = `${r},${c}`
                const isRevealed = revealed.has(key)
                const isRobot = robotPos.row === r && robotPos.col === c
                const isWall = cell === 'wall'
                const isGoal = cell === 'goal'
                
                return (
                  <div 
                    key={key}
                    className={`fulldemo-cell 
                      ${isRevealed ? 'fulldemo-cell--revealed' : ''} 
                      ${isWall && isRevealed ? 'fulldemo-cell--wall' : ''} 
                      ${isGoal && isRevealed ? 'fulldemo-cell--goal' : ''} 
                      ${isRobot ? 'fulldemo-cell--robot' : ''}`}
                  >
                    {isRobot && <span>🤖</span>}
                    {isGoal && isRevealed && !isRobot && <span>🎯</span>}
                  </div>
                )
              })
            ))}
          </div>
          
          {won && (
            <div className="fulldemo-win glass-panel">
              <h3>🎉 Mission Complete</h3>
              <p>Target reached in {moves} moves with {exploredPercent}% map explored.</p>
            </div>
          )}
        </div>

        <div className="fulldemo-slide__sidebar">
          <div className="fulldemo-panel glass-panel">
            <h3>Mission</h3>
            <p>Navigate to the target 🎯</p>
            <div className="fulldemo-panel__status">
              {won ? '✓ Complete' : 'In Progress'}
            </div>
          </div>
          
          <div className="fulldemo-panel glass-panel">
            <h3>Sensors</h3>
            <div className="fulldemo-sensors">
              {['front', 'left', 'right', 'rear'].map(dir => (
                <div key={dir} className={`fulldemo-sensor fulldemo-sensor--${getStatus(sensorData[dir])}`}>
                  <span className="fulldemo-sensor__label">{dir}</span>
                  <span className="fulldemo-sensor__value">{sensorData[dir]}cm</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="fulldemo-panel glass-panel">
            <h3>Stats</h3>
            <div className="fulldemo-stat">
              <span>Moves</span>
              <strong>{moves}</strong>
            </div>
            <div className="fulldemo-stat">
              <span>Explored</span>
              <strong>{exploredPercent}%</strong>
            </div>
          </div>
          
          <div className="fulldemo-panel glass-panel">
            <h3>Controls</h3>
            <div className="fulldemo-keys">
              <kbd>W</kbd>
              <div className="fulldemo-keys-row">
                <kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullDemoSlide
