import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { portfolioData } from "../data/portfolio";
import ParticleSelfBackground from "./ParticleSelfBackground";
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
        {/* Interactive Particle Constellation Background (motionsites.ai/?prompt=particle-self) */}
        <ParticleSelfBackground />

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
            {/* Vesper.ai Liquid-Metal Telemetry Badge */}
            <div className="landing-spatial-badge liquid-metal-pill">
              <span className="spatial-live-pulse" />
              <span>OPERATIONAL AI &amp; 3D SPATIAL SYSTEMS // MUMBAI, IN</span>
            </div>

            <h2>{landing.greeting}</h2>
            <h1 className="landing-name-3d">
              <span className="name-sur">KHAN</span>
              <br />
              <span className="name-given italic-serif">SALMAN</span>
            </h1>

            <p className="landing-bio">
              Full-Stack Developer &amp; <span className="italic-serif">AI Engineer</span>.
              Architecting intelligent autonomous agents, high-throughput backend infrastructure,
              and interactive 3D WebGL experiences.
            </p>

            {/* Achievement Telemetry Chip */}
            <div className="landing-achieve-chip liquid-metal-pill">
              <FaAward className="achieve-icon" />
              <span>3× First-Place Hackathon Lead Developer</span>
            </div>

            {/* Primary Action Buttons (Vesper.ai liquid-metal & solid) */}
            <div className="landing-actions">
              <a
                href="#work"
                data-href="#work"
                className="landing-action-btn primary solid-btn"
                data-cursor="disable"
              >
                Explore My Work <MdArrowOutward />
              </a>
              <a
                href={meta.resumePath}
                download="Salman-Khan-Resume.pdf"
                className="landing-action-btn secondary liquid-metal-pill"
                data-cursor="disable"
              >
                Download Resume <MdFileDownload />
              </a>
              <a
                href="#contact"
                data-href="#contact"
                className="landing-action-btn ghost liquid-metal-pill"
                data-cursor="disable"
              >
                Contact Me <MdMailOutline />
              </a>
            </div>
          </div>

          {/* Right Column: Dynamic Headline Ticker & Telemetry */}
          <div className="landing-info">
            <div className="landing-info-card liquid-metal-pill">
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

          {/* Bottom Hero Stats Row (Vesper.ai 3-stat specification) */}
          <div className="landing-vesper-stats">
            <div className="vesper-stat">
              <div className="vesper-stat-val">
                <span className="italic-serif">4.2M</span>+
              </div>
              <div className="vesper-stat-lbl">
                Workflows Automated &amp; Data Processed
              </div>
            </div>
            <div className="vesper-stat-sep" />
            <div className="vesper-stat">
              <div className="vesper-stat-val">
                <span className="italic-serif">92</span>%
              </div>
              <div className="vesper-stat-lbl">
                Latency Reduction via High-Perf Pipelines
              </div>
            </div>
            <div className="vesper-stat-sep" />
            <div className="vesper-stat">
              <div className="vesper-stat-val">
                <span className="italic-serif">3</span>×
              </div>
              <div className="vesper-stat-lbl">
                Hackathon Champion &amp; Lead Architect
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
