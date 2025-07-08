"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";

interface IntroAnimationProps {
  children: ReactNode;
  onComplete?: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ children, onComplete }) => {
  const introRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!introRef.current || !circleRef.current || !contentRef.current) return;

    // 페이지 로드 시 스크롤 방지
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        // 애니메이션 완료 후 스크롤 복원 및 인트로 제거
        document.body.style.overflow = "auto";
        if (introRef.current) {
          introRef.current.style.display = "none";
        }
        onComplete?.();
      },
    });

    // 초기 상태 설정
    gsap.set(circleRef.current, {
      scale: 0,
      transformOrigin: "center center",
    });

    gsap.set(contentRef.current, {
      y: "100%",
    });

    // 애니메이션 타임라인
    tl
      // 1. 검은 화면 유지 (0.2초)
      .to({}, { duration: 0.2 })
      // 2. 원이 중앙에서 확대 (0.8초)
      .to(circleRef.current, {
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      })
      // 3. 잠시 대기 (0.1초)
      .to({}, { duration: 0.1 })
      // 4. 기존 페이지가 slide up으로 나타남 (0.6초)
      .to(contentRef.current, {
        y: "0%",
        duration: 0.6,
        ease: "power2.inOut",
      })
      // 5. 인트로 화면 fade out (0.3초)
      .to(introRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });

    return () => {
      tl.kill();
      // 컴포넌트 언마운트 시 스크롤 복원
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  return (
    <>
      {/* 인트로 오버레이 */}
      <div ref={introRef} className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        {/* 확대되는 원 */}
        <div
          ref={circleRef}
          className="absolute bg-white rounded-full"
          style={{
            width: "300vmax",
            height: "300vmax",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* 기존 페이지 콘텐츠 */}
      <div ref={contentRef} className="relative z-10">
        {children}
      </div>
    </>
  );
};

export default IntroAnimation;
