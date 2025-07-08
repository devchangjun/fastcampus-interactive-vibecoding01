"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface ImageStageAnimationProps {
  onComplete?: () => void;
}

const ImageStageAnimation: React.FC<ImageStageAnimationProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // 이미지 배열 생성 (기존 8개 + 2개 복사로 10개 구성)
  const images = [
    "/image/1.webp",
    "/image/2.webp",
    "/image/3.webp",
    "/image/4.webp",
    "/image/5.webp",
    "/image/6.webp",
    "/image/7.webp",
    "/image/8.webp",
    "/image/1.webp", // 재사용
    "/image/2.webp", // 재사용
  ];

  // 랜덤 위치 생성 함수
  const getRandomPosition = () => {
    const padding = 100; // 뷰포트 가장자리로부터의 여백
    return {
      x: Math.random() * (window.innerWidth - padding * 2) + padding,
      y: Math.random() * (window.innerHeight - padding * 2) + padding,
    };
  };

  // 원형 배치 위치 계산 함수
  const getCircularPosition = (index: number, total: number, radius: number) => {
    const angle = (index * 2 * Math.PI) / total;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    };
  };

  // 일열 배치 위치 계산 함수
  const getLinearPosition = (index: number, total: number) => {
    const spacing = 120; // 이미지 간격
    const totalWidth = (total - 1) * spacing;
    const startX = (window.innerWidth - totalWidth) / 2;
    const centerY = window.innerHeight / 2;

    return {
      x: startX + index * spacing,
      y: centerY,
    };
  };

  useEffect(() => {
    if (!containerRef.current || imageRefs.current.length === 0) return;

    // GSAP 타임라인 생성
    const tl = gsap.timeline({
      onComplete: () => {
        // 애니메이션 완료 후 원형 회전 시작
        startCircularRotation();
        onComplete?.();
      },
    });

    timelineRef.current = tl;

    // 1단계: 랜덤 위치에 이미지 배치
    const randomPositions = images.map(() => getRandomPosition());

    imageRefs.current.forEach((imageRef, index) => {
      if (imageRef) {
        gsap.set(imageRef, {
          x: randomPositions[index].x,
          y: randomPositions[index].y,
          scale: 0,
          rotation: Math.random() * 360,
          opacity: 0,
        });
      }
    });

    // 애니메이션 타임라인 구성
    tl
      // 1단계: 이미지들이 랜덤 위치에 나타남
      .to(imageRefs.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
      })
      // 잠시 대기
      .to({}, { duration: 0.5 })
      // 2단계: 가운데 일열로 배치
      .to(imageRefs.current, {
        x: (index) => getLinearPosition(index, images.length).x,
        y: (index) => getLinearPosition(index, images.length).y,
        rotation: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: "power2.inOut",
      })
      // 잠시 대기
      .to({}, { duration: 0.5 })
      // 3단계: 원형으로 배치
      .to(imageRefs.current, {
        x: (index) => getCircularPosition(index, images.length, 200).x,
        y: (index) => getCircularPosition(index, images.length, 200).y,
        duration: 1.5,
        stagger: 0.1,
        ease: "power2.inOut",
      });

    // 정리 함수
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [onComplete]);

  // 원형 회전 애니메이션 시작 함수
  const startCircularRotation = () => {
    if (!containerRef.current) return;

    gsap.to(containerRef.current, {
      rotation: 360,
      duration: 10,
      ease: "none",
      repeat: -1,
      transformOrigin: "center center",
    });
  };

  // 이미지 hover 효과 함수
  const handleImageHover = (imageRef: HTMLDivElement | null, isHovering: boolean) => {
    if (!imageRef) return;

    if (isHovering) {
      gsap.to(imageRef, {
        rotationY: 180,
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(imageRef, {
        rotationY: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full bg-black overflow-hidden">
      {images.map((src, index) => (
        <div
          key={index}
          ref={(el) => {
            imageRefs.current[index] = el;
          }}
          className="absolute cursor-pointer"
          style={{
            width: "80px",
            height: "80px",
            transformOrigin: "center center",
          }}
          onMouseEnter={() => handleImageHover(imageRefs.current[index], true)}
          onMouseLeave={() => handleImageHover(imageRefs.current[index], false)}
        >
          <Image
            src={src}
            alt={`Animation image ${index + 1}`}
            fill
            className="object-cover rounded-lg"
            sizes="80px"
            priority
          />
        </div>
      ))}
    </div>
  );
};

export default ImageStageAnimation;
