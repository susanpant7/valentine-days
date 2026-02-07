"use client"
import { use } from "react";
import PersonalizedView from "@/components/PersonalizedView";
import VideoView from "@/components/VideoView";

export default function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = use(params);
  const namePair = resolvedParams.slug ? resolvedParams.slug[0] : null;

  // If there is no namePair, we are at localhost:3000/
  if (!namePair) {
    return (
      <main className="relative h-screen w-full bg-black overflow-hidden">
        <VideoView />
      </main>
    );
  }

  // If there IS a namePair, we are at localhost:3000/Suman-Suruchi
  const displayTitle = decodeURIComponent(namePair).replace("-", " ❤️ ");

  return (
    <main className="relative h-screen w-full bg-black overflow-hidden">
      <PersonalizedView title={displayTitle} />
    </main>
  );
}