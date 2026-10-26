import { useState, useCallback, useRef, useEffect } from "react";
import "./styles/Work.css";
import {
  MdArrowBack,
  MdArrowForward,
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);
  const [entered, setEntered] = useState(false);
  const [contentKey, setContentKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    activeFilter === "all"
      ? portfolioData.highlights
      : portfolioData.highlights.filter((p) => p.filterTag === activeFilter);

  // Measure container width for exact animated translation
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setSlideWidth(containerRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [filteredProjects.length]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setContentKey((k) => k + 1);
  }, [activeFilter]);

  // Intersection observer for section entrance animation
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setContentKey((k) => k + 1);
      setTimeout(() => setIsAnimating(false), 450);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? filteredProjects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide, filteredProjects.length]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === filteredProjects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide, filteredProjects.length]);

  const progressPct =
    filteredProjects.length > 0
      ? ((currentIndex + 1) / filteredProjects.length) * 100
      : 0;

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
            Selected <span>Highlights</span>
          </h2>
          <p className="work-subtitle">
            Explore Salman's verified portfolio across clinical AI triage, 3D spatial simulation, production e-commerce, and first-place hackathon systems.
          </p>
          <div className="work-heading-line" />
        </div>

        {/* ── Category Filters ── */}
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
                {filter.id === "hackathon" && (
                  <MdEmojiEvents className="filter-trophy-icon" />
                )}
                <span>{filter.label}</span>
                <span className="filter-count">{filter.count}</span>
              </button>
            );
          })}
        </div>

        {/* ── Animated Highlights Showcase ── */}
        <div className="carousel-wrapper">
          <div className="carousel-track-container" ref={containerRef}>
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * slideWidth}px)`,
              }}
            >
              {filteredProjects.map((project, index) => {
                const isActive = index === currentIndex;
                const projectNumber = String(index + 1).padStart(2, "0");
                const isHackathonWinner = project.filterTag === "hackathon";

                return (
                  <div className="carousel-slide" key={project.title}>
                    <div
                      className="carousel-content"
                      key={isActive ? `active-${contentKey}` : `idle-${index}`}
                    >
                      {/* Left: Project Identity & Controls */}
                      <div className="carousel-info">
                        <div className="carousel-number">
                          <h3 className={isActive ? "num-animate" : ""}>
                            {projectNumber}
                          </h3>
                        </div>

                        <div className="carousel-details">
                          <div className="carousel-meta-row">
                            <span className="carousel-category">
                              {project.category}
                            </span>
                            {isHackathonWinner && (
                              <span className="carousel-award-badge">
                                <MdEmojiEvents /> 1st Place Winner
                              </span>
                            )}
                          </div>

                          <h4 className={isActive ? "slide-in-up delay-1" : ""}>
                            {project.title}
                          </h4>

                          {/* Architecture & Tech Stack */}
                          <div
                            className={`carousel-tools${isActive ? " slide-in-up delay-2" : ""}`}
                          >
                            <span className="tools-label">Architecture &amp; Stack</span>
                            <div className="carousel-tech-pills">
                              {(
                                project.techList ||
                                project.focus.split(",").map((s) => s.trim())
                              ).map((tech) => (
                                <span className="carousel-pill" key={tech}>
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Navigation Controls */}
                          <div
                            className={`carousel-nav${isActive ? " slide-in-up delay-3" : ""}`}
                          >
                            <button
                              className="carousel-arrow"
                              onClick={goToPrev}
                              aria-label="Previous project"
                              data-cursor="disable"
                            >
                              <MdArrowBack />
                            </button>
                            <div className="carousel-dots">
                              {filteredProjects.map((_, i) => (
                                <button
                                  key={i}
                                  className={`carousel-dot${i === currentIndex ? " carousel-dot-active" : ""}`}
                                  onClick={() => goToSlide(i)}
                                  aria-label={`Go to project ${i + 1}`}
                                  data-cursor="disable"
                                />
                              ))}
                            </div>
                            <button
                              className="carousel-arrow"
                              onClick={goToNext}
                              aria-label="Next project"
                              data-cursor="disable"
                            >
                              <MdArrowForward />
                            </button>
                            <span className="carousel-counter">
                              {String(currentIndex + 1).padStart(2, "0")} /{" "}
                              {String(filteredProjects.length).padStart(2, "0")}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Detail Panel */}
                      <div
                        className={`carousel-panel${isActive ? " panel-enter" : ""}`}
                      >
                        <p
                          className={`carousel-summary${isActive ? " fade-in-up delay-1" : ""}`}
                        >
                          {project.summary}
                        </p>

                        {/* Key Metrics Grid */}
                        <div className="carousel-metrics">
                          {project.metrics.map((metric, mi) => (
                            <div
                              className={`carousel-metric${isActive ? ` metric-pop delay-${mi + 1}` : ""}`}
                              key={`${project.title}-${metric.label}`}
                            >
                              <strong>{metric.value}</strong>
                              <span>{metric.label}</span>
                            </div>
                          ))}
                        </div>

                        {/* Engineering Highlights */}
                        <ul className="carousel-highlights">
                          {project.bullets.map((bullet, bi) => (
                            <li
                              className={isActive ? `fade-in-up delay-${bi + 2}` : ""}
                              key={bullet}
                            >
                              {bullet}
                            </li>
                          ))}
                        </ul>

                        {/* GitHub Action */}
                        <div className="carousel-actions">
                          <a
                            href={project.projectUrl || portfolioData.meta.githubHref}
                            target="_blank"
                            rel="noreferrer"
                            className="carousel-action-btn primary"
                            data-cursor="disable"
                          >
                            <FaGithub /> View Code &amp; Repository <MdArrowOutward />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Segmented Progress Bar */}
          <div className="carousel-progress">
            <div
              className="carousel-progress-fill"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* ── GitHub Continuation Banner ── */}
        <div className="work-github-banner">
          <div className="banner-content">
            <div className="banner-badge">
              <FaGithub /> Open Source Engineering
            </div>
            <h3>Explore 35+ Repositories on GitHub</h3>
            <p>
              Deep-dive into production full-stack architectures, Python AI/ML microservices, computer vision pipelines, and 3D WebGL experiments.
            </p>
          </div>
          <div className="banner-action">
            <a
              href={portfolioData.meta.githubHref}
              target="_blank"
              rel="noreferrer"
              className="banner-btn"
              data-cursor="disable"
            >
              <span>Visit @salmaaaaannn</span>
              <MdArrowOutward />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
