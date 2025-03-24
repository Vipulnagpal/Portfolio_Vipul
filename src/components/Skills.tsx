import React from 'react';

interface Skill {
  name: string;
  items: string[];
}

interface SkillsProps {
  categories: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ categories }) => {
  return (
    <section className="resume-section">
      <h2>Skills</h2>
      <div className="skills-grid">
        {categories.map((category, index) => (
          <div className="skill-category" key={index}>
            <h3>{category.name}</h3>
            <ul>
              {category.items.map((skill, skillIndex) => (
                <li key={skillIndex}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills; 