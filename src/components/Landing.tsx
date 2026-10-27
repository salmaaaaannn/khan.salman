import { PropsWithChildren, useEffect, useRef, useState } from "react";
import "./styles/Landing.css";
import { portfolioData } from "../data/portfolio";
import {
  MdArrowOutward,
  MdFileDownload,
  MdMailOutline,
  MdLocationOn,
  MdVerified,
  MdSpeed,
} from "react-icons/md";
import { FaAward } from "react-icons/fa";

const Landing = ({ children }: PropsWithChildren) => {
  const { landing, meta } = portfolioData;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse coordinates for 3D parallax depth effect
  useEffect(() => {
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth) * 2 - 1;
      targetY = (e.clientY / innerHeight) * 2 - 1;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setMousePos({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    // Failsafe in case loading animation was skipped or finished before mount
    const checkTimer = setTimeout(() => {
      const h1El = document.querySelector(".landing-intro h1");
      if (h1El && getComputedStyle(h1El).opacity === "0") {
        import("./utils/initialFX").then((mod) => {
          if (mod.initialFX) mod.initialFX();
        });
      }
    }, 1200);

    return () => clearTimeout(checkTimer);
  }, []);

  // Compute 3D perspective rotation values
  const bg3dRotateX = -mousePos.y * 14;
  const bg3dRotateY = mousePos.x * 16;
  const bg3dTranslateX = mousePos.x * 25;
  const bg3dTranslateY = mousePos.y * 15;

  return (
    <div className="landing-section" id="landingDiv" ref={containerRef}>
      {/* 3D Atmospheric Spatial Typography (KHAN SALMAN) with Cinematic Zoom */}
      <div
        className="landing-3d-backdrop"
        style={{
          transform: `perspective(1000px) rotateX(${bg3dRotateX}deg) rotateY(${bg3dRotateY}deg) translate3d(${bg3dTranslateX}px, ${bg3dTranslateY}px, -40px)`,
        }}
      >
        <div className="backdrop-text-row top-row">
          <span className="backdrop-char">K</span>
          <span className="backdrop-char">H</span>
          <span className="backdrop-char">A</span>
          <span className="backdrop-char">N</span>
        </div>
        <div className="backdrop-text-row bottom-row">
          <span className="backdrop-char">S</span>
          <span className="backdrop-char">A</span>
          <span className="backdrop-char">L</span>
          <span className="backdrop-char">M</span>
          <span className="backdrop-char">A</span>
          <span className="backdrop-char">N</span>
        </div>
      </div>

      {/* Studio Ambient Light Pool Tracking Mouse */}
      <div
        className="landing-ambient-spotlight"
        style={{
          transform: `translate(${mousePos.x * 60}px, ${mousePos.y * 40}px)`,
        }}
      />

      <div className="landing-container">
        {/* Left Column: Introduction & Interactive Actions */}
        <div className="landing-intro">
          {/* Executive Engineering Status Pill */}
          <div className="landing-status-pill">
            <span className="status-indicator-dot" />
            <span>FULL-STACK ARCHITECT &amp; APPLIED AI SPECIALIST</span>
          </div>

          <h2>{landing.greeting}</h2>
          <h1>
            {landing.firstName}
            <br />
            <span>{landing.lastName}</span>
          </h1>

          <p className="landing-bio">
            Full-Stack Software Architect &amp; Applied AI Specialist engineering
            high-throughput distributed systems, predictive machine learning pipelines,
            and immersive 3D digital experiences.
          </p>

          {/* 3D Cubic Solve Telemetry Badge */}
          <div className="landing-cubic-badge">
            <div className="cubic-badge-icon-wrap">
              <span className="cubic-cube-icon" />
            </div>
            <div className="cubic-badge-content">
              <span className="cubic-badge-title">3D CUBIC SOLVE ENGINE</span>
              <span className="cubic-badge-sub">60 FPS WEBGL · THREE.JS · PYTORCH</span>
            </div>
          </div>

          {/* Core Specialization Pills */}
          <div className="landing-focus-tags">
            <span className="focus-tag">Next.js &amp; React</span>
            <span className="focus-tag">FastAPI &amp; Node</span>
            <span className="focus-tag">Applied AI &amp; Vision</span>
            <span className="focus-tag">Three.js 3D</span>
          </div>

          {/* Action CTA Buttons */}
          <div className="landing-actions">
            <a
              href="#work"
              data-href="#work"
              className="landing-action-btn primary"
              data-cursor="disable"
            >
              <span>Explore My Work</span>
              <MdArrowOutward />
            </a>
            <a
              href={meta.resumePath}
              download="Salman-Khan-Resume.pdf"
              className="landing-action-btn secondary"
              data-cursor="disable"
            >
              <span>Download Resume</span>
              <MdFileDownload />
            </a>
            <a
              href="#contact"
              data-href="#contact"
              className="landing-action-btn ghost"
              data-cursor="disable"
            >
              <span>Contact Me</span>
              <MdMailOutline />
            </a>
          </div>
        </div>

        {/* Right Column: Rotating Roles & Highlights Card */}
        <div
          className="landing-info"
          style={{
            transform: `perspective(800px) rotateY(${-mousePos.x * 6}deg) rotateX(${
              mousePos.y * 6
            }deg) translate(0%, -50%)`,
          }}
        >
          <div className="landing-role-card">
            <div className="role-card-badge">
              <MdVerified className="role-badge-icon" />
              <span>CORE ARCHITECTURE</span>
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

            {/* Quick Creative Highlights */}
            <div className="role-card-metrics">
              <div className="role-metric-item">
                <FaAward className="metric-icon award" />
                <span>3× Hackathon 1st Place Champion</span>
              </div>
              <div className="role-metric-item">
                <MdSpeed className="metric-icon speed" />
                <span>&lt; 45ms Sub-Second API &amp; Inference</span>
              </div>
              <div className="role-metric-item">
                <MdLocationOn className="metric-icon location" />
                <span>Mumbai, India · Available Worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Center Column: 3D Animated Character Canvas with Cubic Solve Matrix */}
      {children}
    </div>
  );
};

export default Landing;
