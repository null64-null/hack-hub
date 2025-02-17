"use client";

import React from "react";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import ArgumentCard from "@/app/components/atoms/ArgumentCard";
import { useAtomValue } from "jotai";
import { debateAtom, processAtom } from "@/app/atoms";
import { useDebateProcess, useAnimationStart } from "@/app/hooks";
import { argIds } from "@/app/values";

export default function ResultDisplay() {
  const { args } = useAtomValue(debateAtom);
  const process = useAtomValue(processAtom);
  const {
    initializeDebateProcess,
    initializeDebateProcessAfterError,
    cancelDebate,
  } = useDebateProcess();
  const { move } = useAnimationStart();

  const position = (index: number) => {
    if (index === argIds.length - 1) {
      return "center";
    } else if (index % 2 === 0) {
      return "start";
    } else {
      return "end";
    }
  };

  return (
    <div className="w-full flex flex-col gap-10">
      {args.map((arg, index) => (
        <SlideIn
          position={position(index)}
          isNew={index === args.length - 1}
          move={move}
          key={arg.title}
        >
          <ArgumentCard arg={arg} />
        </SlideIn>
      ))}
      {process === "inProcess" && (
        <Button variant="outline" onClick={cancelDebate}>
          ディベートを中止
        </Button>
      )}
      {process === "finish" && (
        <Button variant="outline" onClick={initializeDebateProcess}>
          ホームに戻る
        </Button>
      )}
      {(process === "error" || process === "abort") && (
        <div className="flex flex-col items-center">
          <div className="text-base font-bold text-primary">
            {process === "error" && "ディベートに失敗しました"}
            {process === "abort" && "ディベートを中止しました"}
          </div>
          <Button variant="outline" onClick={initializeDebateProcessAfterError}>
            もう一度ディベートを行う
          </Button>
        </div>
      )}
    </div>
  );
}

type Props = {
  position: "start" | "end" | "center";
  isNew: boolean;
  move: boolean;
  children: ReactNode;
};

function SlideIn({ position, isNew, move, children }: Props) {
  let margin;
  const opacity = move ? 1 : 0;
  let transform;
  if (position === "start") {
    margin = "ml";
    transform = move ? "translateX(0px)" : "translateX(-20px)";
  } else if (position === "end") {
    margin = "mr";
    transform = move ? "translateX(0px)" : "translateX(20px)";
  } else {
    margin = "mt";
    transform = move ? "translateY(0px)" : "translateY(20px)";
  }

  return (
    <div className={`w-full ${margin}-10 flex justify-${position}`}>
      <div
        className="ease-out duration-500"
        style={
          isNew
            ? {
                opacity: opacity,
                transform: transform,
              }
            : {}
        }
      >
        {children}
      </div>
    </div>
  );
}
