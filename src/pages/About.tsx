// File: src/pages/About.tsx
import React, { useEffect, useRef } from 'react';
import '../styles/About.css';
import AnimatedSkills from '../components/AnimatedSkills';

const About: React.FC = () => {
  const aboutContentRef = useRef<HTMLDivElement>(null);
  
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

    if (aboutContentRef.current) {
      observer.observe(aboutContentRef.current);
    }

    return () => {
      if (aboutContentRef.current) {
        observer.unobserve(aboutContentRef.current);
      }
    };
  }, []);

  return (
    <section className="about-section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content" ref={aboutContentRef}>
          <div className="about-image">
            <div className="profile-wrapper">
              <img src="/profile-placeholder.jpg" alt="Aleonomoh Samuel" />
              <div className="floating-badge backend-badge">
                <span>Backend</span>
                <span>Expert</span>
              </div>
              <div className="floating-badge blockchain-badge">
                <span>Blockchain</span>
                <span>Developer</span>
              </div>
            </div>
          </div>
          <div className="about-text">
            <h3>Full-Stack Software Engineer with focus on <span className="highlight">Backend Systems</span> and <span className="highlight">Blockchain</span></h3>
            <p>
              Hello! I'm <strong>Aleonomoh Samuel</strong>, a passionate and results-driven software engineer with expertise in PHP, JavaScript, Node.js, React, TypeScript, and Solidity development.
              I specialize in building scalable backend systems for finance and blockchain projects.
            </p>
            <p>
              My journey in software development began with a deep interest in how technology can transform financial systems.
              I excel in object-oriented programming (OOP) and have extensive experience deploying live projects on cloud platforms 
              including AWS, Google Cloud, and DigitalOcean.
            </p>
            <p>
              I'm committed to continuous learning and innovation, with a particular interest in Web3, blockchain, 
              fintech applications, and leadership roles. My DevOps skills further enhance my ability to deliver 
              scalable and secure software solutions.
            </p>
            
            <div className="backend-highlights">
              <h4>Core Specializations</h4>
              <div className="highlight-points">
                <div className="highlight-point">
                  <div className="point-icon">⚙️</div>
                  <div className="point-text">Microservices Architecture</div>
                </div>
                <div className="highlight-point">
                  <div className="point-icon">🔐</div>
                  <div className="point-text">Secure API Design</div>
                </div>
                <div className="highlight-point">
                  <div className="point-icon">💹</div>
                  <div className="point-text">Financial Systems</div>
                </div>
                <div className="highlight-point">
                  <div className="point-icon">⛓️</div>
                  <div className="point-text">Smart Contracts</div>
                </div>
                <div className="highlight-point">
                  <div className="point-icon">📊</div>
                  <div className="point-text">Database Optimization</div>
                </div>
                <div className="highlight-point">
                  <div className="point-icon">🚀</div>
                  <div className="point-text">DevOps & CI/CD</div>
                </div>
                <div className="highlight-point">
                  <div className="point-icon">🔍</div>
                  <div className="point-text">Testing & Debugging</div>
                </div>
                <div className="highlight-point">
                  <div className="point-icon">👥</div>
                  <div className="point-text">Team Leadership</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated Skills Component */}
        <AnimatedSkills />
      </div>
    </section>
  );
};

export default About;