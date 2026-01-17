import './slides.css'
import './Problem.css'

function ProblemSlide() {
  const problems = [
    {
      image: '/collapsed_structure.png',
      title: 'Collapsed Structures',
      desc: 'Post-disaster zones where buildings have collapsed from earthquakes, explosions, or structural failure. Unstable rubble, sharp debris, and secondary collapse risks make human entry extremely hazardous. Robots can search for survivors and assess structural integrity without endangering rescue teams.'
    },
    {
      image: '/flooded_tunnel.png',
      title: 'Flooded Areas',
      desc: 'Submerged tunnels, sewers, and underground infrastructure filled with contaminated water. Limited visibility, toxic gases, and drowning risks create life-threatening conditions. Waterproof robots can navigate these spaces to inspect damage and locate blockages.'
    },
    {
      image: '/narrow_pipe.png',
      title: 'Confined Spaces',
      desc: 'Industrial pipes, ventilation ducts, and tight passages too narrow for humans to access. These cramped environments often lack oxygen and contain hazardous materials. Compact robots equipped with cameras can inspect for cracks, corrosion, and structural weaknesses.'
    },
    {
      image: '/hazardous_zone.png',
      title: 'Toxic Environments',
      desc: 'Chemical plants, industrial accidents, and contaminated sites with airborne toxins, radiation, or explosive gases. Exposure can cause serious injury or death within minutes. Robots fitted with specialized sensors can collect data and perform tasks without risking human health.'
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
