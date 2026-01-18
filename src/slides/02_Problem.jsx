import { useState } from 'react'
import './slides.css'
import './Problem.css'

function ProblemSlide() {
  const [hoveredEnv, setHoveredEnv] = useState(null)
  
  const stats = [
    { value: '340+', label: 'Rescue workers injured annually in structural collapses' },
    { value: '72%', label: 'Of industrial accidents occur in confined spaces' },
    { value: '15min', label: 'Average safe exposure time in toxic environments' },
  ]

  const environments = [
    {
      id: 'collapsed',
      image: './collapsed_structure.png',
      title: 'Collapsed Structures',
      characteristics: 'Unstable debris, secondary collapse risk, sharp metal, limited visibility, dust-filled air',
      robotValue: 'Navigates rubble with stabilized movement, detects survivors through sensors, assesses structural integrity without human risk'
    },
    {
      id: 'flooded',
      image: './flooded_tunnel.png',
      title: 'Flooded Tunnels',
      characteristics: 'Zero visibility, contaminated water, strong currents, electrical hazards, drowning risk',
      robotValue: 'Waterproof sensors map submerged spaces, identifies blockages, locates air pockets for trapped survivors'
    },
    {
      id: 'confined',
      image: './narrow_pipe.png',
      title: 'Confined Spaces',
      characteristics: 'Oxygen depletion, toxic gas accumulation, no emergency exit, claustrophobic passages',
      robotValue: 'Compact bipedal design navigates tight passages, atmospheric sensors detect hazardous gases before human entry'
    },
    {
      id: 'toxic',
      image: './hazardous_zone.png',
      title: 'Toxic Zones',
      characteristics: 'Airborne chemicals, radiation exposure, explosive atmospheres, corrosive materials',
      robotValue: 'Specialized sensors measure contamination levels, operates indefinitely in lethal atmospheres, provides real-time data for response planning'
    }
  ]

  return (
    <div className="slide problem-slide">
      <header className="slide-header">
        <p className="slide-label">The Challenge</p>
        <h1 className="slide-title slide-title--large">
          The <span className="text-gradient">Human Cost</span> of Exploration
        </h1>
        <p className="slide-subtitle">
          What if the most dangerous part of a rescue mission was getting there?
        </p>
      </header>

      <div className="problem-slide__content">
        <div className="problem-slide__visual">
          <img 
            src="./collapsed_structure.png" 
            alt="Rescue workers at a collapsed building"
            className="problem-slide__image"
          />
          <p className="problem-slide__caption">
            Every year, first responders risk their lives entering spaces that machines could explore first.
          </p>
        </div>

        <div className="problem-slide__stats">
          {stats.map((stat, i) => (
            <div key={i} className="problem-stat glass-panel">
              <span className="problem-stat__value">{stat.value}</span>
              <span className="problem-stat__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="problem-slide__environments">
        <h3 className="problem-slide__section-title">Environments too dangerous for human presence</h3>
        <div className="problem-slide__env-grid">
          {environments.map(env => (
            <div 
              key={env.id}
              className={`problem-env ${hoveredEnv === env.id ? 'problem-env--expanded' : ''}`}
              onMouseEnter={() => setHoveredEnv(env.id)}
              onMouseLeave={() => setHoveredEnv(null)}
            >
              <img src={env.image} alt="" className="problem-env__thumb" />
              <span className="problem-env__title">{env.title}</span>
              
              {hoveredEnv === env.id && (
                <div className="problem-env__card glass-panel">
                  <h4>{env.title}</h4>
                  <div className="problem-env__details">
                    <div className="problem-env__section">
                      <span className="problem-env__label">Characteristics</span>
                      <p>{env.characteristics}</p>
                    </div>
                    <div className="problem-env__section">
                      <span className="problem-env__label">Robot Advantage</span>
                      <p>{env.robotValue}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProblemSlide
