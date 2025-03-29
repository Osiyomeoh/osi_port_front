// File: src/components/AnimatedSkills.tsx
import React, { useEffect, useRef, useState } from 'react';
import '../styles/AnimatedSkills.css';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
}

const AnimatedSkills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('all');

  // Backend heavy skill set
  const skills: Skill[] = [
    // Backend
    { name: 'Node.js', level: 95, category: 'backend', icon: '⚙️' },
    { name: 'Express', level: 92, category: 'backend', icon: '🚀' },
    { name: 'Django', level: 88, category: 'backend', icon: '🐍' },
    { name: 'MongoDB', level: 90, category: 'backend', icon: '🍃' },
    { name: 'PostgreSQL', level: 85, category: 'backend', icon: '🐘' },
    { name: 'REST API Design', level: 94, category: 'backend', icon: '🔄' },
    { name: 'GraphQL', level: 82, category: 'backend', icon: '📊' },
    { name: 'Microservices', level: 86, category: 'backend', icon: '🧩' },
    { name: 'Docker', level: 88, category: 'backend', icon: '🐳' },
    { name: 'AWS', level: 84, category: 'backend', icon: '☁️' },
    
    // Blockchain
    { name: 'Ethereum', level: 90, category: 'blockchain', icon: '💠' },
    { name: 'Solidity', level: 88, category: 'blockchain', icon: '📜' },
    { name: 'Smart Contracts', level: 85, category: 'blockchain', icon: '📝' },
    { name: 'Web3.js', level: 87, category: 'blockchain', icon: '🕸️' },
    { name: 'DeFi Protocols', level: 82, category: 'blockchain', icon: '💱' },
    
    // Frontend
    { name: 'React', level: 90, category: 'frontend', icon: '⚛️' },
    { name: 'TypeScript', level: 88, category: 'frontend', icon: '📘' },
    { name: 'JavaScript', level: 92, category: 'frontend', icon: '📜' },
    { name: 'HTML5/CSS3', level: 85, category: 'frontend', icon: '🎨' },
    { name: 'Redux', level: 82, category: 'frontend', icon: '🔄' },
    
    // DevOps
    { name: 'CI/CD', level: 85, category: 'devops', icon: '🔄' },
    { name: 'Kubernetes', level: 80, category: 'devops', icon: '☸️' },
    { name: 'Terraform', level: 78, category: 'devops', icon: '🏗️' },
    { name: 'Jenkins', level: 82, category: 'devops', icon: '👷' },
    { name: 'Monitoring', level: 84, category: 'devops', icon: '📊' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, no need to observe anymore
          if (skillsRef.current) observer.unobserve(skillsRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) observer.observe(skillsRef.current);

    return () => {
      if (skillsRef.current) observer.unobserve(skillsRef.current);
    };
  }, []);

  const filteredSkills = activeTab === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeTab);

  return (
    <div className="animated-skills-container" ref={skillsRef}>
      <div className="skills-header">
        <h3>Technical Expertise</h3>
        <div className="tab-switcher">
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button 
            className={`tab-btn ${activeTab === 'backend' ? 'active' : ''}`}
            onClick={() => setActiveTab('backend')}
          >
            Backend
          </button>
          <button 
            className={`tab-btn ${activeTab === 'blockchain' ? 'active' : ''}`}
            onClick={() => setActiveTab('blockchain')}
          >
            Blockchain
          </button>
          <button 
            className={`tab-btn ${activeTab === 'frontend' ? 'active' : ''}`}
            onClick={() => setActiveTab('frontend')}
          >
            Frontend
          </button>
          <button 
            className={`tab-btn ${activeTab === 'devops' ? 'active' : ''}`}
            onClick={() => setActiveTab('devops')}
          >
            DevOps
          </button>
        </div>
      </div>

      <div className="skills-grid">
        {filteredSkills.map((skill, index) => (
          <div 
            className={`skill-card ${isVisible ? 'visible' : ''}`} 
            key={skill.name}
            style={{ 
              animationDelay: `${index * 0.1}s`,
              backgroundColor: getCardColor(skill.category)
            }}
          >
            <div className="skill-icon">{skill.icon}</div>
            <div className="skill-info">
              <h4>{skill.name}</h4>
              <div className="skill-level-container">
                <div 
                  className="skill-level-bar" 
                  style={{ 
                    width: isVisible ? `${skill.level}%` : '0%',
                    transition: `width 1.5s ease ${index * 0.1}s`
                  }}
                ></div>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="backend-showcase">
        <div className="backend-title">
          <h3>Backend Specialization</h3>
          <p>My core expertise lies in designing and implementing robust backend systems</p>
        </div>
        <div className={`backend-features ${isVisible ? 'visible' : ''}`}>
          <div className="backend-feature">
            <div className="feature-icon">🔐</div>
            <h4>Secure API Design</h4>
            <p>Building secure, scalable RESTful and GraphQL APIs with proper authentication and authorization</p>
          </div>
          <div className="backend-feature">
            <div className="feature-icon">⚡</div>
            <h4>High Performance</h4>
            <p>Optimizing database queries, implementing caching strategies, and designing for scale</p>
          </div>
          <div className="backend-feature">
            <div className="feature-icon">🔄</div>
            <h4>Microservices</h4>
            <p>Designing distributed systems with service-oriented architecture for scalability</p>
          </div>
          <div className="backend-feature">
            <div className="feature-icon">📊</div>
            <h4>Data Processing</h4>
            <p>Building efficient ETL pipelines and real-time data processing systems</p>
          </div>
          <div className="backend-feature">
            <div className="feature-icon">💼</div>
            <h4>Financial Systems</h4>
            <p>Specialized in developing secure payment processing and financial transaction systems</p>
          </div>
          <div className="backend-feature">
            <div className="feature-icon">⛓️</div>
            <h4>Blockchain Integration</h4>
            <p>Connecting traditional systems with blockchain networks for decentralized applications</p>
          </div>
        </div>
      </div>

      <div className="code-showcase">
        <h3>Backend Code Samples</h3>
        <div className={`code-container ${isVisible ? 'visible' : ''}`}>
          <div className="code-tabs">
            <button className="code-tab active">Node.js API</button>
            <button className="code-tab">Database Query</button>
            <button className="code-tab">Smart Contract</button>
          </div>
          <pre className="code-display">
            <code>
{`// Express API with authentication middleware
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const router = express.Router();

// Authentication middleware
const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      message: 'Authentication failed' 
    });
  }
};

// Secure transaction endpoint
router.post('/api/transactions', authenticateUser, async (req, res) => {
  try {
    const { amount, recipient, currency } = req.body;
    
    // Validate transaction data
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }
    
    // Create transaction record
    const transaction = new Transaction({
      userId: req.userData.userId,
      amount,
      recipient,
      currency,
      timestamp: new Date(),
      status: 'pending'
    });
    
    // Save to database and process
    await transaction.save();
    
    // Process transaction asynchronously
    processTransaction(transaction._id);
    
    return res.status(201).json({
      message: 'Transaction initiated',
      transactionId: transaction._id
    });
  } catch (error) {
    console.error('Transaction error:', error);
    return res.status(500).json({
      message: 'Transaction processing failed'
    });
  }
});

module.exports = router;`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

// File: src/components/AnimatedSkills.tsx (continued)
// Helper function to get card color based on category
const getCardColor = (category: string): string => {
    switch (category) {
      case 'backend':
        return 'rgba(52, 152, 219, 0.1)';
      case 'blockchain':
        return 'rgba(155, 89, 182, 0.1)';
      case 'frontend':
        return 'rgba(46, 204, 113, 0.1)';
      case 'devops':
        return 'rgba(231, 76, 60, 0.1)';
      default:
        return 'rgba(52, 73, 94, 0.1)';
    }
  };
  
  export default AnimatedSkills;