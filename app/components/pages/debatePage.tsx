"use client";

import React from "react";
import InstructionsCard from "../organism/InstructionsCard";
import DebatingSign from "../organism/debatingSign";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

export default function DebatePage() {
  const { process } = useSelector((state: RootState) => state.debate);
  return (
    <div>
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
          <DebatingSign />
        </div>
      )}
    </div>
  );
}
