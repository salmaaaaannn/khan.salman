import { useEffect, useState, useRef, useCallback } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import { portfolioData } from "../data/portfolio";
import { MdArrowForward, MdFastForward } from "react-icons/md";
import Loader3DCanvas from "./Loader3DCanvas";

interface LoadingProps {
  percent: number;
}

let activeClearProgress: (() => void) | null = null;

const Loading = ({ percent: externalPercent }: LoadingProps) => {
  const { setIsLoading } = useLoading();
  const [internalPercent, setInternalPercent] = useState(externalPercent);
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const transitionTriggered = useRef(false);
  const { meta } = portfolioData;

  const displayPercent = Math.min(100, Math.max(externalPercent, internalPercent));

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
      }, 650);
    });
  }, [setIsLoading]);

  // Keyboard accessibility: Space/Enter/Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter" || e.key === "Escape") {
        e.preventDefault();
        triggerPortfolioEntry();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggerPortfolioEntry]);

  // Transition to ready when 100% reached
  useEffect(() => {
    if (displayPercent >= 100 && !loaded) {
      setLoaded(true);
      const readyTimer = setTimeout(() => {
        setIsLoaded(true);
      }, 500);
      return () => clearTimeout(readyTimer);
    }
  }, [displayPercent, loaded]);

  // Auto-launch once loaded
  useEffect(() => {
    if (isLoaded && !clicked) {
      const autoLaunchTimer = setTimeout(() => {
        triggerPortfolioEntry();
      }, 800);
      return () => clearTimeout(autoLaunchTimer);
    }
  }, [isLoaded, clicked, triggerPortfolioEntry]);

  // Anti-hang safety fallback (4.5s max)
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      if (!transitionTriggered.current) {
        setInternalPercent(100);
        setLoaded(true);
        setIsLoaded(true);
        triggerPortfolioEntry();
      }
    }, 4500);

    return () => clearTimeout(safetyTimer);
  }, [triggerPortfolioEntry]);

  // Dynamic status text based on progress
  const getStatusText = () => {
    if (displayPercent < 35) return "INITIALIZING 3D ENVIRONMENT";
    if (displayPercent < 70) return "SYNCHRONIZING 3D CUBIC MATRIX";
    if (displayPercent < 100) return "CALIBRATING SPATIAL ENGINE";
    return "SYSTEM READY // ENTER PORTFOLIO";
  };

  return (
    <>
      <header className={`loading-header${clicked ? " header-dismiss" : ""}`}>
        <div className="loader-brand">
          <span className="loader-brand-dot" />
          <span className="loader-brand-name">{meta.name.toUpperCase()}</span>
          <span className="loader-brand-sub">3D PORTFOLIO 2026</span>
        </div>

        <button
          className="loader-skip-btn"
          onClick={triggerPortfolioEntry}
          aria-label="Skip loading animation"
          data-cursor="disable"
        >
          <span>Skip</span>
          <MdFastForward className="skip-icon" />
          <kbd className="skip-kbd">Esc</kbd>
        </button>
      </header>

      <div
        className={`loading-screen${clicked ? " screen-dismiss" : ""}`}
        onClick={triggerPortfolioEntry}
        role="button"
        tabIndex={0}
      >
        {/* Soft Ambient Vignette */}
        <div className="loader-ambient-glow" />

        <div className="loader-center-stage">
          {/* 3D Animated Solving Cube Canvas */}
          <Loader3DCanvas
            progress={displayPercent}
            isReady={loaded}
            clicked={clicked}
          />

          {/* Precision Typographic Counter & Telemetry */}
          <div className="loader-counter-row">
            <span className="loader-num-val">{Math.round(displayPercent)}</span>
            <span className="loader-num-unit">%</span>
          </div>

          {/* Minimalist Status Readout */}
          <div className="loader-meta-wrap">
            <h2 className="loader-meta-title">{getStatusText()}</h2>
            <div className="loader-progress-track">
              <div
                className="loader-progress-bar"
                style={{ width: `${displayPercent}%` }}
              />
            </div>
          </div>

          {/* Interactive Enter CTA */}
          <button
            className={`loader-enter-btn${loaded ? " enter-btn-ready" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              triggerPortfolioEntry();
            }}
            data-cursor="disable"
          >
            <span>{loaded ? "Enter Portfolio" : "Click to Start"}</span>
            <MdArrowForward className="enter-arrow" />
          </button>
        </div>

        {/* Minimal Footer Telemetry */}
        <div className="loader-minimal-footer">
          <span>FULL-STACK ARCHITECT · APPLIED AI</span>
          <span>MUMBAI, INDIA</span>
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
      const rand = Math.round(Math.random() * 6) + 1;
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
