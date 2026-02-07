"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Rose = ({ delay }: { delay: number }) => {
  const [coords, setCoords] = useState<{ x: string; size: string } | null>(null);

  useEffect(() => {
    setCoords({
      x: `${Math.random() * 100}vw`,
      size: `${1.5 + Math.random() * 2}rem`
    });
  }, []);

  if (!coords) return null;

  return (
    <motion.div
      initial={{ y: "110vh", x: coords.x, opacity: 0, rotate: 0 }}
      animate={{ 
        y: "-20vh", 
        opacity: [0, 1, 1, 0],
        rotate: 360,
      }}
      transition={{ 
        duration: 8 + Math.random() * 7, 
        repeat: Infinity, 
        delay, 
        ease: "linear" 
      }}
      style={{ fontSize: coords.size }}
      className="fixed pointer-events-none z-[40] drop-shadow-md" // Higher z-index to float over text
    >
      🌹
    </motion.div>
  );
};

export default function FloatingRoses() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      {/* 30 Roses for a "More Roses" feel */}
      {Array.from({ length: 30 }).map((_, i) => (
        <Rose key={i} delay={i * 0.8} />
      ))}
    </>
  );
}