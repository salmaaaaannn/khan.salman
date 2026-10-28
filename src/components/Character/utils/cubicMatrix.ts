import * as THREE from "three";

export interface CubicMatrixController {
  update: (time: number, mouseX: number, mouseY: number, assembleProgress?: number) => void;
  onResize: (isMobile: boolean) => void;
  dispose: () => void;
}

export function createCubicMatrix(scene: THREE.Scene): CubicMatrixController {
  const group = new THREE.Group();
  scene.add(group);

  let isMobile = typeof window !== "undefined" ? window.innerWidth <= 1024 : false;

  const cubes: {
    mesh: THREE.Mesh;
    edges: THREE.LineSegments;
    basePos: THREE.Vector3;
    rotSpeed: THREE.Vector3;
    phase: number;
    assemblePos: THREE.Vector3;
    initialScale: number;
  }[] = [];

  // Frosted dark glass with subtle cyan illumination
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x0b1120,
    emissive: 0x0284c7,
    emissiveIntensity: 0.14,
    roughness: 0.25,
    metalness: 0.15,
    transmission: 0.55,
    transparent: true,
    opacity: 0.75,
  });

  const edgeMaterial = new THREE.LineBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.55,
  });

  // Expansive spatial positions with depth for cinematic atmosphere
  // Responsive multiplier: on mobile, narrower x spread so 100% of cubes stay in screen
  const rawOffsets = [
    { x: -1.3, y: 1.5, z: -0.8, scale: 0.24 },
    { x: -1.0, y: 0.9, z: 0.2, scale: 0.20 },
    { x: -1.4, y: 0.3, z: -0.6, scale: 0.22 },
    { x: 1.3, y: 1.6, z: -0.7, scale: 0.25 },
    { x: 1.0, y: 1.0, z: 0.2, scale: 0.20 },
    { x: 1.4, y: 0.4, z: -0.5, scale: 0.22 },
    { x: -0.8, y: 2.0, z: -0.9, scale: 0.18 },
    { x: 0.8, y: 2.0, z: -0.8, scale: 0.18 },
    { x: -1.5, y: 1.1, z: -1.2, scale: 0.16 },
    { x: 1.5, y: 1.2, z: -1.2, scale: 0.16 },
    { x: -0.6, y: 0.15, z: 0.5, scale: 0.15 },
    { x: 0.6, y: 0.15, z: 0.5, scale: 0.15 },
    { x: -1.1, y: 2.2, z: -0.4, scale: 0.19 },
    { x: 1.1, y: 2.2, z: -0.4, scale: 0.19 },
  ];

  // Precision 14-cube assembled "solved cube" target positions
  const S = 0.22;
  const assembleOffsets = [
    // Bottom layer (4 cubes)
    new THREE.Vector3(-S * 0.6, 1.05 - S, 0.25 - S * 0.6),
    new THREE.Vector3( S * 0.6, 1.05 - S, 0.25 - S * 0.6),
    new THREE.Vector3(-S * 0.6, 1.05 - S, 0.25 + S * 0.6),
    new THREE.Vector3( S * 0.6, 1.05 - S, 0.25 + S * 0.6),

    // Middle layer (6 perimeter cubes)
    new THREE.Vector3(-S * 1.15, 1.05, 0.25),
    new THREE.Vector3( S * 1.15, 1.05, 0.25),
    new THREE.Vector3(0, 1.05, 0.25 - S * 1.15),
    new THREE.Vector3(0, 1.05, 0.25 + S * 1.15),
    new THREE.Vector3(-S * 0.6, 1.05, 0.25 + S * 0.6),
    new THREE.Vector3( S * 0.6, 1.05, 0.25 - S * 0.6),

    // Top layer (4 cubes)
    new THREE.Vector3(-S * 0.6, 1.05 + S, 0.25 - S * 0.6),
    new THREE.Vector3( S * 0.6, 1.05 + S, 0.25 - S * 0.6),
    new THREE.Vector3(-S * 0.6, 1.05 + S, 0.25 + S * 0.6),
    new THREE.Vector3( S * 0.6, 1.05 + S, 0.25 + S * 0.6),
  ];

  const getBaseX = (x: number, mobile: boolean) => (mobile ? x * 0.55 : x);
  const getScale = (s: number, mobile: boolean) => (mobile ? s * 0.82 : s);

  rawOffsets.forEach((data, index) => {
    const size = getScale(data.scale, isMobile);
    const geometry = new THREE.BoxGeometry(size, size, size);
    const edgesGeometry = new THREE.EdgesGeometry(geometry);

    const mesh = new THREE.Mesh(geometry, glassMaterial.clone());
    const edges = new THREE.LineSegments(edgesGeometry, edgeMaterial.clone());
    mesh.add(edges);

    const basePos = new THREE.Vector3(getBaseX(data.x, isMobile), data.y, data.z);
    mesh.position.copy(basePos);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    group.add(mesh);

    cubes.push({
      mesh,
      edges,
      basePos,
      assemblePos: assembleOffsets[index],
      initialScale: data.scale,
      phase: index * 0.65,
      rotSpeed: new THREE.Vector3(
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.018,
        (Math.random() - 0.5) * 0.012
      ),
    });
  });

  const onResize = (newIsMobile: boolean) => {
    isMobile = newIsMobile;
    cubes.forEach((cube, i) => {
      const data = rawOffsets[i];
      cube.basePos.x = getBaseX(data.x, isMobile);
      const newScale = getScale(data.scale, isMobile);
      cube.mesh.scale.setScalar(newScale / data.scale);
    });
  };

  const update = (
    time: number,
    mouseX: number,
    mouseY: number,
    assembleProgress: number = 0
  ) => {
    // Smooth easing on assembleProgress: 0 (free float) -> 1 (assembled solved cube)
    const eased = THREE.MathUtils.smoothstep(
      Math.min(Math.max(assembleProgress, 0), 1),
      0,
      1
    );

    // Parallax mouse tilt on whole cluster + cohesive rotation when assembled
    const targetRotY = mouseX * 0.3 + eased * Math.sin(time * 0.8) * 0.35;
    const targetRotX = -mouseY * 0.2 + eased * Math.cos(time * 0.6) * 0.18;
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetRotY, 0.06);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetRotX, 0.06);

    cubes.forEach((cube) => {
      // Rotation: individual organic spin when floating, aligned when assembled
      if (eased < 0.95) {
        cube.mesh.rotation.x += cube.rotSpeed.x * (1 - eased * 0.8);
        cube.mesh.rotation.y += cube.rotSpeed.y * (1 - eased * 0.8);
        cube.mesh.rotation.z += cube.rotSpeed.z * (1 - eased * 0.8);
      } else {
        // Lock to clean aligned orientation
        cube.mesh.rotation.x = THREE.MathUtils.lerp(cube.mesh.rotation.x, 0, 0.1);
        cube.mesh.rotation.y = THREE.MathUtils.lerp(cube.mesh.rotation.y, 0, 0.1);
        cube.mesh.rotation.z = THREE.MathUtils.lerp(cube.mesh.rotation.z, 0, 0.1);
      }

      // Levitation floating wave (active when floating, dampens when assembling)
      const floatY = Math.sin(time * 1.4 + cube.phase) * 0.07 * (1 - eased);
      const floatX = Math.cos(time * 0.9 + cube.phase) * 0.04 * (1 - eased);

      // Target position: lerp between orbital floating position and assembled position
      const floatingX = cube.basePos.x + floatX;
      const floatingY = cube.basePos.y + floatY;
      const floatingZ = cube.basePos.z;

      const targetX = THREE.MathUtils.lerp(floatingX, cube.assemblePos.x, eased);
      const targetY = THREE.MathUtils.lerp(floatingY, cube.assemblePos.y, eased);
      const targetZ = THREE.MathUtils.lerp(floatingZ, cube.assemblePos.z, eased);

      cube.mesh.position.x = THREE.MathUtils.lerp(cube.mesh.position.x, targetX, 0.09);
      cube.mesh.position.y = THREE.MathUtils.lerp(cube.mesh.position.y, targetY, 0.09);
      cube.mesh.position.z = THREE.MathUtils.lerp(cube.mesh.position.z, targetZ, 0.09);

      // Enhance cyan edge glow and glass emissive intensity as they assemble together
      const lineMat = cube.edges.material as THREE.LineBasicMaterial;
      if (lineMat) {
        lineMat.opacity = 0.5 + eased * 0.45;
      }
      const meshMat = cube.mesh.material as THREE.MeshPhysicalMaterial;
      if (meshMat) {
        meshMat.emissiveIntensity = 0.14 + eased * 0.36;
      }
    });
  };

  const dispose = () => {
    scene.remove(group);
    cubes.forEach((c) => {
      c.mesh.geometry.dispose();
      c.edges.geometry.dispose();
    });
    glassMaterial.dispose();
    edgeMaterial.dispose();
  };

  return { update, onResize, dispose };
}
