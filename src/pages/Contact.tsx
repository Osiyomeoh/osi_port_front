// File: src/pages/Contact.tsx
import React, { useEffect, useRef, useState, useContext, FormEvent } from 'react';
import { ModalContext } from '../App';
import '../styles/Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const { openEmailModal } = useContext(ModalContext);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (emailRef.current) observer.observe(emailRef.current);
    if (socialRef.current) observer.observe(socialRef.current);

    return () => {
      if (emailRef.current) observer.unobserve(emailRef.current);
      if (socialRef.current) observer.unobserve(socialRef.current);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

 // Modified handleSubmit function with improved debugging

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  
  // Form validation
  if (!formData.name || !formData.email || !formData.message) {
    setError("Please fill all required fields");
    return;
  }
  
  setSubmitting(true);
  setError(null);
  
  // Log the data we're about to send
  console.log('Sending form data:', formData);
  
  try {
    // Actual API call to backend
    const response = await fetch('http://localhost:3001/api/email/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Add any other headers that your API might expect
      },
      body: JSON.stringify(formData),
    });
    
    // Log the entire response for debugging
    console.log('Response status:', response.status);
    
    // Get response text first to see raw response
    const responseText = await response.text();
    console.log('Response text:', responseText);
    
    // Try to parse as JSON if possible
    let data;
    try {
      data = JSON.parse(responseText);
      console.log('Parsed response:', data);
    } catch (e) {
      console.log('Response is not valid JSON');
    }
    
    if (response.ok) {
      // Success response
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } else {
      // Error from server - extract more detailed error message if available
      let errorMessage = 'Failed to send message. Please try again.';
      
      if (data) {
        // NestJS typically returns errors in these formats
        if (data.message) {
          errorMessage = typeof data.message === 'string' 
            ? data.message 
            : Array.isArray(data.message) 
              ? data.message.join(', ') 
              : JSON.stringify(data.message);
        } else if (data.error) {
          errorMessage = data.error;
        }
      }
      
      setError(errorMessage);
    }
  } catch (error) {
    console.error('Error sending form:', error);
    setError('An unexpected error occurred. Please try again later.');
  } finally {
    setSubmitting(false);
  }
};

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('aleonomohsamuel@example.com');
    alert('Email copied to clipboard!');
  };

  return (
    <section className="contact-section">
      <div className="container">
        <h2 className="section-title">Contact Me</h2>
        <div className="contact-container">
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!</p>
            
            <div className="contact-details" ref={emailRef}>
              <div className="contact-item email-box" onClick={handleCopyEmail}>
                <div className="contact-icon email-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <p className="contact-label">Email</p>
                  <p className="contact-value">aleonomohsamuel@example.com</p>
                  <p className="copy-hint">Click to copy</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon location-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <p className="contact-label">Location</p>
                  <p className="contact-value">Lagos, Nigeria</p>
                </div>
              </div>
            </div>
            
            <div className="social-media-section" ref={socialRef}>
              <h3>Social Media</h3>
              <div className="social-links">
                <a href="https://github.com/Osiyomeoh" target="_blank" rel="noopener noreferrer" className="social-link github">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/samuel-aleonomoh-047495162/" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span>LinkedIn</span>
                </a>
                <a href="https://x.com/sam_osiyomeoh" target="_blank" rel="noopener noreferrer" className="social-link twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                  <span>Twitter</span>
                </a>
                <a href="https://www.instagram.com/iamosiyomeoh" target="_blank" rel="noopener noreferrer" className="social-link instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            {submitted ? (
              <div className="success-message">
                <h3>Thank you for your message!</h3>
                <p>I'll get back to you as soon as possible.</p>
                <button onClick={() => setSubmitted(false)} className="btn primary-btn">Send Another Message</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={submitting}
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
                    disabled={submitting}
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
                    disabled={submitting}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="btn primary-btn"
                  disabled={submitting}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;