"use client";
import { useState, useRef } from "react";
import { QuoteList } from "./VideoView";

export default function PersonalizedView({ title }: { title: string }) {
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startExperience = () => {
    setHasStarted(true);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
    }
  };

  return (
    <div className="bg-linear-to-b from-[#1a0105] to-[#0a0104] h-screen w-full overflow-hidden relative">
      
      {/* Hidden Video Element - Used only for Audio */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        className="sr-only" // This hides the video visually but keeps it in the DOM
      >
        <source src="/rose-day.mp4" type="video/mp4" />
      </video>

      {!hasStarted ? (
        /* The Gift Box Intro - Required to trigger sound */
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0104]">
          <button 
            onClick={startExperience}
            className="group flex flex-col items-center gap-6 cursor-pointer"
          >
            <div className="text-8xl animate-pulse group-hover:scale-110 transition-transform">🎁</div>
            <p className="font-[family-name:var(--font-dancing-script)] text-3xl text-pink-400">
              Open your surprise
            </p>
          </button>
        </div>
      ) : (
        /* The Actual Content */
        <QuoteList title={title} showOccasion={true} />
      )}
    </div>
  );
}