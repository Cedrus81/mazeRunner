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
import FullDemoSlide from './slides/08_FullDemo'
import SummarySlide from './slides/09_Summary'

const slides = [
  TitleSlide,
  ProblemSlide,
  RobotSlide,
  FogDemoSlide,
  SensorsSlide,
  InteractionSlide,
  GamificationSlide,
  FullDemoSlide,
  SummarySlide,
]

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)

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
