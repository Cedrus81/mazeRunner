import './slides.css'
import './Interaction.css'

function InteractionSlide() {
  return (
    <div className="slide interaction-slide">
      <div className="interaction-slide__content">
        <div className="interaction-slide__header">
          <h2 className="interaction-slide__label">Human-Robot Partnership</h2>
          <h1 className="interaction-slide__title">
            When the Robot <span className="text-gradient">Needs You</span>
          </h1>
        </div>

        <div className="interaction-slide__concept glass-panel">
          <h3>The critical moment</h3>
          <p>
            Autonomous exploration handles routine navigation. But at decision points—junctions, 
            obstacles, uncertain terrain—the robot stops and <strong>asks for human guidance</strong>.
          </p>
          <p>
            This isn't a limitation. It's by design. The robot provides the data; 
            the human provides the judgment.
          </p>
        </div>

        <div className="interaction-slide__flow glass-panel">
          <h3>How it works</h3>
          <div className="flow-steps">
            <div className="flow-step">
              <span className="flow-step__number">1</span>
              <span className="flow-step__text">Robot reaches junction</span>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <span className="flow-step__number">2</span>
              <span className="flow-step__text">Scans all paths</span>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <span className="flow-step__number">3</span>
              <span className="flow-step__text">Human decides</span>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <span className="flow-step__number">4</span>
              <span className="flow-step__text">Robot executes</span>
            </div>
          </div>
        </div>
      </div>

      <div className="interaction-slide__visual">
        <img 
          src="./robot_junction.png" 
          alt="Robot at tunnel junction making decision"
          className="interaction-slide__image"
        />
        <p className="interaction-slide__caption">
          At every junction, the robot pauses to scan available paths and awaits operator guidance.
        </p>
      </div>
    </div>
  )
}

export default InteractionSlide
