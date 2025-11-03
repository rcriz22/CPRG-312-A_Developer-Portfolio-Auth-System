// src/pages/Projects.jsx
import React from "react";
import "../styles/project.css";

export default function Projects() {
  const sampleProjects = [
    {
      id: 1,
      title: "Secure Auth System",
      tech: ["React", "Node.js", "JWT", "MongoDB"],
      link: "#",
    },
    {
      id: 2,
      title: "Portfolio Website",
      tech: ["Vite", "React Router", "CSS Modules"],
      link: "#",
    },
    {
      id: 3,
      title: "Admin Dashboard",
      tech: ["Express", "Mongoose", "Role-Based Access"],
      link: "#",
    },
  ];

  return (
    <div className="projects-container">
      <header className="projects-header">
        <h1>My Projects</h1>
        <p>
          These sample projects demonstrate my skills in secure authentication, role-based access, and full-stack development.
        </p>
      </header>

      <section className="projects-list">
        {sampleProjects.map((project) => (
          <div key={project.id} className="project-card">
            <h2>{project.title}</h2>
            <p><strong>Tech Stack:</strong> {project.tech.join(", ")}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
          </div>
        ))}
      </section>

      <footer className="projects-footer">
        <p>© 2025 Raizel Criz Tayao • Secure Developer Portfolio</p>
      </footer>
    </div>
  );
}
