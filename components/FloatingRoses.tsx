"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Rose = ({ index }: { index: number }) => {
  const [coords, setCoords] = useState<{ x: string; size: string; duration: number; startY: string } | null>(null);

  useEffect(() => {
    setCoords({
      // Spread across the full width
      x: `${(index * 1.25) % 100}vw`, 
      size: `${1 + Math.random() * 2}rem`,
      duration: 7 + Math.random() * 8,
      // Start them at random heights so the screen is full instantly
      startY: `${Math.random() * -100}vh` 
    });
  }, [index]);

  if (!coords) return null;

  return (
    <motion.div
      initial={{ y: coords.startY, x: coords.x, opacity: 0, rotate: 0 }}
      animate={{ 
        y: "110vh", // Falling to the bottom
        opacity: [0, 1, 1, 0],
        rotate: 360,
      }}
      transition={{ 
        duration: coords.duration, 
        repeat: Infinity, 
        delay: 0, 
        ease: "linear" 
      }}
      style={{ fontSize: coords.size }}
      className="fixed pointer-events-none z-[40] drop-shadow-lg will-change-transform"
    >
      🌹
    </motion.div>
  );
};

export default function FloatingRoses() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-40">
      {/* 80 Roses for a heavy "Rose Rain" effect */}
      {Array.from({ length: 80 }).map((_, i) => (
        <Rose key={i} index={i} />
      ))}
    </div>
  );
}