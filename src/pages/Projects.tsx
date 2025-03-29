// File: src/pages/Projects.tsx
import React, { useEffect, useRef } from 'react';
import ProjectCard from '../components/ProjectCard';
import BackendShowcase from '../components/BackendShowcase';
import '../styles/Projects.css';

interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription?: string;
  features?: string[];
  technologies: string[];
  demoVideo?: string;
  liveLink?: string;
}

const Projects: React.FC = () => {
  const projectsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (projectsGridRef.current) {
      observer.observe(projectsGridRef.current);
    }

    return () => {
      if (projectsGridRef.current) {
        observer.unobserve(projectsGridRef.current);
      }
    };
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: "Sedl",
      description: "A digital-first app enabling seamless financial transactions using USDC. Users earn and manage $SEDL tokens through Sedl Partners on the Polygon network.",
      technologies: ["React", "Node.js", "Polygon", "Smart Contracts", "Blockchain"],
      liveLink: "https://sedlapp.com/"
    },
    {
      id: 2,
      title: "DevCasta",
      description: "An innovative platform for developers to solve real-world coding challenges from open-source repositories, gaining hands-on experience.",
      technologies: ["React", "Node.js", "Lisk", "Blockchain", "ZK Proofs"],
      liveLink: "https://www.devcasta.xyz/"
    },
    {
      id: 3,
      title: "GuardZero",
      description: "An identity verification platform leveraging ZK-proofs for blockchain-based KYC compliance, building trust in digital ecosystems.",
      technologies: ["React", "Node.js", "Persona", "Lisk", "ZK Proofs"],
      liveLink: "https://www.guardzero.xyz/"
    },
    {
      id: 4,
      title: "Social Lender",
      description: "A digital lending solution providing access to formal financial services based on social reputation using alternative data.",
      technologies: ["React", "Node.js", "Blockchain", "Fintech"],
      liveLink: "https://www.sociallenderng.com/"
    },
    {
      id: 5,
      title: "Gradell Technology Limited",
      description: "A creative agency offering branding, software development, and digital marketing services to help businesses thrive.",
      technologies: ["React", "Node.js", "Branding", "Web Development"],
      liveLink: "https://gradell.ng/"
    }
  ];

  return (
    <>
      {/* Backend Showcase Section */}
      <BackendShowcase />
      
      {/* Projects Section */}
      <section className="projects-section">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Explore some of my significant contributions in fullstack development</p>
          <div className="projects-grid" ref={projectsGridRef}>
            {projects.map((project, index) => (
              <div 
                className="project-card-wrapper" 
                key={project.id}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="project-card">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-technologies">
                    <strong>Technologies: </strong>
                    {project.technologies.join(', ')}
                  </div>

                  {/* Embedding the website within an iframe */}
                  {project.liveLink && (
                    <div className="iframe-container">
                      <iframe
                        src={project.liveLink}
                        width="100%"
                        height="300px"  // Set the iframe height to a smaller size
                        title={project.title}
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="github-cta">
          <div className="container">
            <div className="github-cta-content">
              <h3>More Projects on GitHub</h3>
              <p>Explore my repositories to see more of my work and contributions to open-source projects</p>
              <a 
                href="https://github.com/osiyomeoh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="github-button"
              >
                View GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
