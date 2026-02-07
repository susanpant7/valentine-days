// components/VideoView.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { ROSE_DAY_QUOTES } from "@/lib/RoseDayQuotes";
import FloatingRoses from "@/components/FloatingRoses";
import HeartBeat from "@/components/Heartbeat";
import { AnimatePresence, motion } from "framer-motion";

export default function VideoView() {
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
    <>
      <video
        ref={videoRef}
        loop muted playsInline
        className="fixed inset-0 w-full h-full object-cover object-[center_80%] z-0 opacity-40"
      >
        <source src="/rose-day.mp4" type="video/mp4" />
      </video>

      {!hasStarted && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0104]/95 backdrop-blur-sm">
          <button onClick={startExperience} className="group flex flex-col items-center gap-6 cursor-pointer">
            <div className="text-8xl animate-pulse group-hover:scale-110 transition-transform">🎁</div>
            <p className="font-(family-name:--font-dancing-script) text-3xl text-pink-400">Click to open your surprise</p>
          </button>
        </div>
      )}

      {/* Now passing Susan ❤️ Karuna with the Rose Day subtitle */}
      {hasStarted && <QuoteList title="Susan ❤️ Karuna" showOccasion={true} />}
    </>
  );
}


export function QuoteList({ 
  title, 
  showOccasion = false 
}: { 
  title: string, 
  showOccasion?: boolean 
}) {
  const [index, setIndex] = useState(0);

  // Automatically change quote every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROSE_DAY_QUOTES.length);
    }, 6000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <FloatingRoses />
      <HeartBeat />

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.1, y: -20 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="relative z-30 max-w-xl w-full mx-4 backdrop-blur-md bg-black/40 border border-pink-500/20 p-10 rounded-[2.5rem] text-center shadow-2xl"
        >
          {/* Occasion Subtitle */}
          {showOccasion && (
            <p className="font-(family-name:--font-dancing-script) text-2xl md:text-3xl text-pink-500/80 mb-2">
              Happy Rose Day
            </p>
          )}

          <h2 className="font-(family-name:--font-dancing-script) text-5xl md:text-7xl text-pink-400 mb-8 drop-shadow-lg">
            {title}
          </h2>

          <p className="text-white text-xl md:text-2xl leading-relaxed italic whitespace-pre-line font-light min-h-[150px] flex items-center justify-center">
            {ROSE_DAY_QUOTES[index]}
          </p>

          {/* Progress Indicators */}
          <div className="mt-10 flex justify-center items-center gap-2">
            {ROSE_DAY_QUOTES.map((_, i) => (
              <div 
                key={i}
                className={`h-1.5 transition-all duration-500 rounded-full ${i === index ? 'w-8 bg-pink-500' : 'w-2 bg-pink-500/30'}`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}