import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AvatarEyeTracking } from "../Components/AvatarEyeTracking";
import SEO from "../Components/SEO";
import { authorData } from "../data/author";
import { portfolioProjects } from "../data/portfolioProjects";

const skills = [
  "Salesforce",
  "Apex",
  "Lightning Web Components",
  "AWS",
  "Docker",
  "Kubernetes",
  "CI/CD",
  "Python",
  "Computer Vision",
];

const experienceHighlights = [
  {
    title: "Infosys Springboard Intern",
    organization: "Infosys Springboard · Virtual internship",
    detail:
      "Completed industry-aligned training and project work across software development, cloud computing, and emerging technologies.",
    href: "https://drive.google.com/file/d/1hnAfh-uXpwkmrbWu5PyytOkLfjrrW5z0/view?usp=drive_link",
  },
  {
    title: "Smart India Hackathon 2025",
    organization: "Grand Finalist · Top 1.98% nationwide",
    detail:
      "Collaborated on solution design, prototyping, and technical presentation in a national-level innovation challenge.",
    href: "https://www.linkedin.com/posts/srijan-prasad-_smartindiahackathon-sih2025-grandfinale-ugcPost-7408932261502320640-DwE0/",
  },
];

function SectionHeading({ eyebrow, title, href, linkText, id }) {
  return (
    <div className="sleek-section-heading">
      <div>
        <p className="sleek-eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
      </div>
      {href && (
        <Link className="sleek-inline-link" to={href}>
          {linkText} <ArrowRight aria-hidden="true" size={16} />
        </Link>
      )}
    </div>
  );
}

