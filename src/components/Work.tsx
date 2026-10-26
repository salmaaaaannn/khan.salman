import { useState, useRef, useEffect } from "react";
import "./styles/Work.css";
import {
  MdArrowOutward,
  MdEmojiEvents,
} from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { portfolioData } from "../data/portfolio";

type FilterTag = "all" | "ai-ml" | "fullstack" | "hackathon";

const filterOptions: { id: FilterTag; label: string; count: number }[] = [
  { id: "all", label: "All Projects", count: 7 },
  { id: "ai-ml", label: "AI & Machine Learning", count: 2 },
  { id: "fullstack", label: "Full-Stack & Systems", count: 2 },
  { id: "hackathon", label: "1st Place Hackathons", count: 3 },
];

const Work = () => {
  const [activeFilter, setActiveFilter] = useState<FilterTag>("all");
  const [entered, setEntered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const filteredProjects =
    activeFilter === "all"
      ? portfolioData.highlights
      : portfolioData.highlights.filter((p) => p.filterTag === activeFilter);

  return (
    <section
      className={`work-section${entered ? " work-entered" : ""}`}
      id="work"
      ref={sectionRef}
    >
      <div className="work-container section-container">
        {/* ── Section Header ── */}
        <div className="work-heading-wrap">
          <div className="work-kicker">Portfolio &amp; Production Work</div>
          <h2 className="work-heading">
            Featured <span>Projects</span> &amp; Innovations
          </h2>
          <p className="work-subtitle">
            Explore Salman's verified portfolio across clinical AI triage, 3D spatial simulation, production e-commerce, and first-place hackathon systems.
          </p>
          <div className="work-heading-line" />
        </div>

        {/* ── Filter Tabs ── */}
        <div className="work-filters" role="tablist" aria-label="Project categories">
          {filterOptions.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                role="tab"
                aria-selected={isActive}
                className={`work-filter-btn${isActive ? " active" : ""}`}
                onClick={() => setActiveFilter(filter.id)}
                data-cursor="disable"
              >
                {filter.id === "hackathon" && <MdEmojiEvents className="filter-trophy-icon" />}
                <span>{filter.label}</span>
                <span className="filter-count">{filter.count}</span>
              </button>
            );
          })}
        </div>

        {/* ── Natural Vertical Scrolling Project Cards ── */}
        <div className="work-cards-grid">
          {filteredProjects.map((project, index) => {
            const projectNumber = String(index + 1).padStart(2, "0");
            const isHackathonWinner = project.filterTag === "hackathon";

            return (
              <article
                className={`work-project-card${isHackathonWinner ? " card-award" : ""}`}
                key={project.title}
              >
                {/* Top Bar: Number + Category */}
                <div className="project-card-header">
                  <div className="project-number-wrap">
                    <span className="project-number">{projectNumber}</span>
                    <span className="project-category">{project.category}</span>
                  </div>
                  {isHackathonWinner && (
                    <div className="project-award-badge">
                      <MdEmojiEvents /> 1st Place Winner
                    </div>
                  )}
                </div>

                {/* Main Content Two-Column Layout */}
                <div className="project-card-body">
                  {/* Left Column: Title, Summary, Tech Stack, Links */}
                  <div className="project-card-main">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-summary">{project.summary}</p>

                    {/* Tech Stack Pills */}
                    <div className="project-tech-group">
                      <span className="tech-label">Architecture &amp; Stack</span>
                      <div className="project-tech-pills">
                        {(project.techList || project.focus.split(",").map((s) => s.trim())).map(
                          (tech) => (
                            <span className="tech-pill" key={tech}>
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="project-card-actions">
                      <a
                        href={project.projectUrl || portfolioData.meta.githubHref}
                        target="_blank"
                        rel="noreferrer"
                        className="project-action-btn primary"
                        data-cursor="disable"
                      >
                        <FaGithub /> View Code &amp; Repo <MdArrowOutward />
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Visual Preview, Key Metrics & Highlights */}
                  <div className="project-card-details">
                    {/* Visual Preview Banner */}
                    {project.image && (
                      <div className="project-preview-wrap">
                        <img
                          src={project.image}
                          alt={`${project.title} Preview`}
                          className="project-preview-img"
                          loading="lazy"
                        />
                        <div className="project-preview-overlay">
                          <span className="preview-tag">SYSTEM PREVIEW</span>
                        </div>
                      </div>
                    )}

                    {/* Metrics Grid */}
                    <div className="project-metrics-grid">
                      {project.metrics.map((metric) => (
                        <div
                          className="project-metric-tile"
                          key={`${project.title}-${metric.label}`}
                        >
                          <span className="metric-val">{metric.value}</span>
                          <span className="metric-lbl">{metric.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bullet Highlights */}
                    <div className="project-highlights-box">
                      <span className="highlights-title">Engineering Highlights</span>
                      <ul className="project-bullets">
                        {project.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── All Projects GitHub Archive Continuation ── */}
        <div className="work-archive-banner">
          <div className="archive-banner-glow" />
          <div className="archive-banner-content">
            <div className="archive-banner-text">
              <span className="archive-kicker">Continuous Open Source Engineering</span>
              <h3 className="archive-title">
                Explore Salman's Full Codebase on GitHub
              </h3>
              <p className="archive-copy">
                Beyond the highlighted systems above, explore active repositories featuring microservices, WebGL experiments, deep learning pipelines, and hackathon prototypes.
              </p>
              <div className="archive-stats">
                <span className="stat-chip"><strong>35+</strong> Repositories</span>
                <span className="stat-chip"><strong>3x</strong> 1st Place Hackathons</span>
                <span className="stat-chip"><strong>FastAPI · Next.js · Three.js</strong></span>
              </div>
            </div>
            <div className="archive-banner-action">
              <a
                href={portfolioData.meta.githubHref}
                target="_blank"
                rel="noreferrer"
                className="archive-cta-btn"
                data-cursor="disable"
              >
                <FaGithub className="github-icon" />
                <span>Browse Full GitHub Archive</span>
                <MdArrowOutward className="arrow-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
