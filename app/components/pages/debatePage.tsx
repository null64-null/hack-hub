"use client";

import React from "react";
import InstructionsCard from "@/app/components/organisms/InstructionsCard";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import ResultDisplay from "@/app/components/organisms/ResultDisplay";
import Loading from "@/app/components/organisms/Loading";

export default function DebatePage() {
  const { process, result } = useSelector((state: RootState) => state.debate);
  return (
    <div className="w-full flex flex-col items-center">
      {process === "before" && (
        <div className="flex justify-center items-center h-screen">
          <div className="text-4xl font-bold text-primary mx-16">
            ディベートを始める
          </div>
          <InstructionsCard />
        </div>
      )}
      {process === "inProgress" && (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      )}
      {process === "completed" && (
        <div className="w-[1000px]">
          <ResultDisplay result={result} />
        </div>
      )}
    </div>
  );
}
