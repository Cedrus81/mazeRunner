import './slides.css'
import './Problem.css'

function ProblemSlide() {
  const problems = [
    {
      image: '/collapsed_structure.png',
      title: 'Collapsed Structures',
      desc: 'Buildings after earthquakes or explosions'
    },
    {
      image: '/flooded_tunnel.png',
      title: 'Flooded Areas',
      desc: 'Submerged tunnels and underground spaces'
    },
    {
      image: '/narrow_pipe.png',
      title: 'Narrow Passages',
      desc: 'Pipes, ducts, and confined spaces'
    },
    {
      image: '/hazardous_zone.png',
      title: 'Toxic Environments',
      desc: 'Chemical spills and hazardous zones'
    }
  ]

  return (
    <div className="slide">
      <h1 className="slide__title">
        The <span className="text-gradient">Problem</span>
      </h1>
      
      <p className="slide__subtitle">
        Some environments are too dangerous for humans to explore
      </p>
      
      <div className="problem-slide__grid">
        {problems.map((problem, i) => (
          <div 
            key={i} 
            className="problem-card glass-panel"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div 
              className="problem-card__image"
              style={{ backgroundImage: `url(${problem.image})` }}
            />
            <div className="problem-card__content">
              <h3 className="problem-card__title">{problem.title}</h3>
              <p className="problem-card__desc">{problem.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProblemSlide
