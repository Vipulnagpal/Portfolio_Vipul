import React from 'react';
import Header from './Header';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';
import Education from './Education';
import Projects from './Projects';
import GameSection from './GameSection';

const Resume: React.FC = () => {
  const resumeData = {
    header: {
      name: "Vipul Nagpal",
      title: "Software Engineer",
      contactInfo: {
        linkedin: "vipul-nagpal-28801b168",
        email: "vipulnagpal51@gmail.com",
        phone: "8168082096",
      }
    },
    about: "Software Engineer with 5 years of experience in .NET Core, C#, React.js, and Microservices, specializing in scalable system architecture and API development. Skilled in designing and implementing microservices-based solutions, enhancing system scalability, performance, and maintainability. Experienced in writing clean, efficient code, applying design patterns, and optimizing backend performance for high-traffic applications.",
    skills: [
      {
        name: "Backend & API Development",
        items: [
          ".NET Core",
          "ASP.NET",
          "RESTful APIs",
          "Minimal APIs",
          "Microservices"
        ]
      },
      {
        name: "Languages",
        items: [
          "C#",
          "TypeScript",
          "Python",
          "JavaScript",
          "C/C++"
        ]
      },
      {
        name: "Frontend",
        items: [
          "React.js",
          "Blazor",
          "HTML",
          "CSS",
          "VSTO",
          "WPF"
        ]
      },
      {
        name: "Databases",
        items: [
          "SQL Server",
          "MySQL",
          "DynamoDB"
        ]
      },
      {
        name: "Cloud & DevOps",
        items: [
          "AWS (Lambda, SQS, S3)",
          "Docker",
          "CI/CD"
        ]
      },
      {
        name: "Testing & Security",
        items: [
          "Unit Testing",
          "Cypress",
          "MOQ",
          "Secure Coding"
        ]
      },
      {
        name: "Tools & Version Control",
        items: [
          "Git",
          "Jira",
          "Postman",
          "Kibana",
          "Fiddler",
          "Agile (Scrum)"
        ]
      }
    ],
    experience: [
      {
        title: "Software Engineer 2",
        company: "Zocdoc",
        period: "Oct 2022 - Present",
        responsibilities: [
          "Led migration of a monolithic system to microservices, improving scalability by 50% and reducing deployment time by 60%, while refactoring API architecture to enhance response times by 40% through caching, indexing, and load balancing",
          "Engineered and deployed 30+ high-performance REST APIs, processing 24M+ requests/month with enhanced security",
          "Collaborated with 4 multidisciplinary teams, ensuring on-time feature releases with 98%+ success rate",
          "Increased unit test coverage by 85%, reducing post-production bugs and improving reliability",
          "Leveraged AWS Lambda & DynamoDB Streams for real-time sync, reducing stale appointment data incidents by 80%"
        ]
      },
      {
        title: "Senior Associate",
        company: "State Street Corporation",
        period: "Jan 2020 - Sept 2022",
        responsibilities: [
          "Developed a web application with a thematic focus using React, HTML, CSS, and .NET C#, incorporating secure authorization and seamless integration across applications to enhance both user accessibility and system efficiency",
          "Designed and deployed Minimal APIs with .NET 8, cutting backend processing time by 20%",
          "Automated workflows with 10+ VSTO Excel solutions, boosting productivity by 45+ hours per month",
          "Mentored & led 5 interns, streamlining automation workflows and achieving 150+ FTE savings annually",
          "Eliminated manual errors by 90% through workflow automation, improving data accuracy & compliance",
          "Aligned projects with corporate objectives, delivering features 2 weeks ahead of schedule and improving deployment efficiency"
        ],
        subtitle: "Promoted from Intern → Associate → Associate 2 → Senior Associate"
      }
    ],
    education: [
      {
        degree: "Bachelor of Technology in Computer Science",
        institution: "SRM Institute Of Science And Technology",
        period: "2016 - 2020",
        grade: "82%"
      }
    ],
    projects: [
      {
        title: "Appointment Booking System Microservice",
        subtitle: ".NET, SQL Server • March 2024 - Ongoing",
        details: [
          "Redesigned appointment booking architecture from monolith to microservices, reducing downtime by 30%",
          "Built a robust appointment management system supporting seamless booking, modification, and cancellation, improving user experience and system reliability by 35%",
          "Configured AWS CloudWatch for real-time performance monitoring, reducing incident resolution time by 50%",
          "Implemented on-demand capacity scaling in DynamoDB, handling 100K+ appointment queries per minute without performance degradation"
        ]
      },
      {
        title: "Company Project Working Hours Management System",
        subtitle: "React.js, SQL Server, Microservices",
        details: [
          "Created a provider scheduling system, optimizing workforce availability across multiple locations",
          "Developed a responsive React.js frontend, ensuring smooth navigation and user-friendly interactions",
          "Structured a highly scalable SQL Server database model, ensuring efficient handling of large datasets",
          "Reduced deployment bugs by 40% through rigorous unit and integration testing"
        ]
      }
    ]
  };

  return (
    <div className="resume-container">
      <Header 
        name={resumeData.header.name} 
        title={resumeData.header.title} 
        contactInfo={resumeData.header.contactInfo} 
      />
      
      <div className="resume-content">
        <About content={resumeData.about} />
        <Skills categories={resumeData.skills} />
        <Experience title="Professional Experience" items={resumeData.experience} />
        <Education items={resumeData.education} />
        <Projects items={resumeData.projects} />
        <GameSection />
      </div>
    </div>
  );
};

export default Resume; 