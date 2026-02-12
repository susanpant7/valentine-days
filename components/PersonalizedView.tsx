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
    <div className="bg-transparent">
      <video ref={videoRef} loop muted playsInline className="sr-only">
        <source src="/rose-day.mp4" type="video/mp4" />
      </video>

      {!hasStarted ? (
        <div className="flex flex-col items-center justify-center py-10">
          <button onClick={startExperience} className="group cursor-pointer">
            <div className="text-8xl animate-bounce mb-6">🎁</div>
            <p className="text-xl font-light tracking-widest text-pink-200">OPEN YOUR SURPRISE</p>
          </button>
        </div>
      ) : (
        <QuoteList title={title} showOccasion={true} />
      )}
    </div>
  );
}