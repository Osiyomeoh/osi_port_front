// File: src/components/ProjectModal.tsx
import React, { useState, useEffect } from 'react';
// In EmailModal.tsx, ProjectModal.tsx, and SocialProfileModal.tsx
import '../styles/modals.css';

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

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'demo'>('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset active tab when a new project is opened
  useEffect(() => {
    if (isOpen) {
      setActiveTab('overview');
      setCurrentImageIndex(0);
    }
  }, [isOpen, project]);

  if (!isOpen || !project) return null;

  const handleNextImage = () => {
    if (project.demoImages) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === project.demoImages!.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (project.demoImages) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? project.demoImages!.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div className="project-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        </button>
        
        <div className="project-header">
          <h2>{project.title}</h2>
          <div className="project-tech-tags">
            {project.technologies.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
        
        <div className="project-tabs">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-button ${activeTab === 'features' ? 'active' : ''}`}
            onClick={() => setActiveTab('features')}
          >
            Features
          </button>
          <button 
            className={`tab-button ${activeTab === 'demo' ? 'active' : ''}`}
            onClick={() => setActiveTab('demo')}
          >
            Demo
          </button>
        </div>
        
        <div className="tab-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-description">
                <p>{project.fullDescription || project.description}</p>
              </div>
            </div>
          )}
          
          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="features-tab">
              {project.features && project.features.length > 0 ? (
                <ul className="features-list">
                  {project.features.map((feature, index) => (
                    <li key={index}>
                      <div className="feature-icon">✓</div>
                      <div className="feature-text">{feature}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-content">Feature details coming soon...</p>
              )}
            </div>
          )}
          
          {/* Demo Tab */}
          {activeTab === 'demo' && (
            <div className="demo-tab">
              {project.demoImages && project.demoImages.length > 0 ? (
                <div className="demo-slider">
                  <div className="demo-image">
                    <img src={project.demoImages[currentImageIndex]} alt={`Demo ${currentImageIndex + 1}`} />
                  </div>
                  
                  <div className="slider-controls">
                    <button className="slider-control prev" onClick={handlePrevImage}>
                      <svg viewBox="0 0 24 24" width="24" height="24">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                      </svg>
                    </button>
                    <div className="image-counter">
                      {currentImageIndex + 1} / {project.demoImages.length}
                    </div>
                    <button className="slider-control next" onClick={handleNextImage}>
                      <svg viewBox="0 0 24 24" width="24" height="24">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : project.demoVideo ? (
                <div className="demo-video">
                  <iframe
                    src={project.demoVideo}
                    title={`${project.title} Demo`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <p className="no-content">Demo content coming soon...</p>
              )}
            </div>
          )}
        </div>
        
        <div className="project-links">
          {project.githubLink && (
            <a 
              href={project.githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link github"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
          
          {project.liveLink && (
            <a 
              href={project.liveLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link live"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
              </svg>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;