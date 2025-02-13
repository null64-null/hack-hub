"use client";

import React from "react";
import { ReactNode } from "react";
import { DebateResult } from "@/app/type/debate";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import ArgumentCard from "@/app/components/atoms/ArgumentCard";
import {
  setProcess,
  setResult,
  setLimit,
  setMotion,
} from "@/app/store/features/debate/debateSlice";

interface ResultDisplayProps {
  result: DebateResult;
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  const dispatch = useDispatch();
  const [time, setTime] = useState<number>(0);

  const initializeValues = () => {
    dispatch(setMotion(""));
    dispatch(setLimit(0));
    dispatch(setProcess("before"));
    dispatch(
      setResult({
        govArgument: "",
        oppArgument: "",
        govRebuttal: "",
        oppRebuttal: "",
        govSummary: "",
        oppSummary: "",
        judge: "",
      } as DebateResult)
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 100);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col gap-10">
      <SlideIn position="start" delay={0} time={time}>
        <ArgumentCard title="肯定側立論" text={result.govArgument} />
      </SlideIn>
      <SlideIn position="end" delay={200} time={time}>
        <ArgumentCard title="否定側立論" text={result.oppArgument} />
      </SlideIn>
      <SlideIn position="start" delay={400} time={time}>
        <ArgumentCard title="肯定側反駁" text={result.govRebuttal} />
      </SlideIn>
      <SlideIn position="end" delay={600} time={time}>
        <ArgumentCard title="否定側反駁" text={result.oppRebuttal} />
      </SlideIn>
      <SlideIn position="start" delay={800} time={time}>
        <ArgumentCard title="肯定側まとめ" text={result.govSummary} />
      </SlideIn>
      <SlideIn position="end" delay={1000} time={time}>
        <ArgumentCard title="否定側まとめ" text={result.oppSummary} />
      </SlideIn>
      <SlideIn position="center" delay={1400} time={time}>
        <ArgumentCard title="判定" text={result.judge} width={800} />
      </SlideIn>
      <SlideIn position="center" delay={1500} time={time}>
        <Button variant="outline" onClick={initializeValues}>
          ホームに戻る
        </Button>
      </SlideIn>
    </div>
  );
}

type Props = {
  position: "start" | "end" | "center";
  time: number;
  delay: number;
  children: ReactNode;
};

function SlideIn({ position, time, delay, children }: Props) {
  let margin;
  let transform;
  if (position === "start") {
    margin = "ml";
    transform = time > delay ? "translateX(0px)" : "translateX(-20px)";
  } else if (position === "end") {
    margin = "mr";
    transform = time > delay ? "translateX(0px)" : "translateX(20px)";
  } else {
    margin = "mt";
    transform = time > delay ? "translateY(0px)" : "translateY(20px)";
  }

  return (
    <div className={`w-full ${margin}-10 flex justify-${position}`}>
      <div
        className="ease-out duration-500"
        style={{
          opacity: time > delay ? 1 : 0,
          transform: transform,
        }}
      >
        {children}
      </div>
    </div>
  );
}
