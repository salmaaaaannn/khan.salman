import { useEffect, useState, useRef, useCallback } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import Marquee from "react-fast-marquee";
import { portfolioData } from "../data/portfolio";
import { MdBolt, MdFastForward, MdPlayArrow } from "react-icons/md";

interface LoadingProps {
  percent: number;
}

// Module-level reference to force early completion if user skips
let activeClearProgress: (() => void) | null = null;

const Loading = ({ percent: externalPercent }: LoadingProps) => {
  const { setIsLoading } = useLoading();
  const [internalPercent, setInternalPercent] = useState(externalPercent);
  const [coreCharge, setCoreCharge] = useState(20);
  const [corePulsing, setCorePulsing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hudMessage, setHudMessage] = useState(
    "STANDBY // CLICK CORE OR PRESS [SPACE] TO ACCELERATE"
  );
  const transitionTriggered = useRef(false);
  const { meta, loaderLabels } = portfolioData;

  // Track max between external asset progress and internal boost
  const displayPercent = Math.min(100, Math.max(externalPercent, internalPercent));

  // Sync internal percent when external updates
  useEffect(() => {
    if (externalPercent > internalPercent) {
      setInternalPercent(externalPercent);
    }
  }, [externalPercent, internalPercent]);

  // Complete and enter portfolio
  const triggerPortfolioEntry = useCallback(() => {
    if (transitionTriggered.current) return;
    transitionTriggered.current = true;

    setClicked(true);
    if (activeClearProgress) {
      activeClearProgress();
    }

    import("./utils/initialFX").then((module) => {
      setTimeout(() => {
        if (module.initialFX) {
          module.initialFX();
        }
        setIsLoading(false);
      }, 700);
    });
  }, [setIsLoading]);

  // Handle core charging click/tap interaction
  const handleChargeCore = () => {
    if (loaded || clicked) {
      triggerPortfolioEntry();
      return;
    }

    setCorePulsing(true);
    setTimeout(() => setCorePulsing(false), 400);

    setCoreCharge((prev) => {
      const nextCharge = Math.min(100, prev + 25);
      if (nextCharge >= 100) {
        setHudMessage("⚡ CORE OVERCLOCKED (100%) // SYSTEM HYPERDRIVE SYNCHRONIZED");
      } else {
        setHudMessage(`⚡ CORE INJECTION [${nextCharge}%] // DATA THROUGHPUT BOOSTED`);
      }
      return nextCharge;
    });

    // Boost real display percent on tap
    setInternalPercent((prev) => {
      const boosted = Math.min(100, prev + 18);
      if (boosted >= 100) {
        setLoaded(true);
      }
      return boosted;
    });
  };

  // Keyboard accessibility: Space/Enter charges core, Escape skips
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleChargeCore();
      } else if (e.key === "Escape") {
        e.preventDefault();
        triggerPortfolioEntry();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [loaded, clicked, triggerPortfolioEntry]);

  // When percent hits 100, transition to ready state
  useEffect(() => {
    if (displayPercent >= 100 && !loaded) {
      setLoaded(true);
      setHudMessage("ALL SYSTEMS ONLINE // READY TO INITIALIZE");
      const readyTimer = setTimeout(() => {
        setIsLoaded(true);
      }, 800);
      return () => clearTimeout(readyTimer);
    }
  }, [displayPercent, loaded]);

  // Auto-launch once loaded unless user clicks earlier
  useEffect(() => {
    if (isLoaded && !clicked) {
      const autoLaunchTimer = setTimeout(() => {
        triggerPortfolioEntry();
      }, 900);
      return () => clearTimeout(autoLaunchTimer);
    }
  }, [isLoaded, clicked, triggerPortfolioEntry]);

  // Anti-hang safety fallback: guarantees entry after 5.5s maximum
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      if (!transitionTriggered.current) {
        setInternalPercent(100);
        setLoaded(true);
        setIsLoaded(true);
        triggerPortfolioEntry();
      }
    }, 5500);

    return () => clearTimeout(safetyTimer);
  }, [triggerPortfolioEntry]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      {/* Sci-Fi HUD Top Header */}
      <header className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          <span className="hud-badge">SYS_ID</span>
          {meta.initials} // DEV_INTERFACE
        </a>

        {/* Action Skip Button */}
        <div className="loader-header-actions">
          <button
            className="loader-skip-btn"
            onClick={triggerPortfolioEntry}
            aria-label="Skip intro animation"
            data-cursor="disable"
          >
            <span>SKIP INTRO</span>
            <MdFastForward className="skip-icon" />
            <kbd className="skip-kbd">Esc</kbd>
          </button>
        </div>
      </header>

      <div className={`loading-screen${clicked ? " screen-dismiss" : ""}`}>
        {/* Subtle Cybernetic Grid Overlay */}
        <div className="loader-cyber-grid" />

        {/* Ambient Marquee in Background */}
        <div className="loading-marquee">
          <Marquee>
            {loaderLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
            {loaderLabels.map((label) => (
              <span key={`${label}-repeat`}>{label}</span>
            ))}
          </Marquee>
        </div>

        {/* Center Futuristic Loading Console */}
        <div
          className={`loading-wrap ${clicked ? "loading-clicked" : ""}`}
          onMouseMove={handleMouseMove}
        >
          <div className="loading-hover" />

          {/* Interactive Quantum Core Mini-Game */}
          <div className="sci-fi-loader-console">
            {/* Interactive Energy Core Orb */}
            <div
              className={`quantum-core-wrap${corePulsing ? " core-pulsing" : ""}${
                loaded ? " core-ready" : ""
              }`}
              onClick={handleChargeCore}
              role="button"
              tabIndex={0}
              aria-label="Quantum Energy Core. Click or press Space to accelerate loading."
              data-cursor="disable"
            >
              <div className="core-orbital-ring-1" />
              <div className="core-orbital-ring-2" />
              <div className="core-energy-aura" />
              <div className="quantum-core-center">
                <MdBolt className="core-icon" />
              </div>

              {/* Kinetic Shockwave on Tap */}
              {corePulsing && <div className="core-shockwave" />}
            </div>

            {/* HUD Status Readout */}
            <div className="hud-telemetry">
              <span className="hud-status-kicker">
                {loaded
                  ? "QUANTUM SYNC COMPLETE // CORE: 100%"
                  : `QUANTUM RUNTIME BUFFER // CORE CHARGE: ${coreCharge}%`}
              </span>
              <p className="hud-status-msg">{hudMessage}</p>
            </div>

            {/* Segmented Progress Bar */}
            <div className="hud-progress-wrap">
              <div className="hud-progress-header">
                <span className="hud-progress-label">CORE INITIALIZATION</span>
                <span className="hud-progress-val">{displayPercent}%</span>
              </div>
              <div className="hud-progress-track">
                <div
                  className="hud-progress-fill"
                  style={{ width: `${displayPercent}%` }}
                />
              </div>
            </div>

            {/* Interactive Launch Button (appears when ready) */}
            <button
              className={`loading-button ${loaded ? "loading-complete" : ""}`}
              onClick={triggerPortfolioEntry}
              data-cursor="disable"
              aria-label={loaded ? "Enter 3D Developer Portfolio" : "Loading portfolio assets"}
            >
              <div className="loading-container">
                <div className="loading-content">
                  <div className="loading-content-in">
                    Loading <span>{displayPercent}%</span>
                  </div>
                </div>
                <div className="loading-box" />
              </div>
              <div className="loading-content2">
                <span>Enter Portfolio</span>
                <MdPlayArrow className="enter-arrow-icon" />
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Sci-Fi Tech Telemetry */}
        <div className="loader-bottom-hud">
          <span>PIPELINE // THREE.JS · WEBGL · GSAP · NEXT.JS · FASTAPI</span>
          <span>FPS: 60 // LOW-LATENCY</span>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 6) + 1;
      percent = Math.min(100, percent + rand);
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = Math.min(100, percent + Math.round(Math.random() * 2) + 1);
        setLoading(percent);
        if (percent >= 94) {
          clearInterval(interval);
        }
      }, 350);
    }
  }, 90);

  function clear() {
    clearInterval(interval);
    percent = 100;
    setLoading(100);
  }

  // Register active clear for Skip Intro button
  activeClearProgress = clear;

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent = Math.min(100, percent + 2);
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 5);
    });
  }

  return { loaded, percent, clear };
};
