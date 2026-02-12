"use client";
import React, { useState, useRef, useLayoutEffect } from "react";
import { STEPS } from "@/lib/ValentineQuestions";

export default function ValentinePage() {
  const [step, setStep] = useState(0);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const isLastStep = step === STEPS.length - 1;

  const moveButton = () => {
    if (!isLastStep || !cardRef.current) return;

    const card = cardRef.current;
    const buttonWidth = 120; // approx width of "No" button
    const buttonHeight = 50; // approx height

    // Allow movement almost to the edges of the card
    const maxX = (card.clientWidth - buttonWidth) / 2 - 10; // 10px margin
    const maxY = (card.clientHeight - buttonHeight) / 2 - 10; // vertical limit

    // Random position anywhere within limits
    const randomX = Math.random() * 2 * maxX - maxX;
    const randomY = Math.random() * 2 * maxY - maxY;

    setNoOffset({ x: randomX, y: randomY });
  };

  const handleNoInteraction = () => {
    if (isLastStep) moveButton();
    else setStep((prev) => prev + 1);
  };

  if (hasAccepted) {
    return (
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <div className="flex flex-col items-center gap-4 w-full max-w-lg overflow-hidden rounded-4xl border border-white/20 shadow-2xl bg-white/10 backdrop-blur-md">
          {/* Video Title */}
          <h2 className="text-white text-2xl md:text-3xl font-bold mt-4">
            Let's Go 🎉
          </h2>

          {/* Video */}
          <video
            src="/letsgo.MP4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto max-h-[70vh] object-cover rounded-4xl"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
      <div
        ref={cardRef}
        className="flex flex-col items-center rounded-[3rem] bg-white/10 p-8 md:p-12 backdrop-blur-3xl border border-white/20 shadow-2xl text-center max-w-md w-full transition-all duration-500"
      >
        <div className="relative mb-6 h-64 md:h-80 w-full overflow-hidden rounded-2xl bg-black/20 flex items-center justify-center">
          <img
            src={STEPS[step].image}
            alt="Valentine Illustration"
            className="h-full w-full object-contain p-2 transition-opacity duration-500 hover:scale-105"
          />
        </div>

        <div className="mb-8 space-y-2">
          <p className="text-2xl md:text-3xl font-serif italic font-semibold text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-red-600 leading-tight">
            {STEPS[step].question}
          </p>
        </div>

        <div className="relative flex w-full flex-row items-center justify-center gap-4 min-h-16">
          <button
            onClick={() => setHasAccepted(true)}
            className="flex-1 rounded-full bg-linear-to-r from-pink-500 via-red-500 to-rose-500 py-3 md:py-4 text-lg font-bold text-white shadow-lg hover:scale-105 active:scale-95 transition-transform duration-300"
          >
            Yes 💖
          </button>

          <button
            onMouseEnter={moveButton}
            onTouchStart={moveButton}
            onClick={handleNoInteraction}
            style={{
              transform: isLastStep
                ? `translate(${noOffset.x}px, ${noOffset.y}px)`
                : "none",
            }}
            className={`flex-1 rounded-full py-3 md:py-4 text-lg font-bold transition-all duration-300 ease-out whitespace-nowrap ${
              isLastStep
                ? "absolute z-30 bg-rose-700 text-white shadow-2xl px-8 hover:scale-110"
                : "relative z-10 bg-white/20 text-rose-100 hover:bg-rose-500/30"
            }`}
          >
            No? 😂
          </button>
        </div>
      </div>
    </main>
  );
}
