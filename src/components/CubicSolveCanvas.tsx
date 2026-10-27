import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./styles/CubicSolveCanvas.css";

interface CubicSolveCanvasProps {
  className?: string;
}

const CubicSolveCanvas: React.FC<CubicSolveCanvasProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x818cf8, 1.8);
    fillLight.position.set(-4, -2, -3);
    scene.add(fillLight);

    const corePointLight = new THREE.PointLight(0x38bdf8, 3, 6);
    corePointLight.position.set(0, 0, 0);
    scene.add(corePointLight);

    // Main 3D Cube Cluster (3x3x3 Rubik's / Neural Matrix)
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Cube Materials
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x070b14,
      emissive: 0x0284c7,
      emissiveIntensity: 0.18,
      roughness: 0.15,
      metalness: 0.25,
      transmission: 0.6,
      transparent: true,
      opacity: 0.88,
      reflectivity: 0.9,
    });

    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.75,
    });

    const coreGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    // Central glowing energy core
    const coreSphereGeo = new THREE.IcosahedronGeometry(0.35, 2);
    const coreSphere = new THREE.Mesh(coreSphereGeo, coreGlowMaterial);
    masterGroup.add(coreSphere);

    // Create 3x3x3 Sub-Cubes (27 blocks)
    const subCubes: {
      mesh: THREE.Mesh;
      basePos: THREE.Vector3;
      gridCoord: { x: number; y: number; z: number };
      edges: THREE.LineSegments;
    }[] = [];

    const cubeSize = 0.44;
    const spacing = 0.49;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const edgeGeo = new THREE.EdgesGeometry(cubeGeo);

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue; // leave room for central core

          const mesh = new THREE.Mesh(cubeGeo, glassMaterial.clone());
          const edges = new THREE.LineSegments(edgeGeo, edgeMaterial.clone());
          mesh.add(edges);

          const basePos = new THREE.Vector3(x * spacing, y * spacing, z * spacing);
          mesh.position.copy(basePos);

          masterGroup.add(mesh);
          subCubes.push({
            mesh,
            basePos,
            gridCoord: { x, y, z },
            edges,
          });
        }
      }
    }

    // Outer Floating Orbital Matrix Fragments
    const orbitalGroup = new THREE.Group();
    scene.add(orbitalGroup);

    const orbitFragments: {
      mesh: THREE.Mesh;
      speed: number;
      radius: number;
      angle: number;
      yOffset: number;
    }[] = [];

    const fragmentGeo = new THREE.BoxGeometry(0.14, 0.14, 0.14);
    const fragmentEdgeGeo = new THREE.EdgesGeometry(fragmentGeo);

    for (let i = 0; i < 8; i++) {
      const fragMesh = new THREE.Mesh(fragmentGeo, glassMaterial.clone());
      const fragEdge = new THREE.LineSegments(fragmentEdgeGeo, edgeMaterial.clone());
      fragMesh.add(fragEdge);
      orbitalGroup.add(fragMesh);

      orbitFragments.push({
        mesh: fragMesh,
        speed: 0.4 + i * 0.1,
        radius: 1.6 + (i % 3) * 0.35,
        angle: (i / 8) * Math.PI * 2,
        yOffset: ((i % 5) - 2) * 0.35,
      });
    }

    // Interactive Mouse Tracking & Dragging State
    let mouse = { x: 0, y: 0 };
    let targetRotation = { x: 0.3, y: 0.5 };
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.x = nx;
      mouse.y = ny;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        targetRotation.y += deltaX * 0.01;
        targetRotation.x += deltaY * 0.01;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    // Animation Choreography: Solving Cycle
    let solvePhase = 0; // 0 = idle float, 1 = layer twist, 2 = radial explode/snap
    let solveTimer = 0;
    const clock = new THREE.Clock();

    let activeLayerAxis: "x" | "y" | "z" = "y";
    let activeLayerSign = 1;
    let layerRotationAngle = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Master Group Continuous Hover & Inertia
      if (!isDragging) {
        targetRotation.y += delta * 0.35;
        targetRotation.x = 0.25 + Math.sin(time * 0.6) * 0.15;
      }

      // Smooth Lerp Rotation
      masterGroup.rotation.y = THREE.MathUtils.lerp(
        masterGroup.rotation.y,
        targetRotation.y + mouse.x * 0.4,
        0.08
      );
      masterGroup.rotation.x = THREE.MathUtils.lerp(
        masterGroup.rotation.x,
        targetRotation.x - mouse.y * 0.3,
        0.08
      );

      // Central core pulse
      const coreScale = 1 + Math.sin(time * 3) * 0.12;
      coreSphere.scale.set(coreScale, coreScale, coreScale);
      coreSphere.rotation.y += delta * 1.2;
      coreSphere.rotation.x += delta * 0.8;

      // Cubic Solve Choreography
      solveTimer += delta;
      if (solveTimer > 2.8) {
        solveTimer = 0;
        solvePhase = (solvePhase + 1) % 3;
        const axes: ("x" | "y" | "z")[] = ["x", "y", "z"];
        activeLayerAxis = axes[Math.floor(Math.random() * axes.length)];
        activeLayerSign = Math.random() > 0.5 ? 1 : -1;
        layerRotationAngle = 0;
      }

      if (solvePhase === 1) {
        layerRotationAngle += delta * 2;
      }

      // Explode and Re-solve Breathing
      const explodeCycle = Math.sin(time * 1.5);
      const explodeFactor = Math.max(0, explodeCycle * 0.16);

      subCubes.forEach((cube) => {
        const base = cube.basePos.clone();
        if (solvePhase === 1 && cube.gridCoord[activeLayerAxis] === activeLayerSign) {
          if (activeLayerAxis === "y") {
            const cos = Math.cos(layerRotationAngle);
            const sin = Math.sin(layerRotationAngle);
            const rx = base.x * cos - base.z * sin;
            const rz = base.x * sin + base.z * cos;
            base.x = rx;
            base.z = rz;
          }
        }

        const targetX = base.x * (1 + explodeFactor);
        const targetY = base.y * (1 + explodeFactor);
        const targetZ = base.z * (1 + explodeFactor);

        cube.mesh.position.x = THREE.MathUtils.lerp(cube.mesh.position.x, targetX, 0.1);
        cube.mesh.position.y = THREE.MathUtils.lerp(cube.mesh.position.y, targetY, 0.1);
        cube.mesh.position.z = THREE.MathUtils.lerp(cube.mesh.position.z, targetZ, 0.1);

        // Highlight edges when solving
        const lineMat = cube.edges.material as THREE.LineBasicMaterial;
        if (lineMat) {
          lineMat.opacity = 0.55 + explodeFactor * 1.5;
        }
      });

      // Orbital Matrix Fragments Animation
      orbitFragments.forEach((frag) => {
        frag.angle += frag.speed * delta;
        frag.mesh.position.x = Math.cos(frag.angle) * frag.radius;
        frag.mesh.position.z = Math.sin(frag.angle) * frag.radius;
        frag.mesh.position.y = frag.yOffset + Math.sin(time * 2 + frag.radius) * 0.15;
        frag.mesh.rotation.x += delta * 1.5;
        frag.mesh.rotation.y += delta * 2;
      });

      renderer.render(scene, camera);
    };

    const animId = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      domElement.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      subCubes.forEach((c) => {
        c.mesh.geometry.dispose();
        c.edges.geometry.dispose();
      });
      coreSphereGeo.dispose();
      fragmentGeo.dispose();
      fragmentEdgeGeo.dispose();
      glassMaterial.dispose();
      edgeMaterial.dispose();
      coreGlowMaterial.dispose();
      renderer.dispose();

      if (container && domElement.parentNode === container) {
        container.removeChild(domElement);
      }
    };
  }, []);

  return (
    <div className={`cubic-solve-container ${className}`} ref={containerRef}>
      {/* 3D Atmospheric Canvas */}
      <div className="cubic-canvas-backdrop-glow" />
      <div className="cubic-solve-hud-chip">
        <span className="hud-chip-dot" />
        <span>3D CUBIC SOLVE MATRIX // DRAG TO ROTATE</span>
      </div>
    </div>
  );
};

export default CubicSolveCanvas;
