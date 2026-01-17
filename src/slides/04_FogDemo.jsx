import { useState, useEffect, useCallback, useRef } from 'react'
import './slides.css'
import './FogDemo.css'

const GRID_SIZE = 11
const VISION_RANGE = 1 // Only adjacent cells revealed

// Generate an open maze with clear corridors
function generateMaze() {
  const map = Array(GRID_SIZE).fill(null).map(() => 
    Array(GRID_SIZE).fill('empty')
  )
  
  // Create scattered obstacles (not blocking paths)
  const walls = [
    // Some scattered obstacles to navigate around
    [1, 4], [2, 4],
    [1, 7], [2, 7],
    [4, 1], [4, 2],
    [4, 8], [4, 9],
    [6, 1], [6, 2],
    [6, 8], [6, 9],
    [8, 4], [9, 4],
    [8, 6], [9, 6],
    // Center obstacle
    [5, 5],
  ]
  
  walls.forEach(([r, c]) => {
    if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) {
      map[r][c] = 'wall'
    }
  })
  
  return map
}

// Improved pathfinding - uses BFS to find unexplored areas
function findBestMove(map, pos, visited, revealed) {
  const directions = [
    { dr: -1, dc: 0, name: 'up' },
    { dr: 1, dc: 0, name: 'down' },
    { dr: 0, dc: -1, name: 'left' },
    { dr: 0, dc: 1, name: 'right' },
  ]
  
  // Get valid adjacent moves
  const validMoves = []
  for (const { dr, dc, name } of directions) {
    const nr = pos.row + dr
    const nc = pos.col + dc
    if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE && 
        map[nr][nc] !== 'wall') {
      const key = `${nr},${nc}`
      validMoves.push({
        row: nr,
        col: nc,
        dr,
        dc,
        visited: visited.has(key),
        // Score based on how much new area we'd reveal
        newCells: countNewCells(nr, nc, revealed)
      })
    }
  }
  
  if (validMoves.length === 0) return null
  
  // Prioritize: unvisited cells that reveal most new area
  validMoves.sort((a, b) => {
    if (a.visited !== b.visited) return a.visited - b.visited
    return b.newCells - a.newCells
  })
  
  return { dr: validMoves[0].dr, dc: validMoves[0].dc }
}

function countNewCells(row, col, revealed) {
  let count = 0
  for (let dr = -VISION_RANGE; dr <= VISION_RANGE; dr++) {
    for (let dc = -VISION_RANGE; dc <= VISION_RANGE; dc++) {
      const nr = row + dr
      const nc = col + dc
      if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
        if (!revealed.has(`${nr},${nc}`)) count++
      }
    }
  }
  return count
}

