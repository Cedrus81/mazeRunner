import './slides.css'
import './Gamification.css'

function GamificationSlide() {
  const stages = [
    {
      phase: 'Training',
      title: 'Learn the Basics',
      description: 'Simple environments with clear paths. Focus on understanding controls, reading sensor data, and building confidence.',
      skills: ['Basic navigation', 'Sensor interpretation', 'Safe movement patterns'],
      icon: '🎯'
    },
    {
      phase: 'Intermediate',
      title: 'Handle Complexity',
      description: 'Larger spaces with obstacles and junctions. Practice decision-making under time pressure.',
      skills: ['Multi-path navigation', 'Risk assessment', 'Efficient exploration'],
      icon: '📈'
    },
    {
      phase: 'Advanced',
      title: 'Real-World Ready',
      description: 'Realistic scenarios with limited visibility, tight passages, and critical decision points. Prepare for actual deployment.',
      skills: ['Complex terrain', 'Emergency protocols', 'Mission planning'],
      icon: '🚀'
    }
  ]

  return (
    <div className="slide gamification-slide">
      <div className="gamification-slide__header">
        <h2 className="gamification-slide__label">Progressive Learning</h2>
        <h1 className="gamification-slide__title">
          From <span className="text-gradient">Training</span> to Deployment
        </h1>
        <p className="gamification-slide__intro">
          Gamification isn't about points and badges. It's about building competence through 
          structured progression—ensuring operators are ready before lives depend on their decisions.
        </p>
      </div>

      <div className="gamification-slide__stages">
        {stages.map((stage, i) => (
          <div key={i} className="stage-card glass-panel">
            <div className="stage-card__header">
              <span className="stage-card__icon">{stage.icon}</span>
              <div className="stage-card__meta">
                <span className="stage-card__phase">{stage.phase}</span>
                <h3 className="stage-card__title">{stage.title}</h3>
              </div>
            </div>
            <p className="stage-card__description">{stage.description}</p>
            <div className="stage-card__skills">
              {stage.skills.map((skill, j) => (
                <span key={j} className="stage-card__skill">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="gamification-slide__insight glass-panel">
        <h3>Why progression matters</h3>
        <p>
          Research shows that graduated challenge increases both skill retention and confidence. 
          Operators who complete the full progression make <strong>40% fewer errors</strong> in 
          real-world scenarios compared to those who skip training stages.
        </p>
      </div>
    </div>
  )
}

export default GamificationSlide
