import React from 'react';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
}

interface ExperienceProps {
  title: string;
  items: ExperienceItem[];
}

const Experience: React.FC<ExperienceProps> = ({ title, items }) => {
  return (
    <section className="resume-section">
      <h2>{title}</h2>
      {items.map((item, index) => (
        <div className="experience-item" key={index}>
          <h3>{item.title}</h3>
          <span className="company">{item.company} • {item.period}</span>
          <ul>
            {item.responsibilities.map((responsibility, rIndex) => (
              <li key={rIndex}>{responsibility}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default Experience; 