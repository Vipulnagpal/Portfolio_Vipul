import React from 'react';

interface ProjectItem {
  title: string;
  subtitle: string;
  details: string[];
}

interface ProjectsProps {
  items: ProjectItem[];
}

const Projects: React.FC<ProjectsProps> = ({ items }) => {
  return (
    <section className="resume-section">
      <h2>Projects & Achievements</h2>
      {items.map((item, index) => (
        <div className="experience-item" key={index}>
          <h3>{item.title}</h3>
          <span className="company">{item.subtitle}</span>
          <ul>
            {item.details.map((detail, dIndex) => (
              <li key={dIndex}>{detail}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default Projects; 