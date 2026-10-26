import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader, DRACOLoader } from "three-stdlib";
import "./styles/CyberRunnerModal.css";
import {
  MdClose,
  MdRefresh,
  MdVolumeUp,
  MdVolumeOff,
  MdPlayArrow,
  MdPause,
} from "react-icons/md";
import { FaGamepad } from "react-icons/fa";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// Retro Web Audio Synthesizer (pure procedural audio, zero external files)
class RetroAudio {
  private ctx: AudioContext | null = null;
  public muted: boolean = false;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  jump() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(520, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {
      // Audio context policy fallback
    }
  }

  collect() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(587, this.ctx.currentTime);
      osc.frequency.setValueAtTime(880, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch {
      // Ignore
    }
  }

  crash() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.28);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch {
      // Ignore
    }
  }
}

const audio = new RetroAudio();

export const CyberRunnerModal = ({ isOpen, onClose }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("sk_runner_hi") || "0", 10);
  });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isGlbLoaded, setIsGlbLoaded] = useState(false);

  // 3D GLB Character Offscreen Engine
  const glbRef = useRef<{
    loaded: boolean;
    renderer: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    model: THREE.Object3D | null;
    mixer: THREE.AnimationMixer | null;
    canvas: HTMLCanvasElement | null;
  }>({
    loaded: false,
    renderer: null,
    scene: null,
    camera: null,
    model: null,
    mixer: null,
    canvas: null,
  });

  const gameState = useRef({
    running: false,
    score: 0,
    speed: 6,
    frame: 0,
    player: {
      x: 60,
      y: 200,
      width: 28,
      height: 44,
      vy: 0,
      grounded: true,
      jumps: 0,
      ducking: false,
    },
    obstacles: [] as {
      x: number;
      y: number;
      w: number;
      h: number;
      type: "bug" | "firewall" | "spike";
      label: string;
      color: string;
    }[],
    coins: [] as { x: number; y: number; size: number; collected: boolean }[],
    particles: [] as {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
    }[],
  });

  const jump = useCallback(() => {
    const p = gameState.current.player;
    if (p.jumps < 2) {
      p.vy = -12;
      p.grounded = false;
      p.jumps++;
      audio.jump();

      // Spawn jump particles
      for (let i = 0; i < 6; i++) {
        gameState.current.particles.push({
          x: p.x + p.width / 2,
          y: p.y + p.height,
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * 2 + 1,
          life: 1,
          color: "#38bdf8",
        });
      }
    }
  }, []);

  const resetGame = useCallback(() => {
    gameState.current = {
      running: true,
      score: 0,
      speed: 6,
      frame: 0,
      player: {
        x: 60,
        y: 200,
        width: 28,
        height: 44,
        vy: 0,
        grounded: true,
        jumps: 0,
        ducking: false,
      },
      obstacles: [],
      coins: [],
      particles: [],
    };
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
  }, []);

  // ── Initialize Offscreen Three.js WebGL Engine for 3D GLB Character ──
  useEffect(() => {
    if (!isOpen) return;

    let disposed = false;
    const offCanvas = document.createElement("canvas");
    offCanvas.width = 128;
    offCanvas.height = 128;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: offCanvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(128, 128);
      renderer.setPixelRatio(1);
    } catch (e) {
      console.warn("Could not create WebGLRenderer for runner avatar:", e);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(1.1, 0.95, 2.2);
    camera.lookAt(0, 0.85, 0);

    const ambLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 2.8);
    dirLight.position.set(2, 3, 2);
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.5);
    rimLight.position.set(-2, 2, -2);
    scene.add(rimLight);

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      "/models/character.glb",
      (gltf) => {
        if (disposed) return;
        const char = gltf.scene;
        char.scale.set(0.9, 0.9, 0.9);
        char.position.set(0, 0, 0);
        char.rotation.y = Math.PI * 0.55;

        // Clone and tune materials for crisp contrast
        char.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) {
            const m = c as THREE.Mesh;
            if (m.material) {
              const mat = (m.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
              mat.roughness = 0.55;
              mat.metalness = 0.2;
              m.material = mat;
            }
          }
        });

        scene.add(char);

        let mixer: THREE.AnimationMixer | null = null;
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(char);
          const clip = gltf.animations[0];
          const action = mixer.clipAction(clip);
          action.play();
        }

        glbRef.current = {
          loaded: true,
          renderer,
          scene,
          camera,
          model: char,
          mixer,
          canvas: offCanvas,
        };
        setIsGlbLoaded(true);
      },
      undefined,
      (err) => {
        console.warn("Could not load GLB for runner avatar:", err);
      }
    );

    return () => {
      disposed = true;
      try {
        dracoLoader.dispose();
        renderer?.dispose();
      } catch {
        // Ignore
      }
      glbRef.current = {
        loaded: false,
        renderer: null,
        scene: null,
        camera: null,
        model: null,
        mixer: null,
        canvas: null,
      };
      setIsGlbLoaded(false);
    };
  }, [isOpen]);

  // Main Canvas Game Loop
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resetGame();

    let animId: number;
    const groundY = canvas.height - 40;

    const loop = () => {
      const state = gameState.current;

      if (state.running && !isPaused) {
        state.frame++;
        state.score += 1;
        if (state.frame % 6 === 0) {
          setScore(state.score);
        }

        // Increase speed gradually
        if (state.frame % 300 === 0 && state.speed < 12) {
          state.speed += 0.4;
        }

        // Physics
        const p = state.player;
        p.vy += 0.65; // gravity
        p.y += p.vy;

        const effectiveHeight = p.ducking ? 24 : 44;
        p.height = effectiveHeight;

        if (p.y + effectiveHeight >= groundY) {
          p.y = groundY - effectiveHeight;
          p.vy = 0;
          p.grounded = true;
          p.jumps = 0;
        }

        // Spawn obstacles
        if (state.frame % Math.max(50, Math.floor(95 - state.speed * 3)) === 0) {
          const typeRoll = Math.random();
          if (typeRoll < 0.45) {
            state.obstacles.push({
              x: canvas.width + 20,
              y: groundY - 32,
              w: 26,
              h: 32,
              type: "bug",
              label: "BUG",
              color: "#ef4444",
            });
          } else if (typeRoll < 0.75) {
            state.obstacles.push({
              x: canvas.width + 20,
              y: groundY - 48,
              w: 22,
              h: 48,
              type: "firewall",
              label: "WALL",
              color: "#f59e0b",
            });
          } else {
            state.obstacles.push({
              x: canvas.width + 20,
              y: groundY - 24,
              w: 36,
              h: 24,
              type: "spike",
              label: "404",
              color: "#a855f7",
            });
          }
        }

        // Spawn bonus AI stars
        if (state.frame % 110 === 0 && Math.random() > 0.4) {
          state.coins.push({
            x: canvas.width + 20,
            y: groundY - Math.random() * 80 - 40,
            size: 14,
            collected: false,
          });
        }

        // Update obstacles
        for (let i = state.obstacles.length - 1; i >= 0; i--) {
          const obs = state.obstacles[i];
          obs.x -= state.speed;

          // Collision detection (AABB)
          if (
            p.x < obs.x + obs.w &&
            p.x + p.width > obs.x &&
            p.y < obs.y + obs.h &&
            p.y + p.height > obs.y
          ) {
            audio.crash();
            state.running = false;
            setIsGameOver(true);

            // Update high score
            setHighScore((prev) => {
              const newHi = Math.max(prev, state.score);
              localStorage.setItem("sk_runner_hi", String(newHi));
              return newHi;
            });

            // Explosion particles
            for (let k = 0; k < 24; k++) {
              state.particles.push({
                x: p.x + p.width / 2,
                y: p.y + p.height / 2,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 1,
                color: Math.random() > 0.5 ? "#ef4444" : "#38bdf8",
              });
            }
          }

          if (obs.x + obs.w < -20) {
            state.obstacles.splice(i, 1);
          }
        }

        // Update coins / AI stars
        for (let i = state.coins.length - 1; i >= 0; i--) {
          const c = state.coins[i];
          c.x -= state.speed;

          if (
            !c.collected &&
            p.x < c.x + c.size &&
            p.x + p.width > c.x &&
            p.y < c.y + c.size &&
            p.y + p.height > c.y
          ) {
            c.collected = true;
            state.score += 50;
            audio.collect();

            for (let k = 0; k < 8; k++) {
              state.particles.push({
                x: c.x,
                y: c.y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                life: 1,
                color: "#fde047",
              });
            }
          }

          if (c.x < -20 || c.collected) {
            state.coins.splice(i, 1);
          }
        }

        // Update particles
        for (let i = state.particles.length - 1; i >= 0; i--) {
          const pt = state.particles[i];
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.life -= 0.035;
          if (pt.life <= 0) {
            state.particles.splice(i, 1);
          }
        }
      }

      // ── RENDER ──
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sci-Fi Backdrop Grid
      ctx.strokeStyle = "rgba(56, 189, 248, 0.08)";
      ctx.lineWidth = 1;
      const gridOffset = (state.frame * state.speed * 0.4) % 30;
      for (let x = -gridOffset; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, groundY);
        ctx.stroke();
      }

      // Neon Ground line
      ctx.strokeStyle = "rgba(56, 189, 248, 0.6)";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(canvas.width, groundY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Ground perspective tick markers
      ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
      const groundOffset = (state.frame * state.speed) % 40;
      for (let gx = -groundOffset; gx < canvas.width; gx += 40) {
        ctx.beginPath();
        ctx.moveTo(gx, groundY);
        ctx.lineTo(gx - 15, canvas.height);
        ctx.stroke();
      }

      // Draw Coins / Stars
      state.coins.forEach((c) => {
        ctx.save();
        ctx.fillStyle = "#facc15";
        ctx.shadowColor = "#facc15";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(c.x + c.size / 2, c.y + c.size / 2, c.size / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("★", c.x + c.size / 2, c.y + c.size / 2);
        ctx.restore();
      });

      // Draw Obstacles
      state.obstacles.forEach((obs) => {
        ctx.save();
        ctx.fillStyle = obs.color;
        ctx.shadowColor = obs.color;
        ctx.shadowBlur = 14;

        if (obs.type === "spike") {
          ctx.beginPath();
          ctx.moveTo(obs.x, groundY);
          ctx.lineTo(obs.x + obs.w / 2, obs.y);
          ctx.lineTo(obs.x + obs.w, groundY);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
        }

        ctx.shadowBlur = 0;
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 9px Geist, monospace";
        ctx.textAlign = "center";
        ctx.fillText(obs.label, obs.x + obs.w / 2, obs.y - 6);
        ctx.restore();
      });

      // Draw Player (Salman Khan 3D GLB Model with real-time offscreen WebGL renderer)
      const p = state.player;
      const glb = glbRef.current;

      // Jump / slide ground shadow
      ctx.save();
      ctx.fillStyle = "rgba(56, 189, 248, 0.28)";
      ctx.beginPath();
      ctx.ellipse(p.x + p.width / 2, groundY, p.ducking ? 18 : 13, 3.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (glb.loaded && glb.model && glb.renderer && glb.scene && glb.camera && glb.canvas) {
        if (glb.mixer) {
          glb.mixer.update(0.018);
        }

        // Running physics and character animation
        if (p.grounded) {
          glb.model.position.y = Math.abs(Math.sin(state.frame * 0.35)) * 0.06;
          glb.model.rotation.z = Math.sin(state.frame * 0.35) * 0.05;
          glb.model.rotation.y = Math.PI * 0.55 + Math.sin(state.frame * 0.2) * 0.08;
          glb.model.scale.set(0.9, p.ducking ? 0.52 : 0.9, 0.9);
        } else {
          // Aerial jump pose
          glb.model.position.y = 0.06;
          glb.model.rotation.z = -0.2;
          glb.model.scale.set(0.9, 0.9, 0.9);
        }

        glb.renderer.render(glb.scene, glb.camera);

        const drawW = 72;
        const drawH = p.ducking ? 46 : 72;
        const drawX = p.x - 22;
        const drawY = p.y - (p.ducking ? 6 : 18);

        ctx.drawImage(glb.canvas, drawX, drawY, drawW, drawH);
      } else {
        // Fallback Neon Cyber Avatar
        ctx.save();
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 16;
        ctx.fillStyle = "#38bdf8";

        // Body
        ctx.fillRect(p.x, p.y, p.width, p.height);

        // Cyber Visor / VR Headset (nod to Salman's 3D character)
        ctx.fillStyle = "#f43f5e";
        ctx.fillRect(p.x + p.width - 10, p.y + 6, 8, 5);

        // Jet exhaust trail when in air
        if (!p.grounded) {
          ctx.fillStyle = "#facc15";
          ctx.beginPath();
          ctx.arc(p.x + 8, p.y + p.height + 4, 3 + Math.random() * 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // Draw Particles
      state.particles.forEach((pt) => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, pt.life);
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animId);
  }, [isOpen, isPaused, resetGame]);

  // Global Keyboard Controls
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        if (isGameOver) {
          resetGame();
        } else {
          jump();
        }
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        e.preventDefault();
        gameState.current.player.ducking = true;
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        resetGame();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        gameState.current.player.ducking = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isOpen, isGameOver, jump, resetGame, onClose]);

  const toggleMute = () => {
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  if (!isOpen) return null;

  return (
    <div className="runner-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="runner-modal" onClick={(e) => e.stopPropagation()}>
        {/* CRT Scanline FX */}
        <div className="runner-scanlines" />

        {/* Modal Header */}
        <div className="runner-header">
          <div className="runner-title-wrap">
            <FaGamepad className="runner-title-icon" />
            <div className="runner-title-col">
              <span className="runner-title">CYBER RUNNER // DEBUG DASH</span>
              <span className="runner-kicker">KHAN SALMAN ARCADE EDITION</span>
            </div>
          </div>

          <div className="runner-controls">
            <button
              className="runner-icon-btn"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              data-cursor="disable"
            >
              {isMuted ? <MdVolumeOff /> : <MdVolumeUp />}
            </button>
            <button
              className="runner-icon-btn"
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? "Resume game" : "Pause game"}
              data-cursor="disable"
            >
              {isPaused ? <MdPlayArrow /> : <MdPause />}
            </button>
            <button
              className="runner-icon-btn close-btn"
              onClick={onClose}
              aria-label="Close arcade"
              data-cursor="disable"
            >
              <MdClose />
            </button>
          </div>
        </div>

        {/* Score Telemetry Bar */}
        <div className="runner-telemetry">
          <div className="telemetry-box">
            <span className="telemetry-lbl">SCORE</span>
            <span className="telemetry-val">{String(score).padStart(6, "0")}</span>
          </div>
          <div className="telemetry-box hi-box">
            <span className="telemetry-lbl">HI-SCORE</span>
            <span className="telemetry-val">{String(highScore).padStart(6, "0")}</span>
          </div>
          <div className="telemetry-box glb-box">
            <span className="telemetry-lbl">3D AVATAR</span>
            <span className="telemetry-val glb-val">
              <span className={`glb-radar ${isGlbLoaded ? "online" : ""}`} />
              {isGlbLoaded ? "GLB SALMAN" : "INITIALIZING..."}
            </span>
          </div>
          <div className="telemetry-box">
            <span className="telemetry-lbl">CONTROLS</span>
            <span className="telemetry-hint">[SPACE] JUMP · [↓] DUCK</span>
          </div>
        </div>

        {/* Game Canvas */}
        <div
          className="runner-canvas-wrap"
          onClick={() => {
            if (isGameOver) resetGame();
            else jump();
          }}
          role="button"
          tabIndex={0}
          aria-label="Game canvas. Tap or press space to jump."
        >
          <canvas
            ref={canvasRef}
            width={640}
            height={260}
            className="runner-canvas"
          />

          {/* Game Over Screen */}
          {isGameOver && (
            <div className="runner-gameover">
              <h3>SYSTEM OVERLOAD</h3>
              <p>You crashed into a production bug!</p>
              <div className="gameover-score">FINAL SCORE: {score}</div>
              <button
                className="runner-restart-btn"
                onClick={resetGame}
                data-cursor="disable"
              >
                <MdRefresh /> PRESS [SPACE] TO RETRY
              </button>
            </div>
          )}

          {/* Pause Screen */}
          {isPaused && !isGameOver && (
            <div className="runner-pause-overlay">
              <h3>SYSTEM PAUSED</h3>
              <p>Press [P] or click Play to resume</p>
            </div>
          )}
        </div>

        {/* Mobile Touch Controls */}
        <div className="runner-mobile-bar">
          <button
            className="mobile-jump-btn"
            onTouchStart={(e) => {
              e.preventDefault();
              if (isGameOver) resetGame();
              else jump();
            }}
            onClick={() => {
              if (isGameOver) resetGame();
              else jump();
            }}
            data-cursor="disable"
          >
            TAP TO JUMP
          </button>
          <button
            className="mobile-duck-btn"
            onTouchStart={(e) => {
              e.preventDefault();
              gameState.current.player.ducking = true;
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              gameState.current.player.ducking = false;
            }}
            onMouseDown={() => {
              gameState.current.player.ducking = true;
            }}
            onMouseUp={() => {
              gameState.current.player.ducking = false;
            }}
            data-cursor="disable"
          >
            HOLD TO DUCK
          </button>
        </div>
      </div>
    </div>
  );
};
