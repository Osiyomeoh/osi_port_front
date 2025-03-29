// File: src/components/BackendShowcase.tsx
import React, { useState, useEffect, useRef } from 'react';
import '../styles/BackendShowcase.css';

interface BackendProject {
  id: number;
  title: string;
  description: string;
  features: string[];
  techStack: string[];
  architecture: string[];
  image: string;
}

const BackendShowcase: React.FC = () => {
  const [activeProject, setActiveProject] = useState<number>(1);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const backendProjects: BackendProject[] = [
    {
      id: 1,
      title: "Scalable Payment Processing API",
      description: "A robust microservices architecture for handling financial transactions with high throughput and strict security measures.",
      features: [
        "Processes 1M+ transactions daily",
        "Multi-currency support",
        "Real-time fraud detection",
        "Automated reconciliation system",
        "99.99% uptime SLA"
      ],
      techStack: ["Node.js", "Express", "PostgreSQL", "Redis", "Docker", "Kubernetes", "RabbitMQ"],
      architecture: [
        "Authentication Service",
        "Transaction Processing Service",
        "Fraud Detection Service",
        "Notification Service",
        "Reporting Service"
      ],
      image: "/backend-project1.jpg"
    },
    {
      id: 2,
      title: "Blockchain-based Asset Management",
      description: "A secure platform for tokenizing and trading traditional financial assets on blockchain with regulatory compliance.",
      features: [
        "Asset tokenization engine",
        "Regulatory compliance framework",
        "Multi-signature wallets",
        "Atomic swap capabilities",
        "Audit trail with immutable records"
      ],
      techStack: ["Solidity", "Node.js", "Web3.js", "MongoDB", "AWS Lambda", "Docker"],
      architecture: [
        "Smart Contract Layer",
        "Identity Management Service",
        "Transaction Management Service",
        "Compliance Verification Service",
        "Reporting & Analytics Engine"
      ],
      image: "/backend-project2.jpg"
    },
    {
      id: 3,
      title: "Financial Data Processing Pipeline",
      description: "A high-performance ETL pipeline for processing and analyzing large volumes of financial market data in real-time.",
      features: [
        "Real-time data aggregation",
        "Anomaly detection algorithms",
        "Auto-scaling based on load",
        "Historical data archiving",
        "Custom alert system"
      ],
      techStack: ["Python", "Apache Kafka", "Apache Spark", "PostgreSQL", "Redis", "Elasticsearch", "Docker"],
      architecture: [
        "Data Ingestion Layer",
        "Processing Engine",
        "Analysis Engine",
        "Storage Layer",
        "API Gateway"
      ],
      image: "/backend-project3.jpg"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, no need to observe anymore
          if (showcaseRef.current) observer.unobserve(showcaseRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (showcaseRef.current) observer.observe(showcaseRef.current);

    return () => {
      if (showcaseRef.current) observer.unobserve(showcaseRef.current);
    };
  }, []);

  // Auto switch projects every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject(prev => prev === backendProjects.length ? 1 : prev + 1);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [backendProjects.length]);

  return (
    <div className="backend-showcase-container" ref={showcaseRef}>
      <h2 className="backend-showcase-title">Backend Engineering Excellence</h2>
      <p className="backend-showcase-subtitle">Specialized in building robust, scalable backend systems</p>
      
      <div className={`backend-projects ${isVisible ? 'visible' : ''}`}>
        <div className="project-selector">
          {backendProjects.map(project => (
            <button 
              key={project.id}
              className={`project-tab ${activeProject === project.id ? 'active' : ''}`}
              onClick={() => setActiveProject(project.id)}
            >
              {project.title}
            </button>
          ))}
        </div>
        
        {backendProjects.map(project => (
          <div 
            key={project.id} 
            className={`project-details ${activeProject === project.id ? 'active' : ''}`}
          >
            <div className="project-info">
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              <div className="project-features">
                <h4>Key Features</h4>
                <ul>
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="project-stack">
                <h4>Tech Stack</h4>
                <div className="tech-tags">
                  {project.techStack.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="project-architecture">
              <h4>Architecture Overview</h4>
              <div className="architecture-diagram">
                {project.architecture.map((service, index) => (
                  <div key={index} className="service-box">
                    <div className="service-name">{service}</div>
                    {index < project.architecture.length - 1 && (
                      <div className="service-connection"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="backend-expertise-points">
        <div className={`expertise-point ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '0.2s' }}>
          <div className="point-icon">🔍</div>
          <h4>Performance Optimization</h4>
          <p>Specializing in identifying and resolving bottlenecks in backend systems to ensure optimal performance.</p>
        </div>
        
        <div className={`expertise-point ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '0.4s' }}>
          <div className="point-icon">🔒</div>
          <h4>Security Implementation</h4>
          <p>Implementing robust security measures including encryption, authentication, and authorization systems.</p>
        </div>
        
        <div className={`expertise-point ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '0.6s' }}>
          <div className="point-icon">⚙️</div>
          <h4>System Architecture</h4>
          <p>Designing scalable, maintainable microservices architectures with clear separation of concerns.</p>
        </div>
        
        <div className={`expertise-point ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '0.8s' }}>
          <div className="point-icon">📊</div>
          <h4>Database Optimization</h4>
          <p>Expertise in database design, query optimization, and implementing efficient data access patterns.</p>
        </div>
      </div>
    </div>
  );
};

export default BackendShowcase;