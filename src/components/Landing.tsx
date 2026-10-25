import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { portfolioData } from "../data/portfolio";
import { MdArrowOutward, MdFileDownload, MdMailOutline } from "react-icons/md";

const Landing = ({ children }: PropsWithChildren) => {
  const { landing, meta } = portfolioData;

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>{landing.greeting}</h2>
            <h1>
              {landing.firstName}
              <br />
              <span>{landing.lastName}</span>
            </h1>
            <p className="landing-bio">
              Full-Stack Developer & AI/ML Enthusiast. Building intelligent, high-performance web platforms and predictive ML systems.
            </p>
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
          <div className="landing-info">
            <h3>{landing.lead}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{landing.accentPrimary}</div>
              <div className="landing-h2-2">{landing.accentSecondary}</div>
            </h2>
            <h2>
              <div className="landing-h2-info">{landing.basePrimary}</div>
              <div className="landing-h2-info-1">{landing.baseSecondary}</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
