"use client";
import { motion } from "framer-motion";

export default function HeartBeat() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
      <motion.div
        animate={{
          scale: [1, 1.1, 1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2, 0.6, 0.2],
          filter: [
            "drop-shadow(0 0 20px rgba(219, 39, 119, 0.3))",
            "drop-shadow(0 0 50px rgba(219, 39, 119, 0.6))",
            "drop-shadow(0 0 20px rgba(219, 39, 119, 0.3))"
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-[25rem] md:text-[45rem] select-none"
      >
        ❤️
      </motion.div>
    </div>
  );
}