"use client";
import React, { useState, useRef } from "react";
import { STEPS } from "@/lib/ValentineQuestions";
import FloatingRoses from "@/components/FloatingRoses";

export default function ValentinePage() {
  // Hardcoded name for simplicity
  const name = "Karuna";

  const [step, setStep] = useState(0);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const isLastStep = step === STEPS.length - 1;

  const moveButton = () => {
    if (!isLastStep || !cardRef.current) return;

    const cardHeight = cardRef.current.clientHeight;
    
    // Define 3 vertical zones: Top (near image), Mid (original), Bottom (footer)
    // We keep X at 0 so it stays horizontally aligned with the 'No' slot
    const zones = [
      -cardHeight * 0.35, // Top
      0,                  // Middle
      cardHeight * 0.15   // Bottom
    ];
    
    // Filter out the current position to ensure it actually moves every time
    const otherZones = zones.filter(z => z !== noOffset.y);
    const newY = otherZones[Math.floor(Math.random() * otherZones.length)];
    
    setNoOffset({ x: 0, y: newY });
  };

  const handleNoInteraction = () => {
    if (isLastStep) {
      moveButton();
    } else {
      setStep((prev) => prev + 1);
      setNoOffset({ x: 0, y: 0 }); 
    }
  };

  if (hasAccepted) {
    return (
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <FloatingRoses />
        <div className="flex flex-col items-center gap-6 w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-white/20 shadow-2xl bg-white/10 backdrop-blur-xl p-4 animate-in fade-in zoom-in duration-700">
          <h2 className="text-white text-3xl md:text-5xl font-serif italic font-bold pt-4 drop-shadow-lg">
            Yay! ❤️ {name} ❤️
          </h2>
          <video
            src="/letsgo.MP4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto max-h-[60vh] object-cover rounded-4xl shadow-2xl"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden">
      <FloatingRoses />

      <div
        ref={cardRef}
        className="relative flex flex-col items-center rounded-[3rem] bg-white/10 p-8 md:p-12 backdrop-blur-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-center max-w-md w-full transition-all duration-500"
      >
        {/* Image Container */}
        <div className="relative mb-8 h-60 md:h-72 w-full overflow-hidden rounded-3xl bg-black/20 flex items-center justify-center border border-white/10 shadow-inner">
          <img
            src={STEPS[step].image}
            alt="Valentine Illustration"
            className="h-full w-full object-contain p-4 transition-all duration-500"
            key={step}
          />
        </div>

        {/* Question Text */}
        <div className="mb-10 min-h-25 flex flex-col items-center justify-center">
          <p className="text-2xl md:text-3xl font-serif italic font-bold leading-tight text-white">
             {STEPS[step].question}
          </p>
        </div>

        {/* Buttons Row */}
        <div className="relative flex w-full flex-row items-center justify-center gap-4 h-16">
          {/* YES BUTTON */}
          <button
            onClick={() => setHasAccepted(true)}
            className="flex-1 z-20 rounded-full bg-linear-to-r from-pink-500 via-red-500 to-rose-500 py-4 text-lg font-black text-white shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
          >
            Yes 💖
          </button>

          {/* NO BUTTON GHOST WRAPPER (Keeps 'Yes' on the left) */}
          <div className="flex-1 relative h-full flex items-center justify-center">
            <button
              onMouseEnter={moveButton}
              onTouchStart={moveButton}
              onClick={handleNoInteraction}
              style={{
                position: isLastStep ? "absolute" : "relative",
                transform: isLastStep ? `translate(${noOffset.x}px, ${noOffset.y}px)` : "none",
                transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s",
              }}
              className={`w-full rounded-full py-4 text-lg font-bold z-30 whitespace-nowrap ${
                isLastStep
                  ? "bg-rose-700 text-white shadow-2xl px-8 border border-white/30"
                  : "bg-white/20 text-rose-100 hover:bg-rose-600/30 border border-white/10"
              }`}
            >
              No
            </button>
          </div>
        </div>
      </div>
      
      <footer className="mt-8 opacity-20 text-white text-[10px] tracking-[0.4em] uppercase font-light">
        Fate is already written
      </footer>
    </main>
  );
}