// components/PersonalizedView.tsx
"use client";
import { QuoteList } from "./VideoView";

export default function PersonalizedView({ title }: { title: string }) {
  return (
    <div className="bg-linear-to-b from-[#1a0105] to-[#0a0104] h-screen w-full">
      {/* Passing both the personalized title and a flag to show the occasion */}
      <QuoteList title={title} showOccasion={true} />
    </div>
  );
}