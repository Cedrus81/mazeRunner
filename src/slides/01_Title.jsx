import './slides.css'
import './Title.css'

function TitleSlide() {
  return (
    <div className="slide title-slide">
      <div className="title-slide__hero">
        <img 
          src="./Gemini_Generated_Image_sjkg54sjkg54sjkg.png" 
          alt="Rescue robot entering collapsed structure" 
          className="title-slide__image"
        />
        <div className="title-slide__overlay" />
      </div>
      
      <div className="title-slide__content">
        <p className="title-slide__tagline">When humans can't go forward</p>
        <h1 className="title-slide__title">
          Exploration <span className="text-gradient">Doesn't Stop</span>
        </h1>
        <p className="title-slide__subtitle">
          A gamified system for remote robotic exploration in hazardous environments
        </p>
        
        <div className="title-slide__cta">
          <span className="title-slide__hint">Press <kbd>→</kbd> to begin</span>
        </div>
      </div>
    </div>
  )
}

export default TitleSlide
