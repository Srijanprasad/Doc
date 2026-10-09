import { ArrowUpRight, Code2 } from "lucide-react";
import { portfolioProjects } from "../data/portfolioProjects";

function ProjectCard({ project }) {
  const content = (
    <>
      <div className="sleek-project-icon">
        <Code2 aria-hidden="true" size={18} />
        {project.link && <ArrowUpRight aria-hidden="true" size={15} />}
      </div>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <div className="sleek-skill-row">
        {project.tech.map((technology) => (
          <span className="sleek-skill" key={technology}>
            {technology}
          </span>
        ))}
      </div>
      {project.link && (
        <span className="sleek-text-link">
          View repository <ArrowUpRight aria-hidden="true" size={14} />
        </span>
      )}
    </>
  );

  if (!project.link) {
    return <article className="sleek-project-card">{content}</article>;
  }

  return (
    <a
      className="sleek-project-card"
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.name} — view repository (opens in a new tab)`}
    >
      {content}
    </a>
  );
}

function Projects() {
  return (
    <div className="sleek-route-page">
      <header className="sleek-route-heading">
        <p className="sleek-eyebrow">Selected work</p>
        <h1>Projects</h1>
        <p>
          Software, AI, cloud, and Salesforce projects built to solve practical
          problems.
        </p>
      </header>

      <div className="sleek-project-grid">
        {portfolioProjects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
