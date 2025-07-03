"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const Particles = ({ count = 5000 }) => {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, originalPositions, randomFactors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const randomFactors = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      positions.set([x, y, z], i * 3);
      originalPositions.set([x, y, z], i * 3);
      randomFactors[i] = Math.random();
    }
    return { positions, originalPositions, randomFactors };
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const positionAttribute = pointsRef.current.geometry.attributes.position;
      const time = state.clock.getElapsedTime();

      for (let i = 0; i < count; i++) {
        const y = originalPositions[i * 3 + 1];
        const randomFactor = randomFactors[i];

        // Individual particle movement
        const newY = y + Math.sin(time * randomFactor + i) * 0.5;
        positionAttribute.setY(i, newY);
      }
      positionAttribute.needsUpdate = true;

      // Group rotation based on mouse
      const { pointer } = state;
      const targetX = pointer.x * 0.5;
      const targetY = pointer.y * 0.5;

      pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetX, 0.1);
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, -targetY, 0.1);
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.7} />
    </points>
  );
};

const ParticleField = () => {
  return (
    <Canvas
      camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    >
      <Particles />
    </Canvas>
  );
};

export default ParticleField;