function FogDemoSlide() {
  const [map] = useState(generateMaze)
  const [robotPos, setRobotPos] = useState({ row: 5, col: 0 })
  const [revealed, setRevealed] = useState(new Set())
  const [visitedCells, setVisitedCells] = useState(new Set())
  const [isAutoMode, setIsAutoMode] = useState(true)
  const autoIntervalRef = useRef(null)
  
  // Reveal cells around robot (only adjacent now)
  const revealAround = useCallback((row, col, currentRevealed) => {
    const newRevealed = new Set(currentRevealed)
    for (let dr = -VISION_RANGE; dr <= VISION_RANGE; dr++) {
      for (let dc = -VISION_RANGE; dc <= VISION_RANGE; dc++) {
        const nr = row + dr
        const nc = col + dc
        if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
          newRevealed.add(`${nr},${nc}`)
        }
      }
    }
    return newRevealed
  }, [])
  
  // Initialize vision
  useEffect(() => {
    const initialRevealed = revealAround(robotPos.row, robotPos.col, new Set())
    setRevealed(initialRevealed)
    setVisitedCells(new Set([`${robotPos.row},${robotPos.col}`]))
  }, [])
  
  const moveRobot = useCallback((dr, dc) => {
    setRobotPos(prevPos => {
      const newRow = prevPos.row + dr
      const newCol = prevPos.col + dc
      
      if (newRow >= 0 && newRow < GRID_SIZE && 
          newCol >= 0 && newCol < GRID_SIZE &&
          map[newRow][newCol] !== 'wall') {
        
        setRevealed(prev => revealAround(newRow, newCol, prev))
        setVisitedCells(prev => new Set(prev).add(`${newRow},${newCol}`))
        
        return { row: newRow, col: newCol }
      }
      return prevPos
    })
  }, [map, revealAround])
  
  // Auto-exploration logic with improved AI
  const autoMove = useCallback(() => {
    const move = findBestMove(map, robotPos, visitedCells, revealed)
    if (move) {
      moveRobot(move.dr, move.dc)
    }
  }, [map, robotPos, visitedCells, revealed, moveRobot])
  
  // Auto mode interval
  useEffect(() => {
    if (isAutoMode) {
      autoIntervalRef.current = setInterval(autoMove, 350)
    } else {
      if (autoIntervalRef.current) {
        clearInterval(autoIntervalRef.current)
      }
    }
    return () => {
      if (autoIntervalRef.current) {
        clearInterval(autoIntervalRef.current)
      }
    }
  }, [isAutoMode, autoMove])
  
  // Manual keyboard controls (only when not in auto mode)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isAutoMode) return
      
      if (e.key === 'w' || e.key === 'W') moveRobot(-1, 0)
      if (e.key === 's' || e.key === 'S') moveRobot(1, 0)
      if (e.key === 'a' || e.key === 'A') moveRobot(0, -1)
      if (e.key === 'd' || e.key === 'D') moveRobot(0, 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [moveRobot, isAutoMode])

  const exploredPercent = Math.round((revealed.size / (GRID_SIZE * GRID_SIZE)) * 100)
  const visitedPercent = Math.round((visitedCells.size / (GRID_SIZE * GRID_SIZE)) * 100)

  return (
    <div className="slide slide--split interactive-demo">
      <div className="slide__left-panel">
        <h2 className="slide__title" style={{ fontSize: 'var(--font-size-2xl)' }}>
          <span className="text-gradient">Fog of War</span>
        </h2>
        <p className="slide__content" style={{ marginBottom: 'var(--space-4)' }}>
          The robot autonomously explores, revealing only adjacent cells. Switch to manual control to guide it yourself.
        </p>
        
        <div className="fog-demo__grid">
          {map.map((row, r) => (
            row.map((cell, c) => {
              const isRevealed = revealed.has(`${r},${c}`)
              const isVisited = visitedCells.has(`${r},${c}`)
              const isRobot = robotPos.row === r && robotPos.col === c
              const isWall = cell === 'wall'
              
              return (
                <div 
                  key={`${r},${c}`}
                  className={`fog-demo__cell 
                    ${isRevealed ? 'fog-demo__cell--revealed' : ''} 
                    ${isVisited && isRevealed ? 'fog-demo__cell--visited' : ''}
                    ${isWall && isRevealed ? 'fog-demo__cell--wall' : ''} 
                    ${isRobot ? 'fog-demo__cell--robot' : ''}`}
                >
                  {isRobot && (
                    <div className="fog-demo__robot">🤖</div>
                  )}
                </div>
              )
            })
          ))}
        </div>
      </div>
      
      <div className="slide__right-panel">
        <div className="demo-panel glass-panel">
          <h3 className="demo-panel__title">🎛️ Control Mode</h3>
          <div className="fog-demo__mode-switch">
            <button 
              className={`fog-demo__mode-btn ${isAutoMode ? 'fog-demo__mode-btn--active' : ''}`}
              onClick={() => setIsAutoMode(true)}
            >
              <span className="fog-demo__mode-icon">🤖</span>
              Auto
            </button>
            <button 
              className={`fog-demo__mode-btn ${!isAutoMode ? 'fog-demo__mode-btn--active' : ''}`}
              onClick={() => setIsAutoMode(false)}
            >
              <span className="fog-demo__mode-icon">🎮</span>
              Manual
            </button>
          </div>
          <p className="fog-demo__mode-hint">
            {isAutoMode 
              ? 'Robot is exploring automatically' 
              : 'Use WASD to control the robot'}
          </p>
        </div>
        
        <div className="demo-panel glass-panel">
          <h3 className="demo-panel__title">📊 Exploration</h3>
          <div className="fog-demo__stat">
            <span>Revealed</span>
            <span className="fog-demo__stat-value">{exploredPercent}%</span>
          </div>
          <div className="fog-demo__progress">
            <div 
              className="fog-demo__progress-bar fog-demo__progress-bar--revealed" 
              style={{ width: `${exploredPercent}%` }}
            />
          </div>
          <div className="fog-demo__stat" style={{ marginTop: 'var(--space-3)' }}>
            <span>Visited</span>
            <span className="fog-demo__stat-value fog-demo__stat-value--visited">{visitedPercent}%</span>
          </div>
          <div className="fog-demo__progress">
            <div 
              className="fog-demo__progress-bar fog-demo__progress-bar--visited" 
              style={{ width: `${visitedPercent}%` }}
            />
          </div>
        </div>
        
        {!isAutoMode && (
          <div className="demo-panel glass-panel">
            <h3 className="demo-panel__title">🎮 Controls</h3>
            <div className="fog-demo__controls">
              <div className="fog-demo__key-row">
                <kbd>W</kbd>
              </div>
              <div className="fog-demo__key-row">
                <kbd>A</kbd>
                <kbd>S</kbd>
                <kbd>D</kbd>
              </div>
            </div>
          </div>
        )}
        
        <div className="demo-panel glass-panel">
          <h3 className="demo-panel__title">💡 Legend</h3>
          <div className="fog-demo__legend">
            <div className="fog-demo__legend-item">
              <div className="fog-demo__legend-box fog-demo__legend-box--hidden"></div>
              <span>Unknown</span>
            </div>
            <div className="fog-demo__legend-item">
              <div className="fog-demo__legend-box fog-demo__legend-box--revealed"></div>
              <span>Revealed</span>
            </div>
            <div className="fog-demo__legend-item">
              <div className="fog-demo__legend-box fog-demo__legend-box--visited"></div>
              <span>Visited</span>
            </div>
            <div className="fog-demo__legend-item">
              <div className="fog-demo__legend-box fog-demo__legend-box--wall"></div>
              <span>Blocked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FogDemoSlide
