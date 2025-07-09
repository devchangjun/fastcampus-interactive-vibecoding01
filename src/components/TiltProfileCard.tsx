"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";

interface ProfileData {
  id: number;
  name: string;
  title: string;
  description: string;
  image: string;
  skills: string[];
  social?: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

interface TiltProfileCardProps {
  profile: ProfileData;
  index?: number;
  onHover?: (isHovered: boolean) => void;
}

export default function TiltProfileCard({ profile, index = 0, onHover }: TiltProfileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      card.style.transition = "transform 0.1s ease-out";
      onHover?.(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      card.style.transition = "transform 0.5s ease-out";
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      onHover?.(false);
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [onHover]);

  return (
    <div
      ref={cardRef}
      className="profile-card w-full max-w-sm mx-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl p-8 cursor-pointer opacity-0 translate-y-8 border border-white/10 backdrop-blur-sm relative overflow-hidden"
      style={{
        transitionDelay: `${index * 0.2}s`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-50">
        <div
          className={`absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Profile image */}
      <div className="relative mb-6 transform-gpu" style={{ transform: "translateZ(50px)" }}>
        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
          <Image src={profile.image} alt={profile.name} width={96} height={96} className="w-full h-full object-cover" />
        </div>

        {/* Glow effect */}
        <div
          className={`absolute inset-0 w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-xl transition-opacity duration-300 ${
            isHovered ? "opacity-30" : "opacity-0"
          }`}
        />
      </div>

      {/* Profile info */}
      <div className="text-center text-white relative z-10" style={{ transform: "translateZ(25px)" }}>
        <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {profile.name}
        </h3>

        <p className="text-purple-300 font-medium mb-4 text-sm uppercase tracking-wider">{profile.title}</p>

        <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">{profile.description}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {profile.skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80 backdrop-blur-sm border border-white/20"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Social links */}
        {profile.social && (
          <div className="flex justify-center space-x-4">
            {profile.social.github && (
              <a
                href={profile.social.github}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            )}
            {profile.social.linkedin && (
              <a
                href={profile.social.linkedin}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}
            {profile.social.email && (
              <a
                href={`mailto:${profile.social.email}`}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>

      {/* Shine effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 transition-transform duration-700 ${
          isHovered ? "translate-x-full" : "-translate-x-full"
        }`}
      />
    </div>
  );
}
