// File: src/pages/Home.tsx
import React, { useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import { ThemeContext } from '../context/ThemeContext'; // Add this import


const Home: React.FC = () => {
    const { theme } = useContext(ThemeContext);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const codeBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate elements sequentially
    const elements = [
      { ref: titleRef, delay: 200 },
      { ref: subtitleRef, delay: 500 },
      { ref: descRef, delay: 800 },
      { ref: buttonsRef, delay: 1100 },
      { ref: stackRef, delay: 1400 },
      { ref: codeBlockRef, delay: 1700 }
    ];

    elements.forEach(el => {
      if (el.ref.current) {
        setTimeout(() => {
          el.ref.current?.classList.add('visible');
        }, el.delay);
      }
    });

    // Initialize the code typing effect
    const codeElement = document.querySelector('.code-typing');
    if (codeElement) {
      codeElement.classList.add('start-typing');
    }
    
    // Generate backend-themed animated particles
    if (particlesRef.current) {
      generateParticles();
    }
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  const generateParticles = () => {
    const particlesContainer = particlesRef.current;
    if (!particlesContainer) return;
    
    const particleCount = 50;
    const particleColors = ['#3498db', '#2980b9', '#8e44ad', '#1abc9c', '#2c3e50'];
    const shapes = ['circle', 'square', 'triangle', 'diamond'];
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random properties
      const size = Math.random() * 10 + 5;
      const colorIndex = Math.floor(Math.random() * particleColors.length);
      const shapeIndex = Math.floor(Math.random() * shapes.length);
      
      // Position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      
      // Animation duration and delay
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      
      // Apply styles
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = particleColors[colorIndex];
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      
      // Apply shape class
      particle.classList.add(shapes[shapeIndex]);
      
      particlesContainer.appendChild(particle);
    }
  };

  return (
    <section className="hero-section">
      <div className="particles-container" ref={particlesRef}></div>
      
      <div className="hero-content">
        <h1 ref={titleRef}>Aleonomoh Samuel</h1>
        <h2 ref={subtitleRef}>Senior Software Engineer</h2>
        <p ref={descRef}>
          Fullstack developer with <span className="highlight">5+ years</span> of experience, 
          specializing in <span className="highlight">backend systems</span> for <span className="highlight">  finance</span> and <span className="highlight"> blockchain</span> projects
        </p>
        
        <div className="hero-buttons" ref={buttonsRef}>
          <Link to="/projects" className="btn primary-btn">View Projects</Link>
          <Link to="/contact" className="btn secondary-btn">Contact Me</Link>
        </div>
        
        <div className="tech-stack" ref={stackRef}>
          <div className="tech-tag">Node.js</div>
          <div className="tech-tag">Express</div>
          <div className="tech-tag">MongoDB</div>
          <div className="tech-tag">PostgreSQL</div>
          <div className="tech-tag">Solidity</div>
          <div className="tech-tag">React</div>
          <div className="tech-tag">TypeScript</div>
          <div className="tech-tag">Blockchain</div>
        </div>
      </div>
      
      <div className="code-block-container" ref={codeBlockRef}>
        <div className="code-header">
          <div className="code-title">server.js</div>
          <div className="code-controls">
            <span className="code-dot red"></span>
            <span className="code-dot yellow"></span>
            <span className="code-dot green"></span>
          </div>
        </div>
        <div className="code-content">
          <pre>
            <code className="code-typing">
{`// Backend expertise showcase - Aleonomoh Samuel
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(express.json({ limit: '10kb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});
app.use('/api', limiter);

// Connect to database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Database connection error:', err));

// API routes
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/blockchain', require('./routes/blockchain'));
app.use('/api/auth', require('./routes/auth'));

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default Home;