function Home({ featuredPosts = [] }) {
  return (
    <>
      <SEO
        title="Software Developer Portfolio"
        description="Srijan Prasad is a software developer and computer science student building practical software across Salesforce, cloud, DevOps, and AI."
        keywords={["Srijan Prasad", "software developer", "Salesforce", "cloud", "AI"]}
        canonicalPath="/"
        image={`${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/srijan-prasad-avatar.png`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Srijan Prasad",
          url: process.env.NEXT_PUBLIC_SITE_URL || window.location.origin,
        }}
      />
      <div className="sleek-home">
        <section className="sleek-hero" aria-labelledby="home-title">
          <AvatarEyeTracking />
          <div className="sleek-hero-copy">
            <h1 id="home-title">
              Hi, I’m Srijan <span>— a software developer.</span>
            </h1>
            <p className="sleek-hero-description">
              I build practical applications and automate real-world workflows
              across Salesforce, cloud, and DevOps. I’m especially interested
              in useful AI and thoughtful product engineering.
            </p>
          </div>

          <div className="sleek-hero-actions">
            <Link to="/about" className="sleek-button sleek-button-outline">
              About me <ArrowDown aria-hidden="true" size={15} />
            </Link>
            <Link to="/contacts" className="sleek-button sleek-button-solid">
              Get in touch <ArrowUpRight aria-hidden="true" size={15} />
            </Link>
          </div>

          <div className="sleek-social-links" aria-label="Social profiles">
            <a href={authorData.socials.github} aria-label="GitHub profile" target="_blank" rel="noreferrer">
              <Code2 aria-hidden="true" size={19} />
            </a>
            <a href={authorData.socials.instagram} aria-label="Instagram profile" target="_blank" rel="noreferrer">
              <span aria-hidden="true">◎</span>
            </a>
            <a href={authorData.socials.email} aria-label="Email Srijan">
              <Mail aria-hidden="true" size={19} />
            </a>
          </div>
        </section>

        <section className="sleek-section" id="work" aria-labelledby="work-title">
          <SectionHeading
            eyebrow="Featured"
            title="Experience"
            id="work-title"
            href="/experience"
            linkText="All experience"
          />
          <div className="sleek-experience-list">
            {experienceHighlights.map((item) => (
              <article className="sleek-experience-card" key={item.title}>
                <div className="sleek-experience-icon">
                  <BriefcaseBusiness aria-hidden="true" size={20} />
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p className="sleek-card-meta">{item.organization}</p>
                  <p className="sleek-card-description">{item.detail}</p>
                  <a className="sleek-text-link" href={item.href} target="_blank" rel="noreferrer">
                    View details <ArrowUpRight aria-hidden="true" size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="sleek-section" id="projects" aria-labelledby="projects-title">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects"
            id="projects-title"
            href="/projects"
            linkText="All projects"
          />
          <div className="sleek-project-grid">
            {portfolioProjects.slice(0, 4).map((project) => (
              <a
                className="sleek-project-card"
                href={project.link || "/projects"}
                key={project.name}
                target={project.link ? "_blank" : undefined}
                rel={project.link ? "noreferrer" : undefined}
              >
                <div className="sleek-project-icon">
                  <Code2 aria-hidden="true" size={18} />
                  {project.link && <ArrowUpRight aria-hidden="true" size={15} />}
                </div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="sleek-skill-row">
                  {project.tech.slice(0, 4).map((technology) => (
                    <span className="sleek-skill" key={technology}>
                      {technology}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="sleek-section sleek-about-section" id="about" aria-labelledby="about-title">
          <SectionHeading
            eyebrow="A little about me"
            title="About"
            id="about-title"
            href="/about"
            linkText="More about me"
          />
          <div className="sleek-about-content">
            <img src={authorData.photo} alt="" width="160" height="160" loading="lazy" />
            <div>
              <h3>{authorData.name}</h3>
              <p>
                I’m a computer science student, developer, and open-source
                contributor interested in building dependable software that
                solves practical problems. My work spans Salesforce
                development, cloud infrastructure, automation, and applied AI.
              </p>
              <p className="sleek-about-label">Areas I work with</p>
              <div className="sleek-skill-row">
                {skills.map((skill) => (
                  <span className="sleek-skill" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="sleek-section" id="github" aria-labelledby="github-title">
          <SectionHeading eyebrow="Open source" title="GitHub" id="github-title" />
          <a
            className="sleek-reference-link-card"
            href={authorData.socials.github}
            target="_blank"
            rel="noreferrer"
          >
            <div>
              <h3>Find me on GitHub</h3>
              <p>Explore my code, experiments, and open-source work.</p>
            </div>
            <ArrowRight aria-hidden="true" size={16} />
          </a>
        </section>

        <section className="sleek-section" id="blog" aria-labelledby="blog-title">
          <div className="sleek-section-heading">
            <div>
              <p className="sleek-eyebrow">Notes & ideas</p>
              <h2 id="blog-title">Latest writing</h2>
            </div>
            <a className="sleek-inline-link" href="/blog">
              All posts <ArrowRight aria-hidden="true" size={16} />
            </a>
          </div>
          <div className="sleek-blog-grid">
            {featuredPosts.slice(0, 2).map((post) => (
              <a className="sleek-blog-card" href={`/blog/${post.slug}`} key={post.slug}>
                <div className="sleek-blog-image-wrap">
                  <img src={post.image} alt={post.title} loading="lazy" />
                </div>
                <div className="sleek-blog-card-body">
                  <time dateTime={post.date}>
                    {new Date(`${post.date}T00:00:00`).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <div className="sleek-skill-row">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span className="sleek-skill" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="sleek-text-link">
                    Read article <ArrowUpRight aria-hidden="true" size={14} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="sleek-section" id="setup" aria-labelledby="setup-title">
          <SectionHeading eyebrow="Development" title="Setup" id="setup-title" />
          <div className="sleek-reference-link-list">
            <Link className="sleek-reference-link-card" to="/about">
              <div>
                <h3>Tools & technologies</h3>
                <p>{skills.join(" · ")}</p>
              </div>
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
            <Link className="sleek-reference-link-card" to="/certifications">
              <div>
                <h3>Certifications & achievements</h3>
                <p>Training, credentials, and milestones from my learning journey.</p>
              </div>
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </section>

        <section className="sleek-section" id="journey" aria-labelledby="journey-title">
          <SectionHeading eyebrow="My" title="Journey" id="journey-title" />
          <div className="sleek-reference-link-list">
            <Link className="sleek-reference-link-card" to="/experience">
              <div>
                <h3>Experience</h3>
                <p>Explore my work, internships, and community involvement.</p>
              </div>
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
            <Link className="sleek-reference-link-card" to="/projects">
              <div>
                <h3>Projects</h3>
                <p>See the applications and experiments I have built.</p>
              </div>
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
            <Link className="sleek-reference-link-card" to="/play">
              <div>
                <h3>Play</h3>
                <p>Take a short break with my Pac-Man arcade game.</p>
              </div>
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </section>

        <section className="sleek-contact-cta" id="contact" aria-labelledby="contact-title">
          <p className="sleek-eyebrow">Let’s connect</p>
          <h2 id="contact-title">Have a project or an opportunity in mind?</h2>
          <p>
            I’m open to thoughtful conversations about software, cloud, and
            engineering opportunities.
          </p>
          <div className="sleek-hero-actions">
            <Link to="/contacts" className="sleek-button sleek-button-solid">
              Contact me <ArrowUpRight aria-hidden="true" size={15} />
            </Link>
            <a href={authorData.socials.email} className="sleek-button sleek-button-outline">
              Send an email <Mail aria-hidden="true" size={15} />
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
