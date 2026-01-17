import './SlideContainer.css'

function SlideContainer({ children }) {
  return (
    <div className="slide-container">
      <div className="slide-content">
        {children}
      </div>
    </div>
  )
}

export default SlideContainer
