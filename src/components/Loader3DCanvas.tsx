import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./styles/Loader3DCanvas.css";

interface Loader3DCanvasProps {
  progress: number;
  isReady: boolean;
  clicked: boolean;
}

const Loader3DCanvas: React.FC<Loader3DCanvasProps> = ({ progress, isReady, clicked }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(progress);
  const isReadyRef = useRef(isReady);
  const clickedRef = useRef(clicked);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    isReadyRef.current = isReady;
  }, [isReady]);

  useEffect(() => {
    clickedRef.current = clicked;
  }, [clicked]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 360;
    const height = mount.clientHeight || 360;

    // Three.js Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    mount.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const cyanKey = new THREE.DirectionalLight(0x38bdf8, 3.2);
    cyanKey.position.set(4, 5, 4);
    scene.add(cyanKey);

    const purpleFill = new THREE.DirectionalLight(0x818cf8, 2.0);
    purpleFill.position.set(-4, -3, -3);
    scene.add(purpleFill);

    const coreLight = new THREE.PointLight(0x22d3ee, 3.5, 6);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // Master Cube Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Materials
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x060913,
      emissive: 0x0284c7,
      emissiveIntensity: 0.2,
      roughness: 0.15,
      metalness: 0.3,
      transmission: 0.65,
      transparent: true,
      opacity: 0.88,
      reflectivity: 0.95,
    });

    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.8,
    });

    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });

    // Inner glowing sphere core
    const coreSphereGeo = new THREE.IcosahedronGeometry(0.3, 2);
    const coreSphere = new THREE.Mesh(coreSphereGeo, coreMaterial);
    masterGroup.add(coreSphere);

    // 3x3x3 Sub-Cubes (26 blocks, center empty for core)
    const subCubes: {
      mesh: THREE.Mesh;
      basePos: THREE.Vector3;
      disperseDir: THREE.Vector3;
      edges: THREE.LineSegments;
    }[] = [];

    const cubeSize = 0.34;
    const spacing = 0.38;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const edgeGeo = new THREE.EdgesGeometry(cubeGeo);

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue;

          const mesh = new THREE.Mesh(cubeGeo, glassMaterial.clone());
          const edges = new THREE.LineSegments(edgeGeo, edgeMaterial.clone());
          mesh.add(edges);

          const basePos = new THREE.Vector3(x * spacing, y * spacing, z * spacing);
          mesh.position.copy(basePos);

          // Random slight dispersal direction for the loading progression
          const disperseDir = basePos.clone().normalize().multiplyScalar(0.4 + Math.random() * 0.3);

          masterGroup.add(mesh);
          subCubes.push({
            mesh,
            basePos,
            disperseDir,
            edges,
          });
        }
      }
    }

    // Floating orbital satellite micro-cubes
    const orbitalGroup = new THREE.Group();
    scene.add(orbitalGroup);

    const orbiters: {
      mesh: THREE.Mesh;
      speed: number;
      radius: number;
      angle: number;
      yOffset: number;
    }[] = [];

    const orbiterGeo = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const orbiterEdgeGeo = new THREE.EdgesGeometry(orbiterGeo);

    for (let i = 0; i < 6; i++) {
      const orbMesh = new THREE.Mesh(orbiterGeo, glassMaterial.clone());
      const orbEdge = new THREE.LineSegments(orbiterEdgeGeo, edgeMaterial.clone());
      orbMesh.add(orbEdge);
      orbitalGroup.add(orbMesh);

      orbiters.push({
        mesh: orbMesh,
        speed: 0.5 + i * 0.15,
        radius: 1.35 + (i % 2) * 0.25,
        angle: (i / 6) * Math.PI * 2,
        yOffset: ((i % 3) - 1) * 0.3,
      });
    }

    // Mouse Tracking
    let mouse = { x: 0, y: 0 };
    let targetRotation = { x: 0.3, y: 0.5 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Unpack current progress (0 to 100)
      const currentPct = progressRef.current;
      const solveRatio = Math.min(1, Math.max(0, currentPct / 100));
      // Dispersal factor: high at 0%, 0 at 100%
      const disperseFactor = Math.pow(1 - solveRatio, 1.4);

      // Transition Zoom: when user clicks Enter, camera zooms fast into the cube
      if (clickedRef.current) {
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 0.5, 0.1);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 0.1);
        masterGroup.rotation.y += delta * 4;
      } else {
        targetRotation.y += delta * 0.45;
        targetRotation.x = 0.25 + Math.sin(time * 0.8) * 0.12;

        masterGroup.rotation.y = THREE.MathUtils.lerp(
          masterGroup.rotation.y,
          targetRotation.y + mouse.x * 0.35,
          0.08
        );
        masterGroup.rotation.x = THREE.MathUtils.lerp(
          masterGroup.rotation.x,
          targetRotation.x - mouse.y * 0.25,
          0.08
        );
      }

      // Core pulse
      const corePulse = 1 + Math.sin(time * 3.5) * 0.15;
      coreSphere.scale.set(corePulse, corePulse, corePulse);
      coreSphere.rotation.y += delta * 1.5;

      // Sub-Cubes Assembly: cubes smoothly solve into position as progress reaches 100%
      subCubes.forEach((cube) => {
        const targetX = cube.basePos.x + cube.disperseDir.x * disperseFactor;
        const targetY = cube.basePos.y + cube.disperseDir.y * disperseFactor;
        const targetZ = cube.basePos.z + cube.disperseDir.z * disperseFactor;

        cube.mesh.position.x = THREE.MathUtils.lerp(cube.mesh.position.x, targetX, 0.1);
        cube.mesh.position.y = THREE.MathUtils.lerp(cube.mesh.position.y, targetY, 0.1);
        cube.mesh.position.z = THREE.MathUtils.lerp(cube.mesh.position.z, targetZ, 0.1);

        // Edge illumination increases as solved
        const lineMat = cube.edges.material as THREE.LineBasicMaterial;
        if (lineMat) {
          lineMat.opacity = 0.45 + solveRatio * 0.45;
        }
      });

      // Orbiters
      orbiters.forEach((orb) => {
        orb.angle += orb.speed * delta;
        orb.mesh.position.x = Math.cos(orb.angle) * orb.radius;
        orb.mesh.position.z = Math.sin(orb.angle) * orb.radius;
        orb.mesh.position.y = orb.yOffset + Math.sin(time * 2 + orb.radius) * 0.1;
        orb.mesh.rotation.x += delta * 1.8;
        orb.mesh.rotation.y += delta * 2.2;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth || 360;
      const h = mount.clientHeight || 360;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      subCubes.forEach((c) => {
        c.mesh.geometry.dispose();
        c.edges.geometry.dispose();
      });
      coreSphereGeo.dispose();
      orbiterGeo.dispose();
      orbiterEdgeGeo.dispose();
      glassMaterial.dispose();
      edgeMaterial.dispose();
      coreMaterial.dispose();
      renderer.dispose();

      if (mount && renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="loader-3d-canvas-wrap" ref={mountRef}>
      <div className="loader-3d-glow" />
    </div>
  );
};

export default Loader3DCanvas;
