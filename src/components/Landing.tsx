import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { portfolioData } from "../data/portfolio";
import {
  MdArrowOutward,
  MdFileDownload,
  MdMailOutline,
  MdOutlineLayers,
  MdTerminal,
} from "react-icons/md";
import { FaAward } from "react-icons/fa";

const Landing = ({ children }: PropsWithChildren) => {
  const { landing, meta } = portfolioData;

  return (
    <>
      <div className="landing-section" id="landingDiv">
        {/* 3D Holographic Perspective Floor */}
        <div className="landing-depth-floor" />

        {/* 3D Stage Pedestal beneath Character */}
        <div className="landing-pedestal-wrap">
          <div className="landing-pedestal-ring ring-outer" />
          <div className="landing-pedestal-ring ring-inner" />
          <div className="landing-pedestal-glow" />
        </div>

        <div className="landing-container">
          {/* Left Column: Intro & 3D Typography */}
          <div className="landing-intro">
            {/* Sci-Fi Spatial Telemetry Badge */}
            <div className="landing-spatial-badge">
              <span className="spatial-live-pulse" />
              <span>3D SPATIAL INTERFACE // MUMBAI, IN</span>
            </div>

            <h2>{landing.greeting}</h2>
            <h1 className="landing-name-3d">
              <span className="name-sur">KHAN</span>
              <br />
              <span className="name-given">SALMAN</span>
            </h1>

            <p className="landing-bio">
              Full-Stack Developer &amp; AI/ML Enthusiast. Building intelligent,
              high-performance web platforms, predictive machine learning models,
              and interactive 3D WebGL experiences.
            </p>

            {/* Achievement Telemetry Chip */}
            <div className="landing-achieve-chip">
              <FaAward className="achieve-icon" />
              <span>3× First-Place Hackathon Lead Developer</span>
            </div>

            {/* Primary Action Buttons */}
            <div className="landing-actions">
              <a
                href="#work"
                data-href="#work"
                className="landing-action-btn primary"
                data-cursor="disable"
              >
                Explore My Work <MdArrowOutward />
              </a>
              <a
                href={meta.resumePath}
                download="Salman-Khan-Resume.pdf"
                className="landing-action-btn secondary"
                data-cursor="disable"
              >
                Download Resume <MdFileDownload />
              </a>
              <a
                href="#contact"
                data-href="#contact"
                className="landing-action-btn ghost"
                data-cursor="disable"
              >
                Contact Me <MdMailOutline />
              </a>
            </div>
          </div>

          {/* Right Column: Dynamic Headline Ticker & Telemetry */}
          <div className="landing-info">
            <div className="landing-info-card">
              <div className="info-card-header">
                <MdTerminal className="info-terminal-icon" />
                <span>CORE SPECIALIZATION</span>
              </div>
              <h3>{landing.lead}</h3>
              <h2 className="landing-info-h2">
                <div className="landing-h2-1">{landing.accentPrimary}</div>
                <div className="landing-h2-2">{landing.accentSecondary}</div>
              </h2>
              <h2>
                <div className="landing-h2-info">{landing.basePrimary}</div>
                <div className="landing-h2-info-1">{landing.baseSecondary}</div>
              </h2>

              <div className="info-card-telemetry">
                <span className="telemetry-pill">
                  <MdOutlineLayers /> THREE.JS 60 FPS
                </span>
                <span className="telemetry-pill">REACT · NEXT.JS · FASTAPI</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Character Canvas */}
        {children}
      </div>
    </>
  );
};

export default Landing;
