import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";
import { createCubicMatrix } from "./utils/cubicMatrix";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  const [character, setChar] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    if (canvasDiv.current) {
      const rect = canvasDiv.current.getBoundingClientRect();
      const container = { width: rect.width, height: rect.height };
      const aspect = container.width / (container.height || 1);
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.appendChild(renderer.domElement);

      const isMobile = window.innerWidth <= 1024;
      const targetCameraZ = isMobile ? 4.9 : 4.5;
      const camera = new THREE.PerspectiveCamera(35, aspect, 0.1, 1000);
      // Cinematic 3D entrance zoom: starts back and smoothly eases into position
      camera.position.set(0, 0.9, isMobile ? 6.8 : 6.4);
      camera.lookAt(0, isMobile ? 0.92 : 0.9, 0);
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      const cubicMatrix = createCubicMatrix(scene);
      const progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      loadCharacter().then((gltf) => {
        if (gltf) {
          const animations = setAnimations(gltf);
          hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
          mixer = animations.mixer;
          const charScene = gltf.scene;

          setChar(charScene);
          scene.add(charScene);
          headBone = charScene.getObjectByName("Head") || null;

          progress.loaded().then(() => {
            setTimeout(() => {
              light.turnOnLights();
              animations.startIntro();
            }, 2500);
          });
          window.addEventListener("resize", () =>
            handleResize(renderer, camera, canvasDiv, charScene, cubicMatrix)
          );
        }
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };

      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }))
          );
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart, { passive: true });
        landingDiv.addEventListener("touchend", onTouchEnd, { passive: true });
      }

      // ── Scroll & Wheel Interactive Assemble Effect ──
      let scrollY = window.scrollY || 0;
      let wheelImpulse = 0;
      let currentAssemble = 0;

      const onScroll = () => {
        scrollY = window.scrollY || 0;
      };

      const onWheel = (e: WheelEvent) => {
        // Boost assembly momentum on active mouse wheel scroll
        wheelImpulse = Math.min(wheelImpulse + Math.abs(e.deltaY) * 0.002, 1);
      };

      let lastTouchY = 0;
      const onTouchStartScroll = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          lastTouchY = e.touches[0].clientY;
        }
      };

      const onTouchMoveScroll = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          const touchY = e.touches[0].clientY;
          const delta = Math.abs(touchY - lastTouchY);
          lastTouchY = touchY;
          wheelImpulse = Math.min(wheelImpulse + delta * 0.0035, 1);
        }
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("wheel", onWheel, { passive: true });
      window.addEventListener("touchstart", onTouchStartScroll, { passive: true });
      window.addEventListener("touchmove", onTouchMoveScroll, { passive: true });

      const animate = () => {
        requestAnimationFrame(animate);

        // Smooth cinematic camera zoom-in toward target position
        if (camera.position.z > targetCameraZ + 0.01) {
          camera.position.z = THREE.MathUtils.lerp(
            camera.position.z,
            targetCameraZ,
            0.032
          );
        }

        // Calculate scroll assemble progress through landing section
        const landingEl = document.getElementById("landingDiv") || document.querySelector(".landing-section");
        const landingHeight = landingEl ? (landingEl as HTMLElement).offsetHeight : window.innerHeight;
        const scrollFraction = Math.min(Math.max(scrollY / (landingHeight * 0.72), 0), 1);

        // Target assemble is driven by vertical scroll position + active scroll impulse
        const targetAssemble = Math.min(Math.max(scrollFraction * 1.15 + wheelImpulse * 0.65, 0), 1);
        wheelImpulse *= 0.94; // Decay momentum smoothly

        currentAssemble = THREE.MathUtils.lerp(currentAssemble, targetAssemble, 0.08);

        const elapsedTime = clock.getElapsedTime();
        cubicMatrix.update(elapsedTime, mouse.x, mouse.y, currentAssemble);

        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        clearTimeout(debounce);
        cubicMatrix.dispose();
        scene.clear();
        renderer.dispose();
        window.removeEventListener("resize", () =>
          handleResize(renderer, camera, canvasDiv, character!, cubicMatrix)
        );
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("touchstart", onTouchStartScroll);
        window.removeEventListener("touchmove", onTouchMoveScroll);

        if (canvasDiv.current && renderer.domElement.parentNode === canvasDiv.current) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
        if (landingDiv) {
          document.removeEventListener("mousemove", onMouseMove);
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
