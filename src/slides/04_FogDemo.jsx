import { useState, useEffect, useCallback, useRef } from 'react'
import './slides.css'
import './FogDemo.css'

const GRID_SIZE = 11
const VISION_RANGE = 1

function generateMaze() {
  const map = Array(GRID_SIZE).fill(null).map(() => 
    Array(GRID_SIZE).fill('empty')
  )
  
const walls = [
  // --- Upper structure (creates early maze feel, but still passable) ---
  [0,3], [0,7],
  [1,1], [1,2], [1,9],
  [2,0], [2,2], [2,3], [2,4], [2,6], [2,7], [2,8],
  [3,3], [3,5], [3,7], [3,9],
  [4,1], [4,2], [4,3], [4,5], [4,7], [4,8],

  // --- Middle density (lots of junctions + “rooms” feeling) ---
  [5,5], [5,6], [5,7], [5,9],
  [6,1], [6,2], [6,3], [6,5], [6,6], [6,8], [6,9],
  [7,1], [7,3], [7,5],

  // --- Lower structure (second barrier line + side routes) ---
  [8,0], [8,1], [8,3], [8,5], [8,7], [8,8], [8,9],
  [9,1], [9,2], [9,5], [9,7], [9,9],
  [10,3], [10,8], [10,9],
]
  
  walls.forEach(([r, c]) => {
    if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) {
      map[r][c] = 'wall'
    }
  })
  
  return map
}

function findBestMove(map, pos, visited, revealed) {
  const directions = [
    { dr: -1, dc: 0 }, { dr: 1, dc: 0 },
    { dr: 0, dc: -1 }, { dr: 0, dc: 1 },
  ]
  
  const validMoves = []
  for (const { dr, dc } of directions) {
    const nr = pos.row + dr
    const nc = pos.col + dc
    if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE && 
        map[nr][nc] !== 'wall') {
      const key = `${nr},${nc}`
      let newCells = 0
      for (let ddr = -1; ddr <= 1; ddr++) {
        for (let ddc = -1; ddc <= 1; ddc++) {
          const nnr = nr + ddr, nnc = nc + ddc
          if (nnr >= 0 && nnr < GRID_SIZE && nnc >= 0 && nnc < GRID_SIZE) {
            if (!revealed.has(`${nnr},${nnc}`)) newCells++
          }
        }
      }
      validMoves.push({ dr, dc, visited: visited.has(key), newCells })
    }
  }
  
  if (validMoves.length === 0) return null
  validMoves.sort((a, b) => a.visited !== b.visited ? a.visited - b.visited : b.newCells - a.newCells)
  return { dr: validMoves[0].dr, dc: validMoves[0].dc }
}

