import React from 'react';

interface AboutProps {
  content: string;
}

const About: React.FC<AboutProps> = ({ content }) => {
  return (
    <section className="resume-section">
      <h2>About Me</h2>
      <div className="about-content">
        <p>{content}</p>
      </div>
    </section>
  );
};

export default About; 