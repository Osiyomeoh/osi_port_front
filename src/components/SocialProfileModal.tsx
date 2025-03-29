// File: src/components/SocialProfilesModal.tsx
import React, { useState } from 'react';
import '../styles/modals.css';

interface SocialProfilesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlatform?: 'github' | 'linkedin';
}

interface SocialProfile {
  id: string;
  name: string;
  username: string;
  bio: string;
  avatar: string;
  link: string;
  stats: {
    followers?: number;
    following?: number;
    repositories?: number;
    contributions?: number;
    connections?: number;
    posts?: number;
  };
  activity?: {
    date: string;
    title: string;
    description: string;
  }[];
}

const SocialProfilesModal: React.FC<SocialProfilesModalProps> = ({ 
  isOpen, 
  onClose,
  initialPlatform = 'github' 
}) => {
  const [activeProfile, setActiveProfile] = useState<'github' | 'linkedin'>(initialPlatform);
  
  // Mock profile data
  const profiles: Record<'github' | 'linkedin', SocialProfile> = {
    github: {
      id: 'github',
      name: 'Aleonomoh Samuel',
      username: 'aleonomohsamuel',
      bio: 'Senior Software Engineer specializing in Backend and Blockchain development',
      avatar: '/profile-placeholder.jpg',
      link: 'https://github.com/aleonomohsamuel',
      stats: {
        followers: 158,
        following: 42,
        repositories: 35,
        contributions: 743
      },
      activity: [
        {
          date: '2023-02-15',
          title: 'Created repository: blockchain-payment-processor',
          description: 'A secure payment processing system built on Ethereum'
        },
        {
          date: '2023-01-28',
          title: 'Pushed 24 commits to defi-trading-platform',
          description: 'Implemented smart contract security improvements'
        },
        {
          date: '2023-01-10',
          title: 'Created repository: finance-data-pipeline',
          description: 'ETL pipeline for processing financial market data'
        }
      ]
    },
    linkedin: {
      id: 'linkedin',
      name: 'Aleonomoh Samuel',
      username: 'aleonomohsamuel',
      bio: 'Senior Software Engineer | Backend Expert | Blockchain Developer',
      avatar: '/profile-placeholder.jpg',
      link: 'https://linkedin.com/in/aleonomohsamuel',
      stats: {
        connections: 500,
        posts: 27
      },
      activity: [
        {
          date: '2023-02-20',
          title: 'Published article: "Microservices Architecture for Financial Systems"',
          description: '215 reactions · 43 comments'
        },
        {
          date: '2023-01-15',
          title: 'Started new position: Senior Backend Engineer at FinTech Solutions Inc.',
          description: '178 reactions'
        },
        {
          date: '2022-12-05',
          title: 'Published article: "Blockchain Integration in Traditional Banking"',
          description: '321 reactions · 67 comments'
        }
      ]
    }
  };

  if (!isOpen) return null;

  const activeProfileData = profiles[activeProfile];

  return (
    <div className="social-modal-overlay" onClick={onClose}>
      <div className="social-profiles-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        </button>
        
        <div className="profile-tabs">
          <button 
            className={`profile-tab ${activeProfile === 'github' ? 'active' : ''}`}
            onClick={() => setActiveProfile('github')}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" className="github-icon">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </button>
          <button 
            className={`profile-tab ${activeProfile === 'linkedin' ? 'active' : ''}`}
            onClick={() => setActiveProfile('linkedin')}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" className="linkedin-icon">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            LinkedIn
          </button>
        </div>
        
        <div className="profile-content">
          <div className="profile-header">
            <div className="profile-avatar">
              <img src={activeProfileData.avatar} alt={activeProfileData.name} />
            </div>
            <div className="profile-info">
              <h2>{activeProfileData.name}</h2>
              <p className="profile-username">@{activeProfileData.username}</p>
              <p className="profile-bio">{activeProfileData.bio}</p>
            </div>
          </div>
          
          <div className="profile-stats">
            {activeProfile === 'github' && (
              <>
                <div className="stat-item">
                  <span className="stat-value">{activeProfileData.stats.repositories}</span>
                  <span className="stat-label">Repositories</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{activeProfileData.stats.followers}</span>
                  <span className="stat-label">Followers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{activeProfileData.stats.following}</span>
                  <span className="stat-label">Following</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{activeProfileData.stats.contributions}</span>
                  <span className="stat-label">Contributions</span>
                </div>
              </>
            )}
            
            {activeProfile === 'linkedin' && (
              <>
                <div className="stat-item">
                  <span className="stat-value">{activeProfileData.stats.connections}+</span>
                  <span className="stat-label">Connections</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{activeProfileData.stats.posts}</span>
                  <span className="stat-label">Posts</span>
                </div>
              </>
            )}
          </div>
          
          <div className="profile-activity">
            <h3>Recent Activity</h3>
            {activeProfileData.activity?.map((item, index) => (
              <div key={index} className="activity-item">
                <div className="activity-date">{formatDate(item.date)}</div>
                <div className="activity-content">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="profile-actions">
            <a 
              href={activeProfileData.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`profile-link ${activeProfile}`}
            >
              {activeProfile === 'github' ? 'View GitHub Profile' : 'View LinkedIn Profile'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export default SocialProfilesModal;