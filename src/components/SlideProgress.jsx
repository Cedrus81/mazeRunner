import './SlideProgress.css'

function SlideProgress({ current, total, onNavigate, onPrev, onNext }) {
  return (
    <div className="slide-progress glass-panel">
      <button 
        className="slide-progress__arrow"
        onClick={onPrev}
        disabled={current === 0}
        aria-label="Previous slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      
      <div className="slide-progress__dots">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            className={`slide-progress__dot ${i === current ? 'slide-progress__dot--active' : ''} ${i < current ? 'slide-progress__dot--visited' : ''}`}
            onClick={() => onNavigate(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current ? 'true' : undefined}
          />
        ))}
      </div>
      
      <button 
        className="slide-progress__arrow"
        onClick={onNext}
        disabled={current === total - 1}
        aria-label="Next slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
      
      <span className="slide-progress__counter">
        {current + 1} / {total}
      </span>
    </div>
  )
}

export default SlideProgress
