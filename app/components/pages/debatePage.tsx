"use client";

import React from "react";
import InstructionsCard from "@/app/components/organisms/InstructionsCard";
import { useAtomValue } from "jotai";
import { processAtom } from "@/app/atoms/atoms";
import ResultDisplay from "@/app/components/organisms/ResultDisplay";

export default function DebatePage() {
  const process = useAtomValue(processAtom);

  return (
    <div>
      {process === "before" ? (
        <div className="w-full flex flex-col items-center">
          <div className="flex justify-center items-center h-screen">
            <div className="text-4xl font-bold text-primary mx-16">
              ディベートを始める
            </div>
            <InstructionsCard />
          </div>
        </div>
      ) : (
        <ResultDisplay />
      )}
    </div>
  );
}
