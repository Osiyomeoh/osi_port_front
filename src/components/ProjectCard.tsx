// File: src/components/ProjectCard.tsx
import React, { useContext } from 'react';
import { ModalContext } from '../App';
import '../styles/ProjectCard.css';

interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription?: string;
  features?: string[];
  technologies: string[];
  image: string;
  demoImages?: string[];
  demoVideo?: string;
  githubLink?: string;
  liveLink?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { openProjectModal } = useContext(ModalContext);

  return (
    <div className="project-card">
      <div className="project-image">
        <img src={project.image} alt={project.title} />
        <div className="image-overlay">
          <button 
            className="view-project-btn"
            onClick={() => openProjectModal(project)}
          >
            View Project
          </button>
        </div>
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-technologies">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
        <div className="project-links">
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link github">
              View Code
            </a>
          )}
          <button 
            className="project-link demo"
            onClick={() => openProjectModal(project)}
          >
            View Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;