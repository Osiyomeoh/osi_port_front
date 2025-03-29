// File: src/components/ExperienceItem.tsx
import React from 'react';
import '../styles/ExperienceItem.css';

interface ExperienceData {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string[];
  technologies: string[];
}

interface ExperienceItemProps {
  experience: ExperienceData;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ experience }) => {
  return (
    <div className="timeline-item">
      <div className="timeline-dot"></div>
      <div className="timeline-content">
        <h3>{experience.role}</h3>
        <h4>{experience.company}</h4>
        <p className="timeline-period">{experience.period}</p>
        <ul className="timeline-description">
          {experience.description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <div className="timeline-technologies">
          {experience.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceItem;