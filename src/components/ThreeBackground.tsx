"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function StarField() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  // 별들의 속성 생성
  const { positions, colors, sizes } = useMemo(() => {
    const starCount = 1500;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    // 별 색상 팔레트
    const starColors = [
      [1, 1, 1], // 흰색
      [1, 1, 0.8], // 따뜻한 흰색
      [0.8, 0.9, 1], // 차가운 파란색
      [1, 0.9, 0.7], // 노란색
      [0.9, 0.8, 1], // 연보라색
    ];

    for (let i = 0; i < starCount; i++) {
      // 위치 설정 (구형 분포)
      const radius = Math.random() * 100 + 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // 색상 설정
      const colorIndex = Math.floor(Math.random() * starColors.length);
      colors[i * 3] = starColors[colorIndex][0];
      colors[i * 3 + 1] = starColors[colorIndex][1];
      colors[i * 3 + 2] = starColors[colorIndex][2];

      // 크기 설정
      sizes[i] = Math.random() * 3 + 1;
    }

    return { positions, colors, sizes };
  }, []);

  useFrame((state) => {
    if (pointsRef.current && materialRef.current) {
      // 별들 회전
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;

      // 깜빡임 효과
      materialRef.current.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
        <bufferAttribute attach="attributes-size" count={sizes.length} array={sizes} itemSize={1} args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={2}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function MovingStars() {
  const groupRef = useRef<THREE.Group>(null);

  const starsData = useMemo(() => {
    const count = 200;
    const stars = [];

    for (let i = 0; i < count; i++) {
      stars.push({
        position: [(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200] as [
          number,
          number,
          number
        ],
        speed: Math.random() * 0.02 + 0.005,
        scale: Math.random() * 0.5 + 0.2,
      });
    }

    return stars;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((star, index) => {
        const data = starsData[index];

        // Z축으로 이동 (우주에서 다가오는 효과)
        star.position.z += data.speed;

        // 화면을 벗어나면 뒤로 리셋
        if (star.position.z > 50) {
          star.position.z = -150;
          star.position.x = (Math.random() - 0.5) * 200;
          star.position.y = (Math.random() - 0.5) * 200;
        }

        // 깜빡임
        const material = (star as THREE.Mesh).material as THREE.MeshBasicMaterial;
        if (material) {
          material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3 + index) * 0.3;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {starsData.map((star, index) => (
        <mesh key={index} position={star.position} scale={star.scale}>
          <sphereGeometry args={[0.1, 6, 6]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        style={{
          background: "transparent",
          zIndex: 1,
        }}
        gl={{
          alpha: true,
          antialias: false, // 성능 최적화
          powerPreference: "high-performance",
        }}
      >
        {/* 환경 조명 */}
        <ambientLight intensity={0.1} color="#000033" />

        {/* 별 파티클 필드 */}
        <StarField />

        {/* 움직이는 별들 */}
        <MovingStars />

        {/* 카메라 약간의 움직임 */}
        <group rotation={[0, 0, 0]}>
          {/* 추가 별 레이어 */}
          <points position={[0, 0, -20]}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={300}
                array={new Float32Array(Array.from({ length: 900 }, () => (Math.random() - 0.5) * 300))}
                itemSize={3}
                args={[new Float32Array(Array.from({ length: 900 }, () => (Math.random() - 0.5) * 300)), 3]}
              />
            </bufferGeometry>
            <pointsMaterial size={1} color="#4169E1" transparent opacity={0.4} sizeAttenuation={true} />
          </points>
        </group>
      </Canvas>
    </div>
  );
}
