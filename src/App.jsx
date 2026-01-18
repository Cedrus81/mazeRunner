import { useState, useCallback, useEffect } from 'react'
import SlideContainer from './components/SlideContainer'
import SlideProgress from './components/SlideProgress'
import './App.css'

// Import all slides
import TitleSlide from './slides/01_Title'
import ProblemSlide from './slides/02_Problem'
import RobotSlide from './slides/03_Robot'
import FogDemoSlide from './slides/04_FogDemo'
import SensorsSlide from './slides/05_Sensors'
import InteractionSlide from './slides/06_Interaction'
import GamificationSlide from './slides/07_Gamification'
import AchievementsSlide from './slides/08_Achievements'
import FullDemoSlide from './slides/08_FullDemo'
import SummarySlide from './slides/09_Summary'

// All images to preload for seamless transitions
const imagesToPreload = [
  './rescue_hero.png',
  './collapsed_structure.png',
  './flooded_tunnel.png',
  './narrow_pipe.png',
  './hazardous_zone.png',
  './tonybot_real.png',
  './robot_junction.png',
  './capability_see.png',
  './capability_go.png',
  './capability_stay.png',
]

const slides = [
  TitleSlide,
  ProblemSlide,
  RobotSlide,
  FogDemoSlide,
  SensorsSlide,
  InteractionSlide,
  GamificationSlide,
  AchievementsSlide,
  FullDemoSlide,
  SummarySlide,
]

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  // Preload all images on mount
  useEffect(() => {
    let loadedCount = 0
    const totalImages = imagesToPreload.length

    imagesToPreload.forEach(src => {
      const img = new Image()
      img.onload = img.onerror = () => {
        loadedCount++
        if (loadedCount >= totalImages) {
          setImagesLoaded(true)
        }
      }
      img.src = src
    })

    // Fallback: show content after 3 seconds even if images fail
    const timeout = setTimeout(() => setImagesLoaded(true), 3000)
    return () => clearTimeout(timeout)
  }, [])

  const goToSlide = useCallback((index) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index)
    }
  }, [])

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1)
  }, [currentSlide, goToSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't navigate if user is in an interactive demo
      if (e.target.closest('.interactive-demo')) return
      
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        nextSlide()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  const CurrentSlideComponent = slides[currentSlide]

  // Show loading screen while images preload
  if (!imagesLoaded) {
    return (
      <div className="app grid-background" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}>
        <div style={{
          textAlign: 'center',
          color: 'var(--text-secondary)'
        }}>
          <div style={{
            fontSize: '2rem',
            marginBottom: '1rem',
            animation: 'pulse 1.5s infinite'
          }}>🤖</div>
          <p>Loading presentation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app grid-background">
      <SlideContainer>
        <CurrentSlideComponent 
          onNext={nextSlide} 
          onPrev={prevSlide}
          isFirst={currentSlide === 0}
          isLast={currentSlide === slides.length - 1}
        />
      </SlideContainer>
      
      <SlideProgress 
        current={currentSlide}
        total={slides.length}
        onNavigate={goToSlide}
        onPrev={prevSlide}
        onNext={nextSlide}
      />
    </div>
  )
}

export default App
