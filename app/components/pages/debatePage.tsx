"use client";

import React from "react";
import InstructionsCard from "@/app/components/organisms/InstructionsCard";
import { useAtomValue } from "jotai";
import { processAtom } from "@/app/atoms";
import ResultDisplay from "@/app/components/organisms/ResultDisplay";

export default function DebatePage() {
  const process = useAtomValue(processAtom);

  return (
    <div className="w-full flex flex-col items-center">
      {process === "before" ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-4xl font-bold text-primary mx-16">
            ディベートを始める
          </div>
          <InstructionsCard />
        </div>
      ) : (
        <div className="w-[1000px] mt-16 mb-16">
          <ResultDisplay />
        </div>
      )}
    </div>
  );
}
