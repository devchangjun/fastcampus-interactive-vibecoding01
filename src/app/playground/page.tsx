"use client";

import ImageStageAnimation from "@/components/ImageStageAnimation";

export default function Playground() {
  return (
    <div className="min-h-screen bg-black">
      <ImageStageAnimation
        onComplete={() => {
          console.log("Animation completed!");
        }}
      />
    </div>
  );
}
