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
      title: "Full Stack Engineer",
      contactInfo: {
        linkedin: "vipul-nagpal-28801b168",
        email: "vipulnagpal51@gmail.com",
        phone: "8168082096",
      }
    },
    about: "Full Stack Engineer with expertise in C#, ASP.NET, .NET Core, and React.js, experienced in developing scalable web applications, automating business processes, and managing teams.",
    skills: [
      {
        name: "Languages",
        items: [
          "C#",
          "Python",
          "JavaScript",
          "C/C++"
        ]
      },
      {
        name: "Frameworks and Libraries",
        items: [
          ".NET / .NET Core",
          "React.js",
          "Blazor",
          "VSTO",
          "WPF",
          "EF Core",
          "Cypress",
          "MOQ"
        ]
      },
      {
        name: "Web Development",
        items: [
          "HTML",
          "CSS",
          "RESTful APIs",
          "Microservices",
          "CRUD applications"
        ]
      },
      {
        name: "Database",
        items: [
          "SQL Server",
          "MySQL",
          "DynamoDB"
        ]
      },
      {
        name: "Cloud & Messaging",
        items: [
          "AWS Lambda",
          "SQS"
        ]
      },
      {
        name: "Tools",
        items: [
          "Visual Studio",
          "Git",
          "Agile (Scrum)",
          "Postman",
          "Jira",
          "Fiddler",
          "Kibana"
        ]
      }
    ],
    experience: [
      {
        title: "Software Engineer 2",
        company: "Zocdoc",
        period: "Oct 2022 - Present",
        responsibilities: [
          "Led a team to deliver high-quality web applications using .NET",
          "Developed and deployed over 30 robust REST APIs for smooth integration and secure data interchange in backend systems",
          "Managed multiple endpoints across diverse systems, optimizing performance and reliability",
          "Collaborated with 4 multidisciplinary teams to optimize processes, align with project goals, and deliver top-quality solutions on schedule",
          "Worked on frontend enhancements using React.js for certain projects"
        ]
      },
      {
        title: "Senior Associate",
        company: "State Street Corporation",
        period: "Apr 2022 - Sept 2022",
        responsibilities: [
          "Developed a web application with a thematic focus using React, HTML, CSS, and .NET C#, incorporating secure authorization and seamless integration across applications",
          "Designed and launched Minimal APIs with .NET 8, enabling efficient data interaction and scalable backend systems",
          "Created dynamic and adaptive user interfaces using React.js, enhancing user engagement and the visual interface",
          "Supervised a team of 5 interns in handling .NET automation projects, optimizing processes and workflows, achieving over 150 FTE savings annually",
          "Ensured project alignment with corporate goals, delivering high-quality solutions within tight deadlines while fostering a collaborative team environment"
        ]
      },
      {
        title: "Associate 2",
        company: "State Street Corporation",
        period: "Aug 2021 - March 2022",
        responsibilities: [
          "Developed over 10 VSTO Excel automations to boost client efficiency",
          "Optimized application performance to ensure seamless and error-free deployments"
        ]
      },
      {
        title: "Associate",
        company: "State Street Corporation",
        period: "Jul 2020 - Jul 2021",
        responsibilities: [
          "Developed an Outlook Add-In utilizing VSTO and WPF, improving email handling and boosting features",
          "Provided .NET automation tools that lowered staff workload by 30%",
          "Worked closely with stakeholders to collect requirements and efficiently deploy automation solutions"
        ]
      },
      {
        title: "Artificial Intelligence and Automation Intern",
        company: "State Street Corporation",
        period: "Jan 2020 - Jun 2020",
        responsibilities: [
          "Supported the evaluation of feasibility and complexity with CSRQ metrics, prioritizing initiatives aligned with business demands, which led to a reduction of 14 full-time equivalents (FTE)",
          "Improved efficiency in data management by managing and updating the employee portal with C# .NET, HTML, CSS, and JavaScript"
        ]
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
        title: "Company Project Working Hours Management System",
        subtitle: "React.js, SQL Server, Microservices • Jun 2024 - Oct 2024",
        details: [
          "Created a system for managing working hours, allowing Providers to define their availability depending on various locations",
          "Used React.js to develop the front-end, ensuring a smooth and responsive user interface",
          "Developed the backend with C# .NET to achieve seamless data mapping and service integration",
          "Facilitated the effective mapping and handling of working hours across different modules of the application"
        ]
      },
      {
        title: "Appointment Booking System Microservice",
        subtitle: ".NET, SQL Server • Jan 2023 - Jun 2023",
        details: [
          "Transitioned the Appointment Booking System from a single monolithic structure to a microservices-based architecture",
          "Engineered a flexible solution that allows users to book, modify, and cancel appointments effortlessly",
          "Incorporated role-based access control alongside email and SMS notifications",
          "Achieved efficient integration between the frontend and backend by employing Minimal APIs",
          "Leveraged .NET C# for backend processes and SQL Server for database handling"
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