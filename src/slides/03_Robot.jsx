import './slides.css'
import './Robot.css'

function RobotSlide() {
  const capabilities = [
    {
      icon: '👁️',
      title: 'See What We Can\'t',
      desc: 'Multi-sensor array captures visual, thermal, and distance data in real-time—even in complete darkness.',
      why: 'Because first responders shouldn\'t enter blind.'
    },
    {
      icon: '🛡️',
      title: 'Go Where We Shouldn\'t',
      desc: 'Compact tracked chassis navigates rubble, water, and tight spaces that would trap or injure humans.',
      why: 'Because size and durability save lives.'
    },
    {
      icon: '🔗',
      title: 'Stay Connected',
      desc: 'Continuous data stream maintains situational awareness, letting operators make informed decisions remotely.',
      why: 'Because distance shouldn\'t mean disconnection.'
    }
  ]

  return (
    <div className="slide robot-slide">
      <div className="robot-slide__hero">
        <img 
          src="./tonybot_real.png" 
          alt="Tonybot bipedal robot by Hiwonder"
          className="robot-slide__image"
        />
      </div>

      <div className="robot-slide__content">
        <div className="robot-slide__header">
          <p className="robot-slide__intro">Introducing</p>
          <h1 className="robot-slide__title">
            <span className="text-gradient">Tonybot</span> Explorer
          </h1>
          <p className="robot-slide__tagline">
            Your eyes and hands where humans can't safely reach.
          </p>
        </div>

        <div className="robot-slide__capabilities">
          {capabilities.map((cap, i) => (
            <div key={i} className="capability glass-panel">
              <span className="capability__icon">{cap.icon}</span>
              <div className="capability__text">
                <h3 className="capability__title">{cap.title}</h3>
                <p className="capability__desc">{cap.desc}</p>
                <p className="capability__why">{cap.why}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RobotSlide
