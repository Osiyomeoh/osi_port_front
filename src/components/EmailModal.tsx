// src/components/EmailModal.tsx
import React, { useState } from 'react';
import '../styles/modals.css';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Form status state
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, message: '' }
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, message: 'Please fill all required fields.' }
      });
      return;
    }

    setStatus({
      submitted: false,
      submitting: true,
      info: { error: false, message: '' }
    });

    try {
      // Using the confirmed working endpoint
      const response = await fetch('https://osiyomeoh-portfoilio.onrender.com/api/email/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Success
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, message: 'Message sent successfully!' }
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Close modal after 3 seconds on success
        setTimeout(() => {
          onClose();
          // Reset status after closing
          setTimeout(() => {
            setStatus({
              submitted: false,
              submitting: false,
              info: { error: false, message: '' }
            });
          }, 300);
        }, 3000);
      } else {
        // Error
        setStatus({
          submitted: false,
          submitting: false,
          info: { error: true, message: data.error || 'Failed to send message. Please try again.' }
        });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, message: 'An unexpected error occurred. Please try again.' }
      });
    }
  };

  // Don't render if modal is not open
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="email-modal" 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Get In Touch</h2>
        
        {status.submitted ? (
          <div className="success-message">
            <svg viewBox="0 0 24 24" width="50" height="50" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <p>Thank you for your message!</p>
            <p>I'll get back to you as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={status.submitting}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={status.submitting}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                disabled={status.submitting}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                disabled={status.submitting}
              />
            </div>
            
            {status.info.error && (
              <div className="error-message">
                <p>{status.info.message}</p>
              </div>
            )}
            
            <button 
              type="submit" 
              className="submit-button"
              disabled={status.submitting}
            >
              {status.submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EmailModal;