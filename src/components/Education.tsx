import React from 'react';

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  grade: string;
}

interface EducationProps {
  items: EducationItem[];
}

const Education: React.FC<EducationProps> = ({ items }) => {
  return (
    <section className="resume-section">
      <h2>Education</h2>
      {items.map((item, index) => (
        <div className="education-item" key={index}>
          <h3>{item.degree}</h3>
          <p className="institution">{item.institution} • {item.period}</p>
          <span className="education-grade">{item.grade}</span>
        </div>
      ))}
    </section>
  );
};

export default Education; 