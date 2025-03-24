import React from 'react';

interface HeaderProps {
  name: string;
  title: string;
  contactInfo: {
    linkedin: string;
    email: string;
    phone: string;
  };
}

const Header: React.FC<HeaderProps> = ({ name, title, contactInfo }) => {
  return (
    <header className="resume-header">
      <h1>{name}</h1>
      <p>{title}</p>
      <div className="contact-info">
        <a href={`https://linkedin.com/in/${contactInfo.linkedin}`} target="_blank" rel="noopener noreferrer">
          <i className="fas fa-linkedin"></i> LinkedIn
        </a>
        <span className="divider">•</span>
        <a href={`mailto:${contactInfo.email}`}>
          <i className="fas fa-envelope"></i> {contactInfo.email}
        </a>
        <span className="divider">•</span>
        <a href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`}>
          <i className="fas fa-phone"></i> {contactInfo.phone}
        </a>
      </div>
    </header>
  );
};

export default Header; 