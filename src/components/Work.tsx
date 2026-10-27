import { useState, useMemo } from "react";
import "./styles/Work.css";
import {
  MdArrowOutward,
  MdEmojiEvents,
  MdOutlineReportProblem,
  MdOutlineVerified,
  MdOutlineAutoAwesome,
} from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { portfolioData, Highlight } from "../data/portfolio";

type FilterTag = "all" | "ai-ml" | "fullstack" | "hackathon";

const filterOptions: { id: FilterTag; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "ai-ml", label: "AI & Machine Learning" },
  { id: "fullstack", label: "Full-Stack & Systems" },
  { id: "hackathon", label: "1st Place Hackathons" },
];

const Work = () => {
  const [activeFilter, setActiveFilter] = useState<FilterTag>("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return portfolioData.highlights;
    return portfolioData.highlights.filter((p) => p.filterTag === activeFilter);
  }, [activeFilter]);

  // Counts for filters
  const counts = useMemo(() => {
    return {
      all: portfolioData.highlights.length,
      "ai-ml": portfolioData.highlights.filter((p) => p.filterTag === "ai-ml").length,
      fullstack: portfolioData.highlights.filter((p) => p.filterTag === "fullstack").length,
      hackathon: portfolioData.highlights.filter((p) => p.filterTag === "hackathon").length,
    };
  }, []);

  const scrollToProject = (index: number) => {
    const el = document.getElementById(`project-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section className="work-section" id="work">
      <div className="work-container section-container">
        {/* ── Section Header (Reference A & B Alignment) ── */}
        <div className="work-header">
          <div className="work-kicker-badge">
            <MdOutlineAutoAwesome className="kicker-icon" />
            <span>Featured Engineering</span>
          </div>

          <h2 className="work-heading">
            Selected <span>Highlights</span>
          </h2>

          <p className="work-description">
            Explore Salman's verified portfolio across clinical AI triage, 3D WebGL spatial simulation,
            production e-commerce, and first-place hackathon systems.
          </p>

          <div className="work-heading-line" />
        </div>

        {/* ── Category Filter Bar ── */}
        <div className="work-filters" role="tablist" aria-label="Project categories">
          {filterOptions.map((filter) => {
            const isActive = activeFilter === filter.id;
            const count = counts[filter.id] || 0;

            return (
              <button
                key={filter.id}
                role="tab"
                aria-selected={isActive}
                className={`work-filter-btn${isActive ? " active" : ""}`}
                onClick={() => setActiveFilter(filter.id)}
                data-cursor="disable"
              >
                {filter.id === "hackathon" && (
                  <MdEmojiEvents className="filter-trophy-icon" />
                )}
                <span>{filter.label}</span>
                <span className="filter-count-badge">{count}</span>
              </button>
            );
          })}
        </div>

        {/* ── Quick Project Jump Navigation Bar ── */}
        <div className="work-jump-bar">
          <span className="jump-bar-label">Quick Jump:</span>
          <div className="jump-pills-list">
            {filteredProjects.map((p, idx) => (
              <button
                key={p.title}
                className="jump-pill"
                onClick={() => scrollToProject(idx)}
                data-cursor="disable"
              >
                <span className="jump-num">{String(idx + 1).padStart(2, "0")}</span>
                <span className="jump-title">{p.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Natural Vertical Project Showcase (Reference A) ── */}
        <div className="projects-showcase-list">
          {filteredProjects.map((project: Highlight, index: number) => {
            const projectNumber = String(index + 1).padStart(2, "0");

            return (
              <article
                className="project-card"
                id={`project-${index}`}
                key={project.title}
              >
                {/* ── Project Header: Index, Category, Award ── */}
                <div className="project-top-row">
                  <div className="project-badges-left">
                    <span className="project-index-tag">#{projectNumber}</span>
                    <span className="project-category-chip">{project.category}</span>
                  </div>
                  {project.award && (
                    <div className="project-award-chip">
                      <MdEmojiEvents className="award-icon" />
                      <span>{project.award}</span>
                    </div>
                  )}
                </div>

                {/* ── Title & Overview ── */}
                <div className="project-intro">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                </div>

                {/* ── Reference A: Separate Problem & Solution Panels ── */}
                <div className="problem-solution-container">
                  {/* Problem Panel */}
                  <div className="ps-card problem-card">
                    <div className="ps-card-header">
                      <MdOutlineReportProblem className="ps-icon problem-icon" />
                      <span className="ps-label">The Challenge</span>
                    </div>
                    <p className="ps-text">{project.problem}</p>
                  </div>

                  {/* Solution Panel */}
                  <div className="ps-card solution-card">
                    <div className="ps-card-header">
                      <MdOutlineVerified className="ps-icon solution-icon" />
                      <span className="ps-label">Engineered Solution</span>
                    </div>
                    <p className="ps-text">{project.solution}</p>
                  </div>
                </div>

                {/* ── Key Metrics Grid ── */}
                <div className="project-metrics-row">
                  {project.metrics.map((metric) => (
                    <div className="metric-chip" key={`${project.title}-${metric.label}`}>
                      <strong className="metric-val">{metric.value}</strong>
                      <span className="metric-lbl">{metric.label}</span>
                    </div>
                  ))}
                </div>

                {/* ── Bottom Bar: Tech Stack & Actions ── */}
                <div className="project-bottom-row">
                  <div className="project-stack-wrap">
                    <span className="stack-label">Architecture &amp; Stack:</span>
                    <div className="project-tech-pills">
                      {project.techList.map((tech) => (
                        <span className="tech-pill" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="project-action-row">
                    <a
                      href={project.projectUrl || portfolioData.meta.githubHref}
                      target="_blank"
                      rel="noreferrer"
                      className="project-action-btn primary"
                      data-cursor="disable"
                    >
                      <FaGithub className="btn-icon" />
                      <span>View Code &amp; Repository</span>
                      <MdArrowOutward className="btn-arrow" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── GitHub Continuation Banner ── */}
        <div className="work-github-banner">
          <div className="banner-badge">
            <FaGithub /> Open Source Engineering
          </div>
          <div className="banner-copy">
            <h3>Explore 35+ Repositories on GitHub</h3>
            <p>
              Deep-dive into production full-stack architectures, Python AI/ML microservices,
              computer vision pipelines, and 3D WebGL experiments.
            </p>
          </div>
          <a
            href={portfolioData.meta.githubHref}
            target="_blank"
            rel="noreferrer"
            className="banner-action-btn"
            data-cursor="disable"
          >
            <span>Visit @salmaaaaannn</span>
            <MdArrowOutward />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Work;
