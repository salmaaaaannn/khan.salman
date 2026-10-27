import * as THREE from "three";

export interface CubicMatrixController {
  update: (time: number, mouseX: number, mouseY: number) => void;
  dispose: () => void;
}

export function createCubicMatrix(scene: THREE.Scene): CubicMatrixController {
  const group = new THREE.Group();
  scene.add(group);

  const cubes: {
    mesh: THREE.Mesh;
    edges: THREE.LineSegments;
    basePos: THREE.Vector3;
    rotSpeed: THREE.Vector3;
    phase: number;
    solvePos: THREE.Vector3;
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

  // Pre-calculated orbital spatial positions around character
  const orbitalOffsets = [
    { x: -1.7, y: 1.5, z: -0.6, scale: 0.26 },
    { x: -1.4, y: 0.9, z: 0.5, scale: 0.20 },
    { x: -1.9, y: 0.3, z: -0.3, scale: 0.24 },
    { x: 1.7, y: 1.6, z: -0.5, scale: 0.28 },
    { x: 1.4, y: 1.0, z: 0.6, scale: 0.22 },
    { x: 1.9, y: 0.4, z: -0.4, scale: 0.25 },
    { x: -1.2, y: 1.8, z: -0.8, scale: 0.18 },
    { x: 1.3, y: 1.9, z: -0.7, scale: 0.19 },
    { x: -2.1, y: 1.1, z: 0.2, scale: 0.16 },
    { x: 2.2, y: 1.2, z: 0.1, scale: 0.17 },
    { x: -0.9, y: 0.2, z: 0.8, scale: 0.15 },
    { x: 0.9, y: 0.2, z: 0.8, scale: 0.15 },
    { x: -1.6, y: 2.1, z: -0.2, scale: 0.20 },
    { x: 1.6, y: 2.1, z: -0.2, scale: 0.20 },
  ];

  orbitalOffsets.forEach((data, index) => {
    const size = data.scale;
    const geometry = new THREE.BoxGeometry(size, size, size);
    const edgesGeometry = new THREE.EdgesGeometry(geometry);

    const mesh = new THREE.Mesh(geometry, glassMaterial.clone());
    const edges = new THREE.LineSegments(edgesGeometry, edgeMaterial.clone());
    mesh.add(edges);

    const basePos = new THREE.Vector3(data.x, data.y, data.z);
    mesh.position.copy(basePos);

    // Calculate a structured "solved grid" coordinate for periodic solve animation
    const row = Math.floor(index / 4);
    const col = index % 4;
    const solvePos = new THREE.Vector3(
      (col - 1.5) * 0.45 * (index % 2 === 0 ? -1 : 1),
      0.6 + row * 0.35,
      -0.6 + (index % 3) * 0.2
    );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    group.add(mesh);

    cubes.push({
      mesh,
      edges,
      basePos,
      solvePos,
      phase: index * 0.65,
      rotSpeed: new THREE.Vector3(
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.018,
        (Math.random() - 0.5) * 0.012
      ),
    });
  });

  const update = (time: number, mouseX: number, mouseY: number) => {
    // Parallax mouse tilt on whole cluster
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, mouseX * 0.3, 0.05);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -mouseY * 0.2, 0.05);

    // Solve cycle: 10s period (7.5s organic float, 2.5s aligned solve)
    const cycle = time % 10;
    const isSolving = cycle > 7.5;
    const solveAlpha = isSolving
      ? Math.sin(((cycle - 7.5) / 2.5) * Math.PI)
      : 0;

    cubes.forEach((cube) => {
      // Rotation
      cube.mesh.rotation.x += cube.rotSpeed.x;
      cube.mesh.rotation.y += cube.rotSpeed.y;
      cube.mesh.rotation.z += cube.rotSpeed.z;

      // Levitation floating wave
      const floatY = Math.sin(time * 1.4 + cube.phase) * 0.07;
      const floatX = Math.cos(time * 0.9 + cube.phase) * 0.04;

      const targetX = THREE.MathUtils.lerp(cube.basePos.x + floatX, cube.solvePos.x, solveAlpha);
      const targetY = THREE.MathUtils.lerp(cube.basePos.y + floatY, cube.solvePos.y, solveAlpha);
      const targetZ = THREE.MathUtils.lerp(cube.basePos.z, cube.solvePos.z, solveAlpha);

      cube.mesh.position.x = THREE.MathUtils.lerp(cube.mesh.position.x, targetX, 0.08);
      cube.mesh.position.y = THREE.MathUtils.lerp(cube.mesh.position.y, targetY, 0.08);
      cube.mesh.position.z = THREE.MathUtils.lerp(cube.mesh.position.z, targetZ, 0.08);

      // Enhance edge glow during solve
      const lineMat = cube.edges.material as THREE.LineBasicMaterial;
      if (lineMat) {
        lineMat.opacity = 0.45 + solveAlpha * 0.4;
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

  return { update, dispose };
}
