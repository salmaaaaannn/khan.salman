import { useState, useMemo } from "react";
import "./styles/WhatIDo.css";
import { portfolioData, SkillCategory, SkillItem } from "../data/portfolio";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiThreedotjs,
  SiNodedotjs,
  SiFastapi,
  SiExpress,
  SiSocketdotio,
  SiDotnet,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiPrisma,
  SiPython,
  SiOpencv,
  SiPytorch,
  SiScikitlearn,
  SiTensorflow,
  SiCplusplus,
  SiGit,
  SiDocker,
  SiPostman,
  SiNginx,
  SiStripe,
} from "react-icons/si";
import { FaJava, FaLayerGroup } from "react-icons/fa";
import { MdAccountTree, MdCheckCircleOutline } from "react-icons/md";

// Icon mapping helper
const renderTechIcon = (key: string) => {
  switch (key) {
    case "SiReact":
      return <SiReact />;
    case "SiNextdotjs":
      return <SiNextdotjs />;
    case "SiTypescript":
      return <SiTypescript />;
    case "SiTailwindcss":
      return <SiTailwindcss />;
    case "SiThreedotjs":
      return <SiThreedotjs />;
    case "SiNodedotjs":
      return <SiNodedotjs />;
    case "SiFastapi":
      return <SiFastapi />;
    case "SiExpress":
      return <SiExpress />;
    case "SiSocketdotio":
      return <SiSocketdotio />;
    case "SiDotnet":
      return <SiDotnet />;
    case "SiMongodb":
      return <SiMongodb />;
    case "SiPostgresql":
      return <SiPostgresql />;
    case "SiMysql":
      return <SiMysql />;
    case "SiRedis":
      return <SiRedis />;
    case "SiPrisma":
      return <SiPrisma />;
    case "SiPython":
      return <SiPython />;
    case "SiOpencv":
      return <SiOpencv />;
    case "SiPytorch":
      return <SiPytorch />;
    case "SiScikitlearn":
      return <SiScikitlearn />;
    case "SiTensorflow":
      return <SiTensorflow />;
    case "MdAccountTree":
      return <MdAccountTree />;
    case "SiCplusplus":
      return <SiCplusplus />;
    case "FaJava":
      return <FaJava />;
    case "SiGit":
      return <SiGit />;
    case "SiDocker":
      return <SiDocker />;
    case "SiPostman":
      return <SiPostman />;
    case "SiNginx":
      return <SiNginx />;
    case "SiStripe":
      return <SiStripe />;
    default:
      return <FaLayerGroup />;
  }
};

type FilterCategory = "all" | SkillCategory;

interface CategoryFilterOption {
  id: FilterCategory;
  label: string;
}

const filterCategories: CategoryFilterOption[] = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "database", label: "Database" },
  { id: "aiml", label: "AI / ML" },
  { id: "problem-solving", label: "Programming & Problem Solving" },
  { id: "tools-api", label: "Tools & APIs" },
];

const WhatIDo = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const skills = portfolioData.engineeringSkills;

  // Filter skills by category
  const filteredSkills = useMemo(() => {
    if (activeFilter === "all") return skills;
    return skills.filter((item) => item.category === activeFilter);
  }, [activeFilter, skills]);

  // Compute count for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: skills.length };
    skills.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return counts;
  }, [skills]);

  return (
    <section className="whatIDO stack-section" id="what">
      <div className="stack-container section-container">
        {/* ── Section Header (Reference B) ── */}
        <div className="stack-header">
          <div className="stack-kicker-badge">
            <FaLayerGroup className="stack-kicker-icon" />
            <span>Technical Capabilities</span>
          </div>

          <h2 className="stack-heading">
            Engineering <span>Stack</span>
          </h2>

          <p className="stack-description">
            A battle-tested engineering toolkit developed through hands-on internship experience
            at Entwicklera, three 1st-place hackathon victories, and production-grade software development.
          </p>

          <div className="stack-heading-line" />
        </div>

        {/* ── Category Filter Bar (Reference B with Improved Layout) ── */}
        <div className="stack-filter-wrapper">
          <div className="stack-filters" role="tablist" aria-label="Technology filter categories">
            {filterCategories.map((cat) => {
              const isActive = activeFilter === cat.id;
              const count = categoryCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`stack-filter-btn${isActive ? " active" : ""}`}
                  onClick={() => setActiveFilter(cat.id)}
                  data-cursor="disable"
                >
                  <span className="filter-label">{cat.label}</span>
                  <span className="filter-badge">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Technology Cards Grid (Reference B) ── */}
        <div className="tech-cards-grid">
          {filteredSkills.map((tech: SkillItem) => (
            <article className="tech-card" key={tech.name}>
              <div className="tech-card-top">
                <div className="tech-icon-box" aria-hidden="true">
                  {renderTechIcon(tech.iconKey)}
                </div>

                <div className="tech-meta-badges">
                  <span className="tech-category-pill">{tech.categoryLabel}</span>
                  {tech.status && (
                    <span className="tech-status-pill">
                      <MdCheckCircleOutline className="status-icon" />
                      {tech.status}
                    </span>
                  )}
                </div>
              </div>

              <div className="tech-card-body">
                <h4 className="tech-name">{tech.name}</h4>
                <p className="tech-desc">{tech.description}</p>
              </div>

              <div className="tech-card-footer">
                <span className="tech-footer-dot" />
                <span className="tech-footer-cat">{tech.categoryLabel}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
