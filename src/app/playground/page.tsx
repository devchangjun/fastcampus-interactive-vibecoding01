"use client";

import TiltProfileCard from "@/components/TiltProfileCard";
import CustomCursor from "@/components/CustomCursor";
import ThreeBackground from "@/components/ThreeBackground";
import { useEffect, useState } from "react";

const sampleProfiles = [
  {
    id: 1,
    name: "김철수",
    title: "Frontend Developer",
    description:
      "React와 Next.js를 활용한 모던 웹 개발에 전문성을 가지고 있습니다. 사용자 경험을 최우선으로 생각하며 아름답고 기능적인 인터페이스를 만듭니다.",
    image: "/image/1.webp",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "kim@example.com",
    },
  },
  {
    id: 2,
    name: "박지영",
    title: "UI/UX Designer",
    description:
      "사용자 중심의 디자인으로 직관적이고 아름다운 경험을 만듭니다. 디자인과 개발의 경계를 넘나들며 완성도 높은 프로덕트를 선보입니다.",
    image: "/image/2.webp",
    skills: ["Figma", "Adobe XD", "Prototyping", "Design System"],
    social: {
      linkedin: "https://linkedin.com",
      email: "park@example.com",
    },
  },
  {
    id: 3,
    name: "이민호",
    title: "Backend Developer",
    description:
      "안정적이고 확장 가능한 서버 아키텍처를 설계합니다. 클라우드 네이티브 기술과 마이크로서비스 패턴에 깊은 이해를 가지고 있습니다.",
    image: "/image/3.webp",
    skills: ["Node.js", "Python", "AWS", "Docker"],
    social: {
      github: "https://github.com",
      email: "lee@example.com",
    },
  },
  {
    id: 4,
    name: "최수진",
    title: "Full Stack Developer",
    description:
      "프론트엔드부터 백엔드까지 전체 스택을 아우르는 개발자입니다. 효율적인 코드와 최신 기술을 통해 혁신적인 솔루션을 제공합니다.",
    image: "/image/4.webp",
    skills: ["Vue.js", "Django", "PostgreSQL", "DevOps"],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "choi@example.com",
    },
  },
];

export default function Playground() {
  const [isCursorHovered, setIsCursorHovered] = useState(false);

  useEffect(() => {
    // 카드들이 나타나는 애니메이션을 위한 초기화
    const cards = document.querySelectorAll(".profile-card");
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.remove("opacity-0", "translate-y-8");
        card.classList.add("opacity-100", "translate-y-0");
      }, index * 200 + 300);
    });
  }, []);

  const handleCardHover = (isHovered: boolean) => {
    setIsCursorHovered(isHovered);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden cursor-none">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />

      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500 rounded-full animate-pulse opacity-60" />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-500 rounded-full animate-ping opacity-40" />
        <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-purple-400 rounded-full animate-bounce opacity-30" />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-50" />
      </div>

      {/* 3D Star Background */}
      <div className="absolute inset-0 z-[5]">
        <ThreeBackground />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent mb-6">
            우주의 별빛 속 3D 프로필 카드
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            무한한 우주 공간에서 별들이 떠다니는 환상적인 배경과 함께 3D 틸트 효과를 체험해보세요!
          </p>
        </div>

        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {sampleProfiles.map((profile, index) => (
            <TiltProfileCard key={profile.id} profile={profile} index={index} onHover={handleCardHover} />
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-white text-lg font-semibold mb-3">새로운 우주 경험</h3>
            <div className="text-gray-300 text-sm space-y-2">
              <p>⭐ 1500개 이상의 별들이 실시간으로 깜빡이며 떠다닙니다</p>
              <p>🚀 프로필 카드 hover 시 커서가 &ldquo;View&rdquo;로 변화합니다</p>
              <p>🌌 우주 깊이감이 느껴지는 3D 파티클 시스템</p>
              <p>💫 각 별마다 다른 색상과 움직임을 가집니다</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Cursor */}
      <CustomCursor isHovered={isCursorHovered} />
    </div>
  );
}
