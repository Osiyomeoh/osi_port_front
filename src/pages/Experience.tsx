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
      company: "Devcasta",
      role: "Founder/Team Lead",
      period: "November 2023 - Present",
      description: [
        "Founded and led a dedicated software development team focused on delivering innovative technical solutions",
        "Orchestrated project workflows and mentored team members while ensuring code quality and standards",
        "Managed client relationships and translated business requirements into technical specifications"
      ],
      technologies: ["Full-Stack Development", "Team Leadership", "Project Management", "Client Relations"]
    },
    {
      id: 2,
      company: "GuardZero",
      role: "Founder/Team Lead",
      period: "September 2023 - Present",
      description: [
        "Established a specialized security-focused technology team concentrating on blockchain security",
        "Led development teams building advanced zero knowledge applications and security solutions",
        "Implemented rigorous security protocols and testing methodologies for blockchain implementations"
      ],
      technologies: ["Blockchain Security", "ZeroKnowledge Proofs", "Smart Contract Auditing", "DeFi Security"]
    },
    {
      id: 3,
      company: "Whealve Technology Limited",
      role: "Backend Team Lead",
      period: "January 2023 - Present",
      description: [
        "Directed the backend development team responsible for core system architecture and implementation",
        "Established coding standards, review processes, and technical documentation practices",
        "Collaborated with frontend teams to ensure seamless API integration and system performance"
      ],
      technologies: ["Backend Architecture", "Team Leadership", "API Design", "Performance Optimization"]
    },
    {
      id: 4,
      company: "Gradell Technology Limited, Lagos",
      role: "Chief Executive Officer/CTO",
      period: "August 2023 - Present",
      description: [
        "Led company operations and strategic direction as CEO while overseeing technical implementation as CTO",
        "Managed diverse teams across technical and business functions",
        "Drove innovation in software development practices and technology solutions"
      ],
      technologies: ["Executive Leadership", "Software Development", "Cloud Architecture", "Business Strategy"]
    },
    {
      id: 5,
      company: "VERNYL LLC, United States",
      role: "Backend Engineer",
      period: "January 2023 - January 2024",
      description: [
        "Developed and maintained robust backend systems for client applications",
        "Implemented API integrations and optimized database performance",
        "Collaborated with cross-functional teams to deliver high-quality solutions"
      ],
      technologies: ["PHP", "Laravel", "Node.js", "MySQL", "REST APIs", "Microservices"]
    },
    {
      id: 6,
      company: "Xpactix LLC, United States",
      role: "Team Lead",
      period: "July 2023 - October 2024",
      description: [
        "Provided technical leadership for development teams across multiple projects",
        "Established development methodologies, coding standards, and quality assurance processes",
        "Served as the primary technical point of contact for stakeholders and managed project timelines"
      ],
      technologies: ["React", "Node.js", "Cloud Infrastructure", "DevOps", "API Design", "Technical Leadership"]
    },
    {
      id: 7,
      company: "Grandida Works, United States",
      role: "Solidity Engineer",
      period: "June 2022 - October 2024",
      description: [
        "Developed secure and efficient smart contracts on Ethereum blockchain",
        "Designed and implemented decentralized applications (dApps)",
        "Created and audited DeFi protocols and financial systems on blockchain"
      ],
      technologies: ["Solidity", "Ethereum", "Web3.js", "Smart Contracts", "DeFi", "dApps", "Blockchain Security"]
    },
    {
      id: 8,
      company: "Bincom Dev Center, Lagos",
      role: "Back End Developer",
      period: "December 2021 - August 2023",
      description: [
        "Developed backend services and APIs for various client projects",
        "Implemented database optimization strategies and security best practices",
        "Collaborated with frontend teams to ensure seamless integration"
      ],
      technologies: ["PHP", "Yii2", "Laravel", "MySQL", "REST APIs", "GraphQL"]
    },
    {
      id: 9,
      company: "SamTek Global, Lagos",
      role: "Web Developer",
      period: "October 2021 - August 2023",
      description: [
        "Created responsive websites optimized for performance and user experience",
        "Collaborated directly with clients to gather requirements and deliver solutions",
        "Implemented both frontend interfaces and backend functionality"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Responsive Design"]
    },
    {
      id: 10,
      company: "Wemy Industries Ltd",
      role: "Electrical Engineer",
      period: "February 2021 - January 2022",
      description: [
        "Managed electrical systems and automation processes",
        "Implemented equipment maintenance protocols and troubleshooting procedures",
        "Collaborated with cross-functional teams to optimize production processes"
      ],
      technologies: ["Electrical Engineering", "Industrial Automation", "Process Optimization", "Technical Documentation"]
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