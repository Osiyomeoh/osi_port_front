import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import ChatAdmin from './admin/ChatAdmin'; // Import the admin component
import EmailModal from './components/EmailModal';
import ProjectModal from './components/ProjectModal';
import SocialProfilesModal from './components/SocialProfileModal';
import ThemeSwitch from './components/ThemeSwitch';
import { ThemeProvider } from './context/ThemeContext';
import { ChatProvider } from './context/ChatContext';
import './styles/theme.css';
import './App.css';

// Extended Project interface to include demo content
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

// Define a context to share modal state across components
export const ModalContext = React.createContext<{
  openEmailModal: () => void;
  openProjectModal: (project: Project) => void;
  openSocialModal: (platform: 'github' | 'linkedin') => void;
}>({
  openEmailModal: () => {},
  openProjectModal: () => {},
  openSocialModal: () => {},
});

const App: React.FC = () => {
  // Modal states
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [socialModalOpen, setSocialModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedSocialPlatform, setSelectedSocialPlatform] = useState<'github' | 'linkedin'>('github');

  // Modal handlers
  const openEmailModal = () => setEmailModalOpen(true);
  const closeEmailModal = () => setEmailModalOpen(false);
  
  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setProjectModalOpen(true);
  };
  const closeProjectModal = () => setProjectModalOpen(false);
  
  const openSocialModal = (platform: 'github' | 'linkedin') => {
    setSelectedSocialPlatform(platform);
    setSocialModalOpen(true);
  };
  const closeSocialModal = () => setSocialModalOpen(false);

  return (
    <ThemeProvider>
      <ChatProvider>
        <ModalContext.Provider value={{ openEmailModal, openProjectModal, openSocialModal }}>
          <Router>
            <Routes>
              {/* Admin Route */}
              <Route path="/admin/chat" element={<ChatAdmin />} />
              
              {/* Public Routes with Regular Layout */}
              <Route path="/" element={
                <div className="app">
                  <Navbar />
                  <Home />
                  <Footer />
                  <ThemeSwitch />
                  <ChatWidget />
                  <EmailModal isOpen={emailModalOpen} onClose={closeEmailModal} />
                  <ProjectModal
                    isOpen={projectModalOpen}
                    onClose={closeProjectModal}
                    project={selectedProject}
                  />
                  <SocialProfilesModal
                    isOpen={socialModalOpen}
                    onClose={closeSocialModal}
                    initialPlatform={selectedSocialPlatform}
                  />
                </div>
              } />
              <Route path="/about" element={
                <div className="app">
                  <Navbar />
                  <About />
                  <Footer />
                  <ThemeSwitch />
                  <ChatWidget />
                  <EmailModal isOpen={emailModalOpen} onClose={closeEmailModal} />
                  <ProjectModal
                    isOpen={projectModalOpen}
                    onClose={closeProjectModal}
                    project={selectedProject}
                  />
                  <SocialProfilesModal
                    isOpen={socialModalOpen}
                    onClose={closeSocialModal}
                    initialPlatform={selectedSocialPlatform}
                  />
                </div>
              } />
              <Route path="/projects" element={
                <div className="app">
                  <Navbar />
                  <Projects />
                  <Footer />
                  <ThemeSwitch />
                  <ChatWidget />
                  <EmailModal isOpen={emailModalOpen} onClose={closeEmailModal} />
                  <ProjectModal
                    isOpen={projectModalOpen}
                    onClose={closeProjectModal}
                    project={selectedProject}
                  />
                  <SocialProfilesModal
                    isOpen={socialModalOpen}
                    onClose={closeSocialModal}
                    initialPlatform={selectedSocialPlatform}
                  />
                </div>
              } />
              <Route path="/experience" element={
                <div className="app">
                  <Navbar />
                  <Experience />
                  <Footer />
                  <ThemeSwitch />
                  <ChatWidget />
                  <EmailModal isOpen={emailModalOpen} onClose={closeEmailModal} />
                  <ProjectModal
                    isOpen={projectModalOpen}
                    onClose={closeProjectModal}
                    project={selectedProject}
                  />
                  <SocialProfilesModal
                    isOpen={socialModalOpen}
                    onClose={closeSocialModal}
                    initialPlatform={selectedSocialPlatform}
                  />
                </div>
              } />
              <Route path="/contact" element={
                <div className="app">
                  <Navbar />
                  <Contact />
                  <Footer />
                  <ThemeSwitch />
                  <ChatWidget />
                  <EmailModal isOpen={emailModalOpen} onClose={closeEmailModal} />
                  <ProjectModal
                    isOpen={projectModalOpen}
                    onClose={closeProjectModal}
                    project={selectedProject}
                  />
                  <SocialProfilesModal
                    isOpen={socialModalOpen}
                    onClose={closeSocialModal}
                    initialPlatform={selectedSocialPlatform}
                  />
                </div>
              } />
            </Routes>
          </Router>
        </ModalContext.Provider>
      </ChatProvider>
    </ThemeProvider>
  );
};

export default App;