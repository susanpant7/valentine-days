"use client";
import React, { useState, useRef, useEffect } from "react";
import { STEPS } from "@/lib/ValentineQuestions";
import FloatingRoses from "@/components/FloatingRoses";

export default function ValentinePage() {
  const name = "Karuna";
  const [step, setStep] = useState(0);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Preload assets for zero-latency transitions
  useEffect(() => {
    STEPS.forEach((s) => { const img = new Image(); img.src = s.image; });
    const v = document.createElement("video"); v.src = "/letsgo.MP4"; v.preload = "auto";
  }, []);

  const isLastStep = step === STEPS.length - 1;

  const moveButton = () => {
    if (!isLastStep || !cardRef.current) return;

    const w = cardRef.current.clientWidth;
    const h = cardRef.current.clientHeight;

    /**
     * Define specific anchor points relative to the original button position
     * [x, y] coordinates
     */
    const points = [
      [0, -h * 0.4],       // Top Center (near image)
      [-w * 0.4, -h * 0.2], // Top Left
      [w * 0.4, -h * 0.2],  // Top Right
      [-w * 0.7, 0],       // Mid Left (outside button row)
      [0, h * 0.2],        // Bottom Center
      [-w * 0.4, h * 0.15], // Bottom Left
      [w * 0.4, h * 0.15],  // Bottom Right
    ];

    // Filter out current point to ensure it always jumps
    const otherPoints = points.filter(p => p[1] !== noOffset.y);
    const [nextX, nextY] = otherPoints[Math.floor(Math.random() * otherPoints.length)];

    setNoOffset({ x: nextX, y: nextY });
  };

  const handleNoInteraction = () => {
    if (isLastStep) moveButton();
    else {
      setStep((s) => s + 1);
      setNoOffset({ x: 0, y: 0 });
    }
  };

  if (hasAccepted) {
    return (
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <FloatingRoses />
        <div className="flex flex-col items-center gap-6 w-full max-w-lg rounded-[2.5rem] border border-white/20 shadow-2xl bg-white/10 backdrop-blur-xl p-4 animate-in fade-in zoom-in duration-300">
          <h2 className="text-white text-3xl md:text-5xl font-serif italic font-bold pt-4 drop-shadow-lg">
            Susan ❤️ Karuna
          </h2>
          <video src="/letsgo.MP4" autoPlay loop muted playsInline className="w-full h-auto max-h-[60vh] object-cover rounded-4xl" />
        </div>
      </main>
    );
  }

  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden">
      <FloatingRoses />

      <div
        ref={cardRef}
        className="relative flex flex-col items-center rounded-[3rem] bg-white/10 p-8 md:p-12 backdrop-blur-3xl border border-white/20 shadow-2xl text-center max-w-md w-full transition-all duration-300"
      >
        <div className="relative mb-8 h-60 md:h-72 w-full overflow-hidden rounded-3xl bg-black/20 flex items-center justify-center border border-white/10">
          <img
            src={STEPS[step].image}
            alt="Step"
            className="h-full w-full object-contain p-4"
            key={step}
          />
        </div>

        <div className="mb-10 min-h-20 flex items-center justify-center">
          <p className="text-2xl md:text-3xl font-serif italic font-bold leading-tight text-white">
             {STEPS[step].question}
          </p>
        </div>

        <div className="relative flex w-full flex-row items-center justify-center gap-4 h-16">
          <button
            onClick={() => setHasAccepted(true)}
            className="flex-1 z-20 rounded-full bg-linear-to-r from-pink-500 via-red-500 to-rose-500 py-4 text-lg font-black text-white shadow-lg active:scale-95 transition-transform"
          >
            Yes 💖
          </button>

          <div className="flex-1 relative flex items-center justify-center">
            <button
              onMouseEnter={moveButton}
              onTouchStart={(e) => { e.preventDefault(); moveButton(); }}
              onClick={handleNoInteraction}
              style={{
                position: isLastStep ? "absolute" : "relative",
                // translate3d uses the GPU for much faster, "snappier" movement
                transform: isLastStep ? `translate3d(${noOffset.x}px, ${noOffset.y}px, 0)` : "none",
                transition: isLastStep ? "transform 0.1s ease-out" : "none",
              }}
              className={`w-full rounded-full py-4 text-lg font-bold z-30 whitespace-nowrap ${
                isLastStep
                  ? "bg-rose-700 text-white shadow-2xl border border-white/30"
                  : "bg-white/20 text-rose-100 border border-white/10"
              }`}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}