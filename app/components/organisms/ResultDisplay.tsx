"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import ArgumentCard from "@/app/components/atoms/ArgumentCard";
import { useAtomValue } from "jotai";
import { debateAtom, processAtom } from "@/app/atoms/atoms";
import { useDebateProcess } from "@/app/hooks/useDebateProcess";
import { argIds } from "@/app/utils/values";
import { useScrollByStream } from "@/app/hooks/useScroll";

export default function ResultDisplay() {
  const { args, motion } = useAtomValue(debateAtom);
  const process = useAtomValue(processAtom);
  const { initializeDebateProcess, initializeDebateProcessAfterError } =
    useDebateProcess();
  const { scrollRef } = useScrollByStream(args);

  const style = (index: number) => {
    if (index === argIds.length - 1) {
      return { marginTop: 60, justifyContent: "center" };
    } else if (index % 2 === 0) {
      return { marginLeft: 40, justifyContent: "start" };
    } else {
      return { marginRight: 40, justifyContent: "end" };
    }
  };

  const argumentCardWidth = (index: number) => {
    if (index === argIds.length - 1) {
      return 1000;
    } else {
      return undefined;
    }
  };

  return (
    <div className="w-full flex flex-col items-center h-screen">
      <header className="w-full p-8 flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="text-lg font-bold">議題</div>
          <div className="text-2xl font-bold">{motion}</div>
        </div>
      </header>
      <main
        className="w-full flex justify-center overflow-y-auto flex-1"
        ref={scrollRef}
      >
        <div className="w-[1000px] flex flex-col items-center gap-10">
          {args.map((arg, index) => (
            <div
              style={style(index)}
              className="w-full flex"
              key={`${arg.title}${index}`}
            >
              <ArgumentCard arg={arg} width={argumentCardWidth(index)} />
            </div>
          ))}
        </div>
      </main>
      <footer className="w-full p-8 flex items-center justify-center bg-gray-100">
        {process === "inProcess" && (
          <div className="flex flex-col items-center">
            <div className="flex mb-5 items-center gap-2">
              <div className="text-xl font-bold text-primary">ディベート中</div>
              <div className="w-7 h-7 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        )}
        {process === "finish" && (
          <div className="flex flex-col items-center">
            <div className="mb-5 text-xl font-bold text-primary">
              ディベートが終了しました
            </div>
            <Button
              variant="outline"
              onClick={initializeDebateProcess}
              className="w-60"
            >
              ホームに戻る
            </Button>
          </div>
        )}
        {process === "error" && (
          <div className="flex flex-col items-center">
            <div className="mb-5 text-xl font-bold text-red-500">
              ディベートに失敗しました
            </div>
            <Button
              variant="outline"
              onClick={initializeDebateProcessAfterError}
              className="w-60"
            >
              もう一度ディベートを行う
            </Button>
          </div>
        )}
      </footer>
    </div>
  );
}
