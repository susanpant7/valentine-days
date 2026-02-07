// components/RoseDayCard.js
"use client";
import { motion } from "framer-motion";

export default function RoseDayCard({ poem, videoSrc, title }) {
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <video
        autoPlay loop muted playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50 z-10" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-20 text-center p-8 rounded-3xl backdrop-blur-lg bg-white/10 border border-white/30 max-w-xl"
      >
        <motion.h1 
          className="text-pink-500 text-4xl md:text-5xl font-extrabold mb-4"
          animate={{ textShadow: ["0px 0px 0px #ff0080", "0px 0px 20px #ff0080", "0px 0px 0px #ff0080"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {title}
        </motion.h1>

        <p className="text-white text-xl md:text-2xl whitespace-pre-line leading-relaxed">
          {poem}
        </p>
      </motion.div>
    </div>
  );
}