function FogDemoSlide() {
  const [map] = useState(generateMaze)
  const [robotPos, setRobotPos] = useState({ row: 5, col: 0 })
  const [revealed, setRevealed] = useState(new Set())
  const [visitedCells, setVisitedCells] = useState(new Set())
  const [isAutoMode, setIsAutoMode] = useState(true)
  const autoIntervalRef = useRef(null)
  const isAutoModeRef = useRef(true)
  const moveRobotRef = useRef(null)
  
  const revealAround = useCallback((row, col, currentRevealed) => {
    const newRevealed = new Set(currentRevealed)
    for (let dr = -VISION_RANGE; dr <= VISION_RANGE; dr++) {
      for (let dc = -VISION_RANGE; dc <= VISION_RANGE; dc++) {
        const nr = row + dr, nc = col + dc
        if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
          newRevealed.add(`${nr},${nc}`)
        }
      }
    }
    return newRevealed
  }, [])
  
  useEffect(() => {
    const initialRevealed = revealAround(robotPos.row, robotPos.col, new Set())
    setRevealed(initialRevealed)
    setVisitedCells(new Set([`${robotPos.row},${robotPos.col}`]))
  }, [])
  
  const moveRobot = useCallback((dr, dc) => {
    setRobotPos(prevPos => {
      const newRow = prevPos.row + dr
      const newCol = prevPos.col + dc
      if (newRow >= 0 && newRow < GRID_SIZE && newCol >= 0 && newCol < GRID_SIZE && map[newRow][newCol] !== 'wall') {
        setRevealed(prev => revealAround(newRow, newCol, prev))
        setVisitedCells(prev => new Set(prev).add(`${newRow},${newCol}`))
        return { row: newRow, col: newCol }
      }
      return prevPos
    })
  }, [map, revealAround])
  
  const autoMove = useCallback(() => {
    const move = findBestMove(map, robotPos, visitedCells, revealed)
    if (move) moveRobot(move.dr, move.dc)
  }, [map, robotPos, visitedCells, revealed, moveRobot])
  
  useEffect(() => {
    if (isAutoMode) {
      autoIntervalRef.current = setInterval(autoMove, 2500)
    } else if (autoIntervalRef.current) {
      clearInterval(autoIntervalRef.current)
    }
    return () => { if (autoIntervalRef.current) clearInterval(autoIntervalRef.current) }
  }, [isAutoMode, autoMove])
  
  // Keep refs in sync
  useEffect(() => {
    isAutoModeRef.current = isAutoMode
  }, [isAutoMode])
  
  useEffect(() => {
    moveRobotRef.current = moveRobot
  }, [moveRobot])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isAutoModeRef.current) return
      const key = e.key.toLowerCase()
      if (key === 'w' || key === 'a' || key === 's' || key === 'd') {
        e.preventDefault()
        e.stopPropagation()
        console.log('Key pressed:', key)
        if (moveRobotRef.current) {
          if (key === 'w') moveRobotRef.current(-1, 0)
          if (key === 's') moveRobotRef.current(1, 0)
          if (key === 'a') moveRobotRef.current(0, -1)
          if (key === 'd') moveRobotRef.current(0, 1)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown, { capture: true })
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true })
  }, [])

  const totalCells = GRID_SIZE * GRID_SIZE
  const wallCount = 17
  const exploredPercent = Math.round((revealed.size / totalCells) * 100)
  const visitedPercent = Math.round((visitedCells.size / (totalCells - wallCount)) * 100)

  return (
    <div className="slide fog-slide">
      <div className="fog-slide__context">
        <header className="slide-header slide-header--left">
          <p className="slide-label">Core Mechanic</p>
          <h1 className="slide-title">
            The <span className="text-gradient">Fog of War</span>
          </h1>
          <p className="slide-subtitle">
            The robot has no prior knowledge—discovery happens piece by piece.
          </p>
        </header>
        
        <div className="fog-slide__explanation glass-panel">
          <h3>Why can't we see everything?</h3>
          <p>
            In real exploration scenarios, the robot has no prior knowledge of the environment. 
            Maps don't exist. GPS doesn't work underground. The only way to understand the space 
            is to <strong>explore it piece by piece</strong>.
          </p>
        </div>
        
        <div className="fog-slide__stats glass-panel">
          <div className="fog-slide__stat-row">
            <span>Map Revealed</span>
            <span className="fog-slide__stat-value">{exploredPercent}%</span>
          </div>
          <div className="fog-slide__progress-bar">
            <div className="fog-slide__progress-fill fog-slide__progress-fill--revealed" style={{ width: `${exploredPercent}%` }} />
          </div>
          <div className="fog-slide__stat-row">
            <span>Path Visited</span>
            <span className="fog-slide__stat-value fog-slide__stat-value--visited">{visitedPercent}%</span>
          </div>
          <div className="fog-slide__progress-bar">
            <div className="fog-slide__progress-fill fog-slide__progress-fill--visited" style={{ width: `${visitedPercent}%` }} />
          </div>
        </div>

        <div className="fog-slide__legend glass-panel">
          <h3>Legend</h3>
          <div className="fog-slide__legend-items">
            <div className="fog-slide__legend-item">
              <span className="fog-slide__legend-box fog-slide__legend-box--hidden"></span>
              <span>Unknown</span>
            </div>
            <div className="fog-slide__legend-item">
              <span className="fog-slide__legend-box fog-slide__legend-box--revealed"></span>
              <span>Revealed</span>
            </div>
            <div className="fog-slide__legend-item">
              <span className="fog-slide__legend-box fog-slide__legend-box--visited"></span>
              <span>Visited</span>
            </div>
            <div className="fog-slide__legend-item">
              <span className="fog-slide__legend-box fog-slide__legend-box--wall"></span>
              <span>Blocked</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="fog-slide__demo">
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
                  {isRobot && <div className="fog-demo__robot">🤖</div>}
                </div>
              )
            })
          ))}
        </div>
        
        <div className="fog-slide__controls">
          <div className="fog-slide__mode-toggle">
            <button 
              className={`fog-slide__mode-btn ${isAutoMode ? 'fog-slide__mode-btn--active' : ''}`}
              onClick={() => setIsAutoMode(true)}
            >
              🤖 Auto
            </button>
            <button 
              className={`fog-slide__mode-btn ${!isAutoMode ? 'fog-slide__mode-btn--active' : ''}`}
              onClick={() => setIsAutoMode(false)}
            >
              🎮 Manual
            </button>
          </div>
          
          {!isAutoMode && (
            <div className="fog-slide__keys glass-panel">
              <h4>Controls</h4>
              <div className="fog-slide__key-layout">
                <div className="fog-slide__key-row">
                  <kbd>W</kbd>
                </div>
                <div className="fog-slide__key-row">
                  <kbd>A</kbd>
                  <kbd>S</kbd>
                  <kbd>D</kbd>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FogDemoSlide
