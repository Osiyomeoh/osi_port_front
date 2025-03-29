// File: src/pages/Experience.tsx
import React from 'react';
import ExperienceItem from '../components/ExperienceItem';
import '../styles/Experience.css';

interface ExperienceData {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string[];
  technologies: string[];
}

const Experience: React.FC = () => {
  const experiences: ExperienceData[] = [
    {
      id: 1,
      company: "VERNYL LLC, United States",
      role: "Backend Engineer",
      period: "January 2024 - Present",
      description: [
        "Developed and maintained backend systems, ensuring high performance and responsiveness to front-end requests",
        "Implemented API integrations and optimized database queries for efficiency",
        "Collaborated with cross-functional teams to deliver robust solutions"
      ],
      technologies: ["PHP", "Laravel", "Node.js", "MySQL", "REST APIs", "Microservices"]
    },
    {
      id: 2,
      company: "Gradell Technology Limited, Lagos",
      role: "Chief Technology Officer / Backend Engineer",
      period: "August 2023 - Present",
      description: [
        "Spearheaded the company's technology strategy, overseeing backend development",
        "Ensured the delivery of high-quality software solutions",
        "Managed a team of engineers, fostering a culture of innovation and collaboration"
      ],
      technologies: ["Node.js", "TypeScript", "PostgreSQL", "AWS", "CI/CD", "Microservices"]
    },
    {
      id: 3,
      company: "Xpactix LLC, United States",
      role: "Chief Technology Officer and Co-Founder",
      period: "July 2023 - December 2024",
      description: [
        "Directed the technical vision of the company, overseeing all engineering activities",
        "Focused on delivering scalable, secure, and efficient software solutions",
        "Led architecture design and implementation of key systems"
      ],
      technologies: ["React", "Node.js", "Cloud Infrastructure", "DevOps", "API Design"]
    },
    {
      id: 4,
      company: "Grandida Works, United States",
      role: "Solidity Engineer",
      period: "June 2022 - June 2024",
      description: [
        "Developed and audited smart contracts on the Ethereum blockchain, ensuring security and efficiency",
        "Contributed to the design and implementation of decentralized applications (dApps)",
        "Implemented DeFi protocols and secure financial systems"
      ],
      technologies: ["Solidity", "Ethereum", "Web3.js", "Smart Contracts", "DeFi", "dApps"]
    },
    {
      id: 5,
      company: "Bincom Dev Center, Lagos",
      role: "Back End Developer",
      period: "December 2021 - August 2023",
      description: [
        "Created and maintained backend services and APIs for various projects",
        "Collaborated with front-end developers to ensure seamless integration and functionality",
        "Implemented database optimization strategies and security best practices"
      ],
      technologies: ["PHP", "Yii2", "Laravel", "MySQL", "REST APIs", "GraphQL"]
    },
    {
      id: 6,
      company: "SamTek Global, Lagos",
      role: "Web Developer",
      period: "October 2021 - August 2023",
      description: [
        "Developed responsive websites, optimizing them for performance and user experience",
        "Worked closely with clients to gather requirements and deliver tailored web solutions",
        "Implemented front-end interfaces and back-end functionality"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Responsive Design"]
    }
  ];

  return (
    <section className="experience-section">
      <div className="container">
        <h2 className="section-title">Work Experience</h2>
        <div className="timeline">
          {experiences.map(exp => (
            <ExperienceItem key={exp.id} experience={exